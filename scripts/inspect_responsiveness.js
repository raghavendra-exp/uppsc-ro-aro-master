import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url.split('?')[0]);
  if (req.url === '/' || req.url === '') {
    filePath = path.join(distDir, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const altPath = path.join(distDir, req.url);
      if (fs.existsSync(altPath) && fs.statSync(altPath).isFile()) {
        filePath = altPath;
      } else {
        filePath = path.join(distDir, 'index.html');
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

await new Promise(resolve => server.listen(4174, resolve));
console.log('Static server listening on port 4174');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDataDir = path.resolve(__dirname, '..', '.temp_edge_inspect');
fs.mkdirSync(userDataDir, { recursive: true });

const edgeProc = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9223',
  `--user-data-dir=${userDataDir}`,
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check'
]);

let versionData = null;
for (let i = 0; i < 30; i++) {
  try {
    const res = await fetch('http://127.0.0.1:9223/json/version');
    if (res.ok) {
      versionData = await res.json();
      break;
    }
  } catch (e) {
    await new Promise(r => setTimeout(r, 200));
  }
}

if (!versionData) {
  console.error('Failed to connect to Edge CDP');
  cleanup();
  process.exit(1);
}

const newTabRes = await fetch('http://127.0.0.1:9223/json/new?http://localhost:4174/', { method: 'PUT' });
const targetData = await newTabRes.json();
const wsUrl = targetData.webSocketDebuggerUrl;

const ws = new WebSocket(wsUrl);
await new Promise(resolve => ws.onopen = resolve);

let idCounter = 1;
function sendCommand(method, params = {}) {
  const id = idCounter++;
  return new Promise((resolve, reject) => {
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

await sendCommand('Page.enable');
await sendCommand('Runtime.enable');
await sendCommand('DOM.enable');

await new Promise(r => setTimeout(r, 1500));

const tabsToTest = [
  'home',
  'syllabus',
  'prelims',
  'mains',
  'drafting',
  'essay',
  'inm-timeline',
  'up-gk',
  'pyq',
  'practice',
  'mocks',
  'analytics',
  'study-plan',
  'revision',
  'books',
  'notices'
];

const testViewports = [320, 375, 768, 1280];

console.log('\n======================================================');
console.log('UPPSC RO/ARO COMPREHENSIVE RESPONSIVENESS SUITE');
console.log('======================================================\n');

let totalFailures = 0;
const results = {};

for (const tab of tabsToTest) {
  // Navigate to tab
  await sendCommand('Runtime.evaluate', {
    expression: `window.__navigateTab && window.__navigateTab('${tab}');`
  });
  await new Promise(r => setTimeout(r, 250));

  results[tab] = {};

  for (const w of testViewports) {
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: 800,
      deviceScaleFactor: 1,
      mobile: w < 768
    });
    await new Promise(r => setTimeout(r, 200));

    const evalRes = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const winW = window.innerWidth;
          const docScrollW = document.documentElement.scrollWidth;
          const bodyScrollW = document.body.scrollWidth;
          
          const overflowing = [];
          const all = document.querySelectorAll('*');
          for (const el of all) {
            const rect = el.getBoundingClientRect();
            if (rect.right > winW + 1) {
              overflowing.push({
                tag: el.tagName,
                id: el.id,
                className: (el.className || '').toString().slice(0, 70),
                right: Math.round(rect.right),
                width: Math.round(rect.width)
              });
            }
          }
          return {
            winW,
            docScrollW,
            bodyScrollW,
            overflow: docScrollW > winW || bodyScrollW > winW,
            overflowCount: overflowing.length,
            topOverflow: overflowing.slice(0, 5)
          };
        })()
      `,
      returnByValue: true
    });

    const res = evalRes.result.value;
    const isPass = !res.overflow;
    results[tab][w] = { pass: isPass, docScrollW: res.docScrollW, winW: res.winW, topOverflow: res.topOverflow };

    if (!isPass) {
      totalFailures++;
      console.log(`❌ FAIL [Tab: ${tab}] [${w}px]: docScrollW=${res.docScrollW}px > winW=${res.winW}px`);
      console.log('   Overflow elements:', JSON.stringify(res.topOverflow, null, 2));
    } else {
      console.log(`✅ PASS [Tab: ${tab}] [${w}px]: docScrollW=${res.docScrollW}px`);
    }
  }
}

console.log('\n======================================================');
console.log(`SUMMARY: Total tested: ${tabsToTest.length * testViewports.length} combinations.`);
console.log(`Total failures: ${totalFailures}`);
console.log('======================================================\n');

cleanup();

function cleanup() {
  try { ws.close(); } catch(e) {}
  try { edgeProc.kill(); } catch(e) {}
  try { server.close(); } catch(e) {}
  setTimeout(() => process.exit(totalFailures === 0 ? 0 : 1), 500);
}
