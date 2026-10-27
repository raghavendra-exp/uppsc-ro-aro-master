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
  CheckCircle,
  FileText,
  Clock,
  FileCheck,
  ScrollText,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import pyqsData from '../data/pyqs.json';
import { QuestionCard } from '../components/QuestionCard';
import { Question } from '../types';

export const PYQPage: React.FC = () => {
  const { language } = useApp();

  // Mode: 'study' (solutions always visible) vs 'practice' (interactive quiz with score)
  const [learningMode, setLearningMode] = useState<'study' | 'practice'>('study');
  const [activeTab, setActiveTab] = useState<'questions' | 'papers' | 'trends'>('questions');

  // Filter states
  const [selectedStage, setSelectedStage] = useState<'all' | 'PRELIMS' | 'MAINS'>('all');
  const [selectedPaper, setSelectedPaper] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
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

  // Paper options for Prelims
  const prelimsPapers = [
    { 
      id: 'all', 
      label: language === 'hi' ? 'सभी प्रारंभिक पेपर' : 'All Prelims Papers',
      icon: Layers,
      count: pyqsData.filter(p => p.stage === 'PRELIMS').length
    },
    { 
      id: 'PRE_PAPER_1_GS', 
      label: language === 'hi' ? 'पेपर-1: सामान्य अध्ययन (140 प्रश्न)' : 'Paper-1: General Studies (140 Qs)',
      icon: BookOpen,
      count: pyqsData.filter(p => p.paper === 'PRE_PAPER_1_GS').length
    },
    { 
      id: 'PRE_PAPER_2_HINDI', 
      label: language === 'hi' ? 'पेपर-2: सामान्य हिन्दी (60 प्रश्न)' : 'Paper-2: General Hindi (60 Qs)',
      icon: FileText,
      count: pyqsData.filter(p => p.paper === 'PRE_PAPER_2_HINDI').length
    }
  ];

  // Paper options for Mains
  const mainsPapers = [
    { 
      id: 'all', 
      label: language === 'hi' ? 'सभी मुख्य परीक्षा पेपर' : 'All Mains Papers',
      icon: Layers,
      count: pyqsData.filter(p => p.stage === 'MAINS').length
    },
    { 
      id: 'MAINS_PAPER_1_GS', 
      label: language === 'hi' ? 'पेपर-1: सामान्य अध्ययन' : 'Paper-1: General Studies',
      icon: BookOpen,
      count: pyqsData.filter(p => p.paper === 'MAINS_PAPER_1_GS').length
    },
    { 
      id: 'MAINS_PAPER_2_HINDI', 
      label: language === 'hi' ? 'पेपर-2: सामान्य हिन्दी (वस्तुनिष्ठ)' : 'Paper-2: Hindi Objective',
      icon: FileText,
      count: pyqsData.filter(p => p.paper === 'MAINS_PAPER_2_HINDI').length
    },
    { 
      id: 'MAINS_PAPER_3_DRAFTING_VOCAB', 
      label: language === 'hi' ? 'पेपर-3: आलेखन व प्रशासनिक शब्दावली' : 'Paper-3: Drafting & Vocab',
      icon: ScrollText,
      count: pyqsData.filter(p => p.paper === 'MAINS_PAPER_3_DRAFTING_VOCAB').length
    }
  ];

  // When Stage changes, reset selected paper if it doesn't belong to the new stage
  const handleStageChange = (stage: 'all' | 'PRELIMS' | 'MAINS') => {
    setSelectedStage(stage);
    setSelectedPaper('all');
  };

  // Filtered Questions
  const filteredPYQs = useMemo(() => {
    return (pyqsData as unknown as Question[]).filter(p => {
      // Stage filter
      if (selectedStage !== 'all' && p.stage !== selectedStage) return false;
      
      // Paper filter
      if (selectedPaper !== 'all' && p.paper !== selectedPaper) return false;

      // Year filter
      if (selectedYear !== 'all' && String(p.year) !== selectedYear) return false;

      // Subject filter
      if (selectedSubject !== 'all' && p.subject !== selectedSubject) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'all' && p.difficulty !== selectedDifficulty) return false;

      // Search keyword filter
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
  }, [selectedStage, selectedPaper, selectedYear, selectedSubject, selectedDifficulty, searchQuery]);

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
    setSelectedStage('all');
    setSelectedPaper('all');
    setSelectedYear('all');
    setSelectedSubject('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  // Group papers for "Exam Papers Explorer" view
  const examPaperSessions = useMemo(() => {
    const sessions = [
      {
        year: 2023,
        stage: 'PRELIMS',
        paper: 'PRE_PAPER_1_GS',
        title: language === 'hi' ? '2023 प्रारंभिक: पेपर-1 सामान्य अध्ययन' : '2023 Prelims: Paper-1 General Studies',
        officialInfo: '140 प्रश्न • 140 अंक • 120 मिनट • 0.33 निगेटिव मार्किंग',
        count: pyqsData.filter(p => p.year === 2023 && p.paper === 'PRE_PAPER_1_GS').length,
        color: 'from-blue-600 to-indigo-700'
      },
      {
        year: 2023,
        stage: 'PRELIMS',
        paper: 'PRE_PAPER_2_HINDI',
        title: language === 'hi' ? '2023 प्रारंभिक: पेपर-2 सामान्य हिन्दी' : '2023 Prelims: Paper-2 General Hindi',
        officialInfo: '60 प्रश्न • 60 अंक • 60 मिनट • 6 खंड (विलोम, वर्तनी, तत्सम, अनेक शब्द, विशेषण, पर्यायवाची)',
        count: pyqsData.filter(p => p.year === 2023 && p.paper === 'PRE_PAPER_2_HINDI').length,
        color: 'from-emerald-600 to-teal-700'
      },
      {
        year: 2021,
        stage: 'PRELIMS',
        paper: 'PRE_PAPER_1_GS',
        title: language === 'hi' ? '2021 प्रारंभिक: पेपर-1 सामान्य अध्ययन' : '2021 Prelims: Paper-1 General Studies',
        officialInfo: '140 प्रश्न • 140 अंक • 120 मिनट • 0.33 निगेटिव मार्किंग',
        count: pyqsData.filter(p => p.year === 2021 && p.paper === 'PRE_PAPER_1_GS').length,
        color: 'from-blue-600 to-indigo-700'
      },
      {
        year: 2021,
        stage: 'PRELIMS',
        paper: 'PRE_PAPER_2_HINDI',
        title: language === 'hi' ? '2021 प्रारंभिक: पेपर-2 सामान्य हिन्दी' : '2021 Prelims: Paper-2 General Hindi',
        officialInfo: '60 प्रश्न • 60 अंक • 60 मिनट • 0.33 निगेटिव मार्किंग',
        count: pyqsData.filter(p => p.year === 2021 && p.paper === 'PRE_PAPER_2_HINDI').length,
        color: 'from-emerald-600 to-teal-700'
      },
      {
        year: 2021,
        stage: 'MAINS',
        paper: 'MAINS_PAPER_1_GS',
        title: language === 'hi' ? '2021 मुख्य परीक्षा: पेपर-1 सामान्य अध्ययन' : '2021 Mains: Paper-1 General Studies',
        officialInfo: '120 प्रश्न • 120 अंक • 120 मिनट • उच्च स्तरीय विश्लेषणात्मक प्रश्न',
        count: pyqsData.filter(p => p.year === 2021 && p.paper === 'MAINS_PAPER_1_GS').length,
        color: 'from-purple-600 to-violet-800'
      },
      {
        year: 2021,
        stage: 'MAINS',
        paper: 'MAINS_PAPER_2_HINDI',
        title: language === 'hi' ? '2021 मुख्य परीक्षा: पेपर-2 सामान्य हिन्दी (वस्तुनिष्ठ)' : '2021 Mains: Paper-2 General Hindi Objective',
        officialInfo: '30 प्रश्न • 60 अंक • 30 मिनट • 5 खंड (पर्यायवाची शामिल नहीं)',
        count: pyqsData.filter(p => p.year === 2021 && p.paper === 'MAINS_PAPER_2_HINDI').length,
        color: 'from-teal-600 to-emerald-800'
      },
      {
        year: 2021,
        stage: 'MAINS',
        paper: 'MAINS_PAPER_3_DRAFTING_VOCAB',
        title: language === 'hi' ? '2021 मुख्य परीक्षा: पेपर-3 आलेखन व प्रशासनिक शब्दावली' : '2021 Mains: Paper-3 Drafting & Vocab',
        officialInfo: 'प्रशासनिक शब्दावली (20 अंक), मुहावरे (30 अंक), पत्र प्रारूप (20 अंक)',
        count: pyqsData.filter(p => p.year === 2021 && p.paper === 'MAINS_PAPER_3_DRAFTING_VOCAB').length,
        color: 'from-amber-600 to-orange-700'
      },
      {
        year: 2017,
        stage: 'PRELIMS',
        paper: 'PRE_PAPER_1_GS',
        title: language === 'hi' ? '2017 प्रारंभिक: पेपर-1 सामान्य अध्ययन' : '2017 Prelims: Paper-1 General Studies',
        officialInfo: '140 प्रश्न • 140 अंक • 120 मिनट',
        count: pyqsData.filter(p => p.year === 2017 && p.paper === 'PRE_PAPER_1_GS').length,
        color: 'from-blue-600 to-indigo-700'
      },
      {
        year: 2017,
        stage: 'PRELIMS',
        paper: 'PRE_PAPER_2_HINDI',
        title: language === 'hi' ? '2017 प्रारंभिक: पेपर-2 सामान्य हिन्दी' : '2017 Prelims: Paper-2 General Hindi',
        officialInfo: '60 प्रश्न • 60 अंक • 60 मिनट',
        count: pyqsData.filter(p => p.year === 2017 && p.paper === 'PRE_PAPER_2_HINDI').length,
        color: 'from-emerald-600 to-teal-700'
      },
      {
        year: 2017,
        stage: 'MAINS',
        paper: 'MAINS_PAPER_1_GS',
        title: language === 'hi' ? '2017 मुख्य परीक्षा: पेपर-1 सामान्य अध्ययन' : '2017 Mains: Paper-1 General Studies',
        officialInfo: '120 प्रश्न • 120 अंक',
        count: pyqsData.filter(p => p.year === 2017 && p.paper === 'MAINS_PAPER_1_GS').length,
        color: 'from-purple-600 to-violet-800'
      },
      {
        year: 2017,
        stage: 'MAINS',
        paper: 'MAINS_PAPER_2_HINDI',
        title: language === 'hi' ? '2017 मुख्य परीक्षा: पेपर-2 सामान्य हिन्दी (वस्तुनिष्ठ)' : '2017 Mains: Paper-2 Hindi Objective',
        officialInfo: '30 प्रश्न • 60 अंक',
        count: pyqsData.filter(p => p.year === 2017 && p.paper === 'MAINS_PAPER_2_HINDI').length,
        color: 'from-teal-600 to-emerald-800'
      },
      {
        year: 2016,
        stage: 'PRELIMS',
        paper: 'PRE_PAPER_1_GS',
        title: language === 'hi' ? '2016 प्रारंभिक: पेपर-1 सामान्य अध्ययन' : '2016 Prelims: Paper-1 General Studies',
        officialInfo: '140 प्रश्न • 140 अंक',
        count: pyqsData.filter(p => p.year === 2016 && p.paper === 'PRE_PAPER_1_GS').length,
        color: 'from-blue-600 to-indigo-700'
      },
      {
        year: 2016,
        stage: 'MAINS',
        paper: 'MAINS_PAPER_1_GS',
        title: language === 'hi' ? '2016 मुख्य परीक्षा: पेपर-1 सामान्य अध्ययन' : '2016 Mains: Paper-1 General Studies',
        officialInfo: '120 प्रश्न • 120 अंक',
        count: pyqsData.filter(p => p.year === 2016 && p.paper === 'MAINS_PAPER_1_GS').length,
        color: 'from-purple-600 to-violet-800'
      }
    ];
    return sessions;
  }, [language]);

  const openSpecificPaper = (year: number, stage: 'PRELIMS' | 'MAINS', paper: string) => {
    setSelectedYear(String(year));
    setSelectedStage(stage);
    setSelectedPaper(paper);
    setActiveTab('questions');
  };

  // Get active paper banner information
  const activePaperInfo = useMemo(() => {
    if (selectedPaper === 'PRE_PAPER_1_GS') {
      return {
        title: language === 'hi' ? 'प्रारंभिक परीक्षा — प्रश्न पत्र 1: सामान्य अध्ययन (General Studies)' : 'Prelims Examination — Paper 1: General Studies',
        badge: '140 प्रश्न • 140 अंक • 120 मिनट • 0.33 निगेटिव मार्किंग',
        desc: language === 'hi'
          ? 'इतिहास, भूगोल, राजव्यवस्था, सामान्य विज्ञान, अर्थव्यवस्था, कृषि, यूपी विशेष एवं समसामयिकी के प्रामाणिक प्रश्न।'
          : 'Verified PYQs spanning History, Geography, Polity, Science, Economy, UP Special, and Current Affairs.'
      };
    }
    if (selectedPaper === 'PRE_PAPER_2_HINDI') {
      return {
        title: language === 'hi' ? 'प्रारंभिक परीक्षा — प्रश्न पत्र 2: सामान्य हिन्दी (General Hindi)' : 'Prelims Examination — Paper 2: General Hindi',
        badge: '60 प्रश्न • 60 अंक • 60 मिनट • 6 निश्चित खंड',
        desc: language === 'hi'
          ? 'अपरिवर्तित 6 खंड: विलोम शब्द (10), वाक्य एवं वर्तनी शुद्धि (10), अनेक शब्दों के एक शब्द (10), तत्सम-तद्भव (10), विशेष्य-विशेषण (10), पर्यायवाची (10)।'
          : 'Invariant 6 sections: Antonyms (10), Spelling/Grammar (10), One Word (10), Tatsam-Tadbhav (10), Adjectives (10), Synonyms (10).'
      };
    }
    if (selectedPaper === 'MAINS_PAPER_1_GS') {
      return {
        title: language === 'hi' ? 'मुख्य परीक्षा — प्रश्न पत्र 1: सामान्य अध्ययन (Mains GS)' : 'Mains Examination — Paper 1: General Studies',
        badge: 'उच्च स्तरीय विश्लेषणात्मक प्रश्न • आधिकारिक उत्तर कुंजी',
        desc: language === 'hi'
          ? 'मुख्य परीक्षा स्तर के गहन नीतिगत, संवैधानिक, आर्थिक एवं उत्तर प्रदेश विशेष प्रश्न।'
          : 'In-depth conceptual and policy-oriented questions tested in official UPPSC RO/ARO Mains.'
      };
    }
    if (selectedPaper === 'MAINS_PAPER_2_HINDI') {
      return {
        title: language === 'hi' ? 'मुख्य परीक्षा — प्रश्न पत्र 2: सामान्य हिन्दी (वस्तुनिष्ठ)' : 'Mains Examination — Paper 2: General Hindi (Objective)',
        badge: '30 प्रश्न • 60 अंक • 30 मिनट • 5 खंड (पर्यायवाची रहित)',
        desc: language === 'hi'
          ? 'मुख्य परीक्षा में 5 खंड पूछे जाते हैं (प्रत्येक 6 प्रश्न / 12 अंक)। ध्यान दें: मुख्य परीक्षा में पर्यायवाची शब्द नहीं पूछा जाता है।'
          : 'Mains features 5 sections (6 Qs / 12 Marks each). Note: Synonyms (Paryayvachi) is NOT included in Mains.'
      };
    }
    if (selectedPaper === 'MAINS_PAPER_3_DRAFTING_VOCAB') {
      return {
        title: language === 'hi' ? 'मुख्य परीक्षा — प्रश्न पत्र 3: आलेखन एवं प्रशासनिक शब्दावली' : 'Mains Examination — Paper 3: Drafting & Administrative Vocab',
        badge: 'प्रशासनिक पारिभाषिक शब्दावली (20 अंक) • शासकीय मुहावरे • पत्र प्रारूप',
        desc: language === 'hi'
          ? 'सरकारी पत्राचार, अंग्रेजी से हिन्दी एवं हिन्दी से अंग्रेजी प्रशासनिक अनुवाद और शासकीय शब्दावली।'
          : 'Official secretariat glossary, English-to-Hindi and Hindi-to-English bureaucratic terminology.'
      };
    }
    return null;
  }, [selectedPaper, language]);

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
                  {language === 'hi' ? 'उत्तर प्रदेश RO/ARO पेपर-वार विगत वर्ष प्रश्न (PYQ 2010-2024)' : 'Official UPPSC RO/ARO Paper-Wise PYQ Portal'}
                </h1>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  आयोग उत्तर कुंजी सत्यापित
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {language === 'hi'
                  ? 'प्रारंभिक परीक्षा (पेपर-1 GS व पेपर-2 हिन्दी) तथा मुख्य परीक्षा (पेपर-1 GS, पेपर-2 वस्तुनिष्ठ हिन्दी व पेपर-3 आलेखन/शब्दावली) का संपूर्ण पेपर-वार संकलन'
                  : 'Complete paper-wise classification for Prelims (GS-1 & Hindi-2) and Mains (GS-1, Hindi-2, Drafting-3) with official answer keys'}
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

          {/* Primary View Switcher: Questions vs Exam Papers Explorer vs Trends */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium">
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'questions'
                  ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {language === 'hi' ? 'प्रश्न बैंक' : 'Question Bank'}
            </button>
            <button
              onClick={() => setActiveTab('papers')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'papers'
                  ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span>{language === 'hi' ? 'प्रश्न पत्र सत्र' : 'Exam Papers'}</span>
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
              <span>{language === 'hi' ? 'प्रवृत्ति विश्लेषण' : 'Trends'}</span>
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
                {language === 'hi' ? 'लाइव अभ्यास स्कोरबोर्ड' : 'Live Practice Scoreboard'}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {language === 'hi' ? 'प्रत्येक सही उत्तर +1.0 अंक • प्रत्येक गलत उत्तर -0.33 अंक निगेटिव मार्किंग' : '+1.0 Mark for Correct • -0.33 Mark for Incorrect'}
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

      {/* TAB 1: QUESTIONS BANK WITH DEDICATED PAPER-WISE SELECTOR */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          {/* Main Paper-Wise Console */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            
            {/* LEVEL 1: EXAM STAGE SELECTOR (All vs Prelims vs Mains) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1 text-purple-600 dark:text-purple-400" />
                  {language === 'hi' ? 'परीक्षा चरण (Exam Stage):' : 'Stage:'}
                </span>
                <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                  {[
                    { id: 'all', label: language === 'hi' ? 'सभी चरण (80 प्रश्न)' : 'All Stages (80)' },
                    { id: 'PRELIMS', label: language === 'hi' ? 'प्रारंभिक परीक्षा (60 प्रश्न)' : 'Prelims (60)' },
                    { id: 'MAINS', label: language === 'hi' ? 'मुख्य परीक्षा (20 प्रश्न)' : 'Mains (20)' }
                  ].map(stg => (
                    <button
                      key={stg.id}
                      onClick={() => handleStageChange(stg.id as any)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                        selectedStage === stg.id
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {stg.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyword Search Input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={language === 'hi' ? 'खोजें (उदा. 42वां संशोधन, विलोम, काकोरी)...' : 'Search questions or topics...'}
                  className="w-full pl-9 pr-7 py-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* LEVEL 2: DYNAMIC PAPER SELECTOR (Paperwise Tabs) */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center">
                <FileText className="w-3.5 h-3.5 mr-1 text-purple-600 dark:text-purple-400" />
                {selectedStage === 'PRELIMS'
                  ? (language === 'hi' ? 'प्रारंभिक परीक्षा प्रश्न पत्र (Prelims Papers):' : 'Prelims Papers:')
                  : selectedStage === 'MAINS'
                  ? (language === 'hi' ? 'मुख्य परीक्षा प्रश्न पत्र (Mains Papers):' : 'Mains Papers:')
                  : (language === 'hi' ? 'प्रश्न पत्र चुनें (Select Paper):' : 'Select Paper:')}
              </span>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {selectedStage === 'PRELIMS' && prelimsPapers.map(p => {
                  const Icon = p.icon;
                  const isSelected = selectedPaper === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPaper(p.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all border ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{p.label}</span>
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                        isSelected ? 'bg-purple-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {p.count}
                      </span>
                    </button>
                  );
                })}

                {selectedStage === 'MAINS' && mainsPapers.map(p => {
                  const Icon = p.icon;
                  const isSelected = selectedPaper === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPaper(p.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all border ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{p.label}</span>
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                        isSelected ? 'bg-purple-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {p.count}
                      </span>
                    </button>
                  );
                })}

                {selectedStage === 'all' && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { id: 'all', label: language === 'hi' ? 'सभी प्रश्न पत्र (All Papers)' : 'All Papers', count: pyqsData.length },
                      { id: 'PRE_PAPER_1_GS', label: language === 'hi' ? 'प्री: पेपर-1 सामान्य अध्ययन' : 'Pre P1 GS', count: 41 },
                      { id: 'PRE_PAPER_2_HINDI', label: language === 'hi' ? 'प्री: पेपर-2 सामान्य हिन्दी' : 'Pre P2 Hindi', count: 19 },
                      { id: 'MAINS_PAPER_1_GS', label: language === 'hi' ? 'मेन्स: पेपर-1 सामान्य अध्ययन' : 'Mains P1 GS', count: 8 },
                      { id: 'MAINS_PAPER_2_HINDI', label: language === 'hi' ? 'मेन्स: पेपर-2 सामान्य हिन्दी (वस्तुनिष्ठ)' : 'Mains P2 Hindi', count: 7 },
                      { id: 'MAINS_PAPER_3_DRAFTING_VOCAB', label: language === 'hi' ? 'मेन्स: पेपर-3 आलेखन व शब्दावली' : 'Mains P3 Vocab', count: 5 }
                    ].map(p => {
                      const isSelected = selectedPaper === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setSelectedPaper(p.id)}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
                            isSelected
                              ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{p.label}</span>
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                            isSelected ? 'bg-purple-700 text-white' : 'bg-slate-200 dark:bg-slate-700'
                          }`}>
                            {p.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* LEVEL 3: YEAR CHIPS */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center mr-1">
                <Calendar className="w-3.5 h-3.5 mr-1 text-purple-600 dark:text-purple-400" />
                {language === 'hi' ? 'परीक्षा वर्ष:' : 'Year:'}
              </span>
              {years.map(yr => {
                const isSelected = selectedYear === yr;
                return (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white font-bold shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {yr === 'all' ? (language === 'hi' ? 'सभी वर्ष' : 'All Years') : yr}
                  </button>
                );
              })}
            </div>

            {/* LEVEL 4: SUBJECT & DIFFICULTY FILTERS */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center">
                  <Filter className="w-3.5 h-3.5 mr-1 text-purple-600 dark:text-purple-400" />
                  {language === 'hi' ? 'विषय फ़िल्टर:' : 'Subject:'}
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

              {(selectedStage !== 'all' || selectedPaper !== 'all' || selectedYear !== 'all' || selectedSubject !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center space-x-1 text-rose-600 dark:text-rose-400 hover:underline font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'सभी फ़िल्टर साफ़ करें' : 'Reset All'}</span>
                </button>
              )}
            </div>
          </div>

          {/* ACTIVE PAPER HIGHLIGHT BANNER (If a specific paper is selected) */}
          {activePaperInfo && (
            <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm sm:text-base font-bold text-purple-900 dark:text-purple-200 flex items-center space-x-2">
                  <FileCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>{activePaperInfo.title}</span>
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-200/80 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200 text-xs font-mono font-bold">
                  {activePaperInfo.badge}
                </span>
              </div>
              <p className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
                {activePaperInfo.desc}
              </p>
            </div>
          )}

          {/* RESULTS COUNT & OFFICIAL STATUS NOTICE */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <div className="flex items-center space-x-2">
              <span>
                {language === 'hi' ? 'प्रदर्शित प्रश्न:' : 'Showing Questions:'} <strong className="text-slate-900 dark:text-white font-mono text-sm">{filteredPYQs.length}</strong>
              </span>
              {selectedYear !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold">
                  वर्ष {selectedYear}
                </span>
              )}
              {selectedStage !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold">
                  {selectedStage}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'सभी प्रश्न आयोग की आधिकारिक उत्तर कुंजी से सत्यापित' : 'Verified with official UPPSC answer key'}</span>
            </div>
          </div>

          {/* QUESTIONS LIST */}
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
                  ? 'चयनित परीक्षा चरण, पेपर या विषय के लिए कोई प्रश्न नहीं मिला। कृपया फ़िल्टर रीसेट करें।'
                  : 'No questions match the current paper and filters. Please reset.'}
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-colors"
              >
                {language === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: EXAM PAPERS SESSIONS EXPLORER */}
      {activeTab === 'papers' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>{language === 'hi' ? 'वर्षवार आधिकारिक प्रश्न पत्र सत्र (Official Exam Paper Sessions)' : 'Official Exam Paper Sessions'}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'किसी भी परीक्षा वर्ष के वास्तविक प्रश्न पत्र पर क्लिक करके उसे सीधे अभ्यास मोड या अध्ययन मोड में हल करें।'
                : 'Click on any real exam paper to solve it in authentic test conditions or study mode.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {examPaperSessions.map((session, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase text-white bg-gradient-to-r ${session.color}`}>
                      {session.stage} • {session.year}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {session.count} प्रश्न उपलब्ध
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug">
                    {session.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {session.officialInfo}
                  </p>
                </div>

                <button
                  onClick={() => openSpecificPaper(session.year, session.stage as any, session.paper)}
                  className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/50 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors border border-purple-200 dark:border-purple-800"
                >
                  <span>{language === 'hi' ? 'यह प्रश्न पत्र हल करें' : 'Open This Paper'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TREND ANALYSIS DASHBOARD */}
      {activeTab === 'trends' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-8 shadow-sm">
          {/* Header */}
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>{language === 'hi' ? 'उत्तर प्रदेश RO/ARO पेपर-वार परीक्षा प्रवृत्ति विश्लेषण (2010-2024)' : 'Paper-Wise UPPSC RO/ARO Trend Analysis'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              प्रारंभिक और मुख्य परीक्षा के प्रत्येक प्रश्न पत्र की आधिकारिक संरचना, विषयवार भारांक एवं आवर्ती अवधारणाएं
            </p>
          </div>

          {/* Grid 1: Prelims GS & Hindi Structure Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GS 140 Questions Distribution */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  <span>{language === 'hi' ? 'प्रारंभिक पेपर-1: सामान्य अध्ययन (140 प्रश्न)' : 'Prelims Paper-1: General Studies (140 Qs)'}</span>
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
                  <span>{language === 'hi' ? 'प्रारंभिक पेपर-2: सामान्य हिन्दी (60 प्रश्न)' : 'Prelims Paper-2: General Hindi (60 Qs)'}</span>
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">60 अंक / 60 मिनट</span>
              </div>

              <p className="text-xs text-slate-500">
                उत्तर प्रदेश लोक सेवा आयोग के पाठ्यक्रम में यह खंड 100% निश्चित है। प्रत्येक खंड से ठीक 10 प्रश्न पूछे जाते हैं:
              </p>

              <div className="space-y-2 text-xs">
                {[
                  { topic: '1. विलोम शब्द (Antonyms)', marks: '10 प्रश्न (10 अंक)', tip: 'अनुग्रह ➔ विग्रह, जंगम ➔ स्थावर, आहूत ➔ अनाहूत, आमिष ➔ निरामिष' },
                  { topic: '2. वाक्य एवं वर्तनी शुद्धि (Spelling & Grammar)', marks: '10 प्रश्न (10 अंक)', tip: 'उज्ज्वल, कवयित्री, शृंगार, ज्योत्स्ना, कुमुदिनी' },
                  { topic: '3. अनेक शब्दों के लिए एक शब्द (One Word)', marks: '10 प्रश्न (10 अंक)', tip: 'कानीन, चषक, दिगंबर, मुमुक्षु, जठराग्नि' },
                  { topic: '4. तत्सम एवं तद्भव शब्द (Sanskrit Roots)', marks: '10 प्रश्न (10 अंक)', tip: 'घोटक ➔ घोड़ा, हरिद्रा ➔ हल्दी, कर्पूर ➔ कपूर, मक्षिका ➔ मक्खी' },
                  { topic: '5. विशेष्य और विशेषण (Adjectives & Nouns)', marks: '10 प्रश्न (10 अंक)', tip: 'संख्यावाचक, गुणवाचक एवं परिमाणवाचक की गणना (उदा. तीसरा, धुंधला)' },
                  { topic: '6. पर्यायवाची शब्द (Synonyms)', marks: '10 प्रश्न (10 अंक)', tip: 'बिजली (दामिनी/तड़ित), सिंह (मृगेंद्र), आकाश (व्योम)' }
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

          {/* Grid 2: Mains Paper 1, 2, 3 Paper-Wise Comparison */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
              <ScrollText className="w-4 h-4 text-purple-600" />
              <span>{language === 'hi' ? 'मुख्य परीक्षा के पेपरों की विशिष्ट संरचना' : 'Mains Papers Structural Comparison'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-purple-700 dark:text-purple-300">पेपर-1: सामान्य अध्ययन</span>
                <p className="text-slate-500 dark:text-slate-400">
                  प्रारंभिक की तुलना में मुख्य परीक्षा में भारतीय संविधान, अर्थशास्त्र एवं यूपी विशेष के विश्लेषणात्मक व नीतिगत प्रश्न अधिक पूछे जाते हैं।
                </p>
                <div className="font-mono font-semibold text-[11px] text-slate-700 dark:text-slate-300">
                  उदा. अवशिष्ट शक्तियां (कनाडा), एकवर्थ समिति, किसान समृद्धि आयोग।
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-teal-700 dark:text-teal-300">पेपर-2: सामान्य हिन्दी (वस्तुनिष्ठ)</span>
                <p className="text-slate-500 dark:text-slate-400">
                  कुल 30 प्रश्न (60 अंक)। महत्वपूर्ण: मुख्य परीक्षा में <strong>'पर्यायवाची शब्द' नहीं पूछा जाता है</strong>। केवल 5 खंड होते हैं (प्रत्येक 6 प्रश्न)।
                </p>
                <div className="font-mono font-semibold text-[11px] text-slate-700 dark:text-slate-300">
                  विलोम, वर्तनी/वाक्य शुद्धि, अनेक शब्द, तत्सम-तद्भव, विशेष्य-विशेषण।
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-amber-700 dark:text-amber-300">पेपर-3: आलेखन व प्रशासनिक शब्दावली</span>
                <p className="text-slate-500 dark:text-slate-400">
                  शासकीय शब्दावली के 10 शब्द (20 अंक - 5 अंग्रेजी से हिन्दी + 5 हिन्दी से अंग्रेजी), मुहावरे व लोकोक्तियां (30 अंक), पत्र प्रारूप (20 अंक), कंप्यूटर (10 अंक)।
                </p>
                <div className="font-mono font-semibold text-[11px] text-slate-700 dark:text-slate-300">
                  उदा. Sanction ➔ संस्वीकृति, Gazette ➔ राजपत्र, Ad hoc ➔ तदर्थ।
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
