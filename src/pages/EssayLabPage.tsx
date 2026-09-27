import React, { useState, useEffect } from 'react';
import { 
  PenTool, 
  BookOpen, 
  Sparkles, 
  Clock, 
  Save, 
  CheckSquare, 
  AlertCircle, 
  Shuffle, 
  ChevronRight,
  TrendingUp,
  Landmark,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import essayTopicsData from '../data/essay-topics.json';
import { EssayTopic } from '../types';

export const EssayLabPage: React.FC = () => {
  const { language, saveEssayAttempt, progress } = useApp();
  const [selectedTopicId, setSelectedTopicId] = useState<string>('essay-cat-a-01');
  const [essayText, setEssayText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'framework' | 'writing' | 'my-essays'>('framework');
  
  // Timer state (60 minutes practice per essay)
  const [timerSeconds, setTimerSeconds] = useState<number>(3600);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const activeTopic = essayTopicsData.find(e => e.id === selectedTopicId) || essayTopicsData[0];

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;

  const handleSave = () => {
    saveEssayAttempt(activeTopic.id, essayText, wordCount);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleRandomTopic = () => {
    const randomIdx = Math.floor(Math.random() * essayTopicsData.length);
    setSelectedTopicId(essayTopicsData[randomIdx].id);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
              <PenTool className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'मुख्य परीक्षा 600 शब्द हिन्दी निबंध लैब' : 'Mains 600-Word Hindi Essay Lab'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? 'तृतीय प्रश्नपत्र (120 अंक): 3 निबंध x 40 अंक (शब्द सीमा 600 शब्द प्रत्येक)। वैचारिक संरचना, आंकड़े व उत्तर प्रदेश परिप्रेक्ष्य।'
              : 'Paper III (120 Marks): 3 Essays x 40 Marks (600 Words each). Comprehensive dimensional frameworks & UP context.'}
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center space-x-1.5 self-start sm:self-center">
          <button
            onClick={handleRandomTopic}
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-500" />
            <span>{language === 'hi' ? 'रैंडम विषय' : 'Random Topic'}</span>
          </button>

          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('framework')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'framework'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {language === 'hi' ? 'वैचारिक ढांचा' : 'Essay Blueprint'}
            </button>
            <button
              onClick={() => setActiveTab('writing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'writing'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {language === 'hi' ? 'लेखन अभ्यास (600 शब्द)' : 'Write 600 Words'}
            </button>
          </div>
        </div>
      </div>

      {/* Topic Selector Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {essayTopicsData.map(topic => {
          const isSelected = topic.id === selectedTopicId;
          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {topic.title[language]}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Comprehensive Essay Learning Framework */}
      {activeTab === 'framework' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-6">
          {/* Topic Title Header */}
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
              {activeTopic.categoryLabel[language]}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1 font-hindi">
              "{activeTopic.title[language]}"
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              <strong className="text-slate-800 dark:text-slate-200">विषय की मूल समझ:</strong> {activeTopic.understanding[language]}
            </p>
          </div>

          {/* Quotations & Keywords Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs space-y-2">
              <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{language === 'hi' ? 'सटीक उद्धरण / पंक्तियां (Quotations):' : 'Quotations & Invocations:'}</span>
              </span>
              <ul className="space-y-1.5 italic text-slate-700 dark:text-slate-300 font-hindi">
                {activeTopic.quotations.map((q, idx) => (
                  <li key={idx} className="leading-relaxed">"{q}"</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 text-xs space-y-2">
              <span className="font-bold text-indigo-900 dark:text-indigo-300">
                {language === 'hi' ? 'अनिवार्य की-वर्ड्स (Keywords):' : 'Key Terminology:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeTopic.keywords.map((kw, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 font-medium border border-indigo-200 dark:border-indigo-800">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 10-Step Essay Construction Blueprint (Requirement #27) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {language === 'hi' ? '10-चरणीय निबंध निर्माण ढांचा (Step-by-Step Blueprint)' : '10-Step Essay Architecture'}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              {/* 1. Introduction Framework */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <span className="font-bold text-indigo-700 dark:text-indigo-400">1. प्रस्तावना (Introduction ~70-80 शब्द):</span>
                <ul className="mt-1 space-y-1 pl-4 list-disc text-slate-700 dark:text-slate-300">
                  {activeTopic.introductionFramework.map((it, idx) => (
                    <li key={idx}>{it[language]}</li>
                  ))}
                </ul>
              </div>

              {/* 2. Dimensions */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                <span className="font-bold text-indigo-700 dark:text-indigo-400">2. बहुआयामी विश्लेषण (Dimensions ~250 शब्द):</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {activeTopic.dimensions.map((dim, dIdx) => (
                    <div key={dIdx} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <strong className="text-slate-800 dark:text-slate-200 block mb-1">{dim.dimension[language]}</strong>
                      {dim.points.map((pt, pIdx) => (
                        <p key={pIdx} className="text-slate-600 dark:text-slate-400 text-xs">{pt[language]}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Facts & Govt Initiatives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                  <span className="font-bold text-indigo-700 dark:text-indigo-400">3. सरकारी योजनाएं एवं नीतियां:</span>
                  <ul className="mt-1 space-y-1 pl-4 list-disc text-slate-700 dark:text-slate-300 text-xs">
                    {activeTopic.govtInitiatives.map((gi, idx) => (
                      <li key={idx}>{gi[language]}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20">
                  <span className="font-bold text-amber-800 dark:text-amber-400 flex items-center space-x-1">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>4. उत्तर प्रदेश परिप्रेक्ष्य (UP Perspective):</span>
                  </span>
                  <ul className="mt-1 space-y-1 pl-4 list-disc text-slate-700 dark:text-slate-300 text-xs">
                    {activeTopic.upPerspective.map((up, idx) => (
                      <li key={idx}>{up[language]}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4. Way Forward & Conclusion */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <span className="font-bold text-indigo-700 dark:text-indigo-400">5. समाधानपरक आगे की राह एवं उपसंहार (Way Forward & Conclusion ~100 शब्द):</span>
                <p className="mt-1 text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                  {activeTopic.conclusionFramework[0][language]}
                </p>
              </div>
            </div>
          </div>

          {/* Self-Evaluation Checklist */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <span className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'स्व-मूल्यांकन चेकलिस्ट:' : 'Self-Evaluation Checklist:'}</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeTopic.checklist.map((chk, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                  <input type="checkbox" className="rounded text-indigo-600 focus:ring-0" />
                  <span>{chk[language]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive 600-word Writing Box with Word Counter & Timer */}
      {activeTab === 'writing' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                {language === 'hi' ? '600 शब्द निबंध लेखन सिमुलेटर' : '600-Word Essay Simulator'}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-hindi">
                "{activeTopic.title[language]}"
              </h2>
            </div>

            {/* Word Counter & Live Timer */}
            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center space-x-1.5 ${
                wordCount > 650 
                  ? 'border-rose-400 text-rose-600 bg-rose-50 dark:bg-rose-950/40' 
                  : wordCount >= 550 
                  ? 'border-emerald-400 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' 
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                <span>{wordCount} / 600 {language === 'hi' ? 'शब्द' : 'words'}</span>
              </div>

              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{formatTimer(timerSeconds)}</span>
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="text-[10px] uppercase font-semibold text-indigo-600 dark:text-indigo-400 ml-1 hover:underline"
                >
                  {timerRunning ? 'PAUSE' : 'START'}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Writing Area */}
          <textarea
            rows={18}
            value={essayText}
            onChange={e => setEssayText(e.target.value)}
            placeholder={language === 'hi' 
              ? "निबंध की शुरुआत एक प्रासंगिक सूक्ति या कविता की पंक्ति से करें...\n\nप्रस्तावना:\n...\n\nमुख्य भाग (आर्थिक, सामाजिक, तकनीकी, राजनीतिक आयाम):\n...\n\nउत्तर प्रदेश का संदर्भ एवं सरकारी नीतियां:\n...\n\nनिष्कर्ष:" 
              : "Commence your 600-word essay following introduction, dimensions, UP perspective and visionary conclusion..."}
            className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 font-hindi"
          />

          {/* Footer action buttons */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              {wordCount < 500 && (language === 'hi' ? 'आदर्श शब्द सीमा 550 से 650 शब्द है।' : 'Ideal length is 550 to 650 words.')}
              {wordCount >= 550 && wordCount <= 650 && (language === 'hi' ? 'उत्कृष्ट! शब्द सीमा संतुलित है।' : 'Optimal length achieved.')}
              {wordCount > 650 && (language === 'hi' ? 'सावधान: शब्द सीमा 600 शब्द से अधिक हो रही है।' : 'Warning: Exceeding 600 words target.')}
            </span>

            <div className="flex items-center space-x-2">
              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {language === 'hi' ? 'निबंध सहेजा गया!' : 'Essay Saved!'}
                </span>
              )}
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{language === 'hi' ? 'प्रगति सहेजें (Save Locally)' : 'Save Essay'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
