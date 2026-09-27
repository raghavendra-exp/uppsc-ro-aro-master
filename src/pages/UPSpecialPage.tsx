import React, { useState } from 'react';
import { 
  Landmark, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Compass, 
  CheckCircle,
  ArrowRight,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import upSpecialData from '../data/up-special.json';

interface UPSpecialPageProps {
  onNavigatePractice: (subject: string, topic?: string) => void;
}

export const UPSpecialPage: React.FC<UPSpecialPageProps> = ({ onNavigatePractice }) => {
  const { language } = useApp();
  const [activeSectionId, setActiveSectionId] = useState<string>('up-history');

  const activeSec = upSpecialData.sections.find(s => s.id === activeSectionId) || upSpecialData.sections[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <Landmark className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'उत्तर प्रदेश समग्र विशेष ज्ञान (UP Special Master)' : 'Uttar Pradesh Special Master Module'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? 'प्रारंभिक परीक्षा में 18-20 प्रश्न! इतिहास, भूगोल, नदियां, उद्योग, एक जिला एक उत्पाद (ODOP), मेले, संस्कृति व राजव्यवस्था।'
              : '18-20 Qs weightage in Prelims! Comprehensive UP History, Geography, ODOP, Culture & Governance.'}
          </p>
        </div>

        <button
          onClick={() => onNavigatePractice('UP Special Knowledge')}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center space-x-1.5 shrink-0 self-start sm:self-center"
        >
          <span>{language === 'hi' ? 'उ.प्र. क्विज हल करें (150 प्रश्न)' : 'Practice UP GK Quiz'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* UP Key Statistical Snapshot Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">
            {language === 'hi' ? 'जनसंख्या (2011)' : 'Population'}
          </span>
          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">19.98 Cr</div>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">देश में 1st (16.51%)</span>
        </div>

        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">
            {language === 'hi' ? 'क्षेत्रफल' : 'Total Area'}
          </span>
          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">240,928 km²</div>
          <span className="text-[10px] text-slate-500">चौथा स्थान (7.33%)</span>
        </div>

        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">
            {language === 'hi' ? 'लिंगानुपात (Sex Ratio)' : 'Sex Ratio'}
          </span>
          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">912</div>
          <span className="text-[10px] text-slate-500">शिशु लिंगानुपात: 902</span>
        </div>

        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">
            {language === 'hi' ? 'साक्षरता दर' : 'Literacy Rate'}
          </span>
          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">67.72%</div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400">पुरुष: 77.3% | महिला: 57.2%</span>
        </div>

        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">
            {language === 'hi' ? 'जिले एवं मंडल' : 'Districts & Divs'}
          </span>
          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">75 / 18</div>
          <span className="text-[10px] text-slate-500">75 जिले • 18 मंडल</span>
        </div>

        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">
            {language === 'hi' ? 'विधानसभा / परिषद' : 'Assembly / Council'}
          </span>
          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">403 / 100</div>
          <span className="text-[10px] text-slate-500">लोकसभा: 80 | राज्य: 31</span>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {upSpecialData.sections.map(sec => {
          const isSelected = sec.id === activeSectionId;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSectionId(sec.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {sec.title[language]}
            </button>
          );
        })}
      </div>

      {/* Active Section Content Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {activeSec.title[language]}
          </h2>
          <span className="text-xs text-slate-400">
            {activeSec.topics.length} {language === 'hi' ? 'विषय' : 'topics'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeSec.topics.map((t, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-2 shadow-sm"
            >
              <h3 className="text-sm sm:text-base font-bold text-amber-700 dark:text-amber-400 font-hindi">
                {t.name[language]}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-hindi">
                {t.content[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
