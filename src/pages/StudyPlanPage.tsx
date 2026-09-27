import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Sparkles, 
  Layers, 
  Target, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StudyPlanPage: React.FC = () => {
  const { language, progress, updateStudyPlan } = useApp();

  const [examDate, setExamDate] = useState<string>(progress.studyPlan?.examDate || '2026-12-15');
  const [dailyHours, setDailyHours] = useState<number>(progress.studyPlan?.dailyHours || 6);
  const [hindiLevel, setHindiLevel] = useState<string>('Intermediate');
  const [gsLevel, setGsLevel] = useState<string>('Intermediate');
  const [generatedPlan, setGeneratedPlan] = useState<boolean>(!!progress.studyPlan);

  const handleGenerate = () => {
    const plan = {
      examDate,
      dailyHours,
      targetStage: 'Prelims + Mains Integrated',
      createdDate: new Date().toISOString(),
      customMilestones: [
        { week: 1, focus: 'Hindi Vilom + Tatsam & UP GK History', done: true },
        { week: 2, focus: 'Polity (Fundamental Rights, Parliament) & Modern History 1857', done: false },
        { week: 3, focus: 'Geography (Indian Rivers, Monsoon) & UP ODOP Schemes', done: false },
        { week: 4, focus: 'General Science (Biology Human Body) & Full Hindi 60-Q Mock', done: false },
        { week: 5, focus: 'Mains Drafting (Official Letter & Office Memo) + Essay Brainstorming', done: false },
        { week: 6, focus: 'PYQ 2016-2021 Complete Drill & Full 200-Q Mock', done: false }
      ]
    };
    updateStudyPlan(plan);
    setGeneratedPlan(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
              <Calendar className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'स्मार्ट अध्ययन योजना निर्माता (Study Plan Generator)' : 'Smart Study Plan Generator'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? 'दैनिक घंटों व परीक्षा तिथि के अनुसार व्यक्तिगत दैनिक, साप्ताहिक एवं मासिक अध्ययन योजना'
              : 'Personalized schedule tailored to your available daily hours and target exam date'}
          </p>
        </div>
      </div>

      {/* Input Parameters Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          {language === 'hi' ? 'अपनी तैयारी की वर्तमान स्थिति चुनें:' : 'Select Preparation Profile:'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {language === 'hi' ? 'लक्षित परीक्षा तिथि:' : 'Target Exam Date:'}
            </label>
            <input
              type="date"
              value={examDate}
              onChange={e => setExamDate(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono text-xs focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {language === 'hi' ? 'दैनिक उपलब्ध घंटे:' : 'Daily Available Hours:'}
            </label>
            <select
              value={dailyHours}
              onChange={e => setDailyHours(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:ring-1 focus:ring-indigo-500"
            >
              <option value={4}>4 {language === 'hi' ? 'घंटे (कार्यरत अभ्यर्थी)' : 'Hours (Working professional)'}</option>
              <option value={6}>6 {language === 'hi' ? 'घंटे (मानक)' : 'Hours (Standard)'}</option>
              <option value={8}>8 {language === 'hi' ? 'घंटे (पूर्णकालिक)' : 'Hours (Full-time student)'}</option>
              <option value={10}>10+ {language === 'hi' ? 'घंटे (गहन तैयारी)' : 'Hours (Intensive)'}</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {language === 'hi' ? 'सामान्य हिन्दी का स्तर:' : 'General Hindi Comfort:'}
            </label>
            <select
              value={hindiLevel}
              onChange={e => setHindiLevel(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Beginner">{language === 'hi' ? 'प्रारंभिक (Beginner)' : 'Beginner'}</option>
              <option value="Intermediate">{language === 'hi' ? 'मध्यम (45-50 स्कोर)' : 'Intermediate (45-50)'}</option>
              <option value="Advanced">{language === 'hi' ? 'उच्च (55+ लक्ष्य)' : 'Advanced (55+ target)'}</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {language === 'hi' ? 'सामान्य अध्ययन स्तर:' : 'GS Preparation Level:'}
            </label>
            <select
              value={gsLevel}
              onChange={e => setGsLevel(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Beginner">{language === 'hi' ? 'नया छात्र (NCERT शुरू)' : 'Beginner (Starting NCERT)'}</option>
              <option value="Intermediate">{language === 'hi' ? 'एक बार पाठ्यक्रम पूर्ण' : 'Intermediate (1 cycle complete)'}</option>
              <option value="Advanced">{language === 'hi' ? 'मॉक एवं रिवीजन स्तर' : 'Advanced (Mock & Revision mode)'}</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleGenerate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'hi' ? 'अध्ययन योजना जनरेट करें' : 'Generate Study Routine'}</span>
          </button>
        </div>
      </div>

      {/* Generated Schedule Details */}
      {generatedPlan && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'आपकी दैनिक एवं साप्ताहिक अध्ययन समयसारिणी' : 'Your Customized Study Blueprint'}
              </h2>
              <span className="text-xs text-slate-500">
                {dailyHours} {language === 'hi' ? 'घंटे प्रतिदिन' : 'Hours/Day'} • {language === 'hi' ? 'लक्षित तिथि:' : 'Target Date:'} {examDate}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
              {language === 'hi' ? 'सक्रिय योजना' : 'Active Plan'}
            </span>
          </div>

          {/* Daily Schedule Slotting */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
              <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center space-x-1.5">
                <Clock className="w-4 h-4" />
                <span>सत्र 1 (प्रातः 2 घंटे) - सामान्य हिन्दी</span>
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                विलोम, तत्सम-तद्भव, विशेष्य-विशेषण के 50 शब्द दैनिक याद करें और 20 अभ्यास प्रश्न हल करें।
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
              <span className="font-bold text-indigo-700 dark:text-indigo-400 flex items-center space-x-1.5">
                <Clock className="w-4 h-4" />
                <span>सत्र 2 (दोपहर 2.5 घंटे) - कोर GS + UP GK</span>
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                राजव्यवस्था (लक्ष्मीकांत) / आधुनिक इतिहास + उत्तर प्रदेश के 2 जिले (ODOP एवं नदियां)।
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1.5">
                <Clock className="w-4 h-4" />
                <span>सत्र 3 (सायं 1.5 घंटे) - PYQ व आलेखन</span>
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                विगत वर्षों के 30 प्रश्न हल करें, एक शासकीय पत्र का प्रारूप लिखें व गलतियों को 'My Mistakes' में दोहराएं।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
