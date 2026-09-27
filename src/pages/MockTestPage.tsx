import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Clock, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  AlertCircle, 
  Bookmark, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import questionsData from '../data/questions.json';
import { Question } from '../types';
import { QuestionCard } from '../components/QuestionCard';

interface MockPreset {
  id: string;
  title: { hi: string; en: string };
  questionCount: number;
  durationMinutes: number;
  filterSubject?: string;
  description: { hi: string; en: string };
}

export const MockTestPage: React.FC = () => {
  const { language, activeVersion, recordTestResult } = useApp();

  const presets: MockPreset[] = [
    {
      id: 'quick-25',
      title: { hi: 'त्वरित 25 प्रश्न अभ्यास टेस्ट', en: 'Quick 25-Question Drill' },
      questionCount: 25,
      durationMinutes: 25,
      description: { hi: 'दैनिक गति और सटीकता परीक्षण हेतु 25 मिश्रित प्रश्न', en: '25 mixed questions for daily speed & accuracy test' }
    },
    {
      id: 'hindi-60',
      title: { hi: 'सामान्य हिन्दी 60 प्रश्न (प्रारंभिक पेपर 2)', en: 'General Hindi 60-Q (Prelims Paper 2)' },
      questionCount: 60,
      durationMinutes: 60,
      filterSubject: 'General Hindi',
      description: { hi: '6 विषयों के 60 प्रश्न, 60 मिनट, 1/3 नेगेटिव मार्किंग (सटीक परीक्षा सिमुलेशन)', en: 'Official 60 Qs, 60 minutes, 1/3 negative marking' }
    },
    {
      id: 'gs-140',
      title: { hi: 'सामान्य अध्ययन 140 प्रश्न (प्रारंभिक पेपर 1)', en: 'General Studies 140-Q (Prelims Paper 1)' },
      questionCount: 140,
      durationMinutes: 120,
      description: { hi: 'इतिहास, भूगोल, राजव्यवस्था, विज्ञान, UP GK सहित 140 प्रश्न (2 घंटे)', en: '140 Questions, 120 minutes full GS Paper 1 simulation' }
    },
    {
      id: 'full-prelims-200',
      title: { hi: 'संपूर्ण प्रारंभिक परीक्षा सिमुलेशन (200 प्रश्न)', en: 'Complete Prelims 200-Q Simulation' },
      questionCount: 200,
      durationMinutes: 180,
      description: { hi: '140 GS + 60 हिन्दी, 200 अंक, 3 घंटे, परीक्षा हॉल जैसा अनुभव', en: '140 GS + 60 Hindi, 200 Marks, 3 Hours, True Exam simulation' }
    },
    {
      id: 'mains-gs-120',
      title: { hi: 'मुख्य परीक्षा GS 120 प्रश्न (पेपर 1)', en: 'Mains GS 120-Q (Paper 1)' },
      questionCount: 120,
      durationMinutes: 120,
      description: { hi: 'मुख्य परीक्षा स्तर के 120 विश्लेषणात्मक प्रश्न (120 अंक)', en: '120 analytical questions for Mains Paper 1' }
    }
  ];

  // Test state
  const [selectedPreset, setSelectedPreset] = useState<MockPreset | null>(null);
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTestActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isTestActive && timeLeft === 0) {
      handleSubmitTest();
    }
    return () => clearInterval(interval);
  }, [isTestActive, timeLeft]);

  const handleStartTest = (preset: MockPreset) => {
    setSelectedPreset(preset);
    let pool = [...questionsData];
    if (preset.filterSubject) {
      pool = pool.filter(q => q.subject === preset.filterSubject);
    }
    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, preset.questionCount);
    setTestQuestions(shuffled as Question[]);
    setUserAnswers({});
    setMarkedForReview({});
    setCurrentIndex(0);
    setTimeLeft(preset.durationMinutes * 60);
    setIsTestActive(true);
    setTestSubmitted(false);
  };

  const handleSelectOption = (optIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [currentIndex]: optIdx }));
  };

  const toggleReview = (idx: number) => {
    setMarkedForReview(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSubmitTest = () => {
    setIsTestActive(false);
    setConfirmSubmitOpen(false);
    setTestSubmitted(true);

    // Calculate score
    let correct = 0;
    let wrong = 0;
    const mistakesToLog: { questionId: string; selectedOption: number }[] = [];

    testQuestions.forEach((q, idx) => {
      const ans = userAnswers[idx];
      if (ans !== undefined) {
        if (ans === q.answer) {
          correct++;
        } else {
          wrong++;
          mistakesToLog.push({ questionId: q.id, selectedOption: ans });
        }
      }
    });

    const elapsedSeconds = (selectedPreset ? selectedPreset.durationMinutes * 60 : 0) - timeLeft;
    recordTestResult(testQuestions.length, correct, Math.max(elapsedSeconds, 10), mistakesToLog);

    // Confetti if high score (> 70%)
    if (correct / testQuestions.length >= 0.7) {
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const formatTimer = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Score Calculation
  const negativeMarkPerWrong = activeVersion.negativeMarking || 0.33;
  let correctCount = 0;
  let wrongCount = 0;
  testQuestions.forEach((q, idx) => {
    const ans = userAnswers[idx];
    if (ans !== undefined) {
      if (ans === q.answer) correctCount++;
      else wrongCount++;
    }
  });
  const unattemptedCount = testQuestions.length - (correctCount + wrongCount);
  const netScore = Math.max(0, Number((correctCount - wrongCount * negativeMarkPerWrong).toFixed(2)));
  const accuracyPct = (correctCount + wrongCount) > 0 
    ? Math.round((correctCount / (correctCount + wrongCount)) * 100) 
    : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* View 1: Presets Selection Screen */}
      {!isTestActive && !testSubmitted && (
        <div className="space-y-6">
          <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Clock className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'उत्तर प्रदेश RO/ARO ऑनलाइन मॉक टेस्ट सिमुलेटर' : 'UPPSC RO/ARO Online Mock Test Simulator'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {language === 'hi'
                ? `आधिकारिक परीक्षा जैसा वातावरण: सटीक टाइमर, 1/3 (${negativeMarkPerWrong}) ऋणात्मक अंकन, प्रश्न पैलेट एवं विस्तृत रिपोर्ट`
                : `Official exam conditions: Real-time countdown, 1/3 negative marking, palette navigation and analysis`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {presets.map(preset => (
              <div
                key={preset.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300">
                      {preset.durationMinutes} {language === 'hi' ? 'मिनट' : 'Mins'}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {preset.questionCount} {language === 'hi' ? 'प्रश्न' : 'Qs'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {preset.title[language]}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {preset.description[language]}
                  </p>
                </div>

                <button
                  onClick={() => handleStartTest(preset)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center space-x-1.5"
                >
                  <span>{language === 'hi' ? 'टेस्ट प्रारंभ करें' : 'Start Mock Test'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Active Test Exam Simulation Interface */}
      {isTestActive && selectedPreset && testQuestions.length > 0 && (
        <div className="space-y-4">
          {/* Top Sticky Status Bar */}
          <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                {selectedPreset.title[language]}
              </span>
              <span className="text-[10px] text-slate-400">
                1/3 Negative Marking ({negativeMarkPerWrong})
              </span>
            </div>

            {/* Countdown Display */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-amber-500 text-white font-mono font-bold text-sm shadow-sm animate-pulse">
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timeLeft)}</span>
              </div>

              <button
                onClick={() => setConfirmSubmitOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
              >
                {language === 'hi' ? 'सबमिट करें' : 'Submit Test'}
              </button>
            </div>
          </div>

          {/* Test Layout: Left Question Card, Right Question Palette */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              <QuestionCard
                question={testQuestions[currentIndex]}
                index={currentIndex}
                isExamMode={true}
                selectedOption={userAnswers[currentIndex] ?? null}
                onSelectOption={handleSelectOption}
                showExplanationImmediately={false}
              />

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={currentIndex <= 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'पिछला' : 'Previous'}</span>
                </button>

                <button
                  onClick={() => toggleReview(currentIndex)}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                    markedForReview[currentIndex]
                      ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>
                    {markedForReview[currentIndex] 
                      ? (language === 'hi' ? 'समीक्षा हेतु चिन्हित' : 'Marked') 
                      : (language === 'hi' ? 'समीक्षा हेतु रखें' : 'Mark for Review')}
                  </span>
                </button>

                <button
                  disabled={currentIndex >= testQuestions.length - 1}
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold disabled:opacity-40 transition-colors flex items-center space-x-1"
                >
                  <span>{language === 'hi' ? 'अगला प्रश्न' : 'Save & Next'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Side: Question Palette */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide pb-2 border-b border-slate-100 dark:border-slate-800">
                {language === 'hi' ? 'प्रश्न पैलेट (Question Palette)' : 'Question Palette'}
              </h4>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded bg-emerald-500" />
                  <span>{language === 'hi' ? 'उत्तर दिया' : 'Answered'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded bg-purple-500" />
                  <span>{language === 'hi' ? 'समीक्षा हेतु' : 'Marked for Review'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700" />
                  <span>{language === 'hi' ? 'छोड़ा गया' : 'Not Answered'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded border-2 border-amber-500" />
                  <span>{language === 'hi' ? 'वर्तमान प्रश्न' : 'Current'}</span>
                </div>
              </div>

              {/* Grid of numbers */}
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5 max-h-72 overflow-y-auto pr-1">
                {testQuestions.map((_, idx) => {
                  const isAnswered = userAnswers[idx] !== undefined;
                  const isMarked = markedForReview[idx];
                  const isCurrent = idx === currentIndex;

                  let color = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
                  if (isMarked) color = "bg-purple-500 text-white font-bold";
                  else if (isAnswered) color = "bg-emerald-500 text-white font-bold";

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-8 rounded-lg text-xs font-mono transition-all flex items-center justify-center ${color} ${
                        isCurrent ? 'ring-2 ring-amber-500 ring-offset-1 dark:ring-offset-slate-900 font-bold' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'क्या आप टेस्ट सबमिट करना चाहते हैं?' : 'Submit Mock Test?'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'hi'
                ? `आपने ${testQuestions.length} में से ${Object.keys(userAnswers).length} प्रश्नों के उत्तर दिए हैं। सबमिट करने के बाद आपकी अंकतालिका व गलत प्रश्नों की सूची तैयार होगी।`
                : `You answered ${Object.keys(userAnswers).length} out of ${testQuestions.length} questions. Are you sure you want to finish?`}
            </p>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setConfirmSubmitOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                {language === 'hi' ? 'वापस जाएं' : 'Return to Test'}
              </button>
              <button
                onClick={handleSubmitTest}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow"
              >
                {language === 'hi' ? 'हां, सबमिट करें' : 'Confirm Submission'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View 3: Comprehensive Test Result & Scorecard */}
      {testSubmitted && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm">
          <div className="text-center max-w-md mx-auto space-y-2">
            <span className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 inline-block">
              <Award className="w-8 h-8" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'टेस्ट परिणाम एवं प्रदर्शन रिपोर्ट' : 'Mock Test Scorecard'}
            </h2>
            <p className="text-xs text-slate-500">
              {selectedPreset?.title[language]}
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
              <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 uppercase">
                {language === 'hi' ? 'शुद्ध प्राप्तांक' : 'Net Score'}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 font-mono">
                {netScore}
              </div>
              <span className="text-[10px] text-slate-500">/ {testQuestions.length} Marks</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
              <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 uppercase">
                {language === 'hi' ? 'सही उत्तर' : 'Correct'}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                {correctCount}
              </div>
              <span className="text-[10px] text-emerald-600">+{correctCount} Marks</span>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40">
              <span className="text-[11px] font-semibold text-rose-800 dark:text-rose-300 uppercase">
                {language === 'hi' ? 'गलत उत्तर' : 'Wrong (1/3 Neg)'}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1 font-mono">
                {wrongCount}
              </div>
              <span className="text-[10px] text-rose-600 font-mono">
                -{(wrongCount * negativeMarkPerWrong).toFixed(2)} Marks
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase">
                {language === 'hi' ? 'सटीकता' : 'Accuracy'}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-mono">
                {accuracyPct}%
              </div>
              <span className="text-[10px] text-slate-500">{unattemptedCount} {language === 'hi' ? 'छोड़े' : 'Skipped'}</span>
            </div>
          </div>

          <div className="flex justify-center space-x-3 pt-2">
            <button
              onClick={() => {
                setTestSubmitted(false);
                setIsTestActive(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors flex items-center space-x-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'hi' ? 'अन्य टेस्ट चुनें' : 'Choose Another Test'}</span>
            </button>
          </div>

          {/* Detailed Question Review with Correct Answers & Explanations */}
          <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {language === 'hi' ? 'संपूर्ण प्रश्न विश्लेषण एवं व्याख्या' : 'Complete Answer Key & Review'}
            </h3>

            <div className="space-y-4">
              {testQuestions.map((q, idx) => (
                <QuestionCard
                  key={q.id}
                  index={idx}
                  question={q}
                  selectedOption={userAnswers[idx] ?? null}
                  showExplanationImmediately={true}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
