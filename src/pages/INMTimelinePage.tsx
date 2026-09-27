import React, { useState } from 'react';
import { 
  Zap, 
  MapPin, 
  Users, 
  Calendar, 
  Flag, 
  Award, 
  Landmark, 
  CheckCircle, 
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import inmData from '../data/inm-timeline.json';

interface INMTimelinePageProps {
  onNavigatePractice: (subject: string, topic?: string) => void;
}

export const INMTimelinePage: React.FC<INMTimelinePageProps> = ({ onNavigatePractice }) => {
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string>(inmData[0].id);

  const filteredEvents = inmData.filter(e => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      e.year.includes(q) ||
      e.title.hi.toLowerCase().includes(q) ||
      e.title.en.toLowerCase().includes(q) ||
      e.location.hi.toLowerCase().includes(q) ||
      e.leaders.hi.toLowerCase().includes(q) ||
      e.upConnection.hi.toLowerCase().includes(q)
    );
  });

  const activeEvent = inmData.find(e => e.id === selectedEventId) || inmData[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
              <Zap className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'भारतीय राष्ट्रीय आन्दोलन (1857-1947) मास्टर मॉड्यूल' : 'Indian National Movement (1857-1947) Master Module'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? 'प्रारंभिक परीक्षा में 15-18 प्रश्न! प्रत्येक घटना की तारीख, स्थान, नेता, कारण, परिणाम, उ.प्र. संबंध एवं पूर्व वर्ष प्रश्न।'
              : 'High-priority 15-18 Qs module! Comprehensive timeline with leaders, causes, UP connection and PYQs.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={language === 'hi' ? 'आंदोलन खोजें (उदा. 1942, बलिया)...' : 'Search event...'}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Main Grid: Events List on Left, Deep View on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Timeline Event Cards */}
        <div className="lg:col-span-4 space-y-2 max-h-[800px] overflow-y-auto pr-1">
          {filteredEvents.map(event => {
            const isSelected = event.id === activeEvent.id;
            return (
              <div
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-red-500 bg-red-50/70 dark:bg-red-950/30 text-red-950 dark:text-red-100 ring-1 ring-red-400 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-xs font-mono text-red-600 dark:text-red-400">
                    {event.year}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    ~{event.pyqCount} PYQs
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold line-clamp-1">
                  {event.title[language]}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {event.location[language]}
                </p>
              </div>
            );
          })}
        </div>

        {/* Detailed Event Inspection Panel */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-5">
            {/* Title & Year */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
              <div>
                <span className="text-xs font-bold text-red-600 dark:text-red-400 font-mono">
                  YEAR {activeEvent.year}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {activeEvent.title[language]}
                </h2>
              </div>
              <button
                onClick={() => onNavigatePractice('Indian National Movement', activeEvent.title.en)}
                className="self-start sm:self-center px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors flex items-center space-x-1 shrink-0"
              >
                <span>{language === 'hi' ? 'इस विषय पर प्रश्न हल करें' : 'Practice Questions'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Meta: Location & Leaders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>{language === 'hi' ? 'स्थान (Location):' : 'Location:'}</span>
                </span>
                <p className="text-slate-600 dark:text-slate-400">{activeEvent.location[language]}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{language === 'hi' ? 'प्रमुख नेतृत्वकर्ता (Leaders):' : 'Key Leaders:'}</span>
                </span>
                <p className="text-slate-600 dark:text-slate-400">{activeEvent.leaders[language]}</p>
              </div>
            </div>

            {/* Cause, Event, and Result */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <strong className="text-red-700 dark:text-red-400 block font-semibold">
                  {language === 'hi' ? 'कारण (Cause):' : 'Cause:'}
                </strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                  {activeEvent.cause[language]}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <strong className="text-slate-900 dark:text-white block font-semibold">
                  {language === 'hi' ? 'घटना का विवरण (Event Summary):' : 'Event Summary:'}
                </strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                  {activeEvent.eventSummary[language]}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <strong className="text-slate-900 dark:text-white block font-semibold">
                  {language === 'hi' ? 'परिणाम एवं प्रभाव (Result):' : 'Result & Impact:'}
                </strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                  {activeEvent.result[language]}
                </p>
              </div>
            </div>

            {/* UP Connection Highlight Box (Mandatory Requirement #6) */}
            <div className="p-4 rounded-xl border-2 border-amber-300/80 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/20 text-xs sm:text-sm space-y-1.5">
              <div className="flex items-center space-x-1.5 font-bold text-amber-900 dark:text-amber-300">
                <Landmark className="w-4 h-4 text-amber-600" />
                <span>{language === 'hi' ? 'उत्तर प्रदेश विशेष संबंध (UP Connection):' : 'Uttar Pradesh Connection:'}</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-xs font-hindi">
                {activeEvent.upConnection[language]}
              </p>
            </div>

            {/* Important Facts & Sample PYQ */}
            <div className="space-y-2 pt-1 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {language === 'hi' ? 'महत्वपूर्ण परीक्षा तथ्य (Important Exam Facts):' : 'Key Facts for RO/ARO:'}
              </span>
              <ul className="space-y-1.5 pl-4 list-disc text-slate-700 dark:text-slate-300">
                {activeEvent.importantFacts.map((fact, idx) => (
                  <li key={idx} className="leading-relaxed">{fact[language]}</li>
                ))}
              </ul>

              {activeEvent.samplePYQ && (
                <div className="mt-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-red-600 dark:text-red-400">UPPSC PYQ:</span> {activeEvent.samplePYQ}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
