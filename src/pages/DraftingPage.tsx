import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  Save, 
  Languages, 
  Table, 
  CheckSquare, 
  RotateCcw,
  ArrowRight,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import draftingData from '../data/drafting.json';
import adminVocabData from '../data/admin-vocab.json';

export const DraftingPage: React.FC = () => {
  const { language, saveDraftAttempt, progress } = useApp();
  const [activeTab, setActiveTab] = useState<'correspondence' | 'simulator' | 'vocab' | 'idioms'>('correspondence');
  const [selectedDocId, setSelectedDocId] = useState<string>('draft-official-letter');
  
  // Simulator state
  const [userText, setUserText] = useState('');
  const [evalResult, setEvalResult] = useState<{ score: number; feedback: string[]; passed: boolean } | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [vocabSearch, setVocabSearch] = useState('');

  const activeDoc = draftingData.find(d => d.id === selectedDocId) || draftingData[0];

  // Rule-based Structural Evaluator (Requirement #35)
  const handleEvaluate = () => {
    const text = userText.trim();
    if (!text || text.length < 50) {
      setEvalResult({
        score: 0,
        feedback: [
          language === 'hi'
            ? 'कृपया पत्र का प्रारूप पर्याप्त शब्दों में लिखें (न्यूनतम 50 शब्द)।'
            : 'Please write substantial content (minimum 50 words).'
        ],
        passed: false
      });
      return;
    }

    const checks: { label: string; pass: boolean }[] = [];

    // 1. Heading / Letter No. Check
    const hasNumber = /संख्या|सं\.|पत्रांक|no\./i.test(text);
    checks.push({
      label: language === 'hi' ? 'पत्र संख्या अथवा पत्रांक अंकित है' : 'Contains Letter / Dispatch Number',
      pass: hasNumber
    });

    // 2. Date and Place Check
    const hasDate = /दिनांक|तिथि|लखनऊ|प्रयागराज|date/i.test(text);
    checks.push({
      label: language === 'hi' ? 'स्थान एवं दिनांक का उल्लेख है' : 'Mentions Place and Date',
      pass: hasDate
    });

    // 3. Subject Line Check
    const hasSubject = /विषय|subject/i.test(text);
    checks.push({
      label: language === 'hi' ? 'विषय स्पष्टतः रेखांकित/उल्लिखित है' : 'Subject line is explicitly formulated',
      pass: hasSubject
    });

    // 4. Salutation / Specific Protocol Check
    if (activeDoc.slug === 'office-memorandum') {
      // In OM, 'महोदय' is prohibited!
      const hasProhibitedSir = /महोदय|sir/i.test(text);
      checks.push({
        label: language === 'hi' ? 'कार्यालय ज्ञाप में महोदय वर्जित है (सफलतापूर्वक पालन किया गया)' : 'No salutation used in Office Memorandum (Correct)',
        pass: !hasProhibitedSir
      });
    } else if (activeDoc.slug === 'demi-official-letter') {
      const hasDear = /प्रिय श्री|प्रिय|dear/i.test(text);
      checks.push({
        label: language === 'hi' ? 'अर्धशासकीय पत्र में "प्रिय श्री..." का प्रयोग है' : 'Uses cordial salutation "प्रिय श्री..."',
        pass: hasDear
      });
    } else {
      const hasSir = /महोदय|महोदया|sir/i.test(text);
      checks.push({
        label: language === 'hi' ? 'शासकीय पत्र में "महोदय" संबोधन उपस्थित है' : 'Formal salutation "महोदय" present',
        pass: hasSir
      });
    }

    // 5. Subscription Check
    if (activeDoc.slug === 'office-memorandum') {
      const hasBhavdiya = /भवदीय/i.test(text);
      checks.push({
        label: language === 'hi' ? 'कार्यालय ज्ञाप में "भवदीय" का प्रयोग नहीं किया गया (सही)' : 'No subscription "भवदीय" in O.M. (Correct)',
        pass: !hasBhavdiya
      });
    } else if (activeDoc.slug === 'demi-official-letter') {
      const hasAapka = /आपका|सद्भावनाओं सहित|शुभकामनाओं/i.test(text);
      checks.push({
        label: language === 'hi' ? 'अर्धशासकीय पत्र में "आपका / सद्भावनाओं सहित" प्रयुक्त है' : 'Uses "सद्भावनाओं सहित, आपका"',
        pass: hasAapka
      });
    } else {
      const hasBhavdiya = /भवदीय/i.test(text);
      checks.push({
        label: language === 'hi' ? 'शासकीय पत्र में "भवदीय" का प्रयोग हुआ है' : 'Contains formal subscription "भवदीय"',
        pass: hasBhavdiya
      });
    }

    // 6. Authority Signature/Designation Check
    const hasAuthority = /हस्ताक्षर|सचिव|अधिकारी|विशेष सचिव|प्रमुख सचिव|क\.ख\.ग\./i.test(text);
    checks.push({
      label: language === 'hi' ? 'हस्ताक्षर एवं पदनाम का ढांचा बना है' : 'Signature and designation block present',
      pass: hasAuthority
    });

    const passedCount = checks.filter(c => c.pass).length;
    const finalScore = Math.round((passedCount / checks.length) * activeDoc.marks);

    setEvalResult({
      score: finalScore,
      feedback: checks.map(c => `${c.pass ? '✅' : '❌'} ${c.label}`),
      passed: passedCount >= checks.length - 1
    });

    // Save attempt in progress
    saveDraftAttempt(activeDoc.id, text, finalScore);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Filtered vocabulary
  const filteredVocab = adminVocabData.terms.filter(t => {
    const q = vocabSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      t.english.toLowerCase().includes(q) ||
      t.hindi.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'समीक्षा अधिकारी आलेखन एवं पत्राचार लैब' : 'Official Drafting & Correspondence Lab'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? 'मुख्य परीक्षा द्वितीय प्रश्नपत्र (100 अंक खंड क + 60 अंक खंड ख): पत्र प्रारूप, सारणी रूप, प्रशासनिक शब्दावली'
              : 'Mains Paper II: 9 Official letter types, Tabular Précis, Rule-based Validator & Admin Vocab'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto scrollbar-none self-start sm:self-center">
          {[
            { id: 'correspondence', label: { hi: 'पत्राचार पुस्तकालय', en: 'Letter Formats' } },
            { id: 'simulator', label: { hi: 'आलेखन सिमुलेटर', en: 'Writing Simulator' } },
            { id: 'vocab', label: { hi: 'प्रशासनिक शब्दावली', en: 'Admin Vocab' } },
            { id: 'idioms', label: { hi: 'मुहावरे व लोकोक्तियाँ', en: 'Idioms' } }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Official Correspondence Library */}
      {activeTab === 'correspondence' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Doc List Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {language === 'hi' ? 'पत्र प्रारूप एवं सारणी रूप' : 'Official Correspondence Types'}
            </h3>
            {draftingData.map(doc => {
              const isSelected = doc.id === selectedDocId;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 text-rose-950 dark:text-rose-100 ring-1 ring-rose-400'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{doc.hindiName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                      {doc.marks} {language === 'hi' ? 'अंक' : 'Marks'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {doc.purpose[language]}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Doc Detailed View */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {activeDoc.title[language]} ({activeDoc.hindiName})
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {activeDoc.purpose[language]}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('simulator');
                    setUserText('');
                    setEvalResult(null);
                  }}
                  className="self-start sm:self-center px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors flex items-center space-x-1 shrink-0"
                >
                  <span>{language === 'hi' ? 'इस प्रारूप पर अभ्यास करें' : 'Practice this Draft'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Format Rules Guide */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center space-x-1.5">
                  <CheckSquare className="w-4 h-4" />
                  <span>{language === 'hi' ? 'संरचना एवं प्रमुख नियम (Format Guidelines)' : 'Format Guidelines'}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {language === 'hi' ? 'शीर्ष भाग (Heading):' : 'Heading:'}
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {activeDoc.formatGuide.heading[language]}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {language === 'hi' ? 'संबोधन व अधोलेख:' : 'Salutation & Subscription:'}
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {activeDoc.formatGuide.salutation ? activeDoc.formatGuide.salutation[language] : 'संबोधन वर्जित'} • {activeDoc.formatGuide.subscription[language]}
                    </p>
                  </div>
                </div>

                {/* Common Pitfalls Warning */}
                <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs space-y-1.5">
                  <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>{language === 'hi' ? 'सामान्य गलतियां (सावधानी बरतें):' : 'Common Exam Traps:'}</span>
                  </span>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300 pl-4 list-disc">
                    {activeDoc.commonMistakes.map((m, idx) => (
                      <li key={idx}>{m[language]}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Model Answer Preview */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {activeDoc.modelDraft.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Official Secretariat Standard
                  </span>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs whitespace-pre-wrap leading-relaxed overflow-x-auto border border-slate-800 max-h-96">
                  {activeDoc.modelDraft.hindiContent}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Drafting Simulator with Rule-based Evaluator */}
      {activeTab === 'simulator' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                {language === 'hi' ? 'आलेखन अभ्यास सिमुलेटर' : 'Drafting Practice Simulator'}
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {activeDoc.hindiName} ({activeDoc.title.en})
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400">
                {userText.trim().split(/\s+/).filter(Boolean).length} {language === 'hi' ? 'शब्द' : 'words'}
              </span>
            </div>
          </div>

          {/* Practice Prompt Task */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'hi' ? 'अभ्यास प्रश्न / टास्क:' : 'Drafting Prompt / Task:'}</span>
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-hindi">
              {activeDoc.practiceTask.prompt[language]}
            </p>
          </div>

          {/* Interactive Writing Textarea */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'hi' ? 'अपना आलेखन यहां लिखें:' : 'Write your draft here:'}
            </label>
            <textarea
              rows={12}
              value={userText}
              onChange={e => setUserText(e.target.value)}
              placeholder={language === 'hi'
                ? "संख्या: ...\nप्रेषक, ...\nसेवा में, ...\nविषय: ...\n\nमहोदय,\nमुझे यह कहने का निदेश हुआ है कि...\n\nभवदीय,\n(क.ख.ग.)"
                : "Enter formal draft following the structural protocol..."}
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => setUserText(activeDoc.modelDraft.hindiContent)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              {language === 'hi' ? 'आदर्श प्रारूप लोड करें' : 'Load Model Template'}
            </button>

            <div className="flex items-center space-x-2">
              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {language === 'hi' ? 'प्रगति सहेजी गई!' : 'Attempt Saved!'}
                </span>
              )}
              <button
                onClick={handleEvaluate}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center space-x-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{language === 'hi' ? 'संरचना की जांच करें (Evaluate)' : 'Evaluate Structure'}</span>
              </button>
            </div>
          </div>

          {/* Evaluation Results Card */}
          {evalResult && (
            <div className={`p-5 rounded-2xl border transition-all space-y-3 ${
              evalResult.passed
                ? 'bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                : 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {language === 'hi' ? 'संरचनात्मक मूल्यांकन रिपोर्ट' : 'Structural Evaluation Report'}
                </span>
                <span className="font-extrabold text-sm sm:text-base font-mono text-rose-700 dark:text-rose-400">
                  {language === 'hi' ? 'प्राप्तांक:' : 'Score:'} {evalResult.score} / {activeDoc.marks}
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                {evalResult.feedback.map((f, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                * {language === 'hi' 
                  ? 'यह स्वचालन सचिवालय नियमावली के आवश्यक घटकों (Heading, Subject, Salutation, Body, Subscription, Authority) का सत्यापन करता है।' 
                  : 'Automated evaluation verifies essential structural elements as per Secretariat manual.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Administrative Vocabulary (English <-> Hindi) */}
      {activeTab === 'vocab' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'प्रशासनिक एवं वाणिज्यिक शब्दावली' : 'Administrative & Commercial Terminology'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'hi' ? 'मुख्य परीक्षा पेपर-2 खंड 1 (20 अंक - अंग्रेजी से हिन्दी एवं हिन्दी से अंग्रेजी)' : 'Mains Paper 2 Part 1: 20 Marks translation terminology'}
              </p>
            </div>
            {/* Search filter */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={vocabSearch}
                onChange={e => setVocabSearch(e.target.value)}
                placeholder={language === 'hi' ? 'शब्द खोजें (उदा. Affidavit)...' : 'Search term...'}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredVocab.map(term => (
              <div 
                key={term.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-2 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {term.english}
                    </h4>
                    <div className="text-sm font-bold text-rose-700 dark:text-rose-400 font-hindi">
                      {term.hindi}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                    {term.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {term.meaning[language]}
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">प्रयोग:</span> {term.usageExample[language]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Idioms & Phrases */}
      {activeTab === 'idioms' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'मुहावरे एवं लोकोक्तियाँ (10 अंक)' : 'Hindi Idioms & Phrases (10 Marks)'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'hi' ? 'अर्थ, प्रामाणिक वाक्य प्रयोग एवं विगत वर्षों में पूछे गए प्रश्न' : 'Meaning, sentence usage and PYQ reference'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {adminVocabData.idioms.map(item => (
              <div 
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-2 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-hindi">
                    {item.phrase}
                  </h4>
                  {item.pyqYear && (
                    <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded font-semibold">
                      {item.pyqYear}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-rose-600 dark:text-rose-400">अर्थ:</span> {item.meaning[language]}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 pl-2 border-l-2 border-slate-200 dark:border-slate-700">
                  <span className="font-semibold">वाक्य प्रयोग:</span> {item.usage[language]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
