import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, UserProgress, ExamVersion } from '../types';
import { 
  loadUserProgress, 
  saveUserProgress, 
  loadLanguage, 
  saveLanguage, 
  loadTheme, 
  saveTheme, 
  defaultProgress 
} from '../utils/storage';

import currentPointer from '../data/exams/ro-aro/ro-aro-current.json';
import version2026 from '../data/exams/ro-aro/ro-aro-2026.json';
import version2023 from '../data/exams/ro-aro/ro-aro-2023.json';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeVersion: ExamVersion;
  allVersions: ExamVersion[];
  selectVersion: (versionId: string) => void;
  progress: UserProgress;
  recordTestResult: (attempted: number, correct: number, timeSec: number, newMistakes: { questionId: string; selectedOption: number }[]) => void;
  toggleBookmark: (questionId: string) => void;
  isBookmarked: (questionId: string) => boolean;
  removeMistake: (questionId: string) => void;
  saveDraftAttempt: (docId: string, text: string, score: number) => void;
  saveEssayAttempt: (topicId: string, text: string, wordCount: number) => void;
  updateStudyPlan: (plan: UserProgress['studyPlan']) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(loadLanguage);
  const [theme, setThemeState] = useState<'light' | 'dark'>(loadTheme);
  const [progress, setProgressState] = useState<UserProgress>(loadUserProgress);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const allVersionsList: ExamVersion[] = [
    version2026 as unknown as ExamVersion,
    version2023 as unknown as ExamVersion
  ];

  const [activeVersion, setActiveVersion] = useState<ExamVersion>(() => {
    const found = allVersionsList.find(v => v.id === currentPointer.activeVersionId);
    return found || (version2026 as unknown as ExamVersion);
  });

  useEffect(() => {
    saveLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    saveTheme(theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'hi' ? 'en' : 'hi'));
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const selectVersion = (vId: string) => {
    const v = allVersionsList.find(x => x.id === vId);
    if (v) setActiveVersion(v);
  };

  const recordTestResult = (
    attempted: number,
    correct: number,
    timeSec: number,
    newMistakes: { questionId: string; selectedOption: number }[]
  ) => {
    setProgressState(prev => {
      const now = new Date().toISOString();
      const updatedMistakes = [...prev.mistakes];
      
      newMistakes.forEach(m => {
        const existingIdx = updatedMistakes.findIndex(x => x.questionId === m.questionId);
        if (existingIdx >= 0) {
          updatedMistakes[existingIdx] = { ...m, timestamp: now, reviewed: false };
        } else {
          updatedMistakes.push({ ...m, timestamp: now, reviewed: false });
        }
      });

      const updated: UserProgress = {
        ...prev,
        testsAttempted: prev.testsAttempted + 1,
        questionsAttempted: prev.questionsAttempted + attempted,
        correctAnswers: prev.correctAnswers + correct,
        totalTimeSeconds: prev.totalTimeSeconds + timeSec,
        mistakes: updatedMistakes
      };
      saveUserProgress(updated);
      return updated;
    });
  };

  const toggleBookmark = (qId: string) => {
    setProgressState(prev => {
      const exists = prev.savedBookmarks.includes(qId);
      const bookmarks = exists 
        ? prev.savedBookmarks.filter(id => id !== qId)
        : [...prev.savedBookmarks, qId];
      const updated = { ...prev, savedBookmarks: bookmarks };
      saveUserProgress(updated);
      return updated;
    });
  };

  const isBookmarked = (qId: string): boolean => {
    return progress.savedBookmarks.includes(qId);
  };

  const removeMistake = (qId: string) => {
    setProgressState(prev => {
      const filtered = prev.mistakes.filter(m => m.questionId !== qId);
      const updated = { ...prev, mistakes: filtered };
      saveUserProgress(updated);
      return updated;
    });
  };

  const saveDraftAttempt = (docId: string, text: string, score: number) => {
    setProgressState(prev => {
      const updated = {
        ...prev,
        completedDrafts: [
          ...prev.completedDrafts,
          { docId, savedText: text, date: new Date().toISOString(), checklistScore: score }
        ]
      };
      saveUserProgress(updated);
      return updated;
    });
  };

  const saveEssayAttempt = (topicId: string, text: string, wordCount: number) => {
    setProgressState(prev => {
      const updated = {
        ...prev,
        completedEssays: [
          ...prev.completedEssays,
          { topicId, savedText: text, wordCount, date: new Date().toISOString() }
        ]
      };
      saveUserProgress(updated);
      return updated;
    });
  };

  const updateStudyPlan = (plan: UserProgress['studyPlan']) => {
    setProgressState(prev => {
      const updated = { ...prev, studyPlan: plan };
      saveUserProgress(updated);
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        toggleTheme,
        activeVersion,
        allVersions: allVersionsList,
        selectVersion,
        progress,
        recordTestResult,
        toggleBookmark,
        isBookmarked,
        removeMistake,
        saveDraftAttempt,
        saveEssayAttempt,
        updateStudyPlan,
        searchOpen,
        setSearchOpen,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
