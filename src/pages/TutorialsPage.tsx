import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  GraduationCap, 
  FileText, 
  Share2, 
  Printer, 
  Type, 
  Search, 
  ShieldCheck, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Award,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import tutorialsData from '../data/tutorials.json';
import { TutorialChapter } from '../types';

interface TutorialsPageProps {
  onNavigateTab?: (tab: string, meta?: any) => void;
  onNavigatePractice?: (subject: string, topic?: string) => void;
}

export const TutorialsPage: React.FC<TutorialsPageProps> = ({ onNavigateTab, onNavigatePractice }) => {
  const { language } = useApp();
  const chapters = tutorialsData as unknown as TutorialChapter[];

  const [activeChapterId, setActiveChapterId] = useState<string>(chapters[0]?.id || '');
  const [selectedStageFilter, setSelectedStageFilter] = useState<'ALL' | 'PRELIMS' | 'MAINS'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [readChapters, setReadChapters] = useState<Record<string, boolean>>({});

  // Active Chapter Object
  const activeChapter = useMemo(() => {
    return chapters.find(c => c.id === activeChapterId) || chapters[0];
  }, [chapters, activeChapterId]);

  // Current Chapter Index
  const currentIndex = useMemo(() => {
    return chapters.findIndex(c => c.id === activeChapterId);
  }, [chapters, activeChapterId]);

  // Filtered Chapters for Table of Contents
  const filteredChapters = useMemo(() => {
    return chapters.filter(c => {
      if (selectedStageFilter !== 'ALL' && c.stage !== selectedStageFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.title.hi.toLowerCase().includes(q) ||
          c.title.en.toLowerCase().includes(q) ||
          c.subtitle.hi.toLowerCase().includes(q) ||
          c.chapterNumber.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [chapters, selectedStageFilter, searchQuery]);

  const markAsRead = (id: string) => {
    setReadChapters(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleNextChapter = () => {
    if (currentIndex < chapters.length - 1) {
      setActiveChapterId(chapters[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevChapter = () => {
    if (currentIndex > 0) {
      setActiveChapterId(chapters[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Font size classes for reading body
  const bodyTextClass = {
    normal: 'text-sm sm:text-base leading-relaxed',
    large: 'text-base sm:text-lg leading-loose',
    xlarge: 'text-lg sm:text-xl leading-loose font-serif'
  }[fontSize];

  return (
    <div className="space-y-6 pb-20">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              <BookOpen className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {language === 'hi' ? 'सम्पूर्ण विस्तृत अध्ययन सामग्री (Master Book)' : 'UPPSC RO/ARO Comprehensive Master Book'}
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  शून्य से प्रथम प्रयास में चयन
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {language === 'hi'
                  ? 'प्रत्येक विषय का प्रामाणिक पाठ्यपुस्तक-स्तरीय विवरण, वैधानिक अनुच्छेद, परीक्षा फंदे, उत्तर प्रदेश विशेष संदर्भ एवं त्वरित स्मरण चार्ट'
                  : 'Textbook-grade comprehensive tutorials, statutory articles, examiner traps, UP contexts & high-yield revision summaries'}
              </p>
            </div>
          </div>
        </div>

        {/* Reader Controls Toolbar */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          {/* Font Size Adjuster */}
          <div className="flex items-center space-x-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700">
            <span className="px-2 text-slate-400 text-[11px]">फॉन्ट:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded-lg ${fontSize === 'normal' ? 'bg-white dark:bg-slate-700 text-purple-700 font-bold shadow-sm' : 'text-slate-500'}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded-lg text-sm ${fontSize === 'large' ? 'bg-white dark:bg-slate-700 text-purple-700 font-bold shadow-sm' : 'text-slate-500'}`}
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-1 rounded-lg text-base ${fontSize === 'xlarge' ? 'bg-white dark:bg-slate-700 text-purple-700 font-bold shadow-sm' : 'text-slate-500'}`}
            >
              A++
            </button>
          </div>

          {/* Toggle Sidebar (Mobile/Desktop) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 text-xs font-bold flex items-center space-x-1"
            title="Toggle Table of Contents"
          >
            <Layers className="w-4 h-4 text-purple-600" />
            <span className="hidden md:inline">{sidebarOpen ? (language === 'hi' ? 'विषय सूची छिपाएं' : 'Hide Index') : (language === 'hi' ? 'विषय सूची दिखाएं' : 'Show Index')}</span>
          </button>
        </div>
      </div>

      {/* Main Reader Layout: Left Sidebar + Center Book Reading Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Collapsible Table of Contents Sidebar */}
        {sidebarOpen && (
          <aside className="lg:col-span-4 xl:col-span-3 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3 sticky top-20">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center">
                  <Compass className="w-4 h-4 mr-1 text-purple-600" />
                  {language === 'hi' ? 'अध्याय अनुक्रमणिका' : 'Table of Contents'}
                </span>
                <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-bold">
                  {Object.keys(readChapters).length} / {chapters.length} पढ़े गए
                </span>
              </div>

              {/* Stage Filter Buttons */}
              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                {[
                  { id: 'ALL', label: language === 'hi' ? 'सभी' : 'All' },
                  { id: 'PRELIMS', label: language === 'hi' ? 'प्रारंभिक' : 'Pre' },
                  { id: 'MAINS', label: language === 'hi' ? 'मुख्य' : 'Mains' }
                ].map(stg => (
                  <button
                    key={stg.id}
                    onClick={() => setSelectedStageFilter(stg.id as any)}
                    className={`flex-1 py-1 rounded-lg font-bold transition-all text-center ${
                      selectedStageFilter === stg.id
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {stg.label}
                  </button>
                ))}
              </div>

              {/* Search Inside Chapters */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={language === 'hi' ? 'अध्याय खोजें...' : 'Filter chapters...'}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Chapter Cards List */}
              <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-1">
                {filteredChapters.map(chap => {
                  const isActive = chap.id === activeChapterId;
                  const isCompleted = !!readChapters[chap.id];
                  return (
                    <div
                      key={chap.id}
                      onClick={() => {
                        setActiveChapterId(chap.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        isActive
                          ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 ring-1 ring-purple-400'
                          : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                        <span className="font-mono font-bold text-purple-700 dark:text-purple-300">
                          {chap.chapterNumber}
                        </span>
                        <div className="flex items-center space-x-1">
                          <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 font-bold uppercase">
                            {chap.stage}
                          </span>
                          {isCompleted && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </div>
                      </div>

                      <h4 className={`font-bold line-clamp-2 ${isActive ? 'text-purple-900 dark:text-purple-200' : 'text-slate-800 dark:text-slate-200'}`}>
                        {chap.title[language]}
                      </h4>

                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-2">
                        <Clock className="w-3 h-3" />
                        <span>{chap.estimatedStudyTimeMinutes} मिनट</span>
                        <span>•</span>
                        <span>{chap.weightageQuestions}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        {/* RIGHT COLUMN: Master Textbook Reading Pane */}
        <article className={`${sidebarOpen ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'} space-y-6`}>
          {/* Chapter Top Title Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold text-xs font-mono">
                  {activeChapter.chapterNumber}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {activeChapter.moduleTitle[language]}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold">
                  {activeChapter.importance}
                </span>
                <button
                  onClick={() => markAsRead(activeChapter.id)}
                  className={`px-3 py-1 rounded-lg font-bold flex items-center space-x-1 transition-all ${
                    readChapters[activeChapter.id]
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{readChapters[activeChapter.id] ? (language === 'hi' ? 'पढ़ा गया ✓' : 'Marked as Read ✓') : (language === 'hi' ? 'पढ़ा हुआ चिन्हित करें' : 'Mark as Read')}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {activeChapter.title[language]}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {activeChapter.subtitle[language]}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>अध्ययन समय: <strong>{activeChapter.estimatedStudyTimeMinutes} मिनट</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>आयोग भारांक: <strong>{activeChapter.weightageQuestions}</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>परीक्षा चरण: <strong>{activeChapter.stage}</strong></span>
              </div>
            </div>
          </div>

          {/* Learning Objectives Box */}
          {activeChapter.learningObjectives && activeChapter.learningObjectives.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{language === 'hi' ? 'इस अध्याय के मुख्य सीखने के उद्देश्य (Key Learning Goals):' : 'Key Learning Goals:'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeChapter.learningObjectives.map((obj, i) => (
                  <div key={i} className="flex items-start space-x-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{obj[language]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content Sections Stream (Textbook Chapters) */}
          <div className="space-y-6">
            {activeChapter.contentSections.map((sec, idx) => (
              <section
                key={sec.sectionId}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{sec.heading[language]}</span>
                  </h3>
                </div>

                {/* Markdown-style content block */}
                <div className={`${bodyTextClass} text-slate-800 dark:text-slate-200 space-y-3 whitespace-pre-line prose dark:prose-invert max-w-none`}>
                  {sec.bodyMarkdown[language]}
                </div>

                {/* Exam Trap Warning Callout (if present) */}
                {sec.examTrapWarning && (
                  <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start space-x-3 text-xs sm:text-sm text-rose-900 dark:text-rose-200">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-bold uppercase tracking-wider text-[11px] text-rose-700 dark:text-rose-300">
                        {language === 'hi' ? '⚠️ परीक्षा दृष्टि / परीक्षक का फंदा (Exam Trap Alert)' : '⚠️ Examiner Trap Alert'}
                      </span>
                      <p className="leading-relaxed font-medium">
                        {sec.examTrapWarning[language]}
                      </p>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Uttar Pradesh Special Context Box */}
          {activeChapter.upSpecialAngle && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-300 dark:border-amber-900/60 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-amber-600 text-white">
                  <Award className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-sm sm:text-base text-amber-950 dark:text-amber-200">
                  {language === 'hi' ? 'उत्तर प्रदेश विशेष संदर्भ एवं राज्यस्तरीय कोण (UP Special Angle)' : 'Uttar Pradesh Specific Context'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium pl-8">
                {activeChapter.upSpecialAngle[language]}
              </p>
            </div>
          )}

          {/* High-Yield Fast Fact Sheet */}
          {activeChapter.highYieldFactSheet && activeChapter.highYieldFactSheet.length > 0 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>{language === 'hi' ? 'उच्च-प्राथमिकता तथ्य पत्रक (High-Yield Master Fact Sheet)' : 'High-Yield Master Fact Sheet'}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeChapter.highYieldFactSheet.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <span className="font-bold text-purple-700 dark:text-purple-300 text-xs">
                      {item.termOrFact[language]}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.explanation[language]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practice & PYQ Action Bar for this Chapter */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-purple-100">
                REVISION & PRACTICE LOOP
              </span>
              <h3 className="text-base sm:text-lg font-bold mt-1">
                {language === 'hi' ? 'अध्याय पूरा हुआ? अब प्रश्नों से ज्ञान परखें!' : 'Chapter Completed? Test your mastery now!'}
              </h3>
              <p className="text-xs text-purple-100 mt-0.5">
                {language === 'hi' ? 'आयोग के विगत वर्ष प्रश्न (PYQ) और 1000+ अभ्यास बैंक से अभ्यास करें' : 'Practice official UPPSC PYQs and 1000+ MCQs'}
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => onNavigateTab && onNavigateTab('pyq')}
                className="px-4 py-2 bg-white text-purple-900 rounded-xl text-xs font-bold hover:bg-purple-50 transition-colors shadow-sm flex items-center space-x-1"
              >
                <span>{language === 'hi' ? 'इस विषय के PYQ हल करें' : 'Solve PYQs'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chapter Navigation (Previous / Next) */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handlePrevChapter}
              disabled={currentIndex <= 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentIndex <= 0
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{language === 'hi' ? 'पिछला अध्याय' : 'Previous Chapter'}</span>
            </button>

            <span className="text-xs font-mono font-bold text-slate-400">
              {currentIndex + 1} / {chapters.length}
            </span>

            <button
              onClick={handleNextChapter}
              disabled={currentIndex >= chapters.length - 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentIndex >= chapters.length - 1
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'bg-purple-600 text-white shadow-sm hover:bg-purple-700'
              }`}
            >
              <span>{language === 'hi' ? 'अगला अध्याय' : 'Next Chapter'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
