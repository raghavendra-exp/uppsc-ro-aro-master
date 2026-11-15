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
  Share2, 
  Award, 
  Layers,
  Search,
  FileCheck2,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import essayTopicsData from '../data/essay-topics.json';
import { EssayTopic } from '../types';

export const EssayLabPage: React.FC = () => {
  const { language, saveEssayAttempt, progress } = useApp();
  const [selectedSection, setSelectedSection] = useState<'SECTION_1_800W' | 'SECTION_2_1200W'>('SECTION_1_800W');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('essay-sec1-science-01');
  const [essayText, setEssayText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'framework' | 'model-essay' | 'writing'>('framework');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedModel, setCopiedModel] = useState<boolean>(false);
  
  // Timer state (90 minutes practice per essay for 3-hour 2-essay exam)
  const [timerSeconds, setTimerSeconds] = useState<number>(5400);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const sectionTopics = essayTopicsData.filter(e => {
    const matchesSection = (e as any).mainsSection === selectedSection;
    if (!searchQuery.trim()) return matchesSection;
    const q = searchQuery.toLowerCase();
    const titleMatch = e.title.hi.toLowerCase().includes(q) || e.title.en.toLowerCase().includes(q);
    const domainMatch = ((e as any).domain || '').toLowerCase().includes(q);
    const keywordMatch = (e.keywords || []).some(k => k.toLowerCase().includes(q));
    return matchesSection && (titleMatch || domainMatch || keywordMatch);
  });

  const activeTopic = essayTopicsData.find(e => e.id === selectedTopicId) || sectionTopics[0] || essayTopicsData[0];
  const targetWordCount = activeTopic.wordCountLimit || (selectedSection === 'SECTION_1_800W' ? 800 : 1200);

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
  const isWordLimitNear = wordCount >= (targetWordCount * 0.85) && wordCount <= targetWordCount;
  const isOverWordLimit = wordCount > targetWordCount;

  const handleSave = () => {
    saveEssayAttempt(activeTopic.id, essayText, wordCount);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleRandomTopic = () => {
    if (sectionTopics.length === 0) return;
    const randomIdx = Math.floor(Math.random() * sectionTopics.length);
    setSelectedTopicId(sectionTopics[randomIdx].id);
  };

  const handleCopyModel = () => {
    if (!activeTopic.modelEssay) return;
    navigator.clipboard.writeText(activeTopic.modelEssay[language]);
    setCopiedModel(true);
    setTimeout(() => setCopiedModel(false), 2500);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
              <PenTool className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'मुख्य परीक्षा हिन्दी निबन्ध लैब (प्रश्नपत्र-4 • 200 अंक)' : 'Mains Hindi Essay Lab (Paper IV • 200 Marks)'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? 'आधिकारिक 2026 पैटर्न: 2 अनिवार्य निबन्ध (खण्ड 1: 80 अंक / 800 शब्द + खण्ड 2: 120 अंक / 1200 शब्द), कुल 3 घंटे। 20 विस्तृत प्रत्याशित विषय व आदर्श मॉडल निबन्ध।'
              : 'Official 2026 Pattern: 2 Mandatory Essays (Section 1: 80M / 800w + Section 2: 120M / 1200w), 3 Hours. 20 expected topics with full model essays.'}
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-center">
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
              {language === 'hi' ? 'वैचारिक रूपरेखा' : 'Blueprint'}
            </button>
            <button
              onClick={() => setActiveTab('model-essay')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
                activeTab === 'model-essay'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{language === 'hi' ? 'मॉडल पूर्ण निबन्ध' : 'Model Essay'}</span>
            </button>
            <button
              onClick={() => setActiveTab('writing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'writing'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {language === 'hi' ? `लेखन अभ्यास` : `Write`}
            </button>
          </div>
        </div>
      </div>

      {/* Official 2-Tier Section Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => {
            setSelectedSection('SECTION_1_800W');
            const match = essayTopicsData.find(e => (e as any).mainsSection === 'SECTION_1_800W');
            if (match) setSelectedTopicId(match.id);
          }}
          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
            selectedSection === 'SECTION_1_800W'
              ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                प्रथम खण्ड (SECTION 1)
              </span>
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                80 अंक • 800 शब्द
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              {language === 'hi' ? 'विज्ञान, पर्यावरण, अर्थव्यवस्था, कृषि एवं प्राकृतिक आपदाएं' : 'Science, Env, Economy, Agri & Disasters'}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              {language === 'hi' 
                ? '4 विनिर्दिष्ट क्षेत्रों में से 1 विषय पर 800 शब्दों में संतुलित विश्लेषणात्मक निबंध।'
                : '1 essay out of 4 domains in 800 words.'}
            </p>
          </div>
        </button>

        <button
          onClick={() => {
            setSelectedSection('SECTION_2_1200W');
            const match = essayTopicsData.find(e => (e as any).mainsSection === 'SECTION_2_1200W');
            if (match) setSelectedTopicId(match.id);
          }}
          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
            selectedSection === 'SECTION_2_1200W'
              ? 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                द्वितीय खण्ड (SECTION 2)
              </span>
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                120 अंक • 1200 शब्द
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              {language === 'hi' ? 'साहित्य, संस्कृति, सामाजिक-राजनीतिक, अंतर्राष्ट्रीय एवं योजनाएं' : 'Literature, Culture, Polity, Global Affairs & Schemes'}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              {language === 'hi' 
                ? '4 विनिर्दिष्ट क्षेत्रों में से 1 विषय पर 1200 शब्दों में गहन वैचारिक एवं बहु-आयामी निबंध।'
                : '1 essay out of 4 domains in 1200 words.'}
            </p>
          </div>
        </button>
      </div>

      {/* Search & Topic Selector Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'निबंध विषय खोजें (जैसे एआई, पर्यटन, महिला, न्याय, साहित्य)...' : 'Search essay topics...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {sectionTopics.length} {language === 'hi' ? 'प्रत्याशित विषय उपलब्ध' : 'Topics Available'}
          </span>
        </div>

        {/* Topic Selector Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {sectionTopics.map(topic => {
            const hasModel = !!(topic as any).modelEssay;
            const isSelected = selectedTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <span>{topic.title[language]}</span>
                {hasModel && (
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-400 dark:bg-emerald-600' : 'bg-emerald-500'}`} title="मॉडल निबंध उपलब्ध" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Structural Essay Blueprint */}
      {activeTab === 'framework' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 space-y-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                  {(activeTopic as any).domain || (activeTopic as any).categoryLabel?.[language]}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {activeTopic.title[language]}
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                  {activeTopic.marks || (selectedSection === 'SECTION_1_800W' ? 80 : 120)} अंक
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  लक्ष्य: {targetWordCount} शब्द
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-hindi border border-slate-200/80 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-white block mb-1">विषय की वैचारिक अंतर्दृष्टि (Understanding):</strong> 
              {activeTopic.understanding[language]}
            </div>

            {/* Dimensional Points Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {activeTopic.dimensions.map((dim, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50/40 dark:bg-slate-800/20">
                  <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{dim.dimension[language]}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-hindi">
                    {dim.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start space-x-2">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{pt[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* UP Perspective Box */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2">
              <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Landmark className="w-4 h-4" />
                <span>{language === 'hi' ? 'उत्तर प्रदेश विशिष्ट परिप्रेक्ष्य (UP Perspective)' : 'Uttar Pradesh Specific Context'}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-950 dark:text-amber-200 font-hindi">
                {activeTopic.upPerspective.map((up, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="font-bold text-emerald-600">✓</span>
                    <span>{up[language]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quotations */}
            {activeTopic.quotations && activeTopic.quotations.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {language === 'hi' ? 'उपयोगी उद्धरण एवं सूक्तियां (Quotations):' : 'Key Quotations:'}
                </h4>
                <div className="space-y-2">
                  {activeTopic.quotations.map((q, idx) => (
                    <blockquote key={idx} className="text-xs sm:text-sm italic text-indigo-900 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/20 p-3 rounded-xl border-l-4 border-indigo-500 font-hindi">
                      "{q}"
                    </blockquote>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Full Model Essay */}
      {activeTab === 'model-essay' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  आदर्श मॉडल निबन्ध (Official Model Exemplar)
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {activeTopic.title[language]}
                </h2>
                <span className="text-xs text-slate-500 mt-0.5 block">
                  शब्द सीमा: {targetWordCount} शब्द • मानक हिन्दी वर्तनी एवं PESTLE आयामों से युक्त
                </span>
              </div>

              <button
                onClick={handleCopyModel}
                disabled={!activeTopic.modelEssay}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
              >
                {copiedModel ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedModel ? 'प्रतिलिपि बनाई गई!' : 'निबन्ध कॉपी करें'}</span>
              </button>
            </div>

            {activeTopic.modelEssay ? (
              <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 font-hindi text-sm sm:text-base leading-relaxed space-y-4">
                {activeTopic.modelEssay[language].split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} className="text-base sm:text-lg font-bold text-indigo-700 dark:text-indigo-400 pt-3 border-b border-slate-100 dark:border-slate-800 pb-1">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('• ')) {
                    return (
                      <div key={pIdx} className="pl-3 sm:pl-4 border-l-2 border-indigo-400 dark:border-indigo-600 my-2 space-y-1">
                        {paragraph.split('\n').map((line, lIdx) => (
                          <p key={lIdx} className="my-1">{line}</p>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-justify leading-loose">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 font-hindi space-y-2">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <p>इस विषय का पूर्ण मॉडल निबंध शीघ्र ही अद्यतन किया जा रहा है। कृपया 'वैचारिक रूपरेखा' टैब से मुख्य बिंदु देखें।</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Writing Workspace */}
      {activeTab === 'writing' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
          {/* Writing Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 font-mono text-slate-600 dark:text-slate-300">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-bold">{formatTimer(timerSeconds)}</span>
              </div>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300"
              >
                {timerRunning ? 'Pause' : 'Start Timer'}
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <span className={`font-mono font-bold px-3 py-1 rounded-full ${
                isOverWordLimit
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  : isWordLimitNear
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}>
                {wordCount} / {targetWordCount} {language === 'hi' ? 'शब्द' : 'words'}
              </span>

              <button
                onClick={handleSave}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center space-x-1.5 transition-all shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savedSuccess ? (language === 'hi' ? 'सहेजा गया!' : 'Saved!') : (language === 'hi' ? 'निबंध सहेजें' : 'Save Essay')}</span>
              </button>
            </div>
          </div>

          <textarea
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder={language === 'hi'
              ? `यहाँ ${targetWordCount} शब्दों में निबंध लिखना प्रारंभ करें...\n\nप्रस्तावना (10% शब्द): उद्धरण, परिभाषा या संदर्भ से प्रभावशाली शुरुआत करें।\nमुख्य भाग (80% शब्द): विभिन्न आयामों (सामाजिक, आर्थिक, सांस्कृतिक, तकनीकी व उ.प्र. संदर्भ) में पैराग्राफ बनाएं।\nनिष्कर्ष (10% शब्द): समाधानपरक एवं सकारात्मक भविष्यगामी निष्कर्ष दें।`
              : `Start writing your ${targetWordCount}-word essay here...\n\nIntro (10%): Opening quote, context, definition.\nBody (80%): Multi-dimensional paragraphs covering UP context and data.\nConclusion (10%): Constructive, optimistic way forward.`}
            rows={18}
            className="w-full p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-hindi"
          />

          {isOverWordLimit && (
            <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
              ⚠️ ध्यान दें: आप शब्द सीमा ({targetWordCount} शब्द) पार कर चुके हैं। मुख्य परीक्षा में शब्द सीमा से अधिक लिखने पर अंक कटते हैं।
            </p>
          )}
        </div>
      )}
    </div>
  );
};
