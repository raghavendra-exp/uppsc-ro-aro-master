import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Filter, 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  XCircle,
  Sparkles, 
  ChevronRight,
  TrendingUp,
  Search,
  BookOpen,
  RotateCcw,
  Zap,
  ShieldCheck,
  HelpCircle,
  Layers,
  GraduationCap,
  Percent,
  CheckCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import pyqsData from '../data/pyqs.json';
import { QuestionCard } from '../components/QuestionCard';
import { Question } from '../types';

export const PYQPage: React.FC = () => {
  const { language } = useApp();

  // Mode: 'study' (solutions always visible) vs 'practice' (interactive quiz with score)
  const [learningMode, setLearningMode] = useState<'study' | 'practice'>('study');
  const [activeTab, setActiveTab] = useState<'questions' | 'trends'>('questions');

  // Filter states
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Practice mode user attempts: { [questionId: string]: number }
  const [userAttempts, setUserAttempts] = useState<{ [key: string]: number }>({});

  const years = ['all', '2023', '2021', '2017', '2016', '2014', '2013', '2010'];
  const subjects = [
    'all',
    'General Hindi',
    'UP Special Knowledge',
    'Indian Polity',
    'Indian National Movement',
    'General Science',
    'Geography',
    'History of India',
    'Indian Economy',
    'Ecology & Environment'
  ];

  // Calculate year counts
  const yearCounts = useMemo(() => {
    const counts: { [key: string]: number } = { all: pyqsData.length };
    pyqsData.forEach(p => {
      const yr = String(p.year);
      counts[yr] = (counts[yr] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered Questions
  const filteredPYQs = useMemo(() => {
    return (pyqsData as unknown as Question[]).filter(p => {
      if (selectedYear !== 'all' && String(p.year) !== selectedYear) return false;
      if (selectedStage !== 'all' && p.stage !== selectedStage) return false;
      if (selectedSubject !== 'all' && p.subject !== selectedSubject) return false;
      if (selectedDifficulty !== 'all' && p.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.question.hi.toLowerCase().includes(q) ||
          p.question.en.toLowerCase().includes(q) ||
          p.topic.toLowerCase().includes(q) ||
          (p.subtopic && p.subtopic.toLowerCase().includes(q)) ||
          p.explanation.hi.toLowerCase().includes(q) ||
          p.explanation.en.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedYear, selectedStage, selectedSubject, selectedDifficulty, searchQuery]);

  // Practice score calculations
  const practiceStats = useMemo(() => {
    const attemptedIds = Object.keys(userAttempts);
    let correct = 0;
    let incorrect = 0;

    attemptedIds.forEach(id => {
      const q = pyqsData.find(item => item.id === id);
      if (q) {
        if (userAttempts[id] === q.answer) {
          correct += 1;
        } else {
          incorrect += 1;
        }
      }
    });

    const attempted = attemptedIds.length;
    // 0.33 negative marking per wrong question as per UPPSC pattern
    const netScore = Number((correct * 1.0 - incorrect * 0.33).toFixed(2));
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    return { attempted, correct, incorrect, netScore, accuracy };
  }, [userAttempts]);

  const handleSelectOptionInPractice = (questionId: string, optionIndex: number) => {
    setUserAttempts(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const resetPractice = () => {
    setUserAttempts({});
  };

  const resetFilters = () => {
    setSelectedYear('all');
    setSelectedStage('all');
    setSelectedSubject('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              <Award className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {language === 'hi' ? 'उत्तर प्रदेश RO/ARO विगत वर्ष प्रश्न (PYQ 2010-2024)' : 'Official UPPSC RO/ARO PYQ Bank (2010-2024)'}
                </h1>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  100% आधिकारिक उत्तर कुंजी
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {language === 'hi'
                  ? 'वर्ष-वार प्रामाणिक प्रश्न पत्र, आयोग की अधिकृत उत्तर कुंजी, प्रत्येक विकल्प का गहन पोस्टमार्टम एवं परीक्षा दोहराव विश्लेषण'
                  : 'Official year-wise papers, verified answer keys, four-option anatomical solutions & trend frequency'}
              </p>
            </div>
          </div>
        </div>

        {/* Learning Mode & Tab Switchers */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
          {/* Study vs Practice Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium">
            <button
              onClick={() => setLearningMode('study')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                learningMode === 'study'
                  ? 'bg-purple-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'अध्ययन मोड (समाधान सहित)' : 'Study Mode'}</span>
            </button>
            <button
              onClick={() => setLearningMode('practice')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                learningMode === 'practice'
                  ? 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'अभ्यास टेस्ट मोड' : 'Practice Mode'}</span>
            </button>
          </div>

          {/* Questions vs Trends Tab */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium">
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'questions'
                  ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {language === 'hi' ? 'प्रश्न बैंक' : 'Questions'}
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'trends'
                  ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>{language === 'hi' ? 'प्रवृत्ति विश्लेषण (Trends)' : 'Trends'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Practice Mode Live Scorecard Bar */}
      {learningMode === 'practice' && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-300/40 dark:border-amber-900/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                {language === 'hi' ? 'लाइव अभ्यास प्रगति' : 'Live Practice Scoreboard'}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {language === 'hi' ? 'यूपीपीएससी पैटर्न: प्रत्येक सही उत्तर +1.0 अंक, प्रत्येक गलत उत्तर -0.33 अंक' : 'UPPSC Marking: +1.0 for Correct, -0.33 for Incorrect'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <div className="px-3 py-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center space-x-2">
              <span className="text-slate-500">हल किए:</span>
              <span className="font-bold font-mono">{practiceStats.attempted} / {filteredPYQs.length}</span>
            </div>

            <div className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-bold font-mono">+{practiceStats.correct} सही</span>
            </div>

            <div className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 flex items-center space-x-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span className="font-bold font-mono">-{practiceStats.incorrect} गलत</span>
            </div>

            <div className="px-3 py-1.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-300 flex items-center space-x-2">
              <span className="text-slate-500">नेट अंक:</span>
              <span className="font-bold font-mono text-base">{practiceStats.netScore}</span>
            </div>

            <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
              <Percent className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-mono font-bold">{practiceStats.accuracy}% सटीकता</span>
            </div>

            {practiceStats.attempted > 0 && (
              <button
                onClick={resetPractice}
                className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-600 transition-colors"
                title="Reset Practice Answers"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 1: QUESTIONS BROWSER */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          {/* Main Filter Console */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            {/* Row 1: Search & Stage filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={
                    language === 'hi'
                      ? 'प्रश्न, विषय, संविधान अनुच्छेद, या कीवर्ड खोजें (उदा. 42वां संशोधन, विलोम, चरकुला, दुधवा)...'
                      : 'Search questions, topics, articles, or keywords...'
                  }
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Stage Filter Buttons */}
              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs shrink-0 self-start sm:self-auto">
                <span className="text-[11px] font-semibold text-slate-400 px-2">चरण:</span>
                {[
                  { id: 'all', label: language === 'hi' ? 'सभी' : 'All' },
                  { id: 'PRELIMS', label: language === 'hi' ? 'प्रारंभिक (Pre)' : 'Prelims' },
                  { id: 'MAINS', label: language === 'hi' ? 'मुख्य (Mains)' : 'Mains' }
                ].map(stg => (
                  <button
                    key={stg.id}
                    onClick={() => setSelectedStage(stg.id)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      selectedStage === stg.id
                        ? 'bg-purple-600 text-white font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {stg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2: Year Selector Buttons with Badges */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center mr-1">
                <Calendar className="w-3.5 h-3.5 mr-1 text-purple-600 dark:text-purple-400" />
                {language === 'hi' ? 'परीक्षा वर्ष:' : 'Year:'}
              </span>
              {years.map(yr => {
                const count = yearCounts[yr] || 0;
                const isSelected = selectedYear === yr;
                return (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center space-x-1 ${
                      isSelected
                        ? 'bg-purple-600 text-white font-bold shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{yr === 'all' ? (language === 'hi' ? 'सभी वर्ष' : 'All Years') : yr}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected 
                        ? 'bg-purple-700 text-purple-100' 
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Row 3: Subject & Difficulty Dropdowns */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center">
                  <Filter className="w-3.5 h-3.5 mr-1 text-purple-600 dark:text-purple-400" />
                  {language === 'hi' ? 'विषय चुनें:' : 'Subject:'}
                </span>
                <select
                  value={selectedSubject}
                  onChange={e => setSelectedSubject(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option value="all">{language === 'hi' ? 'सभी विषय (All Subjects)' : 'All Subjects'}</option>
                  {subjects.filter(s => s !== 'all').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
                  value={selectedDifficulty}
                  onChange={e => setSelectedDifficulty(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option value="all">{language === 'hi' ? 'कठिनाई: सभी' : 'Difficulty: All'}</option>
                  <option value="easy">{language === 'hi' ? 'सरल (Easy)' : 'Easy'}</option>
                  <option value="medium">{language === 'hi' ? 'मध्यम (Medium)' : 'Medium'}</option>
                  <option value="hard">{language === 'hi' ? 'कठिन (Hard)' : 'Hard'}</option>
                </select>
              </div>

              {(selectedYear !== 'all' || selectedStage !== 'all' || selectedSubject !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center space-x-1 text-rose-600 dark:text-rose-400 hover:underline font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <div className="flex items-center space-x-2">
              <span>
                {language === 'hi' ? 'उपलब्ध प्रश्न:' : 'Available Questions:'} <strong className="text-slate-900 dark:text-white font-mono text-sm">{filteredPYQs.length}</strong>
              </span>
              {selectedYear !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold">
                  वर्ष {selectedYear}
                </span>
              )}
              {selectedSubject !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold">
                  {selectedSubject}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'प्रत्येक प्रश्न में आयोग उत्तर कुंजी व विस्तृत विश्लेषण संलग्न है' : 'Includes official answer key verification'}</span>
            </div>
          </div>

          {/* Questions Stream */}
          {filteredPYQs.length > 0 ? (
            <div className="space-y-4">
              {filteredPYQs.map((q, idx) => (
                <QuestionCard
                  key={q.id}
                  index={idx}
                  question={q}
                  alwaysShowSolution={learningMode === 'study'}
                  isExamMode={learningMode === 'practice'}
                  selectedOption={userAttempts[q.id] ?? null}
                  onSelectOption={optIdx => handleSelectOptionInPractice(q.id, optIdx)}
                  showExplanationImmediately={learningMode === 'practice'}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200">
                {language === 'hi' ? 'कोई प्रश्न नहीं मिला' : 'No Questions Found'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {language === 'hi'
                  ? 'चयनित फ़िल्टर या खोज शब्द के लिए कोई प्रश्न उपलब्ध नहीं है। कृपया फ़िल्टर रीसेट करें।'
                  : 'No questions match the current filters. Please reset filters.'}
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-colors"
              >
                {language === 'hi' ? 'सभी फ़िल्टर साफ़ करें' : 'Clear All Filters'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TREND ANALYSIS DASHBOARD */}
      {activeTab === 'trends' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-8 shadow-sm">
          {/* Header */}
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>{language === 'hi' ? 'उत्तर प्रदेश RO/ARO वास्तविक परीक्षा प्रवृत्ति विश्लेषण (2010-2024)' : 'Empirical UPPSC RO/ARO Trend Analysis'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              विगत 14 वर्षों के प्रश्न पत्रों का आधिकारिक सांख्यिकीय विश्लेषण, अपरिवर्तित पैटर्न एवं टॉप दोहराए जाने वाले सिद्धांत
            </p>
          </div>

          {/* Grid 1: Prelims GS & Hindi Structure Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GS 140 Questions Distribution */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  <span>{language === 'hi' ? 'सामान्य अध्ययन-I (140 प्रश्न) विषयवार भारांक' : 'Prelims GS-I (140 Qs) Subject Breakdown'}</span>
                </h3>
                <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400">140 अंक / 120 मिनट</span>
              </div>

              <div className="space-y-3">
                {[
                  { sub: 'समसामयिक घटनाक्रम (राष्ट्रीय/अन्तर्राष्ट्रीय)', qs: '22-26 प्रश्न', pct: 90, color: 'bg-indigo-600' },
                  { sub: 'उत्तर प्रदेश विशेष (इतिहास, भूगोल, कला, अर्थव्यवस्था)', qs: '18-22 प्रश्न', pct: 80, color: 'bg-amber-600' },
                  { sub: 'भारत एवं विश्व का भूगोल तथा जनसंख्या', qs: '18-20 प्रश्न', pct: 75, color: 'bg-cyan-600' },
                  { sub: 'भारतीय राष्ट्रीय आन्दोलन (INM)', qs: '15-18 प्रश्न', pct: 70, color: 'bg-rose-600' },
                  { sub: 'सामान्य विज्ञान (जीव विज्ञान + रसायन + भौतिक)', qs: '14-16 प्रश्न', pct: 65, color: 'bg-teal-600' },
                  { sub: 'भारतीय राज्यव्यवस्था एवं संविधान', qs: '12-14 प्रश्न', pct: 60, color: 'bg-blue-600' },
                  { sub: 'भारतीय अर्थव्यवस्था एवं कृषि-व्यापार', qs: '12-15 प्रश्न', pct: 60, color: 'bg-emerald-600' },
                  { sub: 'पर्यावरण एवं पारिस्थितिकी', qs: '8-10 प्रश्न', pct: 45, color: 'bg-lime-600' },
                  { sub: 'सामान्य बौद्धिक क्षमता (तर्कशक्ति एवं गणित)', qs: '12-14 प्रश्न', pct: 55, color: 'bg-purple-600' }
                ].map((row, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{row.sub}</span>
                      <span className="font-bold font-mono text-slate-900 dark:text-white">{row.qs}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${row.color} rounded-full transition-all`} style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General Hindi Invariant 6 Topics (60 Questions / 60 Marks) */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <span>{language === 'hi' ? 'सामान्य हिन्दी का अपरिवर्तित 6-खंडी ढांचा (60 प्रश्न)' : 'General Hindi 6-Topic Invariant Blueprint'}</span>
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">60 अंक / 60 मिनट</span>
              </div>

              <p className="text-xs text-slate-500">
                उत्तर प्रदेश लोक सेवा आयोग के पाठ्यक्रम में यह खंड 100% निश्चित है। प्रत्येक खंड से ठीक 10 प्रश्न पूछे जाते हैं:
              </p>

              <div className="space-y-2 text-xs">
                {[
                  { topic: '1. विलोम शब्द (Antonyms)', marks: '10 प्रश्न (10 अंक)', tip: 'अनुग्रह ➔ विग्रह, जंगम ➔ स्थावर, आहूत ➔ अनाहूत' },
                  { topic: '2. वाक्य एवं वर्तनी शुद्धि (Spelling & Grammar)', marks: '10 प्रश्न (10 अंक)', tip: 'उज्ज्वल, कवयित्री, शृंगार, ज्योत्स्ना, कुमुदिनी' },
                  { topic: '3. अनेक शब्दों के लिए एक शब्द (One Word)', marks: '10 प्रश्न (10 अंक)', tip: 'कानीन, चषक, दिगंबर, मुमुक्षु, जठराग्नि' },
                  { topic: '4. तत्सम एवं तद्भव शब्द (Sanskrit Roots)', marks: '10 प्रश्न (10 अंक)', tip: 'घोटक ➔ घोड़ा, हरिद्रा ➔ हल्दी, कर्पूर ➔ कपूर' },
                  { topic: '5. विशेष्य और विशेषण (Adjectives & Nouns)', marks: '10 प्रश्न (10 अंक)', tip: 'संख्यावाचक, गुणवाचक एवं परिमाणवाचक की गणना' },
                  { topic: '6. पर्यायवाची शब्द (Synonyms)', marks: '10 प्रश्न (10 अंक)', tip: 'बिजली (दामिनी/तड़ित), सिंह (मृगेंद्र), कमल (इंदीवर)' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{item.topic}</span>
                      <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">{item.marks}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      उदा: {item.tip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table: Top 10 High-Frequency Repeating Concepts */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{language === 'hi' ? 'टॉप 10 सर्वाधिक बार दोहराए जाने वाले सिद्धांत (High-Frequency Repeaters)' : 'Top 10 High-Frequency Repeating Concepts'}</span>
            </h3>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">विषय एवं सिद्धांत (Core Concept)</th>
                    <th className="p-3">आयोग का मूल प्रश्न स्वरूप</th>
                    <th className="p-3">पूछे गए वर्ष</th>
                    <th className="p-3 text-right">दोहराव आवृत्ति</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  {[
                    {
                      id: 1,
                      subject: 'Polity: अनुच्छेद 32',
                      concept: 'संवैधानिक उपचारों का अधिकार, 5 रिटें, डॉ. अम्बेडकर द्वारा "संविधान की आत्मा"',
                      years: '2010, 2013, 2014, 2017, 2021',
                      repeats: '15+ बार'
                    },
                    {
                      id: 2,
                      subject: 'Hindi: वर्तनी शुद्धि',
                      concept: 'उज्ज्वल (दो आधा ज), कवयित्री, शृंगार (ऋ की मात्रा), ज्योत्स्ना',
                      years: '2010, 2013, 2014, 2016, 2017, 2021, 2023',
                      repeats: '12+ बार'
                    },
                    {
                      id: 3,
                      subject: 'UP GK: सोनभद्र जिला',
                      concept: 'चार राज्यों (MP, CG, JH, BR) की सीमा स्पर्श करने वाला भारत का एकमात्र जिला',
                      years: '2013, 2017, 2021, 2023',
                      repeats: '8+ बार'
                    },
                    {
                      id: 4,
                      subject: 'INM: काकोरी ट्रेन एक्शन (1925)',
                      concept: 'अमर शहीदों की फांसी की जेलें (बिस्मिल-गोरखपुर, अशफाक-फैजाबाद, रोशन-नैनी, लाहिड़ी-गोंडा)',
                      years: '2014, 2016, 2017, 2021',
                      repeats: '7+ बार'
                    },
                    {
                      id: 5,
                      subject: 'UP GK: शारदा नहर प्रणाली',
                      concept: 'UP की सबसे लम्बी नहर प्रणाली (12,368+ किमी), उद्गम वनबसा पीलीभीत',
                      years: '2010, 2014, 2017, 2021',
                      repeats: '6+ बार'
                    },
                    {
                      id: 6,
                      subject: 'Science: विटामिन B12 व धातुएं',
                      concept: 'साइनोकोबालामिन में कोबाल्ट, हीमोग्लोबिन में आयरन, क्लोरोफिल में मैग्नीशियम',
                      years: '2013, 2016, 2017, 2021',
                      repeats: '8+ बार'
                    },
                    {
                      id: 7,
                      subject: 'Polity: 73वां संविधान संशोधन',
                      concept: 'पंचायती राज, 11वीं अनुसूची, 29 विषय, त्रिस्तरीय ढांचा, अनुच्छेद 243',
                      years: '2013, 2014, 2017, 2021',
                      repeats: '9+ बार'
                    },
                    {
                      id: 8,
                      subject: 'Hindi: विलोम शब्द',
                      concept: 'जंगम ➔ स्थावर, अनुग्रह ➔ विग्रह, आहूत ➔ अनाहूत, आविर्भाव ➔ तिरोभाव',
                      years: '2010, 2013, 2014, 2016, 2017, 2021, 2023',
                      repeats: '10+ बार'
                    },
                    {
                      id: 9,
                      subject: 'UP GK: दुधवा राष्ट्रीय उद्यान',
                      concept: 'लखीमपुर खीरी, 1977 में राष्ट्रीय उद्यान, बारहसिंगा व गैंडा संरक्षण',
                      years: '2010, 2014, 2017, 2021',
                      repeats: '9+ बार'
                    },
                    {
                      id: 10,
                      subject: 'INM: 1942 समानांतर सरकार',
                      concept: 'बलिया में शेर-ए-बलिया चित्तू पांडे द्वारा बागी सरकार का गठन',
                      years: '2014, 2016, 2021',
                      repeats: '7+ बार'
                    }
                  ].map(row => (
                    <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-purple-600">{row.id}</td>
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">{row.subject}</td>
                      <td className="p-3">{row.concept}</td>
                      <td className="p-3 font-mono text-slate-500">{row.years}</td>
                      <td className="p-3 text-right font-bold font-mono text-emerald-600">{row.repeats}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
