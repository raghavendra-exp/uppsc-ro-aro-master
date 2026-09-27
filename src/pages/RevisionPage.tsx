import React, { useState } from 'react';
import { 
  Brain, 
  RotateCw, 
  Check, 
  X, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  Layers,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import revisionData from '../data/revision.json';
import { Flashcard, RapidFact } from '../types';

export const RevisionPage: React.FC = () => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'facts' | 'flashcards' | 'tips'>('facts');
  
  // Flashcard state
  const [fcIndex, setFcIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [knownCards, setKnownCards] = useState<Record<string, boolean>>({});

  const flashcards = revisionData.flashcards as Flashcard[];
  const rapidFacts = revisionData.rapidFacts as RapidFact[];
  const currentCard = flashcards[fcIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    setFcIndex(prev => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFcIndex(prev => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const markCard = (known: boolean) => {
    setKnownCards(prev => ({ ...prev, [currentCard.id]: known }));
    handleNextCard();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <Brain className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'जीके त्वरित पुनरावृत्ति एवं फ्लैशकार्ड' : 'GK Rapid Revision & Flashcards Hub'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? '100-500-1000 फैक्ट्स ड्रिल, इंटरएक्टिव 3D फ्लैशकार्ड एवं 1/3 नेगेटिव मार्किंग की अचूक ट्रिक्स'
              : 'Rapid one-liners, interactive flashcards and examination elimination shortcuts'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-center">
          <button
            onClick={() => setActiveTab('facts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'facts'
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'रैपिड फैक्ट्स' : 'Rapid Facts'}
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'flashcards'
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'फ्लैशकार्ड' : 'Flashcards'}
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'tips'
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'एग्जाम ट्रिक्स' : 'Exam Tricks'}
          </button>
        </div>
      </div>

      {/* Tab 1: Rapid Facts One-Liners (Requirement #58, #59) */}
      {activeTab === 'facts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'सत्यापित वन-लाइनर फैक्ट्स (High-Yield Facts)' : 'High-Yield One-Liner Facts'}
            </h2>
            <span className="text-xs text-slate-400">
              {rapidFacts.length} {language === 'hi' ? 'तथ्य' : 'facts'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {rapidFacts.map(fact => (
              <div
                key={fact.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                    {fact.category}
                  </span>
                  {fact.upSpecific && (
                    <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                      ★ UP Specific
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-hindi leading-relaxed">
                  {fact.fact[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Interactive 3D Flip Flashcards (Requirement #60) */}
      {activeTab === 'flashcards' && (
        <div className="max-w-xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              {language === 'hi' ? `कार्ड ${fcIndex + 1} / ${flashcards.length}` : `Card ${fcIndex + 1} of ${flashcards.length}`}
            </span>
            <span className="font-mono text-emerald-600 font-bold uppercase">
              {currentCard.category}
            </span>
          </div>

          {/* Flashcard container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[260px] p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl cursor-pointer select-none flex flex-col justify-between transition-all hover:border-emerald-400"
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                {isFlipped ? (language === 'hi' ? 'उत्तर (Back)' : 'Answer') : (language === 'hi' ? 'प्रश्न (Front - क्लिक करके पलटें)' : 'Question (Click to flip)')}
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed font-hindi">
                {isFlipped ? currentCard.back[language] : currentCard.front[language]}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <RotateCw className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'पलटने हेतु क्लिक करें' : 'Click to flip'}</span>
              </span>
              {currentCard.hint && !isFlipped && (
                <span className="italic text-amber-600 dark:text-amber-400">
                  {language === 'hi' ? 'संकेत:' : 'Hint:'} {currentCard.hint[language]}
                </span>
              )}
            </div>
          </div>

          {/* Controls: Known, Unknown, Next */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrevCard}
              className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => markCard(false)}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-bold transition-colors flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>{language === 'hi' ? 'दोबारा देखें' : 'Review Later'}</span>
              </button>

              <button
                onClick={() => markCard(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center space-x-1 shadow"
              >
                <Check className="w-4 h-4" />
                <span>{language === 'hi' ? 'याद है' : 'Known'}</span>
              </button>
            </div>

            <button
              onClick={handleNextCard}
              className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Tips & Tricks (Requirement #61) */}
      {activeTab === 'tips' && (
        <div className="space-y-4">
          <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'परीक्षा में अंक बढ़ाने के अचूक सूत्र एवं एलिमिनेशन ट्रिक्स' : 'Exam Proven Elimination Techniques'}
            </h2>
          </div>

          <div className="space-y-4">
            {revisionData.tipsAndTricks.map((tip, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-sm"
              >
                <h3 className="text-sm sm:text-base font-bold text-amber-700 dark:text-amber-400 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{tip.title[language]}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-hindi">
                  {tip.content[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
