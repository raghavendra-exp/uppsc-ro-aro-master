import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface BreadcrumbItem {
  label: { hi: string; en: string };
  pageId?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigateHome: () => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigateHome }) => {
  const { language } = useApp();

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 py-2.5 px-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-x-auto whitespace-nowrap scrollbar-none">
      <button
        onClick={onNavigateHome}
        className="flex items-center space-x-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium text-slate-700 dark:text-slate-300"
      >
        <Home className="w-3.5 h-3.5" />
        <span>{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {isLast || !item.onClick ? (
              <span className="font-semibold text-amber-700 dark:text-amber-400 truncate max-w-[200px] sm:max-w-none">
                {item.label[language]}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-slate-700 dark:text-slate-300 truncate max-w-[150px] sm:max-w-none"
              >
                {item.label[language]}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
