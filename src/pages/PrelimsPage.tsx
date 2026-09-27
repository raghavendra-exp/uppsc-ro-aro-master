import React from 'react';
import { 
  Target, 
  BookOpen, 
  Languages, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Flame,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import subjectsData from '../data/subjects.json';

interface PrelimsPageProps {
  onNavigatePractice: (subject: string, topic?: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const PrelimsPage: React.FC<PrelimsPageProps> = ({ onNavigatePractice, onNavigateTab }) => {
  const { language, activeVersion } = useApp();

  const hindiModules = [
    { id: 'hindi-vilom', name: { hi: '1. विलोम शब्द (10 प्रश्न / 10 अंक)', en: '1. Antonyms (10 Qs / 10 Marks)' }, count: 150 },
    { id: 'hindi-vakya-shuddhi', name: { hi: '2. वाक्य एवं वर्तनी शुद्धि (10 प्रश्न / 10 अंक)', en: '2. Sentence & Spelling Correction (10 Qs)' }, count: 60 },
    { id: 'hindi-anek-shabd', name: { hi: '3. अनेक शब्दों के लिए एक शब्द (10 प्रश्न / 10 अंक)', en: '3. One Word Substitution (10 Qs)' }, count: 80 },
    { id: 'hindi-tatsam-tadbhav', name: { hi: '4. तत्सम एवं तद्भव शब्द (10 प्रश्न / 10 अंक)', en: '4. Tatsam & Tadbhav (10 Qs / 10 Marks)' }, count: 100 },
    { id: 'hindi-visheshya-visheshan', name: { hi: '5. विशेष्य और विशेषण (10 प्रश्न / 10 अंक)', en: '5. Noun-Adjective Relation (10 Qs)' }, count: 70 },
    { id: 'hindi-paryayvachi', name: { hi: '6. पर्यायवाची शब्द (10 प्रश्न / 10 अंक)', en: '6. Synonyms (10 Qs / 10 Marks)' }, count: 90 }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/20 text-amber-200">
              STAGE 1 • PRELIMINARY EXAMINATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
              {language === 'hi' ? 'उत्तर प्रदेश RO/ARO प्रारंभिक परीक्षा' : 'UPPSC RO/ARO Preliminary Examination'}
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 mt-1 max-w-2xl leading-relaxed">
              {language === 'hi'
                ? 'कुल 200 प्रश्न • 200 अंक • 3 घंटे। 1/3 (0.33) ऋणात्मक अंकन। पेपर 1: 140 सामान्य अध्ययन + पेपर 2: 60 सामान्य हिन्दी।'
                : 'Total 200 Qs • 200 Marks • 3 Hours. 1/3 Negative Marking. Paper 1: 140 GS + Paper 2: 60 Hindi.'}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onNavigateTab('mocks')}
              className="px-4 py-2.5 rounded-xl bg-white text-amber-800 font-bold text-xs sm:text-sm shadow-md hover:bg-amber-50 transition-all flex items-center space-x-1.5"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>{language === 'hi' ? '200 प्रश्न प्रीलिम्स मॉक दें' : 'Take 200-Q Prelims Mock'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: Paper II General Hindi 60 Marks Core (Crucial Winning Area) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                <Languages className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'द्वितीय प्रश्नपत्र: सामान्य हिन्दी (60 प्रश्न / 60 अंक)' : 'Paper II: General Hindi (60 Qs / 60 Marks)'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'hi' ? 'कट-ऑफ पार करने की सबसे अचूक कुंजी: लक्ष्य 55+ अंक!' : 'The single highest-ROI paper: Target 55+ Marks!'}
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            60 Mins • 6 Modules (10 Qs Each)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {hindiModules.map(m => (
            <div
              key={m.id}
              onClick={() => onNavigatePractice('General Hindi', m.name.en)}
              className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                  10 Questions • 10 Marks
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mt-2 font-hindi">
                  {m.name[language]}
                </h3>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <span>{language === 'hi' ? 'अभ्यास करें' : 'Practice Drill'}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Paper I General Studies 140 Marks Subjects */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                <Target className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'प्रथम प्रश्नपत्र: सामान्य अध्ययन (140 प्रश्न / 140 अंक / 120 मिनट)' : 'Paper I: General Studies (140 Qs / 140 Marks / 120 Mins)'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'hi' ? '10 विषय खंड: इतिहास, INM, UP GK, राजव्यवस्था, भूगोल, विज्ञान, पर्यावरण' : '10 Subject Domains: History, INM, UP GK, Polity, Geography, Science'}
            </p>
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
            1/3 Negative Marking Applied
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectsData.filter(s => s.prelimsQuestionsAvg > 0 && s.id !== 'general-hindi').map(sub => (
            <div
              key={sub.id}
              onClick={() => onNavigatePractice(sub.title.en)}
              className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                    ~{sub.prelimsQuestionsAvg} {language === 'hi' ? 'प्रश्न वेटेज' : 'Questions'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {sub.title[language]}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {sub.description[language]}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400">
                <span>{language === 'hi' ? 'विषयवार प्रश्न हल करें' : 'Practice Questions'}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
