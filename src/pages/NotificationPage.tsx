import React, { useState } from 'react';
import { 
  Bell, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle, 
  Calendar, 
  Users, 
  Award, 
  AlertCircle,
  Clock,
  FileText,
  DollarSign,
  Scale,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import notificationsData from '../data/notifications.json';
import sourcesData from '../data/sources.json';

export const NotificationPage: React.FC = () => {
  const { language } = useApp();
  const notif = notificationsData[0];
  const [activeTab, setActiveTab] = useState<'vacancies' | 'dates-fees' | 'rules-eligibility' | 'cm-fellowship'>('vacancies');

  return (
    <div className="space-y-6 pb-12">
      {/* Official Alert Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm">
                LATEST OFFICIAL NOTIFICATION 2026
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400 text-emerald-950">
                {notif.status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === 'hi' 
                ? 'उ.प्र. लोक सेवा आयोग RO/ARO आधिकारिक अधिसूचना 2026' 
                : 'UPPSC RO/ARO Official Notification 2026'}
            </h1>
            <p className="text-xs sm:text-sm text-amber-50 leading-relaxed max-w-2xl">
              {language === 'hi'
                ? `विज्ञापन संख्या: ${notif.officialNotificationNumber} • दिनांक: ${notif.officialNotificationDate} • कुल 501 पद (सामान्य व विशेष चयन) • नया 800 अंक मुख्य परीक्षा पैटर्न`
                : `Advt No: ${notif.officialNotificationNumber} • Date: ${notif.officialNotificationDate} • 501 Total Vacancies • New 800-Mark Mains Examination Pattern`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <a
              href={notif.otrPortalUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white text-amber-900 font-bold text-xs sm:text-sm shadow-md hover:bg-amber-50 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>{language === 'hi' ? 'OTR पोर्टल (72 घंटे पूर्व)' : 'OTR Registration Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={notif.officialSourceUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-amber-900/40 text-white font-bold text-xs sm:text-sm border border-white/30 hover:bg-amber-900/60 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>{language === 'hi' ? 'UPPSC पोर्टल पर आवेदन' : 'Apply on UPPSC'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-500 uppercase">कुल रिक्तियां (Total Posts)</span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">501</div>
          <span className="text-[10px] text-emerald-600 font-semibold">495 General + 6 Special</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-500 uppercase">आवेदन अंतिम तिथि (Last Date)</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">26/11/2026</div>
          <span className="text-[10px] text-amber-600 font-semibold">संशोधन: 03/12/2026</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-500 uppercase">मुख्य परीक्षा (Mains Marks)</span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">800</div>
          <span className="text-[10px] text-indigo-500 font-semibold">4 वर्णनात्मक प्रश्नपत्र (200x4)</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-500 uppercase">नेगेटिव मार्किंग (Penalty)</span>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">-0.33</div>
          <span className="text-[10px] text-slate-500 font-semibold">1/3 Deducted per wrong</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('vacancies')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'vacancies'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          {language === 'hi' ? 'पदवार रिक्तियां (501 पद)' : 'Vacancies Breakdown (501 Posts)'}
        </button>
        <button
          onClick={() => setActiveTab('dates-fees')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'dates-fees'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          {language === 'hi' ? 'महत्वपूर्ण तिथियां एवं शुल्क' : 'Key Dates & Application Fee'}
        </button>
        <button
          onClick={() => setActiveTab('rules-eligibility')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'rules-eligibility'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          {language === 'hi' ? 'अर्हता, टाइपिंग एवं नकल विरोधी कानून 2024' : 'Eligibility, Typing & Anti-Cheat Act'}
        </button>
        <button
          onClick={() => setActiveTab('cm-fellowship')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'cm-fellowship'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          {language === 'hi' ? 'मुख्यमंत्री फेलोशिप वेटेज नियम' : 'CM Fellowship Rules'}
        </button>
      </div>

      {/* Tab 1: Detailed Vacancy Breakdown */}
      {activeTab === 'vacancies' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'आधिकारिक श्रेणीवार एवं विभागवार रिक्तियों का विवरण' : 'Official Department & Category-wise Vacancies Table'}
              </h2>
              <p className="text-xs text-slate-500">विज्ञापन संख्या: {notif.officialNotificationNumber} (दिनांक: 26/10/2026)</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 rounded-full border border-amber-200 dark:border-amber-800">
              पे-स्केल: लेवल-5 (₹29,200 - 64,700) से लेवल-8 (₹47,600 - 1,51,100)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3">क्र.</th>
                  <th className="p-3">पद का नाम (Post)</th>
                  <th className="p-3">विभाग (Department)</th>
                  <th className="p-3 text-center">कुल</th>
                  <th className="p-2 text-center text-slate-600 dark:text-slate-400">UR</th>
                  <th className="p-2 text-center text-slate-600 dark:text-slate-400">SC</th>
                  <th className="p-2 text-center text-slate-600 dark:text-slate-400">ST</th>
                  <th className="p-2 text-center text-slate-600 dark:text-slate-400">OBC</th>
                  <th className="p-2 text-center text-slate-600 dark:text-slate-400">EWS</th>
                  <th className="p-2 text-center text-slate-600 dark:text-slate-400">महिला</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {notif.categoryWiseBreakdown.map((row: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{row.post}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{row.dept}</td>
                    <td className="p-3 font-mono font-black text-center text-amber-600 dark:text-amber-400 text-sm bg-amber-50/50 dark:bg-amber-950/20">{row.total}</td>
                    <td className="p-2 font-mono text-center">{row.ur}</td>
                    <td className="p-2 font-mono text-center">{row.sc}</td>
                    <td className="p-2 font-mono text-center">{row.st}</td>
                    <td className="p-2 font-mono text-center">{row.obc}</td>
                    <td className="p-2 font-mono text-center">{row.ews}</td>
                    <td className="p-2 font-mono text-center font-semibold text-pink-600 dark:text-pink-400">{row.female}</td>
                  </tr>
                ))}
                <tr className="bg-amber-50/80 dark:bg-amber-950/40 font-bold border-t-2 border-amber-300 dark:border-amber-700">
                  <td colSpan={3} className="p-3 text-right text-slate-900 dark:text-white">कुल रिक्तियां (Total Vacancies):</td>
                  <td className="p-3 font-mono font-black text-center text-amber-700 dark:text-amber-300 text-base">501</td>
                  <td colSpan={6} className="p-3 text-slate-500 text-center">495 सामान्य भर्ती + 6 विशेष भर्ती (लेखा)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Key Dates & Application Fee */}
      {activeTab === 'dates-fees' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Dates */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>{language === 'hi' ? 'महत्वपूर्ण आधिकारिक तिथियां' : 'Official Timeline & Deadlines'}</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">ऑनलाइन आवेदन प्रारंभ (Commencement):</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{notif.keyDates.applicationStartDate}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">बैंक में शुल्क जमा करने की अंतिम तिथि:</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{notif.keyDates.feeSubmissionLastDate}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">ऑनलाइन आवेदन सबमिट करने की अंतिम तिथि:</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{notif.keyDates.applicationClosingDate}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">आवेदन में संशोधन/त्रुटि सुधार की अंतिम तिथि:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{notif.keyDates.correctionLastDate}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div className="font-bold">⚠️ OTR (वन टाइम रजिस्ट्रेशन) अनिवार्यता:</div>
              <p>आवेदन करने से कम से कम 72 घंटे पूर्व otr.pariksha.nic.in से OTR नंबर प्राप्त करना अनिवार्य है।</p>
            </div>
          </div>

          {/* Application Fee */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span>{language === 'hi' ? 'श्रेणीवार परीक्षा शुल्क (SBI MOPS)' : 'Application Fee Structure'}</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">अनारक्षित / ई.डब्ल्यू.एस. / अन्य पिछड़ा वर्ग</div>
                  <div className="text-[11px] text-slate-500">परीक्षा शुल्क ₹100 + ऑनलाइन प्रक्रिया ₹25</div>
                </div>
                <span className="text-base font-mono font-black text-amber-600 dark:text-amber-400">₹125/-</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">अनुसूचित जाति (SC) / अनुसूचित जनजाति (ST)</div>
                  <div className="text-[11px] text-slate-500">परीक्षा शुल्क ₹40 + ऑनलाइन प्रक्रिया ₹25</div>
                </div>
                <span className="text-base font-mono font-black text-amber-600 dark:text-amber-400">₹65/-</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">दिव्यांगजन (PwD Candidates)</div>
                  <div className="text-[11px] text-slate-500">परीक्षा शुल्क शून्य + ऑनलाइन प्रक्रिया ₹25</div>
                </div>
                <span className="text-base font-mono font-black text-emerald-600 dark:text-emerald-400">₹25/-</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">भूतपूर्व सैनिक (Ex-Servicemen)</div>
                  <div className="text-[11px] text-slate-500">परीक्षा शुल्क ₹40 + ऑनलाइन प्रक्रिया ₹25</div>
                </div>
                <span className="text-base font-mono font-black text-amber-600 dark:text-amber-400">₹65/-</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Rules, Eligibility & Anti-Cheat Act */}
      {activeTab === 'rules-eligibility' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>{language === 'hi' ? 'समीक्षा अधिकारी (RO) अर्हता' : 'Review Officer (RO) Eligibility'}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-hindi">
                {notif.eligibilitySummary.ro}
              </p>
              <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/20 text-xs text-emerald-800 dark:text-emerald-300">
                ✓ किसी भी मान्यता प्राप्त विश्वविद्यालय से सामान्य स्नातक उपाधि मान्य (कोई कम्प्यूटर डिप्लोमा या टाइपिंग अनिवार्य नहीं)।
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>{language === 'hi' ? 'सहायक समीक्षा अधिकारी (ARO) अर्हता व टाइपिंग' : 'ARO Eligibility & Typing Test'}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-hindi">
                {notif.eligibilitySummary.aro}
              </p>
              <div className="p-3 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-300 space-y-1">
                <div>• <strong>हिन्दी टाइपिंग:</strong> न्यूनतम 25 शब्द प्रति मिनट कम्प्यूटर पर (कृतिदेव 010 अथवा मंगल इनस्क्रिप्ट)।</div>
                <div>• <strong>ओ-लेवल:</strong> DOEACC/NIELIT 'O' लेवल प्रमाणपत्र अथवा शासनादेश दिनांक 05/05/2022 द्वारा निर्धारित समकक्ष डिप्लोमा।</div>
                <div>• <strong>अंग्रेजी टाइपिंग:</strong> ज्ञान रखने वाले अभ्यर्थियों को अधिमान्यता (Preference)।</div>
              </div>
            </div>
          </div>

          {/* Legal Anti-Malpractice & OMR System */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-rose-500/40 p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400">
              <Scale className="w-5 h-5" />
              <h3 className="text-base font-bold">
                {language === 'hi' ? 'उत्तर प्रदेश अनुचित साधन निवारण अधिनियम, 2024 एवं दंडात्मक प्रावधान' : 'UP Prevention of Unfair Means Act 2024 & Penal Provisions'}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 text-slate-700 dark:text-slate-300 space-y-2">
                <div className="font-bold text-rose-700 dark:text-rose-300">कड़े दंडात्मक प्रावधान (Strict Penal Actions):</div>
                <p>परीक्षा में किसी भी प्रकार की नकल, अनुचित साधन या फर्जी प्रमाणपत्र प्रस्तुत करने पर 'उत्तर प्रदेश परीक्षा (अनुचित साधनों का निवारण) अधिनियम, 2024' (दिनांक 6 अगस्त 2024) तथा <strong>भारतीय न्याय संहिता (BNS)</strong> के तहत कठोर आपराधिक मुकदमा दर्ज कर 5 वर्ष या आजीवन प्रतिबंध लगाया जाएगा।</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">त्रिपक्षीय ओएमआर (3-Copy OMR Sheet System):</div>
                <p>प्रारंभिक वस्तुनिष्ठ परीक्षा में ओएमआर उत्तर-पत्रक 3 प्रतियों में होगा:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li><strong>गुलाबी प्रति (Pink):</strong> आयोग मूल प्रति (Original to UPPSC)</li>
                  <li><strong>हरी प्रति (Green):</strong> आयोग सुरक्षित प्रति (Preserved)</li>
                  <li><strong>नीली प्रति (Blue):</strong> अभ्यर्थी प्रति (Candidate's Copy - परीक्षा बाद घर ले जा सकेंगे)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Chief Minister Fellowship Rules */}
      {activeTab === 'cm-fellowship' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'मुख्यमंत्री फेलोशिप शोधार्थियों हेतु आयु सीमा छूट एवं मुख्य परीक्षा वेटेज (नियमावली 2026)' : 'Chief Minister Fellowship Programme Age & Marks Weightage Rules'}
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            उत्तर प्रदेश लोक सेवा (प्रतियोगी परीक्षाओं हेतु मुख्यमंत्री अध्येतावृत्ति के अनुसंधानविदों के लिए आयु सीमा एवं अधिमान का शिथिलीकरण) नियमावली, 2026 के अनुसार:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="font-bold text-amber-600 dark:text-amber-400">1. आयु सीमा में छूट (Age Relaxation):</div>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                <li>• 1 वर्ष का कार्यकाल पूर्ण करने पर: <strong>1 वर्ष की छूट</strong></li>
                <li>• 2 वर्ष का कार्यकाल पूर्ण करने पर: <strong>2 वर्ष की छूट</strong></li>
                <li>• 3 वर्ष या अधिक कार्यकाल पूर्ण करने पर: <strong>3 वर्ष की छूट</strong></li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="font-bold text-indigo-600 dark:text-indigo-400">2. मुख्य परीक्षा में वेटेज (Mains Marks Weightage):</div>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                <li>• 501 से 1000 अंक के प्रश्नपत्रों में (वर्तमान 800 अंक):</li>
                <li>&nbsp;&nbsp;- 1 वर्ष पूर्ण: <strong>2.0 अंक</strong></li>
                <li>&nbsp;&nbsp;- 2 वर्ष पूर्ण: <strong>4.0 अंक</strong></li>
                <li>&nbsp;&nbsp;- 3 वर्ष या अधिक: <strong>6.0 अंक का सीधा वेटेज</strong></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Verified Official Portals (Requirement #74) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {language === 'hi' ? 'सत्यापित आधिकारिक पोर्टल एवं निर्देशिका' : 'Verified Official Portals Directory'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sourcesData.map(src => (
            <a
              key={src.id}
              href={src.url}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-amber-600 dark:text-amber-400 block mb-1">
                  {src.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors line-clamp-1">
                  {src.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {src.description}
                </p>
              </div>
              <div className="pt-3 flex items-center text-xs font-semibold text-amber-600 group-hover:underline">
                <span>{language === 'hi' ? 'आधिकारिक पोर्टल खोलें' : 'Open Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
