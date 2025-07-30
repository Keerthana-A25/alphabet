import React from "react";
import FuturisticHands from "./futuristic_hands";

// Color palette for fingers
const fingerColors: Record<string, string> = {
  pinky: "#fca5a5",
  ring: "#fdba74", 
  middle: "#fde047",
  index: "#a7f3d0",
  thumb: "#a5b4fc",
};

// Keyboard layout data
const keyboardRows = [
  [
    { label: "` ~", finger: "pinky" },
    { label: "1 !", finger: "pinky" },
    { label: "2 @", finger: "ring" },
    { label: "3 #", finger: "middle" },
    { label: "4 $", finger: "index" },
    { label: "5 %", finger: "index" },
    { label: "6 ^", finger: "index" },
    { label: "7 &", finger: "index" },
    { label: "8 *", finger: "middle" },
    { label: "9 (", finger: "ring" },
    { label: "0 )", finger: "pinky" },
    { label: "- _", finger: "pinky" },
    { label: "= +", finger: "pinky" },
    { label: "Backspace", finger: "pinky", wide: true },
  ],
  [
    { label: "Tab", finger: "pinky", wide: true },
    { label: "Q", finger: "pinky" },
    { label: "W", finger: "ring" },
    { label: "E", finger: "middle" },
    { label: "R", finger: "index" },
    { label: "T", finger: "index" },
    { label: "Y", finger: "index" },
    { label: "U", finger: "index" },
    { label: "I", finger: "middle" },
    { label: "O", finger: "ring" },
    { label: "P", finger: "pinky" },
    { label: "[ {", finger: "pinky" },
    { label: "] }", finger: "pinky" },
    { label: "\\ |", finger: "pinky", wide: true },
  ],
  [
    { label: "Caps Lock", finger: "pinky", wide: true },
    { label: "A", finger: "pinky", bold: true },
    { label: "S", finger: "ring", bold: true },
    { label: "D", finger: "middle", bold: true },
    { label: "F", finger: "index", bold: true },
    { label: "G", finger: "index" },
    { label: "H", finger: "index" },
    { label: "J", finger: "index", bold: true },
    { label: "K", finger: "middle", bold: true },
    { label: "L", finger: "ring", bold: true },
    { label: "; :", finger: "pinky", bold: true },
    { label: "' \"", finger: "pinky" },
    { label: "Enter", finger: "pinky", wide: true },
  ],
  [
    { label: "Shift", finger: "pinky", wide: true },
    { label: "Z", finger: "pinky" },
    { label: "X", finger: "ring" },
    { label: "C", finger: "middle" },
    { label: "V", finger: "index" },
    { label: "B", finger: "index" },
    { label: "N", finger: "index" },
    { label: "M", finger: "index" },
    { label: ", <", finger: "middle" },
    { label: ". >", finger: "ring" },
    { label: "/ ?", finger: "pinky" },
    { label: "Shift", finger: "pinky", wide: true },
  ],
  [
    { label: "Ctrl", finger: "pinky", wide: true, white: true },
    { label: "Alt", finger: "pinky", wide: true, white: true },
    { label: "Space", finger: "thumb", space: true },
    { label: "Alt", finger: "pinky", wide: true, white: true },
    { label: "Ctrl", finger: "pinky", wide: true, white: true },
  ],
];

const fingerNames = [
  { name: "Left Pinky", color: fingerColors.pinky },
  { name: "Left Ring", color: fingerColors.ring },
  { name: "Left Middle", color: fingerColors.middle },
  { name: "Left Index", color: fingerColors.index },
  { name: "Thumbs", color: fingerColors.thumb },
  { name: "Right Index", color: fingerColors.index },
  { name: "Right Middle", color: fingerColors.middle },
  { name: "Right Ring", color: fingerColors.ring },
  { name: "Right Pinky", color: fingerColors.pinky },
];

function KeyboardKey({ label, finger, wide, bold, space, white, onHover, onLeave, isHighlighted, rowIndex }: any) {
  // Check if this is a first row key with dual characters
  const isFirstRowDualChar = rowIndex === 0 && label.includes(' ') && !wide && !space;
  
  const renderKeyContent = () => {
    if (isFirstRowDualChar) {
      const [baseChar, shiftChar] = label.split(' ');
      return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ 
            position: 'absolute',
            left: '6px',
            bottom: '4px',
            fontSize: '0.6rem',
            fontWeight: 500
          }}>
            {baseChar}
          </span>
          <span style={{ 
            position: 'absolute',
            right: '6px',
            top: '3px',
            fontSize: '0.6rem',
            fontWeight: 500
          }}>
            {shiftChar}
          </span>
        </div>
      );
    }
    return label;
  };

  return (
    <div
      style={{
        background: isHighlighted 
          ? `linear-gradient(135deg, ${fingerColors[finger]}, ${fingerColors[finger]}dd)` 
          : white ? "#fff" : fingerColors[finger] || "#fff",
        color: white ? "#222" : "#222",
        fontWeight: bold ? 700 : 500,
        fontSize: space ? "0.75rem" : isFirstRowDualChar ? "0.6rem" : "0.7rem",
        borderRadius: 4,
        boxShadow: isHighlighted 
          ? `0 0 12px ${fingerColors[finger]}aa, 0 2px 8px rgba(0,0,0,0.15)` 
          : "0 1px 3px rgba(0,0,0,0.08)",
        minWidth: space ? "12rem" : wide ? "2.8rem" : "2rem",
        height: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0.1rem",
        padding: space ? "0 1rem" : wide ? "0 0.5rem" : "0 0.3rem",
        border: bold ? "1.5px solid #222" : "1.5px solid transparent",
        outline: isHighlighted ? `2px solid ${fingerColors[finger]}` : 'none',
        letterSpacing: 0.5,
        transition: "background 0.3s ease, box-shadow 0.3s ease, outline-color 0.3s ease",
        cursor: "pointer",
        userSelect: "none",
        textDecoration: ['F', 'J'].includes(label) ? 'underline' : 'none',
        position: 'relative',
      }}
      className="keyboard-key"
      onMouseEnter={() => onHover && onHover(finger)}
      onMouseLeave={() => onLeave && onLeave()}
    >
      {renderKeyContent()}
    </div>
  );
}


const Help: React.FC = () => {
  const [hoveredFinger, setHoveredFinger] = React.useState<string | null>(null);

  const handleKeyHover = (finger: string) => {
    setHoveredFinger(finger);
  };

  const handleKeyLeave = () => {
    setHoveredFinger(null);
  };

  return (
    <div style={{ padding: 24, paddingTop:5, color: '#fff', fontFamily: 'Lexend, Noto Sans, sans-serif', minHeight: '100vh' }}>
      <style>{`
        .responsive-keyboard-container {
          transform-origin: center top;
          transition: transform 0.3s ease;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        /* 13-inch monitor optimization - no scaling needed at standard resolution */
        @media (min-width: 1280px) {
          .responsive-keyboard-container {
            transform: scale(1);
          }
        }
        
        @media (max-width: 1279px) {
          .responsive-keyboard-container {
            transform: scale(0.95);
          }
        }
        
        @media (max-width: 1200px) {
          .responsive-keyboard-container {
            transform: scale(0.9);
          }
        }
        
        @media (max-width: 1024px) {
          .responsive-keyboard-container {
            transform: scale(0.8);
          }
        }
        
        @media (max-width: 900px) {
          .responsive-keyboard-container {
            transform: scale(0.7);
          }
        }
        
        @media (max-width: 768px) {
          .responsive-keyboard-container {
            transform: scale(0.6);
          }
        }
        
        @media (max-width: 600px) {
          .responsive-keyboard-container {
            transform: scale(0.5);
          }
        }
        
        @media (max-width: 480px) {
          .responsive-keyboard-container {
            transform: scale(0.4);
          }
        }
        
        .keyboard-key {
          flex-shrink: 0;
        }
        
        .keyboard-row {
          display: flex;
          justify-content: center;
          flex-wrap: nowrap;
          margin-bottom: 0.15rem;
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
      <div>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 10 }}>Typing Tutor Guide</h2>
      <p style={{ fontSize: 16, marginBottom: 24, color: '#cbd5e1', maxWidth: 650 }}>
       Place your fingers on the home row (A S D F J K L ;).
      </p>
      </div>
         {/* Interactive Instructions */}
        <div style={{ 
          marginTop: 24, 
          padding: '16px 24px', 
          background: hoveredFinger ? `${fingerColors[hoveredFinger]}22` : 'rgba(255, 255, 255, 0.05)', 
          borderRadius: 12,
          border: '2px solid transparent',
          outline: hoveredFinger ? `2px solid ${fingerColors[hoveredFinger]}` : 'none',
          textAlign: 'center',
          transition: 'background-color 0.3s ease, outline-color 0.3s ease',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ 
            opacity: hoveredFinger ? 1 : 1,
            transition: 'opacity 0.3s ease',
          }}>
            {hoveredFinger ? (
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: fingerColors[hoveredFinger] }}>
                  {hoveredFinger.charAt(0).toUpperCase() + hoveredFinger.slice(1)} Finger
                </div>
                <div style={{ fontSize: 14, color: '#cbd5e1' }}>
                  Hover over keyboard keys to see which finger should be used
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 14, color: '#cbd5e1' }}>
                💡 Hover over any key on the keyboard to see the corresponding finger position
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 16, padding: 24, boxShadow: '0 8px 32px #0002', maxWidth: 1000, margin: '0 auto' }}>
        {/* Keyboard Layout */}
        <div style={{ marginBottom: 10, color: '#fbbf24', fontWeight: 600, fontSize: 18, textAlign: 'center' }}>
        Keep your fingers relaxed and always return to the home row after each key press!
      </div>
        <div className="responsive-keyboard-container" style={{ background: '#f1f5f9', borderRadius: 12, padding: 16, boxShadow: '0 4px 24px #0001', marginBottom: 20, width: 'fit-content' }}>
          {keyboardRows.map((row, i) => (
            <div key={i} className="keyboard-row">
              {row.map((key, j) => (
                <KeyboardKey 
                  key={j} 
                  {...key} 
                  rowIndex={i}
                  onHover={handleKeyHover}
                  onLeave={handleKeyLeave}
                  isHighlighted={hoveredFinger === key.finger}
                />
              ))}
            </div>
          ))}
        </div>
        {/* Hands Illustration */}
        <FuturisticHands highlightedFinger={hoveredFinger} />
        {/* Legend */}
        <div style={{ display: 'flex', gap: 0, marginTop: 32, justifyContent: 'center' }}>
          {fingerNames.map((f, i) => {
            const fingerName = f.name === 'Thumbs' ? 'thumb' : f.name.toLowerCase().split(' ')[1];
            const isHighlighted = hoveredFinger === fingerName;
            
            return (
              <div 
                key={i} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 8, 
                  fontSize: 15,
                  padding: '8px 12px',
                  borderRadius: 8,
                  background: isHighlighted ? `${f.color}33` : 'transparent',
                  border: '2px solid transparent',
                  outline: isHighlighted ? `2px solid ${f.color}` : 'none',
                  transition: 'background-color 0.3s ease, outline-color 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredFinger(fingerName)}
                onMouseLeave={() => setHoveredFinger(null)}
              >
                <span style={{ 
                  width: 22, 
                  height: 22, 
                  background: f.color, 
                  borderRadius: 8, 
                  display: 'inline-block', 
                  marginRight: 6, 
                  border: '2px solid #fff',
                  boxShadow: isHighlighted ? `0 0 12px ${f.color}88` : 'none',
                  transition: 'box-shadow 0.3s ease',
                }}></span>
                {f.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Help;
