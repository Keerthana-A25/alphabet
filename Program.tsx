import React, { useState, useRef, useEffect } from "react";
import { Snippet } from "./utils/lambda";
import { useSelector } from "react-redux";
import { RootState } from "./redux/rootReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { calculateAccuracyAndErrorRate } from "./utils/helper";
import { programmingStages } from "./utils/lambda";
import { ExitModal } from "./ExitModal";
import { ReportModal } from "./ReportModal";
import { useDispatch } from "react-redux";
import { Topic } from "./redux/programReducer";
import Keyboard from "./Keyboard";
//import backgroundImage from "./assets/background-001.jpg";
import {
  shiftMap,
  getDifficulty,
  formatTime,
  getInitialSnippets,
  calculateTimer,
  getNextKey,
  isKeyHighlighted,
} from "./utils/helper";


export default function Programm() {
  const [sidebarMin, setSidebarMin] = useState(false);
  // ⬆ At top of file with other refs
const editorRef = useRef<HTMLDivElement>(null); // NEW

  const cTopics = useSelector((state: RootState) => state.programState?.["C/C++"]?.topics || []);
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
   const language = location.state?.language || "Code";
  
   //  Get correct language topics from Redux
  const topics = useSelector(
    (state: RootState) => state.programState?.[language]?.topics || []
  );
  const [activeId, setActiveId] = useState(-1);
  const [editorValue, setEditorValue] = useState<string>("");
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const [timer, setTimer] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [highlightedKey, setHighlightedKey] = useState<string>("");
  const [highlightShift, setHighlightShift] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasSnippetStarted, setHasSnippetStarted] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);
const [showReportModal, setShowReportModal] = useState(false);
const [reportData, setReportData] = useState({ totalWord: 0, wpm: 0, accuracy: 0, errors: 0 });
 const dispatch = useDispatch();
console.log("language :" +language);
 useEffect(() => {
  if (topics.length > 0) {
   const savedProgress = parseInt(localStorage.getItem(`progress-${language}`) || "0", 10);
    const initialized = getInitialSnippets(topics).map((s, i) => ({
      ...s,
      unlock: i <= savedProgress,
    }));
    setSnippets(initialized);
    //  Highlight last unlocked index
    setActiveId(-1);
setEditorValue(""); // Start with empty editor
    //setActiveId(savedProgress);
    //setEditorValue(initialized[savedProgress]?.program || "");
  }
}, [topics, language]);

  useEffect(() => {
    if (!hasSnippetStarted || activeId === -1 || !snippets[activeId]) {
      setHighlightedKey("");
      setHighlightShift(false);
      return;
    }
    const fullProgram = snippets[activeId].program || "";
    const nextChar = fullProgram.charAt(currentCharIndex);
    const lookahead = fullProgram.slice(currentCharIndex, currentCharIndex + 2);
    if (!nextChar) return;
    const { key, shift } = getNextKey(nextChar, lookahead);

    setHighlightedKey(key);
    setHighlightShift(shift);
  }, [currentCharIndex, activeId, snippets, hasSnippetStarted]);

  useEffect(() => {
  if (timerRunning && timer > 0) {
    timerRef.current = setTimeout(() => setTimer((t) => t - 1), 1000);

    //  Return cleanup function to clear timeout
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }

  //  Don't return null — just return nothing (i.e., undefined)
}, [timer, timerRunning, activeId]);

  function handleSelect(index: number) {
    const snippet = snippets[index];
    if (!snippet.unlock) return;
    const program = snippet?.program ?? "";
    setActiveId(index);
    setHasSnippetStarted(true);
    setTypedChars([]);
    setEditorValue(program);
    setCurrentCharIndex(0);
    const newTimer = calculateTimer(index);
    setTimer(newTimer);
    setTimerRunning(true);
    setIsFinished(false);
    setShowReportModal(false);
    
    const { key, shift } = getNextKey(program.charAt(0));
    setHighlightedKey(key);
    setHighlightShift(shift);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setTimer((t) => t - 1), 1000);
    editorRef.current?.focus(); // NEW - Automatically focus editor
  }

   //  Your updated handleTyping function
  function handleTyping(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!snippets[activeId] || !hasSnippetStarted) return;
    const fullProgram = snippets[activeId].program;
    const isLastChar = currentCharIndex + 1 === fullProgram.length;

    let char = e.key;
    if (["Shift", "Control", "Alt"].includes(char)) return;
    // Handle special keys
  if (char === "Enter") {
    char = "\n";
  } else if (char === "Tab") {
    e.preventDefault(); // Prevent focus shift
    const nextExpected = fullProgram.slice(currentCharIndex, currentCharIndex + 2);
        //  Only treat Tab as "    " if the next 4 characters are 4 spaces
    if (nextExpected === "  ") {
      char = "  ";
    } else {
      return; // If it's not 4 spaces, ignore the Tab key
    }

  } else if (char.length > 1) {
    // Ignore non-character keys (like Arrow keys, Home, End, etc.)
    return;
  }
    const charsToAdd = char.split(""); // split "  " into [' ', ' ']
setTypedChars((prev) => [...prev, ...charsToAdd]);
setCurrentCharIndex((prev) => prev + charsToAdd.length);


 if (isLastChar) {
  const finalInput = [...typedChars, ...charsToAdd].join(""); 
  const { accuracy, errorCount, status } = calculateAccuracyAndErrorRate(
    finalInput.split(""),
    fullProgram
  );

  const totalWord = fullProgram.replace(/\s/g, "").length;
  const typedWord = finalInput.replace(/\s/g, "").length;
  const wpm = Math.round((typedWord / 5) / (1 / 60)); // Assuming 1-minute timer; update if dynamic

  const report = {
    totalWord,
    wpm,
    accuracy: Math.round(accuracy),
    errors: errorCount,
  };

  setReportData(report); // show in ReportModal
  //DISPATCH to Redux report log
  dispatch({
    type: "UPDATE_REPORT",
    payload: {
      stage: "Lambda",
      lesson: snippets[activeId].title,
      level: language,
      totalWord,
      typedWord,
      index: activeId,
      //topic: snippets[activeId].title,
      speed: wpm,
      accuracy: Math.round(accuracy),
      errors: errorCount,
      date: new Date().toISOString(),
      status,
    },
  });
  setShowReportModal(true);

    // Unlock logic
    setSnippets((prev) => {
      const updated = [...prev];
      const current = updated[activeId];
      if (status === "Complete") {
        current.completed = true;
        if (activeId < updated.length - 1) {
          updated[activeId + 1].unlock = true;
          localStorage.setItem(`progress-${language}`, String(activeId + 1));
        }
      } else {
        current.completed = false;
      }
      return updated;
    }); 
}
    e.preventDefault();
  }

  function handleRetry() {
    if (activeId === -1 || !snippets[activeId]) return;
    const program = snippets[activeId].program || "";
    setEditorValue(program);
    setTypedChars([]);
    setCurrentCharIndex(0);
    const newTimer = calculateTimer(activeId);
    setTimer(newTimer);
    setTimerRunning(true);
    setIsFinished(false);
    setHasSnippetStarted(true);
    const { key, shift } = getNextKey(program.charAt(0));
    setHighlightedKey(key);
    setHighlightShift(shift);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setTimer((t) => t - 1), 1000);
    editorRef.current?.focus(); // Focus the editor on Reset
  }

  function handleSidebarMin() {
    setSidebarMin((v) => !v);
  }

  const handleExitStay = () => setShowExitModal(false);
const handleExitYes = () => {
  setShowExitModal(false);
  navigate(-1);
};

const handleTryAgain = () => {
  setShowReportModal(false);
  handleRetry(); // reuse your retry logic
};

const handleThanks = () => {
  setShowReportModal(false);
  navigate(-1);
};


const onNavigationBack = React.useCallback(() => {
  if (hasSnippetStarted && currentCharIndex < (snippets[activeId]?.program.length || 0)) {
    setShowExitModal(true);
  } else {
    navigate(-1);
  }
}, [hasSnippetStarted, currentCharIndex, snippets, activeId, navigate]);


  return (
    <div className="tt-root">
      {/* Sidebar */}
      <div className={`tt-sidebar${sidebarMin ? " minimized" : ""}`}>
        {/* Sidebar header */}
        <div className="tt-sidebar-header">
          <button className={`tt-back-btn${sidebarMin ? " hidden" : ""}`} onClick={onNavigationBack}>
            <span className="material-icons-outlined">arrow_back</span>
          </button>
          {!sidebarMin && <h2 className="tt-sidebar-title">{language}{" "}Snippets</h2>}
          <button className="tt-minimize-btn" onClick={handleSidebarMin}>
            <span className="material-icons-outlined">
              {sidebarMin ? "menu" : "menu_open"}
            </span>
          </button>
        </div>
        {/* Snippet list */}
        <div className={`tt-sidebar-content${sidebarMin ? " hidden" : ""}`}>
          <ul className="tt-snippet-list">
            {snippets.map((snippet: Snippet, index: number) => {
              const difficulty: string = getDifficulty(snippet.mode as any);
              return (
                <li
                  key={snippet.title}
                 className={`tt-snippet-item${snippet.completed? " completed": activeId === index? " active": snippet.unlock? " unlocked": ""}`}
                  onClick={() => handleSelect(index)}
                >
                  <div className="tt-snippet-main">
                  <span
                    className={`material-icons-outlined tt-snippet-icon${snippet.unlock || snippet.completed ? " completed" : ""}`}
                  >
                    {snippet.unlock || snippet.completed
                      ? "check_circle_outline"
                      : "radio_button_unchecked"}
                  </span>
                    <div className="tt-snippet-row">
                      <p
                        className={`tt-snippet-title${activeId === index ? " active" : ""}`}
                      >
                        {snippet.title}       
                      </p>
                      <span
                        className={`tt-difficulty ${difficulty}`}>
                        {difficulty}
                      </span>
                    </div>
                    <p className="tt-snippet-desc">
                      {snippet.description}</p>
                  </div>
                  {/* Display lock icon if the snippet is locked */}
              {!snippet.unlock && <span className="lock">🔒</span>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <ExitModal
  open={showExitModal}
  onStay={handleExitStay}
  onExit={handleExitYes}
/>

<ReportModal
  open={showReportModal}
  report={reportData}
  onTryAgain={handleTryAgain}
  onThanks={handleThanks}
/>
      {/* Main area */}
      <div className="tt-main">
        <div className="tt-editor-area">
            <div className="tt-editor-area">
  {hasSnippetStarted && (
  <div className="tt-timer-overlay">
    <span className={`tt-timer${timer <= 10 ? " warning" : ""}`}>
      {formatTime(timer)}
    </span>
  </div>
)}

{hasSnippetStarted && (
  <div className="tt-retry-fixed">
    <button className="tt-retry-button" onClick={handleRetry}>
       ReSet
    </button>
  </div>
)}

 <div
  ref={editorRef} //  NEW
  className="tt-editor tt-custom-editor"
  tabIndex={0}
  onKeyDown={handleTyping}
  style={{
    padding: 35,
    borderRadius: 10,
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    background: "#070707",
    color: "white",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
    fontFamily: "var(--font-code)",
    fontSize: "1.3rem",
    minHeight: "220px",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
  }}
>
  <div></div>
{activeId === -1 ? (
  <p style={{ color: "#999", fontStyle: "italic" }}>
    Click a snippet from the left to begin typing...
  </p>
) : (
  snippets[activeId]?.program.split("").map((char: string, index: number) => {
      const programLength = snippets[activeId]?.program.length || 0;
    const isCompleted = currentCharIndex >= programLength;
    let style: React.CSSProperties = { color: "#ccc" };
    if (!isCompleted) {
    if (index < currentCharIndex) {
      const userChar = typedChars[index];
       const isCorrect = userChar?.toLowerCase() === char?.toLowerCase();
      //  Don't show red if program is fully typed
      style = isCorrect ? { color: "green" } : { color: "red" };
    } else if (index === currentCharIndex) {
      style = { color: "#ccc", borderBottom: "2px solid #0c77f2" };
    }
  }
    const className = index === currentCharIndex ? "blinking-border" : "";
    return (
      <span key={index} className={className} style={style}>
        {char === " " ? "\u00A0" : char}
      </span>
    );
  })
)}
</div>

</div>      
    </div>
        {/* Keyboard overlay */}
 {/* Row 1: Top symbol row with Shift combo */}
<div className="tt-keyboard-row">
  {[
    { key: "`", shift: "~" },
    { key: "1", shift: "!" },
    { key: "2", shift: "@" },
    { key: "3", shift: "#" },
    { key: "4", shift: "$" },
    { key: "5", shift: "%" },
    { key: "6", shift: "^" },
    { key: "7", shift: "&" },
    { key: "8", shift: "*" },
    { key: "9", shift: "(" },
    { key: "0", shift: ")" },
    { key: "-", shift: "_" },
    { key: "=", shift: "+" },
    { key: "Backspace", shift: "" },
  ].map(({ key, shift }) => (
    <div
      key={key}
       className={`tt-key-key ${shift ? "dual-label" : ""} ${isKeyHighlighted(key, highlightedKey, highlightShift) ? "active" : ""} ${key === "Backspace" ? "tt-key-wide" : ""}`}

    >
      {key === "Backspace" ? key : (
        <>
          <span className="upper">{shift}</span>
          <span className="lower">{key}</span>
        </>
      )}
    </div>
  ))}
</div>

{/* Row 2 */}
<div className="tt-keyboard-row">
  {["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"].map((key) => {
    const shiftMap: { [key: string]: string } = {
      "[": "{",
      "]": "}",
      "\\": "|",
    };
    const hasShift = shiftMap[key];
    return (
      <div
        key={key}
         className={`tt-key-key ${hasShift ? "dual-label" : ""} ${isKeyHighlighted(key, highlightedKey, highlightShift) ? "active" : ""}`}
      >
        {hasShift ? (
          <>
            <span className="upper">{shiftMap[key]}</span>
            <span className="lower">{key}</span>
          </>
        ) : key}
      </div>
    );
  })}
</div>

{/* Row 3 */}
<div className="tt-keyboard-row">
  {["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"].map((key) => {
    const shiftMap: { [key: string]: string } = {
      ";": ":",
      "'": '"',
    };
    const hasShift = shiftMap[key];
    return (
      <div
        key={key}
        className={`tt-key-key ${hasShift ? "dual-label" : ""} ${isKeyHighlighted(key, highlightedKey, highlightShift) ? "active" : ""} ${key === "Caps Lock" || key === "Enter" ? "tt-key-wider" : ""}`}
      >
        {hasShift ? (
          <>
            <span className="upper">{shiftMap[key]}</span>
            <span className="lower">{key}</span>
          </>
        ) : key}
      </div>
    );
  })}
</div>

{/* Row 4 */}
<div className="tt-keyboard-row">
  {["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"].map((key, i) => {
    const shiftMap: { [key: string]: string } = {
      ",": "<",
      ".": ">",
      "/": "?",
    };
    const hasShift = shiftMap[key];
    const isShiftKey = key === "Shift";
    return (
      <div
        key={i}
        className={`tt-key-key ${hasShift ? "dual-label" : ""} ${isKeyHighlighted(key, highlightedKey, highlightShift) ? "active" : ""} ${isShiftKey ? "tt-key-widest" : ""} ${isShiftKey && highlightShift ? "shift-glow" : ""}`}
      >
        {hasShift ? (
          <>
            <span className="upper">{shiftMap[key]}</span>
            <span className="lower">{key}</span>
          </>
        ) : key}
      </div>
    );
  })}
</div>

{/* Row 5 */}
<div className="tt-keyboard-row">
  {["Ctrl", "Alt", "SPACE", "Alt", "Ctrl"].map((key) => {
    const display = key === "SPACE" ? " " : key;
    return (
      <div
        key={key}
        className={`tt-key-key${isKeyHighlighted(key, highlightedKey, highlightShift) ? " active" : ""} ${key === "SPACE" ? "tt-key-space" : "tt-key-wide"}`}
      >
        {display}
      </div>
    );
  })}
</div>
      
      </div>   
      {/* Google Fonts and Material Icons */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
        rel="stylesheet"
      />
      <link
  href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap"
  rel="stylesheet"
/>

      <style>{`
:root {
  --primary-color: #0c77f2;
  --background-color: #0d1117;
  --panel-background-color: #161b22;
  --border-color: #30363d;
  --text-primary: #c9d1d9;
  --text-secondary: #8b949e;
  --accent-hover: #1f6feb;
  --success-color: #238636;
  --warning-color: #f5a623;
  --danger-color: #da3633;
  --sidebar-width: 25vw;
  --sidebar-min-width: 300px;
  --sidebar-minimized-width: 60px;
  --font-main: "Space Grotesk", "Noto Sans", sans-serif;
  --font-code: "Space Mono", "Courier New", monospace;
}
.tt-root {
  display: flex;
  height: 100vh;
  overflow: hidden;
  font-family: var(--font-main);
  background: var(--background-color);
  color: var(--text-primary);
}
.tt-sidebar {
  background: var(--panel-background-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  min-width: var(--sidebar-min-width);
  transition: width 0.3s;
}
.tt-sidebar.minimized {
  width: var(--sidebar-minimized-width);
  min-width: var(--sidebar-minimized-width);
}
.tt-sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tt-back-btn {
  color: var(--text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}
.tt-back-btn:hover {
  color: var(--text-primary);
}
.tt-back-btn.hidden {
  display: none;
}
.tt-sidebar-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #fff;
}
.tt-minimize-btn {
  color: var(--text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}
.tt-minimize-btn:hover {
  color: var(--text-primary);
}
.tt-sidebar-content {
  overflow-y: auto;
  flex-grow: 1;
}
.tt-sidebar-content.hidden {
  display: none;
}
  
.tt-snippet-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border: none;
}
.tt-snippet-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border-bottom: 1px solid var(--border-color);
  background: none;
}
.tt-snippet-item:last-child {
  border-bottom: none;
}
.tt-snippet-item:hover {
  background: var(--background-color);
}
.tt-snippet-item.completed {
  background-color: #486c91;
  color: white;
  border: none;
  box-shadow: none;
  font-weight: bold;
  border-radius: 6px;
  padding: 10px;
  transition: background 0.3s ease-in-out;
}

.tt-snippet-item.unlocked {
  border: 1px solid #0c77f2;
  background-color: #121212;
  box-shadow: 0 0 5px #0c77f2;
}

.tt-snippet-item.active {
    border: 2px solid #2a4451;
    box-shadow: 0 0 12px #213640;
    background-color: #284048;
}

.tt-snippet-icon {
  color: var(--text-secondary);
  margin-top: 0.25rem;
  transition: color 0.2s;
}
.tt-snippet-item:hover .tt-snippet-icon {
  color: var(--primary-color);
}
.tt-snippet-icon.completed {
  color: var(--success-color);
}
.tt-snippet-main {
  flex: 1;
}
.tt-snippet-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tt-snippet-title {
  font-weight: 500;
  color: #fff;
  transition: color 0.2s;
}
.tt-snippet-title.active,
.tt-snippet-item:hover .tt-snippet-title {
   color: #ffffff;
}
.tt-difficulty {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid;
  display: inline-block;
}
.tt-difficulty.easy {
  background: rgba(34,197,94,0.12);
  color: #22c55e;
  border-color: rgba(34,197,94,0.3);
}
.tt-difficulty.medium {
  background: rgba(253,224,71,0.12);
  color: #fde047;
  border-color: rgba(253,224,71,0.3);
}
.tt-difficulty.hard {
  background: rgba(239,68,68,0.12);
  color: #ef4444;
  border-color: rgba(239,68,68,0.3);
}
.tt-snippet-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}
.tt-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.tt-editor-area {
  position: relative;
  height: calc(100vh - 280px); /* 👈 reduce height to make space for keyboard */
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  background: var(--background-color);
  padding-bottom: 9px;
}
  .blinking-border {
  animation: blink 1s step-start 0s infinite;
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

.tt-popup-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  padding: 1.2rem 1.8rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.2rem;
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
  animation: fadeInScale 0.5s ease, confetti-burst 1s ease-out;
  z-index: 100;
  overflow: visible;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* Confetti burst */
@keyframes confetti-burst {
  0% { opacity: 1; transform: translateY(0) rotate(0deg); }
  100% { opacity: 0; transform: translateY(100px) rotate(720deg); }
}

.confetti-piece {
  position: absolute;
  width: 8px;
  height: 14px;
  border-radius: 2px;
  opacity: 0.9;
  animation: confetti-burst 1.2s ease forwards;
  pointer-events: none;
}


@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}



.tt-timer-overlay {
  position: absolute;
  top: 1.6rem;
  right: 3rem;
  z-index: 10;
  background: rgba(12, 119, 242, 0.12);
  border: 1px solid var(--primary-color);
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
  box-shadow: 0 0 6px rgba(12, 119, 242, 0.25);
}

.tt-timer-row {
  margin-bottom: 0.2rem; /*  Adjusted spacing */
  display: flex;
  justify-content: flex-end;
  align-items: center;
}


.tt-timer {
  font-size: 1.25rem;
  font-family: 'Orbitron', monospace;
  font-weight: 600;
  color: #0c77f2;
  letter-spacing: 0.5px;
}

.tt-timer.warning {
  color: #f97316;
  text-shadow: 0 0 6px rgba(249, 115, 22, 0.6);
}
  .tt-retry-button-container {
  position: absolute;
  top: 1rem;
  left: 1.2rem;
  z-index: 10;
}

.tt-retry-fixed {
  position: absolute;
  bottom: 1rem;
  right: 3rem;
  z-index: 10;
}

.tt-retry-button {
  background: #1f1f1f;
  color: #0c77f2;
  border: 1px solid #0c77f2;
  border-radius: 6px;
  padding: 0.4rem 0.9rem;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.tt-retry-button:hover {
  background: #0c77f2;
  color: white;
}


.tt-key-key.active {
  background: #3f4864; /* dark blue-grey background */
  color: #dce3f0;       /* soft light text color */
  border-color: #0c77f2; /* bright blue border */
  box-shadow: 0 0 3px rgba(12, 119, 242, 0.7); /* subtle glow */
}
.tt-editor {
  flex-grow: 1;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  background: var(--panel-background-color);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  resize: none;
  font-family: var(--font-code);
  font-size: 1rem;
  outline: none;
}
.tt-editor:focus {
  border: 1.5px solid var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color, #0c77f2);
}
.tt-feedback {
  height: 25%;
  background: var(--panel-background-color);
  border-top: 1px solid var(--border-color);
  display: none;
}

.tt-keyboard-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 0.3rem;
}
 .dual-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
}

.upper {
  font-size: 0.65rem;
  color: #aaa;
  margin-bottom: 2px;
}

.lower {
  font-size: 0.8rem;
  color: #fff;
}


.tt-key-shift {
  font-size: 0.6rem;       /* smaller shift label */
}

.tt-key-normal {
  font-size: 0.8rem;       /* smaller main key text */
}


.tt-key-key {
  background-color: #1f1f1f;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 0.3rem 0.5rem;   /* smaller key size */
  font-size: 0.70rem;       /* smaller font inside keys */
  color: #fff;
  text-align: center;
  min-width: 3rem;          /* narrower key */
  min-height: 2.1rem;       /* shorter key */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
  transition: background-color 0.2s, transform 0.1s;
   margin-right: 0.3rem;
  
}


  .keyboard-row:first-child .tt-key-key {
  margin: 4px 6px; /* horizontal spacing between 1st row keys */
}
.tt-key-key.active.shift-glow {
  box-shadow: 0 0 4px #2e7d32;
  background: #1b5e20;
  color: white;
  border-color: #2e7d32;
}

@keyframes shiftBlinkGlowGreen {
  0% {
    box-shadow: 0 0 4px rgba(46, 125, 50, 0.3);
    background-color: #0f3a12;
  }
  50% {
    box-shadow: 0 0 16px 6px rgba(56, 142, 60, 0.7);
    background-color: #2e7d32;
  }
  100% {
    box-shadow: 0 0 4px rgba(46, 125, 50, 0.3);
    background-color: #0f3a12;
  }
}

.tt-key-key.shift-glow {
  animation: shiftBlinkGlowGreen 0.7s infinite;
  color: white;
  border-color: #2e7d32; /* Dark Green */
  background-color: #2e7d32;
  box-shadow: 0 0 4px #2e7d32;
}

.tt-key-key.tt-key-wide {
  min-width: 3.5rem;
}
.tt-key-key.tt-key-wider {
  min-width: 4.2rem;
}
.tt-key-key.tt-key-widest {
  min-width: 5.2rem;
}
.tt-key-key.tt-key-space {
  min-width: 11rem;
}

@media (max-width: 900px) {
 .tt-keyboard-overlay {
  width: 100%;
  height: 26%;                           /* Keep enough height */
  background: var(--panel-background-color);
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-top: 0.2rem;                   /* 🔽 reduce top padding */
  padding-bottom: 0.4rem;                /* 🔽 reduce bottom padding to move it up */
   margin-top: -12px;                   /* 🔼 Pulls the keyboard slightly upward */
  box-sizing: border-box;
}

.tt-key-key {
  width: 38px;             /* smaller */
  height: 44px;
  font-size: 0.9rem;        /* smaller text */
  font-weight: normal;
  margin: 3px;
}
  .tt-key-key.tt-key-space {
    min-width: 7rem;
  }
}
@media (max-width: 900px) {
  .tt-sidebar {
    min-width: 0;
    width: 60px !important;
  }
  .tt-sidebar-content {
    display: none !important;
  }
  .tt-sidebar-header h2 {
    display: none;
  }
}
      `}</style>
    </div>
  );
}