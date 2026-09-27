import React from 'react';
import { Home, BookOpen, CheckSquare, Award, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const { language } = useApp();

  const tabs = [
    { id: 'home', icon: Home, label: { hi: 'होम', en: 'Home' } },
    { id: 'syllabus', icon: BookOpen, label: { hi: 'सिलेबस', en: 'Syllabus' } },
    { id: 'practice', icon: CheckSquare, label: { hi: 'प्रैक्टिस', en: 'Practice' } },
    { id: 'mocks', icon: Award, label: { hi: 'मॉक', en: 'Mocks' } },
    { id: 'analytics', icon: BarChart3, label: { hi: 'प्रगति', en: 'Progress' } },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-lg px-1 sm:px-2 py-1 flex items-center justify-around"
    >
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-1 sm:px-2 rounded-lg transition-colors flex-1 min-w-0 ${
              isActive 
                ? 'text-amber-600 dark:text-amber-400 font-semibold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[9px] sm:text-[10px] mt-0.5 truncate max-w-full">{tab.label[language]}</span>
          </button>
        );
      })}
    </nav>
  );
};
