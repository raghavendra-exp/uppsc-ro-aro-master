// UPPSC RO/ARO Master - Core Type Definitions

export type Language = 'hi' | 'en';

export type ExamStage = 'PRELIMS' | 'MAINS';

export type PaperType = 
  | 'PRE_PAPER_1_GS' 
  | 'PRE_PAPER_2_HINDI' 
  | 'MAINS_PAPER_1_GS' 
  | 'MAINS_PAPER_2_HINDI_DRAFTING' 
  | 'MAINS_PAPER_3_ESSAY';

export interface BilingualText {
  hi: string;
  en: string;
}

export interface ExamVersion {
  id: string;
  versionYear: number;
  status: 'CURRENT' | 'ARCHIVED' | 'UPCOMING';
  title: BilingualText;
  notificationNumber: string;
  notificationDate: string;
  lastVerified: string;
  officialSourceUrl: string;
  negativeMarking: number; // e.g. 0.33
  prelimsPattern: {
    paper1GS: { questions: number; marks: number; durationMinutes: number };
    paper2Hindi: { questions: number; marks: number; durationMinutes: number };
    totalQuestions: number;
    totalMarks: number;
  };
  mainsPattern: {
    paper1GS: { questions: number; marks: number; durationMinutes: number };
    paper2PartAConventional: { marks: number; durationMinutes: number };
    paper2PartBVocab: { questions: number; marks: number; durationMinutes: number };
    paper3Essay: { essaysCount: number; wordsPerEssay: number; marks: number; durationMinutes: number };
    totalMarks: number;
  };
  eligibility: {
    qualificationRO: BilingualText;
    qualificationARO: BilingualText;
    typingCriteriaARO: BilingualText;
    ageLimit: { min: number; max: number; relaxationDetails: BilingualText };
  };
  changesFromPrevious?: BilingualText[];
}

export interface SyllabusTopic {
  id: string;
  paper: PaperType;
  subjectId: string;
  title: BilingualText;
  description: BilingualText;
  weightageEstimated: string; // e.g. "12-16 Questions"
  subtopics: {
    id: string;
    title: BilingualText;
    keyPoints: BilingualText[];
    ncertMapping?: string;
    bookChapterMapping?: string;
  }[];
}

export interface SubjectMeta {
  id: string;
  title: BilingualText;
  icon: string;
  prelimsQuestionsAvg: number;
  mainsRelevance: boolean;
  color: string;
  description: BilingualText;
  recommendedBooks: string[];
}

export interface Question {
  id: string;
  exam: 'UPPSC_RO_ARO';
  stage: ExamStage;
  paper: 'GENERAL_STUDIES' | 'GENERAL_HINDI' | 'MAINS_GS' | 'ADMIN_VOCAB';
  subject: string;
  chapter: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'mcq';
  question: BilingualText;
  options: {
    hi: string[];
    en: string[];
  };
  answer: number; // 0-indexed
  explanation: BilingualText;
  sourceType: 'official_pyq' | 'original';
  pyqYear?: number;
  tags: string[];
}

export interface INMEvent {
  id: string;
  year: string;
  title: BilingualText;
  location: BilingualText;
  leaders: BilingualText;
  cause: BilingualText;
  eventSummary: BilingualText;
  result: BilingualText;
  upConnection: BilingualText;
  importantFacts: BilingualText[];
  pyqCount: number;
  samplePYQ?: string;
}

export interface DraftingDoc {
  id: string;
  slug: string;
  title: BilingualText;
  hindiName: string;
  marks: number;
  purpose: BilingualText;
  formatGuide: {
    heading: BilingualText;
    subjectLine: BilingualText;
    reference: BilingualText;
    salutation?: BilingualText;
    bodyStructure: BilingualText[];
    subscription: BilingualText;
    authoritySignature: BilingualText;
    enclosures?: BilingualText;
    distributionCopy?: BilingualText;
  };
  keyRules: BilingualText[];
  commonMistakes: BilingualText[];
  modelDraft: {
    title: string;
    hindiContent: string;
    englishExplanation: string;
  };
  practiceTask: {
    prompt: BilingualText;
    requiredElements: string[];
    sampleSolution: string;
  };
}

export interface AdminTerm {
  id: string;
  english: string;
  hindi: string;
  category: 'Administrative' | 'Commercial' | 'Legal' | 'Governmental';
  meaning: BilingualText;
  usageExample: BilingualText;
  examFrequency: 'High' | 'Medium' | 'Frequent';
}

export interface IdiomPhrase {
  id: string;
  phrase: string;
  meaning: BilingualText;
  usage: BilingualText;
  pyqYear?: string;
}

export interface EssayTopic {
  id: string;
  category: 'A_LITERATURE_CULTURE_SOCIAL_POLITICAL' | 'B_SCIENCE_TECH_ECONOMY_AGRI' | 'C_NATIONAL_INTERNATIONAL_DISASTER_PLANS';
  categoryLabel: BilingualText;
  title: BilingualText;
  wordCountLimit: number;
  understanding: BilingualText;
  introductionFramework: BilingualText[];
  backgroundContext: BilingualText;
  dimensions: { dimension: BilingualText; points: BilingualText[] }[];
  keyArguments: BilingualText[];
  relevantFactsAndData: BilingualText[];
  govtInitiatives: BilingualText[];
  upPerspective: BilingualText[];
  wayForward: BilingualText[];
  conclusionFramework: BilingualText[];
  keywords: string[];
  quotations: string[];
  commonPitfalls: BilingualText[];
  checklist: BilingualText[];
}

export interface CurrentAffairArticle {
  id: string;
  date: string;
  category: string;
  title: BilingualText;
  summary100Words: BilingualText;
  keyFacts: BilingualText[];
  upRelevance: BilingualText;
  roAroRelevance: BilingualText;
  mcqs: {
    question: BilingualText;
    options: { hi: string[]; en: string[] };
    answer: number;
    explanation: BilingualText;
  }[];
  revisionCard: BilingualText;
  source: string;
}

export interface BookRecord {
  id: string;
  title: BilingualText;
  author: string;
  publisher: string;
  stage: 'Prelims' | 'Mains' | 'Both';
  subject: string;
  purpose: BilingualText;
  level: 'Beginner' | 'Standard' | 'Advanced' | 'PYQ';
  syllabusMapping: {
    subject: string;
    chapters: string[];
    mappedTopics: string[];
  }[];
  officialReferenceNote?: string;
}

export interface NCERTMapping {
  classLevel: string;
  subject: string;
  bookTitle: string;
  relevantChapters: {
    chapterNumber: number;
    title: BilingualText;
    roAroRelevance: BilingualText;
    keyThemes: string[];
  }[];
}

export interface Flashcard {
  id: string;
  category: string;
  front: BilingualText;
  back: BilingualText;
  hint?: BilingualText;
  upSpecific?: boolean;
}

export interface RapidFact {
  id: string;
  category: string;
  fact: BilingualText;
  tag: string;
  upSpecific?: boolean;
}

export interface UserProgress {
  testsAttempted: number;
  questionsAttempted: number;
  correctAnswers: number;
  totalTimeSeconds: number;
  mistakes: {
    questionId: string;
    selectedOption: number;
    timestamp: string;
    reviewed: boolean;
  }[];
  savedBookmarks: string[];
  spacedRevisionQueue: {
    topicId: string;
    stage: number; // 1, 3, 7, 15, 30 days
    nextReviewDate: string;
  }[];
  studyStreakDays: number;
  lastActiveDate: string;
  completedDrafts: {
    docId: string;
    savedText: string;
    date: string;
    checklistScore: number;
  }[];
  completedEssays: {
    topicId: string;
    savedText: string;
    wordCount: number;
    date: string;
  }[];
  studyPlan?: {
    examDate: string;
    dailyHours: number;
    targetStage: string;
    createdDate: string;
    customMilestones: { week: number; focus: string; done: boolean }[];
  };
}
