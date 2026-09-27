// Local Storage Helper for UPPSC RO/ARO Master
import { UserProgress, Language } from '../types';

const STORAGE_KEY_PROGRESS = 'uppsc_ro_aro_progress_v1';
const STORAGE_KEY_LANG = 'uppsc_ro_aro_lang_v1';
const STORAGE_KEY_THEME = 'uppsc_ro_aro_theme_v1';

export const defaultProgress: UserProgress = {
  testsAttempted: 0,
  questionsAttempted: 0,
  correctAnswers: 0,
  totalTimeSeconds: 0,
  mistakes: [],
  savedBookmarks: [],
  spacedRevisionQueue: [],
  studyStreakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedDrafts: [],
  completedEssays: [],
  studyPlan: undefined
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    
    // Check and update study streak
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastActiveDate && parsed.lastActiveDate !== today) {
      const last = new Date(parsed.lastActiveDate);
      const cur = new Date(today);
      const diffDays = Math.round((cur.getTime() - last.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        parsed.studyStreakDays = (parsed.studyStreakDays || 0) + 1;
      } else if (diffDays > 1) {
        parsed.studyStreakDays = 1;
      }
      parsed.lastActiveDate = today;
      saveUserProgress(parsed);
    }
    return { ...defaultProgress, ...parsed };
  } catch (e) {
    console.error('Error loading progress from localStorage', e);
    return defaultProgress;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress to localStorage', e);
  }
}

export function loadLanguage(): Language {
  try {
    const lang = localStorage.getItem(STORAGE_KEY_LANG);
    return lang === 'en' ? 'en' : 'hi';
  } catch {
    return 'hi';
  }
}

export function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  } catch (e) {
    console.error('Error saving language', e);
  }
}

export function loadTheme(): 'light' | 'dark' {
  try {
    const t = localStorage.getItem(STORAGE_KEY_THEME);
    return t === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function saveTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  } catch (e) {
    console.error('Error saving theme', e);
  }
}
