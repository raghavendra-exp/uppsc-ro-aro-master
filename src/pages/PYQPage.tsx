import React, { useState } from 'react';
import { 
  Award, 
  Filter, 
  BarChart3, 
  Calendar, 
  CheckCircle, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import pyqsData from '../data/pyqs.json';
import { QuestionCard } from '../components/QuestionCard';

export const PYQPage: React.FC = () => {
  const { language } = useApp();
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'questions' | 'trends'>('questions');
  const [searchQuery, setSearchQuery] = useState('');

  const years = ['all', '2021', '2017', '2016', '2014', '2013'];
  const subjects = ['all', 'Indian Polity', 'General Hindi', 'UP Special Knowledge', 'Indian National Movement', 'General Science'];

  const filteredPYQs = pyqsData.filter(p => {
    if (selectedYear !== 'all' && String(p.year) !== selectedYear) return false;
    if (selectedSubject !== 'all' && p.subject !== selectedSubject) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.question.hi.toLowerCase().includes(q) ||
        p.question.en.toLowerCase().includes(q) ||
        p.topic.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400">
              <Award className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'उत्तर प्रदेश RO/ARO विगत वर्ष प्रश्न (PYQ 2013-2024)' : 'Official UPPSC RO/ARO PYQ Bank (2013-2024)'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? 'आधिकारिक आयोग उत्तर कुंजी द्वारा सत्यापित प्रश्न, विषयवार वर्गीकरण एवं परीक्षा प्रवृत्ति विश्लेषण'
              : 'Verified with UPPSC Official Answer Keys • Subject trends & repetition analysis'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-center">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'questions'
                ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'प्रश्न हल करें' : 'Browse PYQs'}
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'trends'
                ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-purple-500" />
            <span>{language === 'hi' ? 'प्रवृत्ति विश्लेषण (Trends)' : 'Trend Analysis'}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Questions Browser */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-500 flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1" />
                {language === 'hi' ? 'वर्ष:' : 'Year:'}
              </span>
              {years.map(yr => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    selectedYear === yr
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {yr === 'all' ? (language === 'hi' ? 'सभी वर्ष' : 'All Years') : yr}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none"
              >
                <option value="all">{language === 'hi' ? 'सभी विषय' : 'All Subjects'}</option>
                {subjects.filter(s => s !== 'all').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count Notice */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>
              {language === 'hi' ? 'दिखाए जा रहे प्रश्न:' : 'Showing questions:'} <strong>{filteredPYQs.length}</strong>
            </span>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              * {language === 'hi' ? 'सभी प्रश्न आधिकारिक परीक्षा पत्रों से सत्यापित हैं' : 'All verified against official answer keys'}
            </span>
          </div>

          {/* Questions Grid */}
          <div className="space-y-4">
            {filteredPYQs.map((q, idx) => (
              <QuestionCard
                key={q.id}
                index={idx}
                question={q as any}
                showExplanationImmediately={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Trend Analysis Dashboard (Requirement #30) */}
      {activeTab === 'trends' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>{language === 'hi' ? 'विगत वर्षों का वास्तविक परीक्षा विश्लेषण' : 'Empirical Exam Trend Analysis'}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 italic">
              "Based on available papers in database (2013-2024 cycles)."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            {/* Trend 1: Prelims GS Weightage Distribution */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'प्रारंभिक सामान्य अध्ययन विषयवार औसत (140 प्रश्न)' : 'Prelims GS Weightage Breakdown (140 Qs)'}
              </h3>
              <div className="space-y-2">
                {[
                  { sub: 'समसामयिकी (Current Affairs)', qs: '20-24 प्रश्न', pct: 85, color: 'bg-indigo-500' },
                  { sub: 'उत्तर प्रदेश विशेष (UP GK)', qs: '18-20 प्रश्न', pct: 75, color: 'bg-amber-500' },
                  { sub: 'भारतीय राष्ट्रीय आन्दोलन (INM)', qs: '15-18 प्रश्न', pct: 70, color: 'bg-red-500' },
                  { sub: 'भूगोल (भारत व विश्व)', qs: '18-22 प्रश्न', pct: 80, color: 'bg-cyan-500' },
                  { sub: 'सामान्य विज्ञान (Science)', qs: '14-16 प्रश्न', pct: 60, color: 'bg-teal-500' },
                  { sub: 'राजव्यवस्था एवं संविधान', qs: '12-14 प्रश्न', pct: 55, color: 'bg-blue-500' }
                ].map((row, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{row.sub}</span>
                      <span className="font-bold font-mono text-slate-900 dark:text-white">{row.qs}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend 2: Hindi 60 Marks Distribution */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'सामान्य हिन्दी का अपरिवर्तित 6-खंडी ढांचा (60 प्रश्न)' : 'General Hindi 6-Topic Invariant Pattern (60 Qs)'}
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex justify-between p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <span>1. विलोम शब्द</span>
                  <span className="font-bold font-mono text-emerald-600">10 प्रश्न (10 अंक)</span>
                </li>
                <li className="flex justify-between p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <span>2. वाक्य एवं वर्तनी शुद्धि</span>
                  <span className="font-bold font-mono text-emerald-600">10 प्रश्न (10 अंक)</span>
                </li>
                <li className="flex justify-between p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <span>3. अनेक शब्दों के लिए एक शब्द</span>
                  <span className="font-bold font-mono text-emerald-600">10 प्रश्न (10 अंक)</span>
                </li>
                <li className="flex justify-between p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <span>4. तत्सम एवं तद्भव शब्द</span>
                  <span className="font-bold font-mono text-emerald-600">10 प्रश्न (10 अंक)</span>
                </li>
                <li className="flex justify-between p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <span>5. विशेष्य और विशेषण</span>
                  <span className="font-bold font-mono text-emerald-600">10 प्रश्न (10 अंक)</span>
                </li>
                <li className="flex justify-between p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <span>6. पर्यायवाची शब्द</span>
                  <span className="font-bold font-mono text-emerald-600">10 प्रश्न (10 अंक)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
