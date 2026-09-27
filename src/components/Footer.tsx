import React from 'react';
import { ExternalLink, ShieldCheck, Heart, Sparkles, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { language, activeVersion } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pb-20 md:pb-8 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Platform Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center text-white text-sm">
                स
              </div>
              <span>UPPSC RO/ARO Master</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {language === 'hi'
                ? 'समीक्षा अधिकारी एवं सहायक समीक्षा अधिकारी परीक्षा हेतु संपूर्ण, वैज्ञानिक एवं प्रामाणिक तैयारी प्रणाली। शून्य से चयन तक।'
                : 'Complete, scientific and authentic preparation system for UPPSC Review Officer & Assistant Review Officer examination.'}
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? '100% आधिकारिक स्रोतों पर आधारित' : '100% Based on Official UPPSC Sources'}</span>
            </div>
          </div>

          {/* Col 2: Official Sources Links */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">
              {language === 'hi' ? 'आधिकारिक स्रोत एवं पोर्टल' : 'Official Portals'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a 
                  href="https://uppsc.up.nic.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center"
                >
                  <ExternalLink className="w-3 h-3 mr-1 text-slate-500" />
                  UPPSC Official Website (uppsc.up.nic.in)
                </a>
              </li>
              <li>
                <a 
                  href="https://otr.pariksha.nic.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center"
                >
                  <ExternalLink className="w-3 h-3 mr-1 text-slate-500" />
                  UPPSC OTR Portal (otr.pariksha.nic.in)
                </a>
              </li>
              <li>
                <a 
                  href="https://sad.up.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center"
                >
                  <ExternalLink className="w-3 h-3 mr-1 text-slate-500" />
                  UP Secretariat Administration (sad.up.gov.in)
                </a>
              </li>
              <li>
                <a 
                  href="https://nielit.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center"
                >
                  <ExternalLink className="w-3 h-3 mr-1 text-slate-500" />
                  NIELIT O-Level Official Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Examination Standards */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">
              {language === 'hi' ? 'परीक्षा मानक एवं नियम' : 'Exam Standards'}
            </h4>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>• {language === 'hi' ? 'प्रारंभिक: 140 GS + 60 हिन्दी (200 अंक)' : 'Prelims: 140 GS + 60 Hindi (200 Marks)'}</li>
              <li>• {language === 'hi' ? 'मुख्य: 120 GS + 160 हिन्दी/आलेखन + 120 निबंध' : 'Mains: 120 GS + 160 Drafting + 120 Essay (400 Marks)'}</li>
              <li>• {language === 'hi' ? 'ऋणात्मक अंकन:' : 'Negative Marking:'} 1/3 (0.33)</li>
              <li>• {language === 'hi' ? 'ARO टंकण: 25 श.प्र.मि. हिन्दी (कुर्तिदेव / मंगल)' : 'ARO Typing: 25 wpm Hindi (Kruti Dev / Mangal)'}</li>
              <li>• {language === 'hi' ? 'साक्षात्कार: कोई साक्षात्कार नहीं (सीधा चयन)' : 'Interview: No Interview (Merit Based)'}</li>
            </ul>
          </div>

          {/* Col 4: Legal & Copyright Safe Notice */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">
              {language === 'hi' ? 'प्रामाणिकता एवं कॉपीराइट' : 'Integrity & Ethics'}
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              {language === 'hi'
                ? 'यह मंच विद्यार्थियों के मार्गदर्शन हेतु स्वतंत्र रूप से विकसित है। यहां किसी भी व्यावसायिक पुस्तक का अवैध पुनरुत्पादन नहीं है; सभी व्याख्याएं, प्रश्न एवं आलेखन प्रारूप मूल व शैक्षणिक हैं।'
                : 'Independent educational portal dedicated to public service aspirants. Zero pirated content; questions, explanations, drafting templates and frameworks are originally authored.'}
            </p>
            <div className="text-[11px] text-amber-500 pt-1">
              {language === 'hi' ? 'अंतिम सत्यापन:' : 'Last Verified:'} {activeVersion.lastVerified}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            © {new Date().getFullYear()} UPPSC RO/ARO Master. Deployable on GitHub Pages.
          </div>
          <div className="flex items-center space-x-1">
            <span>{language === 'hi' ? 'समीक्षा अधिकारी अभ्यर्थियों को समर्पित' : 'Dedicated to Review Officer Aspirants'}</span>
            <Award className="w-3.5 h-3.5 text-amber-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
