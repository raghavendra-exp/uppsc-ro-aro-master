import React, { useState } from 'react';
import { 
  BookOpen, 
  GitCompare, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ExternalLink, 
  Layers, 
  ChevronDown, 
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import syllabusData from '../data/roaro-syllabus.json';
import version2026 from '../data/exams/ro-aro/ro-aro-2026.json';
import version2023 from '../data/exams/ro-aro/ro-aro-2023.json';

interface SyllabusPageProps {
  onNavigatePractice: (subject: string, topic?: string) => void;
}

export const SyllabusPage: React.FC<SyllabusPageProps> = ({ onNavigatePractice }) => {
  const { language, activeVersion, selectVersion, allVersions } = useApp();
  const [activeTab, setActiveTab] = useState<'syllabus' | 'comparison'>('syllabus');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({
    'gs-science': true,
    'gs-history': true,
    'gs-inm': true,
    'gs-up-special': true,
    'hindi-vilom': true
  });

  const toggleTopic = (id: string) => {
    setExpandedTopics(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'उत्तर प्रदेश RO/ARO आधिकारिक पाठ्यक्रम' : 'UPPSC RO/ARO Official Syllabus & Pattern'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi' 
              ? 'प्रारंभिक (200 अंक) एवं मुख्य परीक्षा (400 अंक) का संपूर्ण प्रामाणिक पाठ्यक्रम एवं तुलना' 
              : 'Complete verified syllabus hierarchy for Prelims (200 Marks) and Mains (400 Marks)'}
          </p>
        </div>

        {/* View Switcher: Full Syllabus vs What Changed? */}
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start md:self-center">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'syllabus'
                ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'hi' ? 'संपूर्ण पाठ्यक्रम' : 'Full Syllabus'}
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'comparison'
                ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'hi' ? 'क्या बदला? (What Changed?)' : 'What Changed?'}</span>
          </button>
        </div>
      </div>

      {/* Pattern Version Selector Banner */}
      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-600 text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'वर्तमान सक्रिय पैटर्न:' : 'Active Pattern:'} {activeVersion.title[language]}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                activeVersion.status === 'CURRENT'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
              }`}>
                {activeVersion.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'hi' ? 'अंतिम सत्यापन:' : 'Last Verified:'} {activeVersion.lastVerified} • {language === 'hi' ? 'नेगेटिव मार्किंग:' : 'Negative Marking:'} {activeVersion.negativeMarking} (1/3)
            </p>
          </div>
        </div>

        {/* Version Switcher Dropdown */}
        <div className="flex items-center space-x-2 self-end sm:self-center">
          <span className="text-xs text-slate-500">{language === 'hi' ? 'संस्करण चुनें:' : 'Version:'}</span>
          <select
            value={activeVersion.id}
            onChange={e => selectVersion(e.target.value)}
            className="text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            {allVersions.map(v => (
              <option key={v.id} value={v.id}>
                {v.versionYear} ({v.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tab 1: Full Syllabus Hierarchy */}
      {activeTab === 'syllabus' && (
        <div className="space-y-8">
          {syllabusData.stages.map(stage => (
            <div key={stage.id} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200 dark:border-amber-900/60">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-amber-600" />
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {stage.title[language]}
                  </h2>
                </div>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full">
                  {language === 'hi' ? `कुल पूर्णांक: ${stage.totalMarks}` : `Total Marks: ${stage.totalMarks}`}
                </span>
              </div>

              <div className="space-y-4">
                {(stage.papers as any[]).map((paper: any) => (
                  <div 
                    key={paper.id} 
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {paper.title[language]}
                        </h3>
                        {paper.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {paper.description[language]}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 text-xs font-semibold text-slate-600 dark:text-slate-400 shrink-0">
                        {paper.questions && (
                          <span>{paper.questions} {language === 'hi' ? 'प्रश्न' : 'Questions'}</span>
                        )}
                        <span>{paper.marks} {language === 'hi' ? 'अंक' : 'Marks'}</span>
                        {paper.durationMinutes && (
                          <span>{paper.durationMinutes} {language === 'hi' ? 'मिनट' : 'Mins'}</span>
                        )}
                      </div>
                    </div>

                    {/* Topics Tree */}
                    {paper.topics && (
                      <div className="space-y-3">
                        {paper.topics.map((t: any) => {
                          const isExp = expandedTopics[t.id];
                          return (
                            <div 
                              key={t.id}
                              className="border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden transition-all bg-slate-50/50 dark:bg-slate-800/30"
                            >
                              <div
                                onClick={() => toggleTopic(t.id)}
                                className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/80 select-none"
                              >
                                <div className="flex items-center space-x-2">
                                  {isExp ? (
                                    <ChevronDown className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                                  )}
                                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                                    {t.title[language]}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {t.estimatedQuestions && (
                                    <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                                      ~{t.estimatedQuestions} {language === 'hi' ? 'प्रश्न' : 'Qs'}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {isExp && (
                                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/70 dark:border-slate-800 space-y-3 text-xs">
                                  <div className="space-y-2">
                                    {t.subtopics.map((st: any, sIdx: number) => (
                                      <div key={sIdx} className="flex items-start space-x-2 text-slate-700 dark:text-slate-300">
                                        <span className="text-amber-600 mt-1">•</span>
                                        <span className="leading-relaxed">{st.name[language]}</span>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-[11px] text-slate-400">
                                      {language === 'hi' ? 'पाठ्यक्रम आधारित अभ्यास' : 'Syllabus Aligned Drill'}
                                    </span>
                                    <button
                                      onClick={() => onNavigatePractice(t.id)}
                                      className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-semibold text-xs transition-colors flex items-center space-x-1"
                                    >
                                      <span>{language === 'hi' ? 'इस विषय से 20 प्रश्न हल करें' : 'Practice 20 Questions'}</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Mains Conventional Sections */}
                    {paper.sections && (
                      <div className="space-y-3">
                        {paper.sections.map((sec: any, sIdx: number) => (
                          <div key={sIdx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
                            <h4 className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400">
                              {sec.title[language]}
                            </h4>
                            {sec.items && (
                              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pl-2">
                                {sec.items.map((it: any, itIdx: number) => (
                                  <li key={itIdx} className="flex items-start space-x-2">
                                    <span className="text-slate-400">✓</span>
                                    <span className="leading-relaxed">{it.name[language]}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: "What Changed?" Comparison View (Requirement #2) */}
      {activeTab === 'comparison' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <GitCompare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>{language === 'hi' ? 'पैटर्न तुलना: क्या बदला? (What Changed?)' : 'Pattern Evolution & Changes'}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {language === 'hi'
                ? 'नवीनतम 2026 चक्र और पूर्ववर्ती 2023 चक्र के मध्य आधिकारिक परिवर्तनों की बिंदुवार तुलना'
                : 'Direct comparison between Current Official Baseline (2026) and 2023 Cycle (Advt A-7/E-1/2023)'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            {/* 2026 Current Version */}
            <div className="p-5 rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base text-emerald-800 dark:text-emerald-300">
                  2026 (नवीनतम आधिकारिक बेसलाइन)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white uppercase">
                  CURRENT
                </span>
              </div>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>OTR अनिवार्यता:</strong> आवेदन से कम से कम 72 घंटे पूर्व OTR पंजीकरण होना अनिवार्य।</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>ओ-लेवल समकक्षता:</strong> 5 मई 2022 के शासनादेश के तहत 28 अधिकृत डिप्लोमा/डिग्री स्पष्टतः मान्य।</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>टंकण दक्षता:</strong> ARO हेतु कम्प्यूटर पर 25 श.प्र.मि. (कुर्तिदेव 010 अथवा मंगल इनस्क्रिप्ट)।</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>ऋणात्मक अंकन:</strong> 1/3 (0.33) नेगेटिव मार्किंग दोनों वस्तुनिष्ठ प्रश्नपत्रों में लागू।</span>
                </li>
              </ul>
            </div>

            {/* 2023 Archived Version */}
            <div className="p-5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3 opacity-90">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base text-slate-700 dark:text-slate-300">
                  2023 (विज्ञापन सं. A-7/E-1/2023)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-400 text-white uppercase">
                  ARCHIVED
                </span>
              </div>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start space-x-2">
                  <span>•</span>
                  <span>प्रारंभिक परीक्षा 11 फरवरी 2024 को आयोजित हुई थी जिसे आयोग द्वारा रद्द कर पुन: परीक्षा कराने का निर्णय लिया गया।</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>•</span>
                  <span>ओटीआर सर्वर दबाव के कारण आवेदन की अंतिम तिथि को 9 नवंबर से बढ़ाकर 24 नवंबर 2023 किया गया था।</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>•</span>
                  <span>मूल पाठ्यक्रम (140 GS + 60 हिन्दी) अपरिवर्तित रहा, परंतु सुरक्षा एवं मूल्यांकन मानकों में व्यापक सुधार किए गए।</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
