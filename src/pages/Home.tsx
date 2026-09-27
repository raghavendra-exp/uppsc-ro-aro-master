import React from 'react';
import { 
  BookOpen, 
  CheckSquare, 
  Award, 
  FileText, 
  PenTool, 
  Landmark, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Calendar, 
  AlertCircle,
  ArrowRight,
  Brain,
  Zap,
  RotateCcw,
  Target,
  Clock,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Roadmap } from '../components/Roadmap';
import subjectsData from '../data/subjects.json';
import currentAffairsData from '../data/current-affairs.json';
import notificationsData from '../data/notifications.json';

interface HomeProps {
  onNavigateTab: (tab: string, meta?: any) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigateTab }) => {
  const { language, activeVersion, progress } = useApp();
  const activeNotif = notificationsData[0];
  const latestCA = currentAffairsData[0];

  const primaryCards = [
    {
      id: 'prelims',
      title: { hi: 'आरओ/एआरओ प्रारंभिक परीक्षा', en: 'RO/ARO Prelims Engine' },
      subtitle: { hi: 'सामान्य अध्ययन (140 प्रश्न) + सामान्य हिन्दी (60 प्रश्न)', en: 'GS Paper I (140 Qs) + General Hindi (60 Qs)' },
      icon: Target,
      color: 'from-amber-500 to-orange-600',
      badge: { hi: '200 प्रश्न • 200 अंक', en: '200 Qs • 200 Marks' }
    },
    {
      id: 'mains',
      title: { hi: 'आरओ/एआरओ मुख्य परीक्षा', en: 'RO/ARO Mains Engine' },
      subtitle: { hi: 'GS (120 अंक) + आलेखन (100) + शब्दावली (60) + निबंध (120)', en: 'GS (120) + Drafting (100) + Vocab (60) + Essay (120)' },
      icon: Award,
      color: 'from-indigo-600 to-purple-700',
      badge: { hi: '400 अंक • सीधा चयन', en: '400 Marks • Merit' }
    },
    {
      id: 'drafting',
      title: { hi: 'शासकीय आलेखन एवं पत्राचार लैब', en: 'Official Drafting Simulator' },
      subtitle: { hi: 'शासकीय/अर्धशासकीय पत्र, कार्यालय ज्ञाप, परिपत्र, सारणी रूप', en: 'Official, D.O. Letter, O.M., Circular, Tabular Précis' },
      icon: FileText,
      color: 'from-rose-500 to-red-600',
      badge: { hi: 'संरचनात्मक परीक्षक', en: 'Format Evaluator' }
    },
    {
      id: 'essay',
      title: { hi: '600 शब्द हिन्दी निबंध लैब', en: '600-Word Hindi Essay Lab' },
      subtitle: { hi: 'साहित्य, विज्ञान, आपदा, उ.प्र. परिप्रेक्ष्य, टाइमर व वर्ड-काउंटर', en: 'Literature, Science, Calamities, UP View, Word Counter' },
      icon: PenTool,
      color: 'from-emerald-600 to-teal-700',
      badge: { hi: '3 निबंध • 120 अंक', en: '3 Essays • 120 Marks' }
    },
    {
      id: 'practice',
      title: { hi: '1,000+ प्रामाणिक अभ्यास प्रश्न बैंक', en: '1,000+ Practice Question Bank' },
      subtitle: { hi: 'समस्त विषयों के द्विभाषी बहुविकल्पीय प्रश्न व विस्तृत व्याख्या', en: 'All-subject bilingual MCQs with rich explanations' },
      icon: CheckSquare,
      color: 'from-blue-600 to-cyan-700',
      badge: { hi: '1,051 प्रश्न लोड किए गए', en: '1,051 Qs Ready' }
    },
    {
      id: 'pyq',
      title: { hi: 'PYQ बैंक (2013-2024)', en: 'Official PYQ Bank (2013-2024)' },
      subtitle: { hi: 'आधिकारिक प्रश्न, विषयवार विश्लेषण एवं आवृत्ति प्रवृत्तियां', en: 'Official papers, topic trends & repeat frequency' },
      icon: Layers,
      color: 'from-violet-600 to-indigo-800',
      badge: { hi: 'आधिकारिक हल सहित', en: 'With Official Keys' }
    },
    {
      id: 'mocks',
      title: { hi: 'पूर्ण मॉक टेस्ट सिमुलेटर', en: 'Full Mock Test Simulator' },
      subtitle: { hi: '140 GS, 60 हिन्दी, 200 कम्प्लीट, 1/3 नेगेटिव मार्किंग, टाइमर', en: '140 GS, 60 Hindi, 200 Prelims, 0.33 Negative Marks' },
      icon: Clock,
      color: 'from-amber-600 to-yellow-600',
      badge: { hi: 'परीक्षा जैसी स्क्रीन', en: 'Exam Simulation' }
    },
    {
      id: 'up-gk',
      title: { hi: 'उत्तर प्रदेश समग्र विशेष ज्ञान', en: 'UP Special Knowledge Hub' },
      subtitle: { hi: 'इतिहास, भूगोल, अर्थव्यवस्था, ODOP, संस्कृति, मेले व समसामयिकी', en: 'UP History, Geography, Economy, ODOP, Culture & Fairs' },
      icon: Landmark,
      color: 'from-orange-500 to-amber-700',
      badge: { hi: '18-20 प्रश्न वेटेज', en: '18-20 Qs Weightage' }
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {language === 'hi'
                ? `नवीनतम आधिकारिक पैटर्न (${activeVersion.versionYear}) सक्रिय`
                : `Latest Official Pattern (${activeVersion.versionYear}) Active`}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3">
            UPPSC RO/ARO <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200">Master</span>
          </h1>

          <p className="text-base sm:text-xl font-medium text-amber-100/90 mb-2 font-hindi">
            {language === 'hi'
              ? 'समीक्षा अधिकारी एवं सहायक समीक्षा अधिकारी संपूर्ण तैयारी प्रणाली'
              : 'Complete Review Officer & Assistant Review Officer Preparation System'}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mb-6">
            {language === 'hi'
              ? '"अधिक सटीकता से पढ़ें। अधिक गहराई से अभ्यास करें। अधिक श्रेष्ठता से लिखें।" शून्य से लेकर अंतिम चयन तक की संपूर्ण एकीकृत डिजिटल मार्गदर्शिका।'
              : '"Prepare smarter. Practice deeper. Write better." The comprehensive zero-to-master digital coaching, notes, drafting lab and question engine.'}
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('practice')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-600/30 transition-all flex items-center space-x-2"
            >
              <CheckSquare className="w-4 h-4" />
              <span>{language === 'hi' ? '1,000+ प्रश्न अभ्यास शुरू करें' : 'Start 1,000+ Qs Practice'}</span>
            </button>

            <button
              onClick={() => onNavigateTab('drafting')}
              className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs sm:text-sm transition-all flex items-center space-x-2"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? 'शासकीय आलेखन लैब' : 'Drafting Simulator'}</span>
            </button>

            <button
              onClick={() => onNavigateTab('syllabus')}
              className="px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/10 text-slate-300 font-medium text-xs sm:text-sm transition-colors flex items-center space-x-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>{language === 'hi' ? 'पाठ्यक्रम देखें' : 'View Syllabus'}</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Chips on Hero */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-800/40 backdrop-blur rounded-xl p-3 border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'hi' ? 'कुल प्रश्न बैंक' : 'Questions Ready'}
            </span>
            <div className="text-xl font-bold text-amber-400 mt-0.5">1,051+</div>
            <span className="text-[10px] text-emerald-400">100% Bilingual</span>
          </div>

          <div className="bg-slate-800/40 backdrop-blur rounded-xl p-3 border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'hi' ? 'प्रारंभिक परीक्षा' : 'Prelims Target'}
            </span>
            <div className="text-xl font-bold text-white mt-0.5">200 {language === 'hi' ? 'अंक' : 'Marks'}</div>
            <span className="text-[10px] text-amber-300">140 GS + 60 Hindi</span>
          </div>

          <div className="bg-slate-800/40 backdrop-blur rounded-xl p-3 border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'hi' ? 'मुख्य परीक्षा' : 'Mains Target'}
            </span>
            <div className="text-xl font-bold text-white mt-0.5">400 {language === 'hi' ? 'अंक' : 'Marks'}</div>
            <span className="text-[10px] text-indigo-300">{language === 'hi' ? 'सीधा चयन (नो इंटरव्यू)' : 'Direct Merit (No Interview)'}</span>
          </div>

          <div className="bg-slate-800/40 backdrop-blur rounded-xl p-3 border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {language === 'hi' ? 'आपका अध्ययन स्ट्रीक' : 'Study Streak'}
            </span>
            <div className="text-xl font-bold text-orange-400 mt-0.5">{progress.studyStreakDays} {language === 'hi' ? 'दिन' : 'Days'} 🔥</div>
            <span className="text-[10px] text-slate-300">{progress.questionsAttempted} {language === 'hi' ? 'हल किए' : 'Attempted'}</span>
          </div>
        </div>
      </section>

      {/* Official Alert Banner */}
      <section className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wide">
                {language === 'hi' ? 'आधिकारिक सूचना केंद्र:' : 'Official Notification Notice:'}
              </span>
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                {activeNotif.officialNotificationNumber}
              </span>
            </div>
            <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-0.5 leading-relaxed">
              {language === 'hi'
                ? `कुल 411 पद (समीक्षा अधिकारी 322 पद, सहायक समीक्षा अधिकारी 40 पद)। 1/3 ऋणात्मक अंकन प्रणाली। OTR अनिवार्य।`
                : `Total 411 Vacancies (RO: 322, ARO: 40). 1/3 Negative Marking strictly applicable. OTR Mandatory.`}
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigateTab('notices')}
          className="self-end sm:self-center px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors shrink-0 flex items-center space-x-1"
        >
          <span>{language === 'hi' ? 'विवरण देखें' : 'View Details'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* Syllabus Coverage Dashboard (Requirement #81) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'पाठ्यक्रम व्याप्ति स्थिति (Syllabus Coverage)' : 'Complete Syllabus Coverage Meter'}
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md">
            100% Comprehensive
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200">
              <span>{language === 'hi' ? 'प्रारंभिक परीक्षा पेपर-1 (सामान्य अध्ययन)' : 'Prelims Paper 1 (General Studies)'}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">140/140 (100%)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-full" />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>विज्ञान • इतिहास • INM • राजव्यवस्था • भूगोल • अर्थव्यवस्था • UP GK</span>
              <span>10 Topics</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200">
              <span>{language === 'hi' ? 'प्रारंभिक परीक्षा पेपर-2 (सामान्य हिन्दी)' : 'Prelims Paper 2 (General Hindi)'}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">60/60 (100%)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-full" />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>विलोम • वाक्य शुद्धि • अनेक शब्द • तत्सम • विशेष्य • पर्यायवाची</span>
              <span>6 Modules</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200">
              <span>{language === 'hi' ? 'मुख्य परीक्षा पेपर-2 (हिन्दी एवं आलेखन)' : 'Mains Paper 2 (Hindi & Drafting)'}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">160/160 (100%)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-full" />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>सारणी रूप • 9 पत्राचार प्रारूप • प्रशासनिक शब्दावली • कम्प्यूटर</span>
              <span>Part A + B</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200">
              <span>{language === 'hi' ? 'मुख्य परीक्षा पेपर-3 (हिन्दी निबंध 600 शब्द)' : 'Mains Paper 3 (Hindi Essay 600 Words)'}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">120/120 (100%)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-full" />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>खंड क (साहित्य) • खंड ख (विज्ञान/अर्थ) • खंड ग (आपदा/योजनाएं)</span>
              <span>3 Essays</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Preparation Pillars Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'आरओ/एआरओ कमांड सेंटर' : 'RO/ARO Command Center'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'hi' ? 'प्रत्येक चरण हेतु समर्पित एवं विशिष्ट तैयारी मॉड्यूल' : 'Dedicated preparation engines across Prelims, Mains & Drafting'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {primaryCards.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigateTab(card.id)}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 hover:border-amber-300 dark:hover:border-amber-600/50 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-md shadow-amber-600/10`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                      {card.badge[language]}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {card.title[language]}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {card.subtitle[language]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400">
                  <span>{language === 'hi' ? 'खोलें' : 'Open Module'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Zero to Master 10-level Visual Roadmap */}
      <section>
        <Roadmap onNavigateTab={onNavigateTab} />
      </section>

      {/* Secondary Fast Tools: INM, Hindi Master, Mistakes Notebook, Spaced Revision */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* INM Box */}
        <div 
          onClick={() => onNavigateTab('inm-timeline')}
          className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl border border-red-200 dark:border-red-900/50 p-5 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center space-x-2 text-red-700 dark:text-red-400 font-bold text-sm mb-1.5">
            <Zap className="w-4 h-4" />
            <span>{language === 'hi' ? 'भारतीय राष्ट्रीय आन्दोलन' : 'Indian National Movement'}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
            {language === 'hi'
              ? '1857, काकोरी, चौरी-चौरा, बलिया व स्वतंत्रता संग्राम की पूरी समयरेखा एवं उ.प्र. का ऐतिहासिक योगदान।'
              : '1857 to 1947 high-priority timeline: Leaders, causes, UP connection, and PYQs.'}
          </p>
          <span className="text-xs font-bold text-red-700 dark:text-red-400 flex items-center">
            {language === 'hi' ? 'समयरेखा देखें' : 'Explore Timeline'} <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </span>
        </div>

        {/* Mistakes Notebook Box */}
        <div 
          onClick={() => onNavigateTab('analytics')}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-2xl border border-purple-200 dark:border-purple-900/50 p-5 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400 font-bold text-sm mb-1.5">
            <RotateCcw className="w-4 h-4" />
            <span>{language === 'hi' ? 'मेरी गलतियां (Error Notebook)' : 'My Mistakes Notebook'}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
            {language === 'hi'
              ? `क्विज में गलत हुए ${progress.mistakes.length} प्रश्न स्वतः संग्रहीत हैं। पुनः अभ्यास कर अपनी कमियों को दूर करें।`
              : `${progress.mistakes.length} missed questions tracked automatically. Re-practice to master weak areas.`}
          </p>
          <span className="text-xs font-bold text-purple-700 dark:text-purple-400 flex items-center">
            {language === 'hi' ? 'गलतियां सुधारें' : 'Review Mistakes'} <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </span>
        </div>

        {/* Rapid Revision & Flashcards Box */}
        <div 
          onClick={() => onNavigateTab('revision')}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 p-5 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-1.5">
            <Brain className="w-4 h-4" />
            <span>{language === 'hi' ? 'रैपिड रिवीजन एवं फ्लैशकार्ड' : 'Rapid Revision & Flashcards'}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
            {language === 'hi'
              ? '100, 500, 1000 फैक्ट्स ड्रिल, इंटरएक्टिव 3D फ्लैशकार्ड एवं 1/3 नेगेटिव मार्किंग की अचूक ट्रिक्स।'
              : '100-500-1000 Facts rapid drill, interactive flashcards & elimination shortcuts.'}
          </p>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center">
            {language === 'hi' ? 'फास्ट रिवीजन करें' : 'Fast Revision'} <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </span>
        </div>
      </section>
    </div>
  );
};
