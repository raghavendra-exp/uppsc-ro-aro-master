import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Layers, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Search,
  Globe,
  Award,
  Clock,
  Download,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import booksData from '../data/books.json';

interface BooksPageProps {
  onNavigatePractice: (subject: string, topic?: string) => void;
}

export const BooksPage: React.FC<BooksPageProps> = ({ onNavigatePractice }) => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'standard-books' | 'free-internet' | 'first-attempt'>('standard-books');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const freeResources = booksData.freeInternetResources || [];
  const blueprint = booksData.firstAttemptRankerBlueprint;

  const filteredBooks = booksData.books.filter(b => 
    b.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              {language === 'hi' ? 'पाठ्यपुस्तकें, निःशुल्क डिजिटल संसाधन एवं 1st Attempt रणनीति' : 'Books, Free Internet Resources & 1st Attempt Strategy'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? 'आधिकारिक 2026 पाठ्यक्रम का मानक संदर्भों, NCERT एवं इंटरनेट पर उपलब्ध निःशुल्क सरकारी पोर्टलों के साथ प्रत्यक्ष संबंध'
              : 'Direct syllabus mapping from standard references, NCERT and free open-access government internet repositories'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-center overflow-x-auto">
          <button
            onClick={() => setActiveTab('standard-books')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'standard-books'
                ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'मानक पुस्तकें' : 'Standard Books'}
          </button>
          <button
            onClick={() => setActiveTab('free-internet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1 ${
              activeTab === 'free-internet'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'मुफ़्त इंटरनेट सामग्री' : 'Free Internet Portals'}</span>
          </button>
          <button
            onClick={() => setActiveTab('first-attempt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1 ${
              activeTab === 'first-attempt'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'hi' ? '1st Attempt रणनीति' : '1st Attempt Blueprint'}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Standard Books */}
      {activeTab === 'standard-books' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400 flex-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                {language === 'hi'
                  ? 'कॉपीराइट सुरक्षा: यह मंच किसी भी पुस्तक की पायरेटेड पीडीएफ या अनधिकृत सामग्री होस्ट नहीं करता; केवल शैक्षणिक अध्याय मैपिंग प्रस्तुत की गई है।'
                  : 'Copyright Protection: This platform strictly provides chapter mappings and academic study guides without hosting copyrighted PDF files.'}
              </span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={language === 'hi' ? 'पुस्तक या लेखक खोजें...' : 'Search book or author...'}
                className="pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 w-full sm:w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBooks.map(book => (
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

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {book.purpose[language]}
                  </p>

                  {/* Chapter Mapping */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold uppercase text-slate-600 dark:text-slate-300 block">
                      {language === 'hi' ? 'महत्वपूर्ण अध्याय एवं पाठ्यक्रम मैपिंग:' : 'High-Yield Chapters & Topics:'}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {book.syllabusMapping[0]?.chapters.slice(0, 4).map((ch, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 italic">
                    {book.officialReferenceNote}
                  </span>
                  <button
                    onClick={() => onNavigatePractice(book.subject)}
                    className="text-amber-600 hover:text-amber-700 font-bold flex items-center space-x-1 shrink-0"
                  >
                    <span>{language === 'hi' ? 'अभ्यास करें' : 'Practice Qs'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Free Internet Resources & Portals */}
      {activeTab === 'free-internet' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-900 dark:text-emerald-200">
            <strong>🌐 इंटरनेट पर उपलब्ध शत-प्रतिशत आधिकारिक एवं निःशुल्क अध्ययन स्रोत:</strong> भारत सरकार, उत्तर प्रदेश शासन, एनसीईआरटी एवं इग्नू द्वारा ऑनलाइन उपलब्ध कराए गए प्रामाणिक पाठ्यपुस्तकों एवं ई-रिपोर्ट्स की सीधी सूची।
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {freeResources.map(res => (
              <div
                key={res.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase">
                      FREE ONLINE ACCESS
                    </span>
                    <span className="text-xs text-slate-400">{res.format}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {res.category}
                    </h3>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                      स्रोत: {res.provider}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {res.description[language]}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {language === 'hi' ? 'अनुशंसित मॉड्यूल एवं ई-बुक्स:' : 'Recommended E-Modules:'}
                    </span>
                    <div className="space-y-1 text-xs">
                      {res.recommendedModules.map((m: any, idx: number) => (
                        <div key={idx} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                          <div className="font-semibold text-slate-900 dark:text-white">{m.title}</div>
                          <div className="text-[11px] text-slate-500">विषय: {m.subjects}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href={res.accessUrl.split(' ')[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>{language === 'hi' ? 'पोर्टल पर निःशुल्क पढ़ें' : 'Access Free Online'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: First Attempt Ranker Blueprint */}
      {activeTab === 'first-attempt' && blueprint && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-indigo-200">
              FIRST ATTEMPT CLEARANCE SYSTEM
            </span>
            <h2 className="text-xl sm:text-2xl font-black">
              {language === 'hi' ? 'RO/ARO प्रथम प्रयास में उत्तीर्ण करने का अचूक सूत्र' : 'The First-Attempt Success Blueprint'}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-hindi">
              {blueprint.philosophy[language]}
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blueprint.threePillars.map((p: any, idx: number) => (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-bold flex items-center justify-center font-mono text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {p.pillar}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-hindi">
                    {p.strategy[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Daily 10-Hour Ideal Routine */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 text-slate-900 dark:text-white">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold">
                {language === 'hi' ? 'दैनिक 10 घंटे का आदर्श टाइम-टेबल (Daily Ranker Schedule)' : 'Daily 10-Hour Ranker Study Timetable'}
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'प्रारंभिक एवं 800 अंक मुख्य परीक्षा के प्रत्येक खण्ड को दैनिक समय आवंटन'
                : 'Balanced daily time allocation for Prelims MCQs, Mains Answer Writing & Drafting'}
            </p>

            <div className="space-y-2.5">
              {blueprint.dailyRoutine.map((slot: any, idx: number) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 sm:gap-4"
                >
                  <span className="font-mono font-bold text-amber-700 dark:text-amber-400 w-52 shrink-0">
                    {slot.slot}
                  </span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold flex-1 font-hindi">
                    {slot.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
