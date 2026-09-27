import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, FileText, CheckSquare, Award, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import questionsData from '../data/questions.json';
import pyqsData from '../data/pyqs.json';
import draftingData from '../data/drafting.json';
import essayData from '../data/essay-topics.json';
import subjectsData from '../data/subjects.json';

interface SearchResultItem {
  type: 'question' | 'pyq' | 'drafting' | 'essay' | 'subject';
  id: string;
  title: string;
  subtitle: string;
  targetTab: string;
  category: string;
}

interface SearchModalProps {
  onNavigate: (tab: string, meta?: any) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onNavigate }) => {
  const { searchOpen, setSearchOpen, language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
      setResults([]);
    }
  }, [searchOpen]);

  // Bilingual synonym index for high-precision semantic matching
  const synonymsMap: Record<string, string[]> = {
    'मौलिक अधिकार': ['fundamental rights', 'article', 'अनुच्छेद', 'अधिकार', 'मूल अधिकार'],
    'fundamental rights': ['मौलिक अधिकार', 'मूल अधिकार', 'rights', 'article 32'],
    'संविधान': ['constitution', 'polity', 'राजव्यवस्था'],
    'constitution': ['संविधान', 'polity'],
    'पत्र': ['drafting', 'official letter', 'शासकीय पत्र', 'कार्यालय ज्ञाप', 'परिपत्र'],
    'निबंध': ['essay', '600 word', 'निबंध'],
    '1857': ['क्रांति', 'revolt', 'विद्रोह', 'मंगल पांडे', 'झांसी'],
    'उत्तर प्रदेश': ['up gk', 'uttar pradesh', 'यूपी', 'लखनऊ']
  };

  useEffect(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q || q.length < 2) {
      setResults([]);
      return;
    }

    // Expand search query with synonyms
    let terms = [q];
    for (const [key, vals] of Object.entries(synonymsMap)) {
      if (q.includes(key.toLowerCase()) || vals.some(v => v.includes(q))) {
        terms.push(key.toLowerCase(), ...vals.map(v => v.toLowerCase()));
      }
    }

    const matchesQuery = (text: string) => {
      const lower = text.toLowerCase();
      return terms.some(t => lower.includes(t));
    };

    const hits: SearchResultItem[] = [];

    // 1. Search Subjects
    subjectsData.forEach(sub => {
      if (matchesQuery(sub.title.hi) || matchesQuery(sub.title.en) || matchesQuery(sub.description.hi)) {
        hits.push({
          type: 'subject',
          id: sub.id,
          title: sub.title[language],
          subtitle: sub.description[language],
          targetTab: sub.id === 'inm' ? 'inm-timeline' : (sub.id === 'up-gk' ? 'up-gk' : 'syllabus'),
          category: language === 'hi' ? 'पाठ्यक्रम विषय' : 'Syllabus Subject'
        });
      }
    });

    // 2. Search Drafting Docs
    draftingData.forEach(d => {
      if (matchesQuery(d.title.hi) || matchesQuery(d.title.en) || matchesQuery(d.hindiName) || matchesQuery(d.purpose.hi)) {
        hits.push({
          type: 'drafting',
          id: d.id,
          title: d.title[language],
          subtitle: d.purpose[language],
          targetTab: 'drafting',
          category: language === 'hi' ? 'प्रशासनिक आलेखन' : 'Official Drafting'
        });
      }
    });

    // 3. Search Essay Topics
    essayData.forEach(e => {
      if (matchesQuery(e.title.hi) || matchesQuery(e.title.en) || matchesQuery(e.keywords.join(' '))) {
        hits.push({
          type: 'essay',
          id: e.id,
          title: e.title[language],
          subtitle: e.understanding[language],
          targetTab: 'essay',
          category: language === 'hi' ? 'निबंध विषय (600 शब्द)' : 'Essay Topic'
        });
      }
    });

    // 4. Search PYQs
    pyqsData.forEach(p => {
      if (matchesQuery(p.question.hi) || matchesQuery(p.question.en) || matchesQuery(p.topic)) {
        hits.push({
          type: 'pyq',
          id: p.id,
          title: p.question[language],
          subtitle: `${p.year} ${p.stage} • ${p.subject} • ${p.topic}`,
          targetTab: 'pyq',
          category: language === 'hi' ? 'गत वर्ष प्रश्न (PYQ)' : 'Official PYQ'
        });
      }
    });

    // 5. Search Questions Bank (sample top matches to keep search instant)
    for (let i = 0; i < questionsData.length; i++) {
      const item = questionsData[i];
      if (matchesQuery(item.question.hi) || matchesQuery(item.question.en) || matchesQuery(item.topic)) {
        hits.push({
          type: 'question',
          id: item.id,
          title: item.question[language],
          subtitle: `${item.subject} • ${item.topic} • ${item.chapter}`,
          targetTab: 'practice',
          category: language === 'hi' ? 'अभ्यास प्रश्न' : 'Practice Bank'
        });
        if (hits.length > 25) break;
      }
    }

    setResults(hits);
  }, [searchTerm, language]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div 
        role="dialog"
        aria-modal="true"
        aria-label={language === 'hi' ? 'ग्लोबल खोज' : 'Global Search'}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <Search className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={language === 'hi' ? 'समीक्षा अधिकारी पाठ्यक्रम, प्रश्न, PYQ, पत्र या निबंध खोजें...' : 'Search syllabus, questions, PYQs, drafting, essays...'}
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="px-2 py-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded"
          >
            ESC
          </button>
        </div>

        {/* Quick Search Chips */}
        {!searchTerm && (
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900">
            <p className="text-xs font-medium text-slate-400 mb-2 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" />
              {language === 'hi' ? 'लोकप्रिय खोजें:' : 'Popular Searches:'}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                'मौलिक अधिकार',
                'कार्यालय ज्ञाप',
                '1857 की क्रांति',
                'विलोम शब्द',
                'चरकुला नृत्य',
                'आर्टिकल 32',
                'शासकीय पत्र',
                'AI Essay'
              ].map(chip => (
                <button
                  key={chip}
                  onClick={() => setSearchTerm(chip)}
                  className="px-2.5 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-900/40 dark:hover:text-amber-300 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {searchTerm && results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {language === 'hi' ? 'कोई परिणाम नहीं मिला। कृपया भिन्न शब्द खोजें।' : 'No results found. Please try another query.'}
              </p>
            </div>
          )}

          {results.map((res, index) => (
            <div
              key={`${res.type}-${res.id}-${index}`}
              onClick={() => {
                onNavigate(res.targetTab, { itemId: res.id });
                setSearchOpen(false);
              }}
              className="group p-3 rounded-xl hover:bg-amber-50/70 dark:hover:bg-slate-800/80 border border-transparent hover:border-amber-200 dark:hover:border-slate-700 cursor-pointer transition-all flex items-start justify-between"
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 p-2 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 shrink-0">
                  {res.type === 'drafting' ? <FileText className="w-4 h-4" /> :
                   res.type === 'essay' ? <BookOpen className="w-4 h-4" /> :
                   res.type === 'pyq' ? <Award className="w-4 h-4" /> :
                   <CheckSquare className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {res.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 line-clamp-1">
                    {res.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {res.subtitle}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 shrink-0 mt-2 transition-transform group-hover:translate-x-1" />
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-2.5 px-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>{language === 'hi' ? 'द्विभाषी खोज (हिन्दी + English समर्थित)' : 'Bilingual Search (Hindi + English supported)'}</span>
          <span>{results.length} {language === 'hi' ? 'परिणाम' : 'results'}</span>
        </div>
      </div>
    </div>
  );
};
