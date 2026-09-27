import React, { useState } from 'react';
import { 
  Languages, 
  Moon, 
  Sun, 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  Award, 
  FileText, 
  PenTool, 
  HelpCircle, 
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const { language, toggleLanguage, theme, toggleTheme, setSearchOpen, activeVersion } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: { hi: 'कमांड सेंटर', en: 'Dashboard' } },
    { id: 'syllabus', label: { hi: 'पाठ्यक्रम', en: 'Syllabus' } },
    { id: 'prelims', label: { hi: 'प्रारंभिक', en: 'Prelims' } },
    { id: 'mains', label: { hi: 'मुख्य परीक्षा', en: 'Mains' } },
    { id: 'drafting', label: { hi: 'आलेखन लैब', en: 'Drafting' } },
    { id: 'essay', label: { hi: 'निबंध 600 शब्द', en: 'Essay Lab' } },
    { id: 'pyq', label: { hi: 'PYQ 2013-24', en: 'PYQ Bank' } },
    { id: 'practice', label: { hi: '1000+ प्रश्न', en: '1000+ Qs' } },
    { id: 'mocks', label: { hi: 'मॉक टेस्ट', en: 'Mock Tests' } },
    { id: 'up-gk', label: { hi: 'उ.प्र. विशेष', en: 'UP GK' } },
    { id: 'analytics', label: { hi: 'मेरी गलतियां', en: 'Mistakes' } },
    { id: 'notices', label: { hi: 'सूचना केंद्र', en: 'Notices' } }
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-700 text-white text-xs px-3 py-1 flex items-center justify-between">
        <div className="flex items-center space-x-2 truncate">
          <span className="bg-amber-900/60 text-amber-200 uppercase tracking-wider px-1.5 py-0.5 rounded font-mono text-[10px] font-bold">
            {activeVersion.status}
          </span>
          <span className="truncate">
            {language === 'hi' 
              ? 'उत्तर प्रदेश सचिवालय एवं लोक सेवा आयोग समीक्षा अधिकारी / सहायक समीक्षा अधिकारी पोर्टल'
              : 'UP Secretariat & UPPSC Review Officer / Assistant Review Officer Preparation System'}
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-3 text-[11px] shrink-0">
          <span>{language === 'hi' ? 'सत्यापित:' : 'Verified:'} {activeVersion.lastVerified}</span>
          <span className="text-amber-200">•</span>
          <span>1/3 Negative Marking ({activeVersion.negativeMarking})</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center text-white shadow-md shadow-amber-600/20 ring-2 ring-amber-400/40">
              <span className="font-bold text-xl font-hindi">स</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  UPPSC RO/ARO <span className="text-amber-600 dark:text-amber-500">Master</span>
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <CheckCircle2 className="w-3 h-3 mr-0.5" /> 1000+ Qs
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[220px] sm:max-w-md hidden xs:block">
                {language === 'hi' 
                  ? 'समीक्षा अधिकारी एवं सहायक समीक्षा अधिकारी संपूर्ण तैयारी प्रणाली' 
                  : 'Complete Review Officer & Assistant Review Officer System'}
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
            >
              <span className="flex items-center">
                <Search className="w-3.5 h-3.5 mr-2 text-slate-400" />
                {language === 'hi' ? 'खोजें (विषय, PYQ, पत्र, निबंध)...' : 'Search (Topics, PYQs, Drafting)...'}
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Action Tools: Lang Toggle, Theme Toggle, Mobile Menu */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Quick Search Button (Mobile) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-amber-50 hover:border-amber-400 dark:hover:bg-slate-700 transition-all shadow-sm"
              title="Toggle Language"
            >
              <Languages className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{language === 'hi' ? 'English' : 'हिन्दी'}</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Secondary Navigation Bar */}
        <nav className="hidden md:flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800/80 scrollbar-none">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white font-semibold shadow-sm shadow-amber-600/30'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-700 dark:hover:text-amber-400'
                }`}
              >
                {item.label[language]}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-1 shadow-xl">
          <div className="grid grid-cols-2 gap-1.5 pt-2">
            {navItems.map(item => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-left text-xs font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label[language]}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
