// UPPSC RO/ARO ARO Typing Engine - Kruti Dev 010 & Inscript Conversion & Keymaps

export interface KeyMapEntry {
  key: string;
  normal: string;
  shift: string;
  normalUnicode: string;
  shiftUnicode: string;
}

export const REMINGTON_KEY_ROWS: KeyMapEntry[][] = [
  // Number row
  [
    { key: '`', normal: '`', shift: '~', normalUnicode: '`', shiftUnicode: '~' },
    { key: '1', normal: '1', shift: '!', normalUnicode: '१', shiftUnicode: '!' },
    { key: '2', normal: '2', shift: '@', normalUnicode: '२', shiftUnicode: '/' },
    { key: '3', normal: '3', shift: '#', normalUnicode: '३', shiftUnicode: 'रु' },
    { key: '4', normal: '4', shift: '$', normalUnicode: '४', shiftUnicode: '+' },
    { key: '5', normal: '5', shift: '%', normalUnicode: '५', shiftUnicode: ':' },
    { key: '6', normal: '6', shift: '^', normalUnicode: '६', shiftUnicode: '‘' },
    { key: '7', normal: '7', shift: '&', normalUnicode: '७', shiftUnicode: '-' },
    { key: '8', normal: '8', shift: '*', normalUnicode: '८', shiftUnicode: '’' },
    { key: '9', normal: '9', shift: '(', normalUnicode: '९', shiftUnicode: ';' },
    { key: '0', normal: '0', shift: ')', normalUnicode: '०', shiftUnicode: '.' },
    { key: '-', normal: '-', shift: '_', normalUnicode: '-', shiftUnicode: 'ऋ' },
    { key: '=', normal: '=', shift: '+', normalUnicode: 'ृ', shiftUnicode: 'ऋ' },
  ],
  // Top QWERTY row
  [
    { key: 'q', normal: 'q', shift: 'Q', normalUnicode: 'ु', shiftUnicode: 'फ' },
    { key: 'w', normal: 'w', shift: 'W', normalUnicode: 'ू', shiftUnicode: 'ॅ' },
    { key: 'e', normal: 'e', shift: 'E', normalUnicode: 'म', shiftUnicode: 'म्' },
    { key: 'r', normal: 'r', shift: 'R', normalUnicode: 'त', shiftUnicode: 'त्' },
    { key: 't', normal: 't', shift: 'T', normalUnicode: 'ज', shiftUnicode: 'ज्' },
    { key: 'y', normal: 'y', shift: 'Y', normalUnicode: 'ल', shiftUnicode: 'ल्' },
    { key: 'u', normal: 'u', shift: 'U', normalUnicode: 'न', shiftUnicode: 'न्' },
    { key: 'i', normal: 'i', shift: 'I', normalUnicode: 'प', shiftUnicode: 'प्' },
    { key: 'o', normal: 'o', shift: 'O', normalUnicode: 'व', shiftUnicode: 'व्' },
    { key: 'p', normal: 'p', shift: 'P', normalUnicode: 'च', shiftUnicode: 'छ' },
    { key: '[', normal: '[', shift: '{', normalUnicode: 'ख्', shiftUnicode: 'क्ष' },
    { key: ']', normal: ']', shift: '}', normalUnicode: ',', shiftUnicode: 'द्व' },
    { key: '\\', normal: '\\', shift: '|', normalUnicode: '?', shiftUnicode: '।' },
  ],
  // Home ASDF row
  [
    { key: 'a', normal: 'a', shift: 'A', normalUnicode: 'ं', shiftUnicode: 'ँ' },
    { key: 's', normal: 's', shift: 'S', normalUnicode: 'े', shiftUnicode: 'ै' },
    { key: 'd', normal: 'd', shift: 'D', normalUnicode: 'क', shiftUnicode: 'क्' },
    { key: 'f', normal: 'f', shift: 'F', normalUnicode: 'ि', shiftUnicode: 'थ्' },
    { key: 'g', normal: 'g', shift: 'G', normalUnicode: 'ह', shiftUnicode: 'घ्' },
    { key: 'h', normal: 'h', shift: 'H', normalUnicode: 'ी', shiftUnicode: 'भ्' },
    { key: 'j', normal: 'j', shift: 'J', normalUnicode: 'र', shiftUnicode: 'श्र' },
    { key: 'k', normal: 'k', shift: 'K', normalUnicode: 'ा', shiftUnicode: 'ज्ञ' },
    { key: 'l', normal: 'l', shift: 'L', normalUnicode: 'स', shiftUnicode: 'स्' },
    { key: ';', normal: ';', shift: ':', normalUnicode: 'य', shiftUnicode: 'रु' },
    { key: "'", normal: "'", shift: '"', normalUnicode: 'श', shiftUnicode: 'ष्' },
  ],
  // Bottom ZXCV row
  [
    { key: 'z', normal: 'z', shift: 'Z', normalUnicode: '्र', shiftUnicode: 'र्' },
    { key: 'x', normal: 'x', shift: 'X', normalUnicode: 'ग', shiftUnicode: 'ग्' },
    { key: 'c', normal: 'c', shift: 'C', normalUnicode: 'ब', shiftUnicode: 'ब्' },
    { key: 'v', normal: 'v', shift: 'V', normalUnicode: 'अ', shiftUnicode: 'ट' },
    { key: 'b', normal: 'b', shift: 'B', normalUnicode: 'इ', shiftUnicode: 'ठ' },
    { key: 'n', normal: 'n', shift: 'N', normalUnicode: 'द', shiftUnicode: 'छ' },
    { key: 'm', normal: 'm', shift: 'M', normalUnicode: 'उ', shiftUnicode: 'ड' },
    { key: ',', normal: ',', shift: '<', normalUnicode: 'ए', shiftUnicode: 'ढ' },
    { key: '.', normal: '.', shift: '>', normalUnicode: '्', shiftUnicode: 'झ' },
    { key: '/', normal: '/', shift: '?', normalUnicode: 'ध्', shiftUnicode: 'घ' },
  ]
];

export const INSCRIPT_KEY_ROWS: KeyMapEntry[][] = [
  // Number row
  [
    { key: '`', normal: '`', shift: '~', normalUnicode: '`', shiftUnicode: '~' },
    { key: '1', normal: '1', shift: '!', normalUnicode: '१', shiftUnicode: '!' },
    { key: '2', normal: '2', shift: '@', normalUnicode: '२', shiftUnicode: '@' },
    { key: '3', normal: '3', shift: '#', normalUnicode: '३', shiftUnicode: '#' },
    { key: '4', normal: '4', shift: '$', normalUnicode: '४', shiftUnicode: '₹' },
    { key: '5', normal: '5', shift: '%', normalUnicode: '५', shiftUnicode: '%' },
    { key: '6', normal: '6', shift: '^', normalUnicode: '६', shiftUnicode: '^' },
    { key: '7', normal: '7', shift: '&', normalUnicode: '७', shiftUnicode: '&' },
    { key: '8', normal: '8', shift: '*', normalUnicode: '८', shiftUnicode: '*' },
    { key: '9', normal: '9', shift: '(', normalUnicode: '९', shiftUnicode: '(' },
    { key: '0', normal: '0', shift: ')', normalUnicode: '०', shiftUnicode: ')' },
    { key: '-', normal: '-', shift: '_', normalUnicode: '-', shiftUnicode: 'ः' },
    { key: '=', normal: '=', shift: '+', normalUnicode: 'ृ', shiftUnicode: 'ऋ' },
  ],
  // Top QWERTY row
  [
    { key: 'q', normal: 'q', shift: 'Q', normalUnicode: 'ौ', shiftUnicode: 'औ' },
    { key: 'w', normal: 'w', shift: 'W', normalUnicode: 'ै', shiftUnicode: 'ऐ' },
    { key: 'e', normal: 'e', shift: 'E', normalUnicode: 'ा', shiftUnicode: 'आ' },
    { key: 'r', normal: 'r', shift: 'R', normalUnicode: 'ी', shiftUnicode: 'ई' },
    { key: 't', normal: 't', shift: 'T', normalUnicode: 'ू', shiftUnicode: 'ऊ' },
    { key: 'y', normal: 'y', shift: 'Y', normalUnicode: 'ब', shiftUnicode: 'भ' },
    { key: 'u', normal: 'u', shift: 'U', normalUnicode: 'ह', shiftUnicode: 'ङ' },
    { key: 'i', normal: 'i', shift: 'I', normalUnicode: 'ग', shiftUnicode: 'घ' },
    { key: 'o', normal: 'o', shift: 'O', normalUnicode: 'द', shiftUnicode: 'ध' },
    { key: 'p', normal: 'p', shift: 'P', normalUnicode: 'ज', shiftUnicode: 'झ' },
    { key: '[', normal: '[', shift: '{', normalUnicode: 'ड', shiftUnicode: 'ढ' },
    { key: ']', normal: ']', shift: '}', normalUnicode: '़', shiftUnicode: 'ञ' },
    { key: '\\', normal: '\\', shift: '|', normalUnicode: '।', shiftUnicode: '॥' },
  ],
  // Home ASDF row
  [
    { key: 'a', normal: 'a', shift: 'A', normalUnicode: 'ो', shiftUnicode: 'ओ' },
    { key: 's', normal: 's', shift: 'S', normalUnicode: 'े', shiftUnicode: 'ए' },
    { key: 'd', normal: 'd', shift: 'D', normalUnicode: '्', shiftUnicode: 'अ' },
    { key: 'f', normal: 'f', shift: 'F', normalUnicode: 'ि', shiftUnicode: 'इ' },
    { key: 'g', normal: 'g', shift: 'G', normalUnicode: 'ु', shiftUnicode: 'उ' },
    { key: 'h', normal: 'h', shift: 'H', normalUnicode: 'प', shiftUnicode: 'फ' },
    { key: 'j', normal: 'j', shift: 'J', normalUnicode: 'र', shiftUnicode: 'ऱ' },
    { key: 'k', normal: 'k', shift: 'K', normalUnicode: 'क', shiftUnicode: 'ख' },
    { key: 'l', normal: 'l', shift: 'L', normalUnicode: 'त', shiftUnicode: 'थ' },
    { key: ';', normal: ';', shift: ':', normalUnicode: 'च', shiftUnicode: 'छ' },
    { key: "'", normal: "'", shift: '"', normalUnicode: 'ट', shiftUnicode: 'ठ' },
  ],
  // Bottom ZXCV row
  [
    { key: 'z', normal: 'z', shift: 'Z', normalUnicode: '्र', shiftUnicode: 'ज्ञ' },
    { key: 'x', normal: 'x', shift: 'X', normalUnicode: 'ं', shiftUnicode: 'ँ' },
    { key: 'c', normal: 'c', shift: 'C', normalUnicode: 'म', shiftUnicode: 'ण' },
    { key: 'v', normal: 'v', shift: 'V', normalUnicode: 'न', shiftUnicode: 'ऩ' },
    { key: 'b', normal: 'b', shift: 'B', normalUnicode: 'व', shiftUnicode: 'श' },
    { key: 'n', normal: 'n', shift: 'N', normalUnicode: 'ल', shiftUnicode: 'ळ' },
    { key: 'm', normal: 'm', shift: 'M', normalUnicode: 'स', shiftUnicode: 'ष' },
    { key: ',', normal: ',', shift: '<', normalUnicode: ',', shiftUnicode: 'श्र' },
    { key: '.', normal: '.', shift: '>', normalUnicode: '.', shiftUnicode: '।' },
    { key: '/', normal: '/', shift: '?', normalUnicode: 'य', shiftUnicode: 'य़' },
  ]
];

// Bidirectional Unicode <-> Kruti Dev conversion engine
export function unicodeToKrutiDev(unicodeText: string): string {
  if (!unicodeText) return '';

  let text = unicodeText;

  // Replacement patterns for complex matras and conjuncts
  const replacements: [RegExp | string, string][] = [
    [/ऋ/g, '+'],
    [/क़/g, 'क़'],
    [/ख़/g, 'ख़'],
    [/ग़/g, 'ग़'],
    [/ज़/g, 'ज़'],
    [/ड़/g, 'ड़'],
    [/ढ़/g, 'ढ़'],
    [/फ़/g, 'फ़'],
    [/य़/g, 'य़'],
    [/ॠ/g, 'ऋ'],
    [/ॐ/g, 'vksRe'],
    [/।/g, 'A'],
    [/॥/g, 'AA'],
    [/०/g, '0'],
    [/१/g, '1'],
    [/२/g, '2'],
    [/३/g, '3'],
    [/४/g, '4'],
    [/५/g, '5'],
    [/६/g, '6'],
    [/७/g, '7'],
    [/८/g, '8'],
    [/९/g, '9'],
    [/ज्ञ/g, 'K'],
    [/त्र/g, '=',],
    [/श्र/g, 'J'],
    [/क्ष/g, '{k'],
    [/प्र/g, 'iz'],
    [/द्र/g, 'nz'],
    [/क्र/g, 'dz'],
    [/भ्र/g, 'Hkz'],
    [/म्र/g, 'ez'],
    [/व/g, 'o'],
    [/क/g, 'd'],
    [/ख/g, '[k'],
    [/ग/g, 'x'],
    [/घ/g, '?k'],
    [/च/g, 'p'],
    [/छ/g, 'N'],
    [/ज/g, 't'],
    [/झ/g, 'Pk'],
    [/ट/g, 'V'],
    [/ठ/g, 'B'],
    [/ड/g, 'M'],
    [/ढ/g, '<'],
    [/ण/g, '.k'],
    [/त/g, 'r'],
    [/थ/g, 'Fk'],
    [/द/g, 'n'],
    [/ध/g, '/k'],
    [/न/g, 'u'],
    [/प/g, 'i'],
    [/फ/g, 'Q'],
    [/ब/g, 'c'],
    [/भ/g, 'Hk'],
    [/म/g, 'e'],
    [/य/g, ';'],
    [/र/g, 'j'],
    [/ल/g, 'y'],
    [/श/g, '\'k'],
    [/ष/g, '"k'],
    [/स/g, 'l'],
    [/ह/g, 'g'],
    [/अ/g, 'v'],
    [/आ/g, 'vk'],
    [/इ/g, 'b'],
    [/ई/g, 'bZ'],
    [/उ/g, 'm'],
    [/ऊ/g, 'Å'],
    [/ए/g, ','],
    [/ऐ/g, ',s'],
    [/ओ/g, 'vks'],
    [/औ/g, 'vkS'],
    [/ा/g, 'k'],
    [/ी/g, 'h'],
    [/ु/g, 'q'],
    [/ू/g, 'w'],
    [/ृ/g, '`'],
    [/े/g, 's'],
    [/ै/g, 'S'],
    [/ो/g, 'ks'],
    [/ौ/g, 'kS'],
    [/ं/g, 'a'],
    [/ँ/g, 'W'],
    [/ः/g, '%'],
    [/्/g, '~'],
  ];

  // Process Chhoti 'i' matra (ि) which precedes the consonant in Kruti Dev
  text = text.replace(/([क-ह]्)?([क-ह])ि/g, 'f$1$2');

  for (const [pattern, repl] of replacements) {
    text = text.replace(pattern, repl);
  }

  return text;
}

export function krutiDevToUnicode(krutiText: string): string {
  if (!krutiText) return '';
  let text = krutiText;

  const reverseMap: [string, string][] = [
    ['vksRe', 'ॐ'],
    ['vkS', 'औ'],
    ['vks', 'ओ'],
    ['vk', 'आ'],
    ['v', 'अ'],
    ['bZ', 'ई'],
    ['b', 'इ'],
    ['Å', 'ऊ'],
    ['m', 'उ'],
    [',s', 'ऐ'],
    [',', 'ए'],
    ['+', 'ऋ'],
    ['kS', 'ौ'],
    ['ks', 'ो'],
    ['S', 'ै'],
    ['s', 'े'],
    ['k', 'ा'],
    ['h', 'ी'],
    ['w', 'ू'],
    ['q', 'ु'],
    ['`', 'ृ'],
    ['a', 'ं'],
    ['W', 'ँ'],
    ['%', 'ः'],
    ['~', '्'],
    ['K', 'ज्ञ'],
    ['=', 'त्र'],
    ['J', 'श्र'],
    ['{k', 'क्ष'],
    ['iz', 'प्र'],
    ['nz', 'द्र'],
    ['dz', 'क्र'],
    ['Hkz', 'भ्र'],
    ['ez', 'म्र'],
    ['[k', 'ख'],
    ['?k', 'घ'],
    ['Pk', 'झ'],
    ['.k', 'ण'],
    ['Fk', 'थ'],
    ['/k', 'ध'],
    ['Hk', 'भ'],
    ['\'k', 'श'],
    ['"k', 'ष'],
    ['d', 'क'],
    ['x', 'ग'],
    ['p', 'च'],
    ['N', 'छ'],
    ['t', 'ज'],
    ['V', 'ट'],
    ['B', 'ठ'],
    ['M', 'ड'],
    ['<', 'ढ'],
    ['r', 'त'],
    ['n', 'द'],
    ['u', 'न'],
    ['i', 'प'],
    ['Q', 'फ'],
    ['c', 'ब'],
    ['e', 'म'],
    [';', 'य'],
    ['j', 'र'],
    ['y', 'ल'],
    ['o', 'व'],
    ['l', 'स'],
    ['g', 'ह'],
    ['A', '।'],
  ];

  for (const [k, u] of reverseMap) {
    text = text.split(k).join(u);
  }

  // Handle pre-fixed chhoti 'i'
  text = text.replace(/f([क-ह])/g, '$1ि');

  return text;
}
