import React, { useState } from 'react';
import { 
  Award, 
  FileText, 
  PenTool, 
  Layers, 
  Languages, 
  Cpu, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import mainsQuestionsData from '../data/mains-questions.json';

interface MainsPageProps {
  onNavigateTab: (tab: string) => void;
  onNavigatePractice: (subject: string, topic?: string) => void;
}

export const MainsPage: React.FC<MainsPageProps> = ({ onNavigateTab, onNavigatePractice }) => {
  const { language } = useApp();
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(mainsQuestionsData[0].id);
  const [userAnswerText, setUserAnswerText] = useState<string>('');
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);
  const [filterPaper, setFilterPaper] = useState<'ALL' | 'GS_PAPER_1' | 'GS_PAPER_2'>('ALL');

  const activeQuestion = mainsQuestionsData.find(q => q.id === selectedQuestionId) || mainsQuestionsData[0];
  const wordCount = userAnswerText.trim().split(/\s+/).filter(Boolean).length;
  const isWordLimitSafe = wordCount <= activeQuestion.wordLimit && wordCount >= (activeQuestion.wordLimit * 0.85);
  const isOverWordLimit = wordCount > activeQuestion.wordLimit;

  const filteredQuestions = filterPaper === 'ALL' 
    ? mainsQuestionsData 
    : mainsQuestionsData.filter(q => q.paper === filterPaper);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner - 800 Marks New Official Pattern */}
      <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                OFFICIAL 2026 REVISED PATTERN (ADVT. A-4/E-1/2026)
              </span>
              <span className="text-[11px] font-bold uppercase px-3 py-1 rounded-full bg-amber-400 text-amber-950">
                800 MARKS CONVENTIONAL
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === 'hi' 
                ? 'उ.प्र. RO/ARO मुख्य (लिखित) परीक्षा प्रणाली — 800 अंक' 
                : 'UPPSC RO/ARO Main Written Examination System — 800 Marks'}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl leading-relaxed">
              {language === 'hi'
                ? 'कुल 4 परम्परागत (वर्णनात्मक) प्रश्नपत्र, प्रत्येक 200 अंक एवं 3 घंटे की समयावधि। अंतिम चयन केवल मुख्य परीक्षा के 800 अंकों की मेरिट पर आधारित है (कोई साक्षात्कार नहीं)।'
                : 'Total 4 Conventional Papers of 200 Marks & 3 Hours each. Final merit purely based on 800 Marks (No Interview).'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab('drafting')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>{language === 'hi' ? 'पेपर-3 आलेखन लैब (200 अंक)' : 'Paper-3 Drafting Lab'}</span>
            </button>
            <button
              onClick={() => onNavigateTab('essay')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <PenTool className="w-4 h-4" />
              <span>{language === 'hi' ? 'पेपर-4 निबंध लैब (200 अंक)' : 'Paper-4 Essay Lab'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Mains Papers Blueprint Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Paper 1: GS-I */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono">
                PAPER I • 200 MARKS
              </span>
              <span className="text-xs text-slate-400 font-mono">3 Hours</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
              {language === 'hi' ? 'सामान्य अध्ययन- प्रथम (वर्णनात्मक)' : 'General Studies - I (Conventional)'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {language === 'hi'
                ? '20 प्रश्न: 10 लघु उत्तरीय (8 अंक / 75 शब्द) + 10 दीर्घ उत्तरीय (12 अंक / 125 शब्द)। इतिहास, संस्कृति, भारतीय समाज, भूगोल, आपदा प्रबंधन एवं विज्ञान-प्रौद्योगिकी।'
                : '20 Questions: 10 Short (8M / 75 words) + 10 Long (12M / 125 words). History, Culture, Society, Geography, Disaster Mgmt & Science-Tech.'}
            </p>
          </div>
          <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 p-2 rounded-lg">
            ✓ 10x8 = 80M + 10x12 = 120M
          </div>
        </div>

        {/* Paper 2: GS-II */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 font-mono">
                PAPER II • 200 MARKS
              </span>
              <span className="text-xs text-slate-400 font-mono">3 Hours</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
              {language === 'hi' ? 'सामान्य अध्ययन- द्वितीय (वर्णनात्मक)' : 'General Studies - II (Conventional)'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {language === 'hi'
                ? '20 प्रश्न: 10 लघु (8 अंक / 75 शब्द) + 10 दीर्घ (12 अंक / 125 शब्द)। राजव्यवस्था, संविधान, शासन व्यवस्था, अर्थव्यवस्था, कृषि, नीतिशास्त्र एवं सत्यनिष्ठा तथा समसामयिकी।'
                : '20 Questions: 10 Short (8M / 75 words) + 10 Long (12M / 125 words). Polity, Governance, Economy, Agriculture, Ethics & Integrity, Current Affairs.'}
            </p>
          </div>
          <div className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-950/30 p-2 rounded-lg">
            ✓ विशेष: नीतिशास्त्र एवं सत्यनिष्ठा
          </div>
        </div>

        {/* Paper 3: General Hindi & Drafting */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-amber-300 dark:border-amber-700/60 p-5 space-y-3 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-mono">
                PAPER III • 200 MARKS
              </span>
              <span className="text-xs text-slate-400 font-mono">3 Hours</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
              {language === 'hi' ? 'सामान्य हिन्दी एवं आलेखन (परम्परागत)' : 'General Hindi & Drafting'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {language === 'hi'
                ? '8 प्रश्न: गद्यांश संक्षेपण (30 अंक), सारणी-रूप (10 अंक), पत्राचार (20 अंक), पारिभाषिक शब्दावली (20 अंक), मुहावरे (30 अंक), व्याकरण व शुद्धि (30 अंक), वर्ण-विचार (10 अंक), संधि/समास (40 अंक), कम्प्यूटर (10 अंक)।'
                : '8 Questions: Passage (30M), Tabular Précis (10M), 9 Correspondence types (20M), Admin Vocab (20M), Muhavare (30M), Grammar (30M), Varn Vichar (10M), Word Groups (40M), Computer (10M).'}
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('drafting')}
            className="w-full py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all text-center"
          >
            {language === 'hi' ? 'आलेखन मॉड्यूल खोलें' : 'Open Drafting Module'}
          </button>
        </div>

        {/* Paper 4: Hindi Essay */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-mono">
                PAPER IV • 200 MARKS
              </span>
              <span className="text-xs text-slate-400 font-mono">3 Hours</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
              {language === 'hi' ? 'हिन्दी निबन्ध (2 निबन्ध)' : 'Hindi Essay (2 Essays)'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {language === 'hi'
                ? 'खण्ड 1 (80 अंक / 800 शब्द): विज्ञान, पर्यावरण, अर्थव्यवस्था, आपदा। खण्ड 2 (120 अंक / 1200 शब्द): साहित्य, संस्कृति, समाज, राजनीति, विकास योजनाएं।'
                : 'Section 1 (80M / 800 words): Science, Environment, Economy, Disasters. Section 2 (120M / 1200 words): Literature, Culture, Society, Polity, National Schemes.'}
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('essay')}
            className="w-full py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-bold transition-all text-center"
          >
            {language === 'hi' ? 'निबंध लैब खोलें' : 'Open Essay Lab'}
          </button>
        </div>
      </div>

      {/* Interactive Mains Answer Writing Simulator (75 words & 125 words) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
                <PenTool className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'मुख्य परीक्षा उत्तर लेखन सिम्युलेटर (75 शब्द एवं 125 शब्द)' : 'Mains Answer Writing Simulator (75 Words & 125 Words)'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'hi'
                ? 'नये आधिकारिक पैटर्न के अनुरूप 8 अंक (75 शब्द) एवं 12 अंक (125 शब्द) के मॉडल प्रश्नों पर उत्तर लिखें एवं मॉडल उत्तर से तुलना करें।'
                : 'Practice descriptive answers strictly within official 75-word (8 marks) and 125-word (12 marks) limits.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-center">
            <button
              onClick={() => setFilterPaper('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterPaper === 'ALL'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterPaper('GS_PAPER_1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterPaper === 'GS_PAPER_1'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              GS Paper 1
            </button>
            <button
              onClick={() => setFilterPaper('GS_PAPER_2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterPaper === 'GS_PAPER_2'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              GS Paper 2
            </button>
          </div>
        </div>

        {/* Question Selector Carousel */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {filteredQuestions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                setSelectedQuestionId(q.id);
                setUserAnswerText('');
                setShowModelAnswer(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border flex items-center space-x-1.5 ${
                selectedQuestionId === q.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
              }`}
            >
              <span className="font-mono text-[10px] opacity-75">Q{idx + 1}.</span>
              <span>{q.subject}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/20">
                {q.marks}M ({q.wordLimit}w)
              </span>
            </button>
          ))}
        </div>

        {/* Active Question Box */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-mono">
                {activeQuestion.paper === 'GS_PAPER_1' ? 'सामान्य अध्ययन- प्रथम' : 'सामान्य अध्ययन- द्वितीय'}
              </span>
              <span className="text-slate-500 font-semibold">• {activeQuestion.subject}</span>
            </div>
            <div className="flex items-center space-x-2 font-mono font-bold">
              <span className="text-amber-600 dark:text-amber-400">पूर्णांक: {activeQuestion.marks} अंक</span>
              <span className="text-slate-400">|</span>
              <span className="text-indigo-600 dark:text-indigo-400">शब्द सीमा: {activeQuestion.wordLimit} शब्द</span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {activeQuestion.question[language]}
          </h3>
        </div>

        {/* Live Writing Workspace */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-600 dark:text-slate-400">
              {language === 'hi' ? 'अपना उत्तर यहां लिखें:' : 'Write your answer here:'}
            </span>
            <div className="flex items-center space-x-3">
              <span className={`font-mono font-bold px-2.5 py-0.5 rounded-full ${
                isOverWordLimit 
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' 
                  : isWordLimitSafe 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {wordCount} / {activeQuestion.wordLimit} शब्द
              </span>
              <button
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
              >
                <span>{showModelAnswer ? (language === 'hi' ? 'मॉडल उत्तर छिपाएं' : 'Hide Model Answer') : (language === 'hi' ? 'मॉडल उत्तर देखें' : 'View Model Answer')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <textarea
            value={userAnswerText}
            onChange={(e) => setUserAnswerText(e.target.value)}
            placeholder={language === 'hi' 
              ? `अपना उत्तर सीधे यहां टाइप करें (लक्ष्य: ${activeQuestion.wordLimit} शब्द)... संरचना: प्रस्तावना (परिभाषा/तथ्य), मुख्य भाग (बुलेट बिंदु/आरेख), दूरगामी निष्कर्ष।` 
              : `Type your answer here (Target: ${activeQuestion.wordLimit} words)... Structure: Intro, Body points with data/example, Forward-looking conclusion.`}
            rows={7}
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-hindi"
          />

          {isOverWordLimit && (
            <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center space-x-1">
              <span>⚠️ चेतावनी: आप शब्द सीमा ({activeQuestion.wordLimit} शब्द) पार कर चुके हैं। मुख्य परीक्षा में शब्द सीमा का उल्लंघन करने पर अंक काटे जाते हैं।</span>
            </p>
          )}
        </div>

        {/* Model Answer & Evaluation Rubric */}
        {showModelAnswer && (
          <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-200/60 dark:border-indigo-900/40">
              <div className="flex items-center space-x-2 text-indigo-900 dark:text-indigo-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{language === 'hi' ? 'आधिकारिक मानक मॉडल उत्तर (Model Answer)' : 'Standard Model Answer'}</span>
              </div>
              <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                शब्द संख्या: ~{activeQuestion.wordLimit} शब्द
              </span>
            </div>

            <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed font-hindi bg-white/70 dark:bg-slate-900/70 p-4 rounded-xl border border-indigo-100 dark:border-indigo-950">
              {activeQuestion.modelAnswer[language]}
            </div>

            {/* Examiner's Rubric */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {language === 'hi' ? 'मूल्यांकनकर्ता की चेकलिस्ट (Examiner Rubric):' : 'Examiner Evaluation Rubric:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeQuestion.examinerRubric.map((rule, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-white/60 dark:bg-slate-900/50 border border-indigo-100 dark:border-indigo-900/40 text-[11px] text-slate-700 dark:text-slate-300 flex items-start space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
