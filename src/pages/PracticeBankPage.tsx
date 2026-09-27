import React, { useState, useMemo } from 'react';
import { 
  CheckSquare, 
  Filter, 
  Search, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Bookmark, 
  Layers,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import questionsData from '../data/questions.json';
import { QuestionCard } from '../components/QuestionCard';
import { Question } from '../types';

interface PracticeBankPageProps {
  initialSubject?: string;
  initialTopic?: string;
}

export const PracticeBankPage: React.FC<PracticeBankPageProps> = ({ initialSubject, initialTopic }) => {
  const { language, isBookmarked } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [onlyBookmarks, setOnlyBookmarks] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const pageSize = 15;

  // Extract unique subjects
  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    questionsData.forEach(q => set.add(q.subject));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredQuestions = useMemo(() => {
    return questionsData.filter(q => {
      if (selectedSubject !== 'all' && q.subject !== selectedSubject) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (onlyBookmarks && !isBookmarked(q.id)) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          q.question.hi.toLowerCase().includes(query) ||
          q.question.en.toLowerCase().includes(query) ||
          q.topic.toLowerCase().includes(query) ||
          q.chapter.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedSubject, selectedDifficulty, onlyBookmarks, searchQuery, isBookmarked]);

  const totalPages = Math.ceil(filteredQuestions.length / pageSize) || 1;
  const paginatedQuestions = filteredQuestions.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <CheckSquare className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? '1,000+ प्रामाणिक बहुविकल्पीय अभ्यास प्रश्न बैंक' : '1,000+ Practice Question Bank'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? 'प्रारंभिक एवं मुख्य परीक्षा के सभी 15 विषयों का अद्यतन संग्रह • द्विभाषी • विस्तृत व्याख्या • बुकमार्क'
              : 'Comprehensive bilingual question bank covering all syllabus modules with step-by-step explanations'}
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-center">
          <button
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              onlyBookmarks
                ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'केवल बुकमार्क' : 'Bookmarks'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          {/* Search bar */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder={language === 'hi' ? 'प्रश्न या विषय खोजें (उदा. अनुच्छेद 32)...' : 'Search questions or topics...'}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            />
          </div>

          {/* Subject filter */}
          <div className="sm:col-span-4">
            <select
              value={selectedSubject}
              onChange={e => {
                setSelectedSubject(e.target.value);
                setPage(1);
              }}
              className="w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            >
              {availableSubjects.map(sub => (
                <option key={sub} value={sub}>
                  {sub === 'all' ? (language === 'hi' ? 'सभी विषय (All Subjects)' : 'All Subjects') : sub}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={e => {
                setSelectedDifficulty(e.target.value);
                setPage(1);
              }}
              className="w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            >
              <option value="all">{language === 'hi' ? 'सभी कठिनाई स्तर' : 'All Difficulties'}</option>
              <option value="easy">{language === 'hi' ? 'सरल (Easy)' : 'Easy'}</option>
              <option value="medium">{language === 'hi' ? 'मध्यम (Medium)' : 'Medium'}</option>
              <option value="hard">{language === 'hi' ? 'कठिन (Hard)' : 'Hard'}</option>
            </select>
          </div>
        </div>

        {/* Results Count & Current Scope */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>
            {language === 'hi' ? 'कुल उपलब्ध प्रश्न:' : 'Total Questions Found:'}{' '}
            <strong className="text-blue-600 dark:text-blue-400 font-mono text-xs">{filteredQuestions.length}</strong>
          </span>
          <span>
            {language === 'hi' ? `पृष्ठ ${page} / ${totalPages}` : `Page ${page} of ${totalPages}`}
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {paginatedQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500">
              {language === 'hi' ? 'कोई प्रश्न नहीं मिला। कृपया फिल्टर बदलें।' : 'No questions match this filter.'}
            </p>
          </div>
        ) : (
          paginatedQuestions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              index={(page - 1) * pageSize + idx}
              question={q as Question}
              showExplanationImmediately={true}
            />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-4">
          <button
            disabled={page <= 1}
            onClick={() => {
              setPage(prev => Math.max(prev - 1, 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'पिछला' : 'Previous'}</span>
          </button>

          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 px-3">
            {page} / {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => {
              setPage(prev => Math.min(prev + 1, totalPages));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 flex items-center space-x-1"
          >
            <span>{language === 'hi' ? 'अगला' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
