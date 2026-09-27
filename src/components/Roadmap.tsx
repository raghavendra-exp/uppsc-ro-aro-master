import React from 'react';
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  Compass, 
  BookOpen, 
  Landmark, 
  Award, 
  FileText, 
  PenTool, 
  Zap, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface RoadmapProps {
  onNavigateTab: (tab: string) => void;
}

export const Roadmap: React.FC<RoadmapProps> = ({ onNavigateTab }) => {
  const { language } = useApp();

  const levels = [
    {
      level: 0,
      title: { hi: "परीक्षा स्वरूप एवं पात्रता समझें", en: "Understand Exam & Eligibility" },
      desc: { hi: "परीक्षा पैटर्न, 1/3 नेगेटिव मार्किंग, ओ-लेवल समकक्षता, हिन्दी टंकण (25 wpm)।", en: "Exam scheme, 1/3 negative marking, O-level criteria, Hindi typing (25 wpm)." },
      targetTab: 'syllabus',
      icon: Compass,
      color: "from-blue-500 to-indigo-600"
    },
    {
      level: 1,
      title: { hi: "बुनियादी NCERT + सामान्य हिन्दी", en: "Foundational NCERT + Hindi" },
      desc: { hi: "कक्षा 6-12 NCERT और प्रारंभिक हिन्दी के 6 बुनियादी विषय (विलोम, शुद्धि, तत्सम)।", en: "Class 6-12 NCERT mapping & 6 Prelims Hindi core modules." },
      targetTab: 'books',
      icon: BookOpen,
      color: "from-teal-500 to-emerald-600"
    },
    {
      level: 2,
      title: { hi: "कोर जनरल स्टडीज (GS)", en: "Core General Studies" },
      desc: { hi: "भारतीय राजव्यवस्था (लक्ष्मीकांत), भारत का इतिहास, भूगोल एवं सामान्य विज्ञान।", en: "Indian Polity (Laxmikanth), History, Geography & General Science." },
      targetTab: 'prelims',
      icon: Landmark,
      color: "from-amber-500 to-orange-600"
    },
    {
      level: 3,
      title: { hi: "उत्तर प्रदेश विशेष ज्ञान (UP GK)", en: "UP Special Knowledge Mastery" },
      desc: { hi: "उ.प्र. इतिहास, 1857, नदियां, मेले, संस्कृति, ओडीओपी (ODOP) एवं समसामयिकी।", en: "UP history, rivers, fairs, culture, ODOP districts & state events." },
      targetTab: 'up-gk',
      icon: Sparkles,
      color: "from-yellow-500 to-amber-600"
    },
    {
      level: 4,
      title: { hi: "भारतीय राष्ट्रीय आन्दोलन (INM)", en: "Indian National Movement" },
      desc: { hi: "1857 से 1947 तक: चौरी-चौरा, काकोरी, बलिया समानांतर सरकार एवं उ.प्र. योगदान।", en: "1857 to 1947: Chauri Chaura, Kakori, Ballia parallel govt & UP freedom legacy." },
      targetTab: 'inm-timeline',
      icon: Zap,
      color: "from-red-500 to-rose-600"
    },
    {
      level: 5,
      title: { hi: "गत वर्ष प्रश्न (PYQ 2013-2024)", en: "Official PYQ Analysis" },
      desc: { hi: "वास्तविक परीक्षा प्रश्नों का विषयवार विश्लेषण और आवृत्ति प्रवृत्तियां।", en: "Authentic UPPSC papers analysis, subject trends and repeat concepts." },
      targetTab: 'pyq',
      icon: Award,
      color: "from-purple-500 to-violet-600"
    },
    {
      level: 6,
      title: { hi: "प्रारंभिक परीक्षा पूर्ण मॉक टेस्ट", en: "Prelims Full Mocks" },
      desc: { hi: "140 प्रश्न GS + 60 प्रश्न हिन्दी (कुल 200 प्रश्न, 3 घंटे, 1/3 नेगेटिव मार्किंग)।", en: "140 GS + 60 Hindi full 200-question timed simulation with 0.33 deduction." },
      targetTab: 'mocks',
      icon: Award,
      color: "from-pink-500 to-rose-600"
    },
    {
      level: 7,
      title: { hi: "मुख्य परीक्षा: हिन्दी एवं आलेखन लैब", en: "Mains Hindi & Drafting Lab" },
      desc: { hi: "शासकीय/अर्धशासकीय पत्र, कार्यालय ज्ञाप, परिपत्र, सारणी रूप सार व प्रशासनिक शब्दावली।", en: "9 official correspondence formats, tabular précis & administrative vocabulary." },
      targetTab: 'drafting',
      icon: FileText,
      color: "from-amber-600 to-orange-700"
    },
    {
      level: 8,
      title: { hi: "मुख्य परीक्षा: 600 शब्द निबंध लैब", en: "Mains 600-Word Essay Lab" },
      desc: { hi: "साहित्य/संस्कृति, विज्ञान/अर्थव्यवस्था, आपदा/योजनाएं (3 निबंध x 40 अंक = 120 अंक)।", en: "Sections A, B, C structured essay frameworks, UP perspective & word-counter." },
      targetTab: 'essay',
      icon: PenTool,
      color: "from-indigo-600 to-blue-700"
    },
    {
      level: 9,
      title: { hi: "संपूर्ण मुख्य परीक्षा सिमुलेशन", en: "Complete Mains Simulation" },
      desc: { hi: "400 अंक: GS (120) + हिन्दी आलेखन (100) + शब्दावली (60) + निबंध (120)।", en: "Full 400 marks multi-paper Mains examination simulation." },
      targetTab: 'mocks',
      icon: Award,
      color: "from-emerald-600 to-teal-700"
    },
    {
      level: 10,
      title: { hi: "दैनिक अंतराल पुनरावृत्ति (Spaced Revision)", en: "Spaced Repetition & Revision" },
      desc: { hi: "1-3-7-15-30 दिन का रिवीजन चक्र, 'मेरी गलतियां' डायरी एवं रैपिड फैक्ट्स।", en: "1-3-7-15-30 day memory cycles, Error Notebook & Rapid 1000 facts." },
      targetTab: 'analytics',
      icon: RotateCcw,
      color: "from-slate-700 to-slate-900"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <Compass className="w-5 h-5" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'शून्य से समीक्षा अधिकारी: 10-चरणीय रोडमैप' : 'Zero to Master: 10-Stage Visual Roadmap'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi' 
              ? 'ZERO → FOUNDATION → CONCEPT → PRACTICE → PYQ → MAINS → DRAFTING → ESSAY → MOCK → REVISION' 
              : 'Structured scientific pathway to clear UPPSC Review Officer & Assistant Review Officer'}
          </p>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-lg font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'वैज्ञानिक तैयारी पद्धति' : 'Scientifically Structured'}</span>
        </div>
      </div>

      <div className="relative">
        {/* Connecting line */}
        <div className="hidden lg:block absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200 dark:bg-slate-800" />

        <div className="space-y-3 sm:space-y-4">
          {levels.map((lvl) => {
            const Icon = lvl.icon;
            return (
              <div
                key={lvl.level}
                onClick={() => onNavigateTab(lvl.targetTab)}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-amber-300 dark:hover:border-amber-600/50 hover:shadow-md transition-all cursor-pointer gap-3"
              >
                <div className="flex items-start sm:items-center space-x-3.5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${lvl.color} text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0 ring-2 ring-white dark:ring-slate-900`}>
                    L{lvl.level}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {lvl.title[language]}
                      </h4>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        Level {lvl.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {lvl.desc[language]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-semibold text-amber-700 dark:text-amber-400 self-end sm:self-center shrink-0">
                  <span>{language === 'hi' ? 'प्रारंभ करें' : 'Explore'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
