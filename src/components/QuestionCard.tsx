import React, { useState } from 'react';
import { 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Lightbulb, 
  Share2, 
  Tag,
  Languages
} from 'lucide-react';
import { Question, Language } from '../types';
import { useApp } from '../context/AppContext';

interface QuestionCardProps {
  question: Question;
  index?: number;
  onSelectOption?: (optionIndex: number) => void;
  selectedOption?: number | null;
  showExplanationImmediately?: boolean;
  isExamMode?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  onSelectOption,
  selectedOption = null,
  showExplanationImmediately = true,
  isExamMode = false
}) => {
  const { language, toggleBookmark, isBookmarked } = useApp();
  const [internalSelected, setInternalSelected] = useState<number | null>(selectedOption);
  const [showAltLang, setShowAltLang] = useState(false);

  const activeSelected = onSelectOption ? selectedOption : internalSelected;
  const isAnswered = activeSelected !== null && activeSelected !== undefined;
  const isCorrect = isAnswered && activeSelected === question.answer;

  const handleOptionClick = (idx: number) => {
    if (isExamMode) {
      if (onSelectOption) onSelectOption(idx);
      return;
    }
    if (onSelectOption) {
      onSelectOption(idx);
    } else {
      setInternalSelected(idx);
    }
  };

  // Determine current display language for this specific question card
  const cardLang: Language = showAltLang ? (language === 'hi' ? 'en' : 'hi') : language;

  const difficultyColors = {
    easy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    hard: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all">
      {/* Question Header Meta */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2 mb-3.5">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {index !== undefined && (
            <span className="font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              Q.{index + 1}
            </span>
          )}
          <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
            {question.id}
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="font-medium text-amber-700 dark:text-amber-400">
            {question.subject}
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <span className="hidden sm:inline text-slate-500 dark:text-slate-400">
            {question.topic}
          </span>
          <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${difficultyColors[question.difficulty]}`}>
            {question.difficulty}
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-1">
          {/* Dual language toggle for this question */}
          <button
            onClick={() => setShowAltLang(!showAltLang)}
            className="p-1.5 text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs flex items-center space-x-1"
            title="Switch Language for this question"
          >
            <Languages className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-mono">{cardLang}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(question.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked(question.id)
                ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/60'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Bookmark Question"
          >
            {isBookmarked(question.id) ? (
              <BookmarkCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">
        {question.question[cardLang]}
      </h3>

      {/* Options List */}
      <div className="space-y-2 mb-4">
        {question.options[cardLang].map((optText, optIdx) => {
          const isChosen = activeSelected === optIdx;
          const isCorrectOption = optIdx === question.answer;

          let btnClass = "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300";

          if (isExamMode) {
            if (isChosen) {
              btnClass = "border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-medium ring-1 ring-amber-400";
            }
          } else if (isAnswered && showExplanationImmediately) {
            if (isCorrectOption) {
              btnClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium ring-1 ring-emerald-400";
            } else if (isChosen && !isCorrect) {
              btnClass = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-medium ring-1 ring-rose-400";
            } else {
              btnClass = "opacity-60 border-slate-200 dark:border-slate-800";
            }
          }

          const optLabels = ['(A)', '(B)', '(C)', '(D)'];

          return (
            <button
              key={optIdx}
              onClick={() => handleOptionClick(optIdx)}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-start space-x-3 text-xs sm:text-sm ${btnClass}`}
            >
              <span className="font-semibold text-slate-500 dark:text-slate-400 shrink-0 mt-0.5">
                {optLabels[optIdx]}
              </span>
              <span className="flex-1">{optText}</span>
              {!isExamMode && isAnswered && showExplanationImmediately && (
                <span className="shrink-0 mt-0.5">
                  {isCorrectOption ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : isChosen ? (
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  ) : null}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Answer & Explanation Box (Shown after attempt in practice mode) */}
      {!isExamMode && isAnswered && showExplanationImmediately && (
        <div className={`p-4 rounded-xl text-xs sm:text-sm transition-all ${
          isCorrect 
            ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-100'
            : 'bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-slate-800 dark:text-slate-200'
        }`}>
          <div className="flex items-center space-x-2 font-bold mb-1.5">
            <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              {isCorrect 
                ? (language === 'hi' ? 'शाबाश! सही उत्तर:' : 'Correct! Correct Answer:') 
                : (language === 'hi' ? 'उत्तर एवं व्याख्या:' : 'Answer & Explanation:')}
              {' '}
              {['(A)', '(B)', '(C)', '(D)'][question.answer]} {question.options[cardLang][question.answer]}
            </span>
          </div>
          <p className="leading-relaxed pl-6 text-slate-700 dark:text-slate-300">
            {question.explanation[cardLang]}
          </p>
          {question.pyqYear && (
            <div className="mt-2 pl-6 flex items-center space-x-2 text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
              <span>{language === 'hi' ? 'यूपीपीएससी आरओ/एआरओ में पूछा गया:' : 'Asked in UPPSC RO/ARO:'} {question.pyqYear}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
