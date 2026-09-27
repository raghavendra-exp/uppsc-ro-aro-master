import React from 'react';
import { 
  Award, 
  FileText, 
  PenTool, 
  Layers, 
  Languages, 
  Cpu, 
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MainsPageProps {
  onNavigateTab: (tab: string) => void;
  onNavigatePractice: (subject: string, topic?: string) => void;
}

export const MainsPage: React.FC<MainsPageProps> = ({ onNavigateTab, onNavigatePractice }) => {
  const { language } = useApp();

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-indigo-200">
              STAGE 2 • FINAL MERIT EXAMINATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
              {language === 'hi' ? 'उत्तर प्रदेश RO/ARO मुख्य परीक्षा (Mains)' : 'UPPSC RO/ARO Main Examination System'}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-2xl leading-relaxed">
              {language === 'hi'
                ? 'कुल 400 अंक • सीधा चयन (कोई साक्षात्कार नहीं)। पेपर 1: GS (120 अंक) + पेपर 2: हिन्दी एवं आलेखन (160 अंक) + पेपर 3: हिन्दी निबंध (120 अंक)।'
                : 'Total 400 Marks • Pure Merit Selection (No Interview). Paper 1: GS (120) + Paper 2: Drafting & Vocab (160) + Paper 3: Essay (120).'}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onNavigateTab('mocks')}
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs sm:text-sm shadow-md hover:bg-indigo-50 transition-all flex items-center space-x-1.5"
            >
              <Award className="w-4 h-4 text-indigo-600" />
              <span>{language === 'hi' ? 'मुख्य परीक्षा मॉक टेस्ट' : 'Full Mains Mock'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Core Papers Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Paper 1: GS Objective */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                PAPER I • 120 MARKS
              </span>
              <span className="text-xs font-mono text-slate-500">120 Mins</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              {language === 'hi' ? 'सामान्य अध्ययन (वस्तुनिष्ठ)' : 'General Studies (Objective)'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              {language === 'hi'
                ? '120 बहुविकल्पीय प्रश्न (120 अंक)। प्रारंभिक परीक्षा जैसा ही पाठ्यक्रम परंतु अधिक गहन, तथ्यात्मक एवं वैचारिक प्रश्न।'
                : '120 MCQs (120 Marks). High analytical depth and deeper current affairs integration.'}
            </p>
          </div>

          <button
            onClick={() => onNavigatePractice('General Studies')}
            className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center space-x-1"
          >
            <span>{language === 'hi' ? 'मुख्य परीक्षा GS प्रश्न हल करें' : 'Practice Mains GS Qs'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Paper 2: Hindi & Drafting */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-amber-500/40 dark:border-amber-600/40 p-5 sm:p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                PAPER II • 160 MARKS
              </span>
              <span className="text-xs font-mono text-slate-500">Part A + B</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              {language === 'hi' ? 'सामान्य हिन्दी एवं आलेखन' : 'General Hindi & Drafting'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              {language === 'hi'
                ? 'खंड 1 परंपरागत (100 अंक): गद्यांश सारांश, सारणी रूप सार, 9 प्रकार के पत्राचार, प्रशासनिक शब्दावली, कम्प्यूटर। खंड 2 वस्तुनिष्ठ (60 अंक)।'
                : 'Part 1 Conventional (100 Marks): Passage Précis, Tabular Précis, Correspondence, Vocab, Computer. Part 2 Vocab (60 Marks).'}
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('drafting')}
            className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors flex items-center justify-center space-x-1 shadow-md shadow-amber-600/20"
          >
            <span>{language === 'hi' ? 'आलेखन सिम्युलेटर खोलें' : 'Open Drafting Simulator'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Paper 3: Hindi Essay */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                PAPER III • 120 MARKS
              </span>
              <span className="text-xs font-mono text-slate-500">3 Hours</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              {language === 'hi' ? 'हिन्दी निबंध (3 निबंध x 40 अंक)' : 'Hindi Essay (3 x 40 Marks)'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              {language === 'hi'
                ? 'प्रत्येक निबंध की शब्द सीमा 600 शब्द। खंड क (साहित्य-संस्कृति), खंड ख (विज्ञान-अर्थव्यवस्था), खंड ग (राष्ट्रीय-आपदाएं)।'
                : '600 words per essay. Section A (Literature/Culture), Section B (Science/Economy), Section C (Disasters/National events).'}
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('essay')}
            className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center space-x-1"
          >
            <span>{language === 'hi' ? '600 शब्द निबंध लैब खोलें' : 'Open 600-Word Essay Lab'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
