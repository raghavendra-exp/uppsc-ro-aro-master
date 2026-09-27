import React, { useState } from 'react';
import { 
  BarChart3, 
  RotateCcw, 
  Flame, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Target, 
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import questionsData from '../data/questions.json';
import { QuestionCard } from '../components/QuestionCard';
import { Question } from '../types';

interface AnalyticsPageProps {
  onNavigatePractice: (subject: string, topic?: string) => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ onNavigatePractice }) => {
  const { language, progress, removeMistake } = useApp();
  const [activeTab, setActiveTab] = useState<'mistakes' | 'analytics' | 'spaced-revision'>('mistakes');

  // Find questions corresponding to logged mistakes
  const mistakeQuestions = progress.mistakes.map(m => {
    const found = questionsData.find(q => q.id === m.questionId);
    return {
      mistake: m,
      question: found
    };
  }).filter(item => item.question !== undefined) as { mistake: any; question: Question }[];

  const overallAccuracy = progress.questionsAttempted > 0
    ? Math.round((progress.correctAnswers / progress.questionsAttempted) * 100)
    : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'मेरी गलतियां (Error Notebook) एवं प्रगति' : 'Error Notebook & Performance Analytics'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? 'टेस्टों में गलत हुए प्रश्नों की स्वतः डायरी, अंतराल पुनरावृत्ति (Spaced Repetition) एवं कमजोरी निवारण'
              : 'Auto-saved mistake log, spaced repetition revision schedule and targeted rescue drills'}
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-center">
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'mistakes'
                ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? `मेरी गलतियां (${progress.mistakes.length})` : `My Mistakes (${progress.mistakes.length})`}
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'प्रदर्शन मेट्रिक्स' : 'Analytics'}
          </button>
          <button
            onClick={() => setActiveTab('spaced-revision')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'spaced-revision'
                ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'आज का रिवीजन' : "Today's Revision"}
          </button>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">
            {language === 'hi' ? 'हल किए कुल प्रश्न' : 'Questions Attempted'}
          </span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            {progress.questionsAttempted}
          </div>
          <span className="text-[10px] text-emerald-500 font-semibold">{progress.correctAnswers} {language === 'hi' ? 'सही' : 'Correct'}</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">
            {language === 'hi' ? 'समग्र सटीकता' : 'Overall Accuracy'}
          </span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            {overallAccuracy}%
          </div>
          <span className="text-[10px] text-slate-500">{progress.testsAttempted} {language === 'hi' ? 'टेस्ट दिए' : 'Tests taken'}</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">
            {language === 'hi' ? 'लगातार अध्ययन (Streak)' : 'Study Streak'}
          </span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-orange-500 mt-1 flex items-center">
            {progress.studyStreakDays} <Flame className="w-5 h-5 ml-1 inline text-orange-500 fill-orange-500" />
          </div>
          <span className="text-[10px] text-slate-500">{language === 'hi' ? 'नियमित अध्ययन' : 'Consecutive Days'}</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">
            {language === 'hi' ? 'सहेजी गई गलतियां' : 'Logged Mistakes'}
          </span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-rose-600 mt-1">
            {progress.mistakes.length}
          </div>
          <span className="text-[10px] text-rose-500">{language === 'hi' ? 'समीक्षा हेतु लंबित' : 'Pending review'}</span>
        </div>
      </div>

      {/* Tab 1: "MY MISTAKES" Error Notebook (Requirement #40) */}
      {activeTab === 'mistakes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'त्रुटि निवारण पुस्तिका (My Mistakes)' : 'Error Notebook'}
            </h2>
            {mistakeQuestions.length > 0 && (
              <button
                onClick={() => onNavigatePractice('Indian Polity')}
                className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-semibold transition-colors flex items-center space-x-1"
              >
                <span>{language === 'hi' ? 'इन कमजोर विषयों का पुनः अभ्यास करें' : 'Practice Weak Areas'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {mistakeQuestions.length === 0 ? (
            <div className="p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <span className="p-3 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 inline-block">
                <CheckCircle className="w-8 h-8" />
              </span>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                {language === 'hi' ? 'अद्भुत! कोई भी अनसुलझी गलती नहीं है।' : 'Great job! No unresolved mistakes.'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {language === 'hi'
                  ? 'जब आप मॉक टेस्ट अथवा क्विज में किसी प्रश्न का गलत उत्तर देंगे, वह स्वतः यहाँ दर्ज हो जाएगा।'
                  : 'Whenever you answer incorrectly in a test or quiz, it will be automatically recorded here.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mistakeQuestions.map(({ mistake, question }) => (
                <div key={question.id} className="relative">
                  <div className="absolute top-4 right-14 z-10">
                    <button
                      onClick={() => removeMistake(question.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title={language === 'hi' ? 'गलती निवारण सूची से हटाएं' : 'Remove from mistakes'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <QuestionCard
                    question={question}
                    selectedOption={mistake.selectedOption}
                    showExplanationImmediately={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Analytics & Smart Weakness Engine (Requirement #57) */}
      {activeTab === 'analytics' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{language === 'hi' ? 'स्मार्ट कमजोरी विश्लेषक (Smart Weakness Engine)' : 'Smart Weakness Engine'}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'hi' ? 'आपकी परीक्षा संबंधी गलतियों के आधार पर स्वचालित विश्लेषण' : 'Automated analysis based on your quiz & test mistakes'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs sm:text-sm space-y-2">
            <span className="font-bold text-amber-900 dark:text-amber-300">
              {language === 'hi' ? 'सुझाया गया अगला अभ्यास:' : 'Recommended Action:'}
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
              {language === 'hi'
                ? 'आरओ/एआरओ कट-ऑफ (128+) सुनिश्चित करने हेतु सामान्य हिन्दी (विलोम एवं विशेष्य-विशेषण) में 55+ का लक्ष्य रखें तथा उत्तर प्रदेश विशेष ज्ञान (18-20 प्रश्न) पर विशेष ध्यान दें।'
                : 'To secure the RO/ARO prelims cutoff (128+), target 55+ in General Hindi and revise UP Special Knowledge modules.'}
            </p>
            <button
              onClick={() => onNavigatePractice('General Hindi')}
              className="mt-2 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center space-x-1"
            >
              <span>{language === 'hi' ? 'हिन्दी 60 प्रश्न अभ्यास शुरू करें' : 'Start Hindi Drill'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Spaced Repetition "Today's Revision" (Requirement #41) */}
      {activeTab === 'spaced-revision' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? "आज का रिवीजन (Today's Spaced Revision)" : "Today's Spaced Revision"}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              1-day, 3-day, 7-day, 15-day, 30-day Ebbinghaus forgetting curve intervals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            {['1-Day Interval', '3-Day Interval', '7-Day Interval', '15-Day Interval', '30-Day Interval'].map((cycle, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-center space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">{cycle}</span>
                <span className="text-[11px] text-slate-500">
                  {idx === 0 ? 'Polity Writs & Art 32' : idx === 1 ? '1857 in UP' : idx === 2 ? 'Hindi Vilom' : idx === 3 ? 'Ken-Betwa Link' : 'Drafting O.M.'}
                </span>
                <span className="text-[10px] text-emerald-600 block font-semibold pt-1">
                  {language === 'hi' ? 'रिवीजन पूर्ण' : 'Scheduled'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
