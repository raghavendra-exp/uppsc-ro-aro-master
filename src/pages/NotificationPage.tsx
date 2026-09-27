import React from 'react';
import { 
  Bell, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle, 
  Calendar, 
  Users, 
  Award, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import notificationsData from '../data/notifications.json';
import sourcesData from '../data/sources.json';

export const NotificationPage: React.FC = () => {
  const { language } = useApp();
  const notif = notificationsData[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <Bell className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'उत्तर प्रदेश लोक सेवा आयोग आधिकारिक सूचना केंद्र' : 'UPPSC RO/ARO Official Notification Center'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? 'आधिकारिक अधिसूचना विवरण, पद संख्या, चयन प्रक्रिया, टाइपिंग मानक एवं ऐतिहासिक कट-ऑफ'
              : 'Verified official notification tracking, vacancies, selection stages, typing speed and cutoffs'}
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-center">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {notif.status}
          </span>
        </div>
      </div>

      {/* Vacancy Breakdown Cards */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'कुल रिक्तियों का आधिकारिक विवरण (Vacancies Breakdown)' : 'Total Vacancies Breakdown'}
            </h2>
            <p className="text-xs text-slate-500">विज्ञापन सं. {notif.officialNotificationNumber}</p>
          </div>
          <span className="text-xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
            {notif.vacancies.total} {language === 'hi' ? 'कुल पद' : 'Total Posts'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <span className="text-slate-500 block">समीक्षा अधिकारी (सचिवालय)</span>
            <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{notif.vacancies.roSecretariat}</div>
            <span className="text-[10px] text-emerald-600 font-semibold">RO Secretariat</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <span className="text-slate-500 block">सहायक समीक्षा अधिकारी (सचिवालय)</span>
            <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{notif.vacancies.aroSecretariat}</div>
            <span className="text-[10px] text-indigo-600 font-semibold">ARO Secretariat</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <span className="text-slate-500 block">समीक्षा अधिकारी (राजस्व परिषद)</span>
            <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{notif.vacancies.roRevenueCouncil}</div>
            <span className="text-[10px] text-slate-500">RO Revenue Council</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <span className="text-slate-500 block">समीक्षा अधिकारी (लोक सेवा आयोग)</span>
            <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{notif.vacancies.roUPPSC}</div>
            <span className="text-[10px] text-slate-500">RO UPPSC</span>
          </div>
        </div>
      </div>

      {/* Typing & Eligibility Criteria (Requirement #1, #50) */}
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
            ✓ सामान्य स्नातक डिग्री मान्य (कोई कम्प्यूटर डिप्लोमा या टाइपिंग अनिवार्य नहीं)।
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
            <div>• <strong>हिन्दी टाइपिंग:</strong> न्यूनतम 25 शब्द प्रति मिनट कम्प्यूटर पर (कृतिदेव 010 अथवा मंगल)।</div>
            <div>• <strong>ओ-लेवल:</strong> NIELIT 'O' लेवल प्रमाणपत्र अथवा 5 मई 2022 के शासनादेश द्वारा मान्य समकक्ष।</div>
          </div>
        </div>
      </div>

      {/* Historical Cut-off Marks (Requirement #50) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {language === 'hi' ? 'विगत परीक्षाओं का प्रामाणिक कट-ऑफ रुझान (Cut-off Trend)' : 'Historical Cut-off Trend'}
          </h3>
          <p className="text-xs text-slate-500">
            {language === 'hi' ? 'प्रारंभिक (200 अंक) एवं मुख्य परीक्षा (400 अंक) श्रेणीवार विश्लेषण' : 'Category-wise Prelims (200) and Mains (400) marks threshold'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-3">{language === 'hi' ? 'श्रेणी (Category)' : 'Category'}</th>
                <th className="p-3">{language === 'hi' ? 'प्रारंभिक कट-ऑफ (200 में)' : 'Prelims Cutoff (/200)'}</th>
                <th className="p-3">{language === 'hi' ? 'अंतिम मुख्य चयन (400 में)' : 'Final Mains Cutoff (/400)'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {notif.cutoffsHistorical.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{row.category}</td>
                  <td className="p-3 font-mono text-amber-600 dark:text-amber-400 font-bold">{row.prelimsEstimatedCutoff2021}</td>
                  <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">{row.mainsFinalCutoff2021}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Government Portals (Requirement #74) */}
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
