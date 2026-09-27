import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { Breadcrumbs, BreadcrumbItem } from './components/Breadcrumbs';
import { SearchModal } from './components/SearchModal';

// Pages
import { Home } from './pages/Home';
import { SyllabusPage } from './pages/SyllabusPage';
import { PrelimsPage } from './pages/PrelimsPage';
import { MainsPage } from './pages/MainsPage';
import { DraftingPage } from './pages/DraftingPage';
import { EssayLabPage } from './pages/EssayLabPage';
import { INMTimelinePage } from './pages/INMTimelinePage';
import { UPSpecialPage } from './pages/UPSpecialPage';
import { PYQPage } from './pages/PYQPage';
import { PracticeBankPage } from './pages/PracticeBankPage';
import { MockTestPage } from './pages/MockTestPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { StudyPlanPage } from './pages/StudyPlanPage';
import { RevisionPage } from './pages/RevisionPage';
import { BooksPage } from './pages/BooksPage';
import { NotificationPage } from './pages/NotificationPage';

const AppContent: React.FC = () => {
  const { language } = useApp();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [practiceSubjectFilter, setPracticeSubjectFilter] = useState<string | undefined>(undefined);
  const [practiceTopicFilter, setPracticeTopicFilter] = useState<string | undefined>(undefined);

  const handleNavigateTab = (tab: string, meta?: any) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigatePractice = (subject: string, topic?: string) => {
    setPracticeSubjectFilter(subject);
    setPracticeTopicFilter(topic);
    setCurrentTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic clickable breadcrumb generator (Requirement #47)
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const base: BreadcrumbItem[] = [
      {
        label: { hi: 'UPPSC RO/ARO', en: 'UPPSC RO/ARO' },
        onClick: () => setCurrentTab('home')
      }
    ];

    switch (currentTab) {
      case 'syllabus':
        base.push({ label: { hi: 'आधिकारिक पाठ्यक्रम', en: 'Syllabus' } });
        break;
      case 'prelims':
        base.push({ label: { hi: 'प्रारंभिक परीक्षा', en: 'Prelims Preparation' } });
        break;
      case 'mains':
        base.push({ label: { hi: 'मुख्य परीक्षा', en: 'Mains Preparation' } });
        break;
      case 'drafting':
        base.push(
          { label: { hi: 'मुख्य परीक्षा', en: 'Mains' }, onClick: () => setCurrentTab('mains') },
          { label: { hi: 'हिन्दी एवं शासकीय आलेखन', en: 'Drafting Lab' } }
        );
        break;
      case 'essay':
        base.push(
          { label: { hi: 'मुख्य परीक्षा', en: 'Mains' }, onClick: () => setCurrentTab('mains') },
          { label: { hi: '600 शब्द हिन्दी निबंध', en: 'Hindi Essay Lab' } }
        );
        break;
      case 'inm-timeline':
        base.push(
          { label: { hi: 'प्रारंभिक परीक्षा', en: 'Prelims' }, onClick: () => setCurrentTab('prelims') },
          { label: { hi: 'भारतीय राष्ट्रीय आन्दोलन', en: 'National Movement' } }
        );
        break;
      case 'up-gk':
        base.push({ label: { hi: 'उत्तर प्रदेश विशेष ज्ञान', en: 'UP Special GK' } });
        break;
      case 'pyq':
        base.push({ label: { hi: 'विगत वर्ष प्रश्न (PYQ 2013-2024)', en: 'PYQ Bank' } });
        break;
      case 'practice':
        base.push({ label: { hi: '1000+ अभ्यास प्रश्न बैंक', en: '1000+ Practice Bank' } });
        break;
      case 'mocks':
        base.push({ label: { hi: 'ऑनलाइन मॉक टेस्ट सिमुलेटर', en: 'Mock Test Simulator' } });
        break;
      case 'analytics':
        base.push({ label: { hi: 'मेरी गलतियां एवं प्रदर्शन', en: 'Error Notebook & Progress' } });
        break;
      case 'study-plan':
        base.push({ label: { hi: 'अध्ययन योजना', en: 'Study Plan' } });
        break;
      case 'revision':
        base.push({ label: { hi: 'रैपिड रिवीजन व फ्लैशकार्ड', en: 'Rapid Revision & Flashcards' } });
        break;
      case 'books':
        base.push({ label: { hi: 'मानक पुस्तकें व NCERT मैपिंग', en: 'Standard Books & NCERT' } });
        break;
      case 'notices':
        base.push({ label: { hi: 'आधिकारिक सूचना केंद्र', en: 'Notification Center' } });
        break;
      default:
        break;
    }

    return base;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Global Navbar */}
      <Navbar currentTab={currentTab} onSelectTab={handleNavigateTab} />

      {/* Global Clickable Breadcrumbs */}
      {currentTab !== 'home' && (
        <Breadcrumbs
          items={getBreadcrumbs()}
          onNavigateHome={() => setCurrentTab('home')}
        />
      )}

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {currentTab === 'home' && <Home onNavigateTab={handleNavigateTab} />}
        {currentTab === 'syllabus' && <SyllabusPage onNavigatePractice={handleNavigatePractice} />}
        {currentTab === 'prelims' && <PrelimsPage onNavigatePractice={handleNavigatePractice} onNavigateTab={handleNavigateTab} />}
        {currentTab === 'mains' && <MainsPage onNavigateTab={handleNavigateTab} onNavigatePractice={handleNavigatePractice} />}
        {currentTab === 'drafting' && <DraftingPage />}
        {currentTab === 'essay' && <EssayLabPage />}
        {currentTab === 'inm-timeline' && <INMTimelinePage onNavigatePractice={handleNavigatePractice} />}
        {currentTab === 'up-gk' && <UPSpecialPage onNavigatePractice={handleNavigatePractice} />}
        {currentTab === 'pyq' && <PYQPage />}
        {currentTab === 'practice' && (
          <PracticeBankPage
            initialSubject={practiceSubjectFilter}
            initialTopic={practiceTopicFilter}
          />
        )}
        {currentTab === 'mocks' && <MockTestPage />}
        {currentTab === 'analytics' && <AnalyticsPage onNavigatePractice={handleNavigatePractice} />}
        {currentTab === 'study-plan' && <StudyPlanPage />}
        {currentTab === 'revision' && <RevisionPage />}
        {currentTab === 'books' && <BooksPage onNavigatePractice={handleNavigatePractice} />}
        {currentTab === 'notices' && <NotificationPage />}
      </main>

      {/* Global Search Modal */}
      <SearchModal onNavigate={handleNavigateTab} />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav currentTab={currentTab} onSelectTab={handleNavigateTab} />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
