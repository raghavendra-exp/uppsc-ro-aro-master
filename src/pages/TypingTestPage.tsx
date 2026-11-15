import React, { useState, useEffect, useRef } from 'react';
import { 
  Keyboard, 
  Clock, 
  Award, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  FileText, 
  Sparkles,
  ChevronDown,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import typingPassages from '../data/typing-passages.json';
import { REMINGTON_KEY_ROWS, INSCRIPT_KEY_ROWS } from '../utils/krutiDevConverter';

type TypingFont = 'krutidev' | 'mangal' | 'unicode' | 'english';
type TimerDuration = 60 | 120 | 300; // 1 min, 2 min, 5 min

export const TypingTestPage: React.FC = () => {
  const { language } = useApp();

  // Test settings
  const [selectedFont, setSelectedFont] = useState<TypingFont>('krutidev');
  const [duration, setDuration] = useState<TimerDuration>(300); // 5 mins official
  const [selectedPassageId, setSelectedPassageId] = useState<string>(typingPassages[0].id);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showKeyboardGuide, setShowKeyboardGuide] = useState<boolean>(false);
  const [showShiftKeys, setShowShiftKeys] = useState<boolean>(false);

  // Active typing state
  const [userInput, setUserInput] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [keystrokes, setKeystrokes] = useState<number>(0);
  const [backspaceCount, setBackspaceCount] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<any>(null);

  // Active passage
  const currentPassage = typingPassages.find(p => p.id === selectedPassageId) || typingPassages[0];

  // Target text depending on font mode
  const targetText = (selectedFont === 'krutidev') 
    ? currentPassage.textKrutiDev 
    : currentPassage.textUnicode;

  const targetWords = targetText.split(/\s+/).filter(Boolean);
  const userWords = userInput.split(/\s+/).filter(Boolean);

  // Reset test
  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setIsFinished(false);
    setUserInput('');
    setTimeLeft(duration);
    setKeystrokes(0);
    setBackspaceCount(0);
    setStartTime(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Switch font mode
  const handleFontChange = (font: TypingFont) => {
    setSelectedFont(font);
    if (font === 'english') {
      const engPassage = typingPassages.find(p => p.id === 'passage-english-secretariat');
      if (engPassage) setSelectedPassageId(engPassage.id);
    } else if (selectedPassageId === 'passage-english-secretariat') {
      setSelectedPassageId(typingPassages[0].id);
    }
    handleReset();
  };

  // Switch duration
  const handleDurationChange = (dur: TimerDuration) => {
    setDuration(dur);
    setTimeLeft(dur);
    handleReset();
  };

  // Play synthetic click sound via Web Audio API
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 + Math.random() * 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (!isActive && !isFinished) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    if (isFinished) return;

    setUserInput(value);
    setKeystrokes(prev => prev + 1);
    playClickSound();

    // Check if finished by completing passage
    if (value.trim().length >= targetText.trim().length) {
      finishTest();
    }
  };

  // Handle keydown for backspaces & shift detection
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace') {
      setBackspaceCount(prev => prev + 1);
    }
    if (e.key === 'Shift') {
      setShowShiftKeys(true);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Shift') {
      setShowShiftKeys(false);
    }
  };

  // Timer tick
  useEffect(() => {
    if (isActive && !isFinished) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, isFinished]);

  const finishTest = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setIsFinished(true);
  };

  // Calculations
  const elapsedMinutes = (duration - timeLeft) > 0 ? (duration - timeLeft) / 60 : 0.01;
  const currentWordsTyped = userWords.length;

  let correctWordsCount = 0;
  userWords.forEach((word, idx) => {
    if (idx < targetWords.length && word === targetWords[idx]) {
      correctWordsCount++;
    }
  });

  const errorWordsCount = Math.max(0, currentWordsTyped - correctWordsCount);
  const grossWPM = elapsedMinutes > 0 ? Math.round(currentWordsTyped / elapsedMinutes) : 0;
  const netWPM = elapsedMinutes > 0 ? Math.max(0, Math.round(grossWPM - (errorWordsCount / elapsedMinutes))) : 0;
  const accuracy = currentWordsTyped > 0 ? Math.round((correctWordsCount / currentWordsTyped) * 100) : 100;
  const speedBenchmark = selectedFont === 'english' ? 30 : 25;
  const isQualified = netWPM >= speedBenchmark && accuracy >= 85;

  // Format time (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine active keyboard row
  const activeKeyboardRows = selectedFont === 'mangal' ? INSCRIPT_KEY_ROWS : REMINGTON_KEY_ROWS;

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>उत्तर प्रदेश सचिवालय ARO अनिवार्य टंकण योग्यता मानक (25 WPM)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            {language === 'hi' 
              ? 'समीक्षा / सहायक समीक्षा अधिकारी टंकण परीक्षा सिमुलेटर' 
              : 'UPPSC ARO Official Typing Test Simulator'}
          </h1>

          <p className="text-amber-100/90 text-xs sm:text-sm mt-2 leading-relaxed max-w-3xl">
            {language === 'hi'
              ? 'आयोग के आधिकारिक मानकों के अनुरूप 5 मिनट की समयावधि, 25 शब्द प्रति मिनट (WPM) न्यूनतम गति, कृति देव 010 (Remington) एवं मंगल (Inscript) फॉण्ट समर्थन तथा वास्तविक समय में अर्हता (Qualification) का आकलन।'
              : 'Authentic 5-minute typing test simulator with 25 WPM benchmark, Kruti Dev 010 (Remington) and Mangal (Inscript) web fonts, real-time error auditing and qualification badge.'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-4 border-t border-amber-600/30 text-xs">
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-sm">
              <span className="text-amber-300 font-bold block">25 WPM हिन्दी</span>
              <span className="text-[11px] text-white/80">न्यूनतम अनिवार्य गति</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-sm">
              <span className="text-amber-300 font-bold block">30 WPM अंग्रेजी</span>
              <span className="text-[11px] text-white/80">अधिमानी अर्हता (Preferential)</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-sm">
              <span className="text-amber-300 font-bold block">5 मिनट</span>
              <span className="text-[11px] text-white/80">आधिकारिक परीक्षा अवधि</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-sm">
              <span className="text-amber-300 font-bold block">Remington / Inscript</span>
              <span className="text-[11px] text-white/80">दोनों की-बोर्ड मान्य</span>
            </div>
          </div>
        </div>
      </section>

      {/* Control Panel Bar */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Font Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => handleFontChange('krutidev')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedFont === 'krutidev'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
              }`}
            >
              कृति देव 010 (Remington)
            </button>
            <button
              onClick={() => handleFontChange('mangal')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedFont === 'mangal'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
              }`}
            >
              मंगल (Inscript)
            </button>
            <button
              onClick={() => handleFontChange('unicode')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedFont === 'unicode'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
              }`}
            >
              सामान्य हिन्दी (Unicode)
            </button>
            <button
              onClick={() => handleFontChange('english')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedFont === 'english'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
              }`}
            >
              English (30 WPM)
            </button>
          </div>

          {/* Duration Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-2">समय:</span>
            <button
              onClick={() => handleDurationChange(300)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                duration === 300
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              5 मिनट (Exam)
            </button>
            <button
              onClick={() => handleDurationChange(120)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                duration === 120
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              2 मिनट (Sprint)
            </button>
            <button
              onClick={() => handleDurationChange(60)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                duration === 60
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              1 मिनट (Drill)
            </button>
          </div>

          {/* Quick Tools: Sound, Keyboard Guide, Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'ध्वनि बंद करें' : 'ध्वनि चालू करें'}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            <button
              onClick={() => setShowKeyboardGuide(!showKeyboardGuide)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                showKeyboardGuide
                  ? 'bg-amber-100 border-amber-400 text-amber-900 dark:bg-amber-950/60 dark:border-amber-600 dark:text-amber-200'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
              }`}
            >
              <Keyboard className="w-4 h-4 text-amber-600" />
              <span>{showKeyboardGuide ? 'की-बोर्ड छिपाएं' : 'की-बोर्ड लेआउट'}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>रीसेट</span>
            </button>
          </div>
        </div>

        {/* Passage Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400">
            <FileText className="w-4 h-4 text-amber-600" />
            <span className="font-semibold">{language === 'hi' ? 'अभ्यास परिच्छेद:' : 'Passage:'}</span>
            <select
              value={selectedPassageId}
              onChange={(e) => {
                setSelectedPassageId(e.target.value);
                handleReset();
              }}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {typingPassages.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title[language]} ({p.wordCount} शब्द • {p.category})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
              शब्द: {currentPassage.wordCount}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold">
              कठिनाई: {currentPassage.difficulty}
            </span>
          </div>
        </div>
      </section>

      {/* Live Metrics HUD */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Timer */}
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>अवशिष्ट समय</span>
            <Clock className={`w-4 h-4 ${timeLeft < 60 ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`} />
          </div>
          <div className={`text-2xl font-black font-mono mt-1 ${timeLeft < 60 ? 'text-rose-600' : 'text-slate-900 dark:text-white'}`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-[10px] text-slate-400">
            {isActive ? 'परीक्षा प्रगति पर...' : isFinished ? 'परीक्षा समाप्त' : 'टाइप करते ही प्रारंभ'}
          </div>
        </div>

        {/* Net WPM */}
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>शुद्ध गति (Net WPM)</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {netWPM} <span className="text-xs font-normal text-slate-400">WPM</span>
          </div>
          <div className="text-[10px] text-slate-400">लक्ष्य: {speedBenchmark} WPM</div>
        </div>

        {/* Gross WPM */}
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>सकल गति (Gross)</span>
            <Keyboard className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {grossWPM} <span className="text-xs font-normal text-slate-400">WPM</span>
          </div>
          <div className="text-[10px] text-slate-400">कुल शब्द/मिनट</div>
        </div>

        {/* Accuracy */}
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>सटीकता (Accuracy)</span>
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {accuracy}%
          </div>
          <div className="text-[10px] text-slate-400">मानक: 85%+</div>
        </div>

        {/* Keystrokes & Backspaces */}
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>कुंजी प्रहार (Strokes)</span>
            <Sparkles className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-2xl font-black text-violet-600 dark:text-violet-400 mt-1">
            {keystrokes}
          </div>
          <div className="text-[10px] text-slate-400">बैकस्पेस: {backspaceCount}</div>
        </div>

        {/* Qualification Status */}
        <div className={`p-3.5 rounded-2xl border shadow-sm flex flex-col justify-between ${
          isQualified 
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
            : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
        }`}>
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>अर्हता स्थिति</span>
            {isQualified ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-amber-600" />}
          </div>
          <div className="text-lg font-black mt-1 truncate">
            {isQualified ? 'अर्ह (QUALIFIED)' : 'प्रगति पर / अनर्ह'}
          </div>
          <div className="text-[10px] opacity-80">
            {isQualified ? 'मानक उत्तीर्ण (>=25 WPM)' : '25 WPM अनिवार्य'}
          </div>
        </div>
      </section>

      {/* Typing Work Area */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-5">
        {/* Source Text Box */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>मूल परिच्छेद (देखकर टाइप करें):</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">
              फॉण्ट: {selectedFont === 'krutidev' ? 'कृति देव 010 (Kruti Dev 010)' : selectedFont === 'mangal' ? 'मंगल (Mangal)' : selectedFont === 'english' ? 'English' : 'देवनागरी (Unicode)'}
            </span>
          </div>

          <div className={`p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 leading-loose select-none max-h-56 overflow-y-auto text-base sm:text-lg ${
            selectedFont === 'krutidev' ? 'font-krutidev' : selectedFont === 'mangal' ? 'font-mangal' : 'font-hindi'
          }`}>
            {targetWords.map((word, idx) => {
              const isTyped = idx < userWords.length;
              const isCurrent = idx === userWords.length;
              const isCorrect = isTyped && userWords[idx] === word;
              
              let colorClass = 'text-slate-700 dark:text-slate-300';
              if (isCurrent) {
                colorClass = 'bg-amber-200 dark:bg-amber-800 text-amber-950 dark:text-amber-50 px-1 py-0.5 rounded font-bold';
              } else if (isTyped) {
                colorClass = isCorrect 
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold' 
                  : 'text-rose-600 dark:text-rose-400 underline font-semibold';
              }

              return (
                <span key={idx} className={`mr-2 inline-block transition-colors ${colorClass}`}>
                  {word}
                </span>
              );
            })}
          </div>
        </div>

        {/* User Typing Input Area */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Keyboard className="w-3.5 h-3.5 text-amber-600" />
              <span>आपका टंकण बॉक्स (Type here):</span>
            </span>
            <span className="text-xs text-slate-500">
              टाइप करते ही 5 मिनट का टाइमर स्वतः प्रारंभ हो जाएगा।
            </span>
          </div>

          <textarea
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            disabled={isFinished}
            placeholder={
              selectedFont === 'krutidev'
                ? 'कृति देव 010 फॉण्ट में टाइप करें (Remington typewriter keystrokes)...'
                : selectedFont === 'mangal'
                ? 'मंगल / इनस्क्रिप्ट फॉण्ट में टाइप करें...'
                : selectedFont === 'english'
                ? 'Start typing the English passage here...'
                : 'यहाँ हिन्दी में टाइप करना प्रारंभ करें...'
            }
            className={`w-full h-36 p-4 rounded-2xl border-2 border-amber-300 dark:border-amber-600/50 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-600 transition-all text-base sm:text-lg leading-relaxed resize-none shadow-inner ${
              selectedFont === 'krutidev' ? 'font-krutidev' : selectedFont === 'mangal' ? 'font-mangal' : 'font-hindi'
            }`}
          />
        </div>
      </section>

      {/* On-Screen Keyboard Layout Visualizer */}
      {showKeyboardGuide && (
        <section className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Keyboard className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-sm sm:text-base">
                {selectedFont === 'mangal' 
                  ? 'मंगल (Inscript) की-बोर्ड लेआउट निर्देशिका' 
                  : 'कृति देव 010 (Remington Typewriter) की-बोर्ड लेआउट निर्देशिका'}
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400">दशा:</span>
              <button
                onClick={() => setShowShiftKeys(!showShiftKeys)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  showShiftKeys
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {showShiftKeys ? 'Shift कुंजी सक्रिय (CAPS/Shift ON)' : 'सामान्य स्थिति (Shift OFF)'}
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            {selectedFont === 'mangal'
              ? 'बायें हाथ पर स्वर एवं मात्रायें (Vowels) तथा दायें हाथ पर व्यंजन (Consonants) व्यवस्थित हैं।'
              : 'रेमिंगटन टाइपराइटर लेआउट: d दबाने पर "क", k दबाने पर "ा" की मात्रा, s दबाने पर "े" की मात्रा टंकित होती है।'}
          </p>

          {/* Virtual Keyboard Grid */}
          <div className="space-y-1.5 overflow-x-auto pb-2 scrollbar-none">
            {activeKeyboardRows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex justify-center gap-1 sm:gap-1.5 min-w-[650px]">
                {row.map((item, keyIdx) => {
                  const displayChar = showShiftKeys ? item.shiftUnicode : item.normalUnicode;
                  return (
                    <div
                      key={keyIdx}
                      className="w-10 sm:w-12 h-12 sm:h-14 bg-slate-800/90 border border-slate-700 rounded-lg flex flex-col justify-between p-1 select-none hover:border-amber-400 transition-colors shadow-sm"
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span className="font-mono">{item.key}</span>
                        <span className="text-[9px] text-amber-300/80">{item.shift}</span>
                      </div>
                      <div className="text-center font-bold text-amber-400 text-sm sm:text-base font-hindi leading-none">
                        {displayChar}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <span>• Shift कुंजी दबाकर या टॉगल कर संयुक्त अक्षर व अतिरिक्त मात्रायें देखें।</span>
            <span className="text-amber-400 font-semibold">• UPPSC ARO परीक्षा हॉल में भौतिक की-बोर्ड पर यही लेआउट उपलब्ध रहता है।</span>
          </div>
        </section>
      )}

      {/* Post-Test Comprehensive Scorecard */}
      {isFinished && (
        <section className="bg-gradient-to-br from-white to-amber-50/60 dark:from-slate-900 dark:to-slate-950 rounded-3xl border-2 border-amber-400 dark:border-amber-600 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 dark:border-amber-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-amber-600 text-white">
                  <Award className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    टंकण परीक्षा मूल्यांकन परिणाम पत्रक (Official Scorecard)
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    उत्तर प्रदेश लोक सेवा आयोग ARO अर्हता मानक मूल्यांकन (UPPSC Evaluation Criteria)
                  </p>
                </div>
              </div>
            </div>

            <div className={`px-4 py-2 rounded-2xl text-center font-bold border ${
              isQualified 
                ? 'bg-emerald-100 border-emerald-400 text-emerald-900 dark:bg-emerald-950 dark:border-emerald-600 dark:text-emerald-200' 
                : 'bg-rose-100 border-rose-400 text-rose-900 dark:bg-rose-950 dark:border-rose-600 dark:text-rose-200'
            }`}>
              <div className="text-xs uppercase tracking-wider">अंतिम परिणाम</div>
              <div className="text-lg font-black">{isQualified ? 'अर्ह (QUALIFIED)' : 'अनर्ह (NOT QUALIFIED)'}</div>
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
              <span className="text-xs text-slate-500 block">शुद्ध टंकण गति (Net Speed)</span>
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
                {netWPM} <span className="text-sm font-normal text-slate-400">WPM</span>
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {netWPM >= speedBenchmark ? `मानक से +${netWPM - speedBenchmark} WPM अधिक` : `मानक से -${speedBenchmark - netWPM} WPM कम`}
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
              <span className="text-xs text-slate-500 block">सकल गति (Gross Speed)</span>
              <span className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1 block">
                {grossWPM} <span className="text-sm font-normal text-slate-400">WPM</span>
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">कुल शब्द: {currentWordsTyped}</span>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
              <span className="text-xs text-slate-500 block">सटीकता दर (Accuracy)</span>
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1 block">
                {accuracy}%
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">सही शब्द: {correctWordsCount} / {currentWordsTyped}</span>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
              <span className="text-xs text-slate-500 block">कुंजी प्रहार दर (Keystrokes/Hr)</span>
              <span className="text-3xl font-black text-purple-600 dark:text-purple-400 mt-1 block">
                {Math.round(keystrokes * (60 / elapsedMinutes))}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">बैकस्पेस उपयोग: {backspaceCount}</span>
            </div>
          </div>

          {/* Detailed Diagnostic Insights */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-600" />
              <span>आधिकारिक नियम एवं विश्लेषण:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                  1. गति निर्धारण सूत्र (UPPSC Official Evaluation Rule):
                </span>
                शुद्ध गति (Net WPM) = सकल गति - (कुल गलत शब्द / परीक्षा अवधि मिनट)। यदि 5 मिनट में 125 से अधिक शुद्ध शब्द (25 WPM) टंकित होते हैं और अशुद्धि दर 15% से कम है, तभी अभ्यर्थी अर्ह माना जाता है।
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                  2. सुधार हेतु विशेषज्ञ परामर्श:
                </span>
                {netWPM >= 25 
                  ? 'उत्कृष्ट प्रदर्शन! आपकी गति अनिवार्य अर्हता सीमा (25 WPM) को पार कर चुकी है। नियमित 5 मिनट अभ्यास से इसे 30+ WPM तक ले जाएं ताकि परीक्षा केंद्र पर किसी भी दबाव से सुरक्षित रहें।'
                  : 'आपको अपनी गति में सुधार की आवश्यकता है। बैकस्पेस का प्रयोग कम करें तथा उँगलियों को होम-रो (asdf / jkl;) पर स्थिर रखने का अभ्यास करें। कृति देव में "f" मात्रा पहले टाइप होती है, इसका विशेष ध्यान रखें।'}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/30 transition-all flex items-center space-x-1.5 text-xs sm:text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>पुनः परीक्षा दें (Try Again)</span>
            </button>
          </div>
        </section>
      )}

      {/* Official Typing Rules & Technical FAQ */}
      <section className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            UPPSC RO/ARO टंकण परीक्षा: महत्वपूर्ण नियम एवं तकनीकी निर्देश
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <span className="font-bold text-amber-700 dark:text-amber-400 block">किन पदों हेतु टंकण अनिवार्य है?</span>
            <p className="text-slate-600 dark:text-slate-400">
              सहायक समीक्षा अधिकारी (ARO - सचिवालय, लोक सेवा आयोग, राजस्व परिषद) हेतु हिन्दी टंकण में 25 WPM अनिवार्य है। समीक्षा अधिकारी (RO) हेतु टंकण परीक्षा नहीं होती, परंतु अधिमानी अर्हता में लाभ मिलता है।
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <span className="font-bold text-amber-700 dark:text-amber-400 block">कृति देव 010 बनाम मंगल फॉण्ट</span>
            <p className="text-slate-600 dark:text-slate-400">
              आयोग कम्प्यूटर पर दोनों विकल्प उपलब्ध कराता है। जो अभ्यर्थी टाइपराइटर पर सीखे हैं वे कृति देव 010 (Remington) चुनते हैं, तथा जो यूनिकोड पर अभ्यस्त हैं वे मंगल (Inscript) चुन सकते हैं।
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <span className="font-bold text-amber-700 dark:text-amber-400 block">अंग्रेजी टंकण का लाभ</span>
            <p className="text-slate-600 dark:text-slate-400">
              अंग्रेजी टंकण में 30 शब्द प्रति मिनट गति होने पर आयोग द्वारा अधिमानी अर्हता (Preferential Qualification) दी जाती है, जिससे समान अंक होने पर मेरिट में वरीयता प्राप्त होती है।
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
