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
  Languages,
  Eye,
  EyeOff,
  ShieldCheck,
  BookOpen,
  Repeat
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
  alwaysShowSolution?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  onSelectOption,
  selectedOption = null,
  showExplanationImmediately = true,
  isExamMode = false,
  alwaysShowSolution = false
}) => {
  const { language, toggleBookmark, isBookmarked } = useApp();
  const [internalSelected, setInternalSelected] = useState<number | null>(selectedOption);
  const [showAltLang, setShowAltLang] = useState(false);
  const [manualShowSolution, setManualShowSolution] = useState(false);

  const activeSelected = onSelectOption ? selectedOption : internalSelected;
  const isAnswered = activeSelected !== null && activeSelected !== undefined;
  const isCorrect = isAnswered && activeSelected === question.answer;

  const effectiveShowSolution = !isExamMode && (alwaysShowSolution || manualShowSolution || (isAnswered && showExplanationImmediately));

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
  const displayYear = question.year || question.pyqYear;

  const difficultyColors = {
    easy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    hard: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
  };

  const getPaperBadge = (paper: string, stage: string) => {
    switch (paper) {
      case 'PRE_PAPER_1_GS':
      case 'GENERAL_STUDIES':
        return {
          label: language === 'hi' ? 'प्रारंभिक: पेपर-1 (सामान्य अध्ययन)' : 'Pre: Paper-1 GS',
          color: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
        };
      case 'PRE_PAPER_2_HINDI':
        return {
          label: language === 'hi' ? 'प्रारंभिक: पेपर-2 (सामान्य हिन्दी)' : 'Pre: Paper-2 Hindi',
          color: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
        };
      case 'MAINS_PAPER_1_GS':
      case 'MAINS_GS':
        return {
          label: language === 'hi' ? 'मुख्य: पेपर-1 (सामान्य अध्ययन)' : 'Mains: Paper-1 GS',
          color: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
        };
      case 'MAINS_PAPER_2_HINDI':
      case 'GENERAL_HINDI':
        if (stage === 'MAINS') {
          return {
            label: language === 'hi' ? 'मुख्य: पेपर-2 (सामान्य हिन्दी वस्तुनिष्ठ)' : 'Mains: Paper-2 Hindi',
            color: 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800'
          };
        }
        return {
          label: language === 'hi' ? 'प्रारंभिक: पेपर-2 (सामान्य हिन्दी)' : 'Pre: Paper-2 Hindi',
          color: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
        };
      case 'MAINS_PAPER_3_DRAFTING_VOCAB':
      case 'ADMIN_VOCAB':
        return {
          label: language === 'hi' ? 'मुख्य: पेपर-3 (आलेखन व प्रशासनिक शब्दावली)' : 'Mains: Paper-3 Drafting & Vocab',
          color: 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
        };
      default:
        return null;
    }
  };

  const paperBadge = getPaperBadge(question.paper, question.stage);

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
          
          {displayYear && (
            <span className="px-2 py-0.5 rounded font-bold font-mono text-[11px] bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              UPPSC {displayYear} {question.stage ? `(${question.stage})` : ''}
            </span>
          )}

          {paperBadge && (
            <span className={`px-2 py-0.5 rounded font-semibold text-[10px] sm:text-[11px] border ${paperBadge.color}`}>
              {paperBadge.label}
            </span>
          )}

          <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
            {question.id}
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="font-medium text-amber-700 dark:text-amber-400">
            {question.subject}
          </span>
          {question.topic && (
            <>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
              <span className="hidden sm:inline text-slate-500 dark:text-slate-400">
                {question.topic}
              </span>
            </>
          )}
          <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${difficultyColors[question.difficulty]}`}>
            {question.difficulty}
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-1">
          {/* Solution toggle button (for study) */}
          {!isExamMode && !alwaysShowSolution && (
            <button
              onClick={() => setManualShowSolution(!manualShowSolution)}
              className="p-1.5 text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs flex items-center space-x-1"
              title={manualShowSolution ? "Hide Solution" : "View Official Solution"}
            >
              {manualShowSolution ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">{language === 'hi' ? 'छिपाएं' : 'Hide'}</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 hidden sm:inline">{language === 'hi' ? 'समाधान' : 'Solution'}</span>
                </>
              )}
            </button>
          )}

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
          } else if (effectiveShowSolution) {
            if (isCorrectOption) {
              btnClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium ring-1 ring-emerald-400";
            } else if (isChosen && !isCorrect) {
              btnClass = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-medium ring-1 ring-rose-400";
            } else {
              btnClass = "opacity-60 border-slate-200 dark:border-slate-800";
            }
          } else if (isChosen) {
            btnClass = "border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-medium ring-1 ring-purple-400";
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
              {!isExamMode && effectiveShowSolution && (
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

      {/* Answer & Detailed Solution Box */}
      {effectiveShowSolution && (
        <div className={`p-4 rounded-xl text-xs sm:text-sm space-y-3 transition-all ${
          isAnswered && !isCorrect 
            ? 'bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-slate-800 dark:text-slate-200'
            : 'bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-slate-800 dark:text-slate-200'
        }`}>
          {/* Answer Header with Official Key Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-emerald-200/50 dark:border-emerald-900/30">
            <div className="flex items-center space-x-2 font-bold text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                {language === 'hi' ? 'आधिकारिक उत्तर:' : 'Official Answer Key:'}{' '}
                {['(A)', '(B)', '(C)', '(D)'][question.answer]} {question.options[cardLang][question.answer]}
              </span>
            </div>
            {question.officialStatus && (
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 rounded text-[10px] font-semibold">
                ✓ आयोग उत्तर कुंजी द्वारा सत्यापित
              </span>
            )}
          </div>

          {/* Primary Detailed Explanation */}
          <div className="space-y-1">
            <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{language === 'hi' ? 'विस्तृत समाधान एवं विश्लेषण:' : 'Detailed Solution & Analysis:'}</span>
            </div>
            <p className="leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300 pl-5">
              {question.explanation[cardLang]}
            </p>
          </div>

          {/* Core Concept / Statutory Reference (if present) */}
          {question.coreConcept && (
            <div className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-start space-x-2">
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <div className="text-[11px] sm:text-xs">
                <span className="font-bold text-purple-700 dark:text-purple-300">
                  {language === 'hi' ? 'मूल सिद्धांत / मानक संदर्भ: ' : 'Core Concept / Source: '}
                </span>
                <span className="text-slate-600 dark:text-slate-300">
                  {question.coreConcept[cardLang]}
                </span>
              </div>
            </div>
          )}

          {/* Repeat Alert / Frequency note */}
          {(question.repeatNotes || question.repetitionCount) && (
            <div className="p-2.5 rounded-lg bg-amber-100/60 dark:bg-amber-950/40 border border-amber-300/50 dark:border-amber-900/50 flex items-start space-x-2">
              <Repeat className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11px] sm:text-xs text-amber-900 dark:text-amber-200">
                <span className="font-bold">
                  {language === 'hi' ? 'परीक्षा दोहराव विश्लेषण: ' : 'UPPSC Trend Note: '}
                </span>
                <span>
                  {question.repeatNotes ? question.repeatNotes[cardLang] : `UPPSC परीक्षाओं में यह अवधारणा ${question.repetitionCount || 3}+ बार पूछी जा चुकी है।`}
                </span>
              </div>
            </div>
          )}

          {/* Source tag */}
          {question.source && (
            <div className="text-[10px] text-slate-500 dark:text-slate-400 italic pt-1">
              स्रोत: {question.source}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
