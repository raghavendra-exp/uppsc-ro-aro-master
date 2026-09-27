# UPPSC RO/ARO Master
> **Complete Review Officer & Assistant Review Officer Preparation System**  
> *समीक्षा अधिकारी एवं सहायक समीक्षा अधिकारी संपूर्ण डिजिटल तैयारी प्रणाली*

---

## 🏆 Project Vision & Philosophy

**"Prepare smarter. Practice deeper. Write better."**

**UPPSC RO/ARO Master** is an integrated, scientific, bilingual competitive-examination platform built for aspirants of the Uttar Pradesh Public Service Commission (UPPSC) Review Officer (RO / समीक्षा अधिकारी) and Assistant Review Officer (ARO / सहायक समीक्षा अधिकारी) examinations.

The platform guides an aspirant seamlessly across the complete preparation lifecycle:
$$\text{ZERO} \longrightarrow \text{FOUNDATION} \longrightarrow \text{CONCEPT} \longrightarrow \text{PRACTICE} \longrightarrow \text{PYQ} \longrightarrow \text{MAINS} \longrightarrow \text{DRAFTING} \longrightarrow \text{ESSAY} \longrightarrow \text{MOCK} \longrightarrow \text{REVISION}$$

---

## 🚀 Key Features

### 1. Versioned Syllabus & "What Changed?" Comparison
- Structured under `/data/exams/ro-aro/`:
  - `ro-aro-2026.json` (CURRENT Official Baseline)
  - `ro-aro-2023.json` (ARCHIVED Cycle)
  - `ro-aro-current.json` (Active Pointer & Verified Timestamp)
- Dynamic comparison engine detailing changes in OTR mandates, O-Level equivalence GOs, and evaluation protocols.

### 2. Preliminary Examination Engine (200 Questions / 200 Marks)
- **Paper I: General Studies (140 Questions / 140 Marks / 120 Mins)**
  - General Science (Physics, Chemistry, Biology)
  - History of India (Ancient, Medieval, Modern)
  - High-priority **Indian National Movement (1857-1947)** timeline with UP Connection & PYQs
  - Indian Polity & Constitution (Articles, Amendments, Panchayats)
  - Indian Economy, Commerce & Agriculture
  - Population & Urbanization (Census 2011)
  - World & Indian Geography
  - **Uttar Pradesh Special Knowledge** (ODOP, Culture, History, Geography, Fairs, Expressways)
  - Current National & International Affairs
  - General Intelligence (Reasoning)
- **Paper II: General Hindi (60 Questions / 60 Marks / 60 Mins)**
  - All 6 official syllabus topics: विलोम शब्द, वाक्य एवं वर्तनी शुद्धि, अनेक शब्दों के लिए एक शब्द, तत्सम एवं तद्भव शब्द, विशेष्य एवं विशेषण, पर्यायवाची शब्द.
  - Dedicated 55+ score mastery drills.

### 3. Mains Examination Engine (400 Marks)
- **Paper I: General Studies (120 Questions / 120 Marks)**
- **Paper II: General Hindi & Drafting (160 Marks)**
  - **Part A Conventional (100 Marks):**
    - Passage Précis & Underlined Explanation
    - Tabular Précis Formulation of Government Letters
    - 9 Official Correspondence Formats (Official, D.O., Office Memo, Memo, Circular, Communiqué, Annotation, Report, Reminder)
    - **Drafting Practice Simulator** with automated rule-based structural checking (Heading, Letter No., Subject, Salutation, Body, Subscription, Authority)
    - Administrative & Commercial Terminology (English $\leftrightarrow$ Hindi)
    - Idioms & Phrases (मुहावरे एवं लोकोक्तियाँ)
    - Computer Knowledge (e-Office, DSC, Networking, Cyber Safety)
  - **Part B Objective Vocabulary (60 Marks)**
- **Paper III: Hindi Essay Engine (120 Marks)**
  - 3 Essays $\times$ 40 Marks, 600 words each.
  - Sections A, B, and C with 10-step blueprints, dimensions, quotations, UP perspective, live word counter, timer, and self-evaluation checklists.

### 4. 1,000+ Practice Question Bank & PYQs (2013-2024)
- 1,050+ authentic bilingual questions with full explanations and syllabus mapping.
- Official PYQ explorer with empirical trend analysis.

### 5. Mock Test Simulator & Negative Marking
- Configurable negative marking ($0.33$ / $1/3\text{rd}$).
- Real-time countdown timer, question palette, section switching, and instant detailed scorecard with review.

### 6. Error Notebook ("My Mistakes") & Spaced Repetition
- Automatic tracking of missed questions into a dedicated review notebook.
- Spaced revision schedules ($1, 3, 7, 15, 30$ day intervals) based on the Ebbinghaus forgetting curve.
- Smart Weakness Engine identifying lowest accuracy domains and generating rescue drills.

### 7. Rapid Revision & Interactive Flashcards
- 100/500/1000 high-yield fact drills.
- 3D flip flashcards (Known / Review Later).
- Proven examination elimination tricks.

### 8. Standard Books & NCERT 6-12 Mapping
- Direct chapter-to-syllabus mapping for M. Laxmikanth, Dr. Hardev Bahri, Bipan Chandra, G.C. Leong, Ghatna Chakra, and Class 11-12 NCERTs.
- 100% copyright safe: academic outlines without hosting pirated PDFs.

### 9. Official Notification Center
- Verified recruitment tracking, vacancy statistics (RO 322, ARO 40, etc.), typing criteria (25 wpm Hindi on computer in Kruti Dev 010 / Mangal), and direct links to official UPPSC portals.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS (Dark/Light mode, authoritative saffron/amber & imperial navy palette)
- **Icons**: Lucide React
- **Animations / Effects**: Canvas Confetti
- **State & Storage**: Pure Client-Side React Context + LocalStorage (Zero backend, Zero login required)
- **Deployment**: GitHub Pages via GitHub Actions

---

## 📦 Local Development

```bash
# 1. Clone the repository
git clone https://github.com/your-username/uppsc-ro-aro-master.git
cd uppsc-ro-aro-master

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run typecheck and production build
npm run typecheck
npm run build
```

---

## 🌐 Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In your repository on GitHub, navigate to **Settings** $\to$ **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. The `.github/workflows/deploy.yml` workflow will automatically build and deploy the application to:
   `https://<your-username>.github.io/<repo-name>/`

---

## ⚖️ Official Source Priority & Copyright Notice

Information is verified in strict accordance with the primary sources hierarchy:
$$\text{Official UPPSC Portal} \longrightarrow \text{UP Government Orders} \longrightarrow \text{Standard Academic Sources}$$

All study materials, explanations, practice questions, and drafting templates are originally created for academic guidance. Links to official UPPSC and Government of Uttar Pradesh portals are provided for statutory notices.
