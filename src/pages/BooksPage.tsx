import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Layers, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import booksData from '../data/books.json';

interface BooksPageProps {
  onNavigatePractice: (subject: string, topic?: string) => void;
}

export const BooksPage: React.FC<BooksPageProps> = ({ onNavigatePractice }) => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'standard-books' | 'ncert-mapping'>('standard-books');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'मानक संदर्भ पुस्तकें एवं NCERT मैपिंग' : 'Standard Books & NCERT Syllabus Mapping'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? 'आधिकारिक पाठ्यक्रम का मानक पुस्तकों एवं NCERT कक्षा 6-12 के साथ अध्यायवार प्रत्यक्ष संबंध'
              : 'Direct syllabus mapping from standard references (Laxmikanth, Bahri) and NCERT chapters'}
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-center">
          <button
            onClick={() => setActiveTab('standard-books')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'standard-books'
                ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'मानक पुस्तकें' : 'Standard Books'}
          </button>
          <button
            onClick={() => setActiveTab('ncert-mapping')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'ncert-mapping'
                ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'NCERT मैपिंग' : 'NCERT 6-12 Mapping'}
          </button>
        </div>
      </div>

      {/* Tab 1: Standard Books Database with Syllabus Mapping (Requirement #42, #43) */}
      {activeTab === 'standard-books' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              {language === 'hi'
                ? 'कॉपीराइट सुरक्षा: यह मंच किसी भी पुस्तक की पायरेटेड पीडीएफ या अनधिकृत सामग्री होस्ट नहीं करता; केवल शैक्षणिक अध्याय मैपिंग प्रस्तुत की गई है।'
                : 'Copyright Protection: This platform strictly provides chapter mappings and academic study guides without hosting copyrighted PDF files.'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {booksData.books.map(book => (
              <div 
                key={book.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                      {book.stage} • {book.subject}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {book.publisher}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {book.title[language]}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                    {book.author}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {book.purpose[language]}
                  </p>

                  {/* Chapter to Syllabus Mapping */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      {language === 'hi' ? 'पाठ्यक्रम अध्याय मैपिंग:' : 'Mapped Chapters & Topics:'}
                    </span>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-400 pl-4 list-disc text-[11px]">
                      {book.syllabusMapping[0].chapters.slice(0, 4).map((ch, idx) => (
                        <li key={idx}>{ch}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 italic">
                    {book.officialReferenceNote}
                  </span>
                  <button
                    onClick={() => onNavigatePractice(book.subject)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 hover:text-amber-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center space-x-1"
                  >
                    <span>{language === 'hi' ? 'प्रश्न हल करें' : 'Practice'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: NCERT Class 6-12 Mapping (Requirement #44) */}
      {activeTab === 'ncert-mapping' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'NCERT कक्षा 11-12 प्रत्यक्ष पाठ्यक्रम मैपिंग' : 'NCERT Class 11-12 Direct Syllabus Links'}
            </h2>
          </div>

          <div className="space-y-4">
            {booksData.ncertMappings.map((ncert, nIdx) => (
              <div 
                key={nIdx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {ncert.classLevel} • {ncert.subject}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {ncert.bookTitle}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {ncert.relevantChapters.map((ch, cIdx) => (
                    <div 
                      key={cIdx}
                      className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-[10px]">
                          {ch.chapterNumber}
                        </span>
                        <strong className="text-slate-800 dark:text-slate-200">
                          {ch.title[language]}
                        </strong>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 pl-7 leading-relaxed">
                        {ch.roAroRelevance[language]}
                      </p>
                      <div className="pl-7 flex flex-wrap gap-1 pt-1">
                        {ch.keyThemes.map((th, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {th}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
