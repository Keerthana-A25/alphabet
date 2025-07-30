import React, { useEffect, useRef } from 'react';
import './Keyboard.css'; // Optional, for styling
import { getNextKey } from './utils/helper';

interface KeyboardProps {
  highlightedKey: string;
  isFinished?: boolean;
  targetChar?: string; // The character that should be typed next
}

interface KeyProps {
  id: string;
  displayText: string;
  highlighted: boolean;
  width: number;
  height: number;
  marginLeft?: number;
  textSize?: number;
  isShiftKey?: boolean;
  shiftHighlighted?: boolean;
  isTopRow?: boolean; // New prop to identify top row keys
}

const Key: React.FC<KeyProps> = ({ 
  id, 
  displayText, 
  highlighted, 
  width, 
  height, 
  marginLeft = 0, 
  textSize = 14,
  isShiftKey = false,
  shiftHighlighted = false,
  isTopRow = false
}) => {
  const isHighlighted = highlighted || shiftHighlighted;
  
  // Check if this is a dual character key (contains two characters separated by space)
  // AND it's in the top row
  const isDualChar = isTopRow && displayText.includes(' ') && displayText.split(' ').length === 2;
  const [primaryChar, secondaryChar] = isDualChar ? displayText.split(' ') : [displayText, ''];
  
  const keyStyle = {
    width,
    height,
    background: isHighlighted ? '#FFA500' : '#FFFFFF',
    marginLeft,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: textSize,
    boxShadow: isHighlighted ? 'inset 2px 2px 8px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
    transform: isHighlighted ? 'translateY(2px)' : 'translateY(0)',
    transition: 'transform 0.1s, box-shadow 0.1s',
    border: isShiftKey && shiftHighlighted ? '2px solid #FF6B35' : 'none',
    position: 'relative' as const,
  };

  return (
    <div id={id} style={keyStyle} className={isHighlighted ? 'blink' : ''}>
      {isDualChar ? (
        <>
          {/* Primary character - bottom left */}
          <span style={{
            position: 'absolute',
            bottom: '4px',
            left: '6px',
            fontSize: Math.max(textSize - 2, 10),
            fontWeight: 'bold',
            color: '#333'
          }}>
            {primaryChar}
          </span>
          {/* Secondary character - top right */}
          <span style={{
            position: 'absolute',
            top: '3px',
            right: '6px',
            fontSize: Math.max(textSize - 3, 9),
            fontWeight: 'normal',
            color: '#666'
          }}>
            {secondaryChar}
          </span>
        </>
      ) : (
        // Single character or text - centered
        <span style={{ fontWeight: textSize < 12 ? 'bold' : 'normal' }}>
          {displayText}
        </span>
      )}
    </div>
  );
};


const Keyboard: React.FC<KeyboardProps> = ({ highlightedKey, isFinished, targetChar = '' }) => {
  console.log("highlightedKey", highlightedKey, "targetChar", targetChar);
  const spaceKeyRef = useRef<HTMLMediaElement>(null);
  const otherKeyRef = useRef<HTMLMediaElement>(null);
  const finishKeyRef = useRef<HTMLMediaElement>(null);

  // Get next key and shift state for the target character
  const { key: nextKey, shift: needsShift } = targetChar ? getNextKey(targetChar) : { key: '', shift: false };
  
  // Key layout definition with both regular and shifted characters
  const keyboardLayout = [
    // Row 1: Numbers and symbols
    [
      { id: '`', display: '` ~', baseKey: '`', shiftChar: '~', width: 35 },
      { id: '1', display: '1 !', baseKey: '1', shiftChar: '!', width: 35 },
      { id: '2', display: '2 @', baseKey: '2', shiftChar: '@', width: 35 },
      { id: '3', display: '3 #', baseKey: '3', shiftChar: '#', width: 35 },
      { id: '4', display: '4 $', baseKey: '4', shiftChar: '$', width: 35 },
      { id: '5', display: '5 %', baseKey: '5', shiftChar: '%', width: 35 },
      { id: '6', display: '6 ^', baseKey: '6', shiftChar: '^', width: 35 },
      { id: '7', display: '7 &', baseKey: '7', shiftChar: '&', width: 35 },
      { id: '8', display: '8 *', baseKey: '8', shiftChar: '*', width: 35 },
      { id: '9', display: '9 (', baseKey: '9', shiftChar: '(', width: 35 },
      { id: '0', display: '0 )', baseKey: '0', shiftChar: ')', width: 35 },
      { id: '-', display: '- _', baseKey: '-', shiftChar: '_', width: 35 },
      { id: '=', display: '= +', baseKey: '=', shiftChar: '+', width: 35 },
      { id: 'BACKSPACE', display: 'BACKSPACE', baseKey: 'BACKSPACE', width: 74, textSize: 10 },
    ],
    // Row 2: QWERTY
    [
      { id: 'TAB', display: 'TAB', baseKey: 'TAB', width: 55, textSize: 10 },
      { id: 'Q', display: 'Q', baseKey: 'Q', width: 35 },
      { id: 'W', display: 'W', baseKey: 'W', width: 35 },
      { id: 'E', display: 'E', baseKey: 'E', width: 35 },
      { id: 'R', display: 'R', baseKey: 'R', width: 35 },
      { id: 'T', display: 'T', baseKey: 'T', width: 35 },
      { id: 'Y', display: 'Y', baseKey: 'Y', width: 35 },
      { id: 'U', display: 'U', baseKey: 'U', width: 35 },
      { id: 'I', display: 'I', baseKey: 'I', width: 35 },
      { id: 'O', display: 'O', baseKey: 'O', width: 35 },
      { id: 'P', display: 'P', baseKey: 'P', width: 35 },
      { id: '[', display: '[ {', baseKey: '[', shiftChar: '{', width: 35 },
      { id: ']', display: '] }', baseKey: ']', shiftChar: '}', width: 35 },
      { id: '\\', display: '\\ |', baseKey: '\\', shiftChar: '|', width: 55 },
    ],
    // Row 3: ASDF home row
    [
      { id: 'CAPSLOCK', display: 'CAPS', baseKey: 'CAPSLOCK', width: 65, textSize: 10 },
      { id: 'A', display: 'A', baseKey: 'A', width: 35 },
      { id: 'S', display: 'S', baseKey: 'S', width: 35 },
      { id: 'D', display: 'D', baseKey: 'D', width: 35 },
      { id: 'F', display: 'F', baseKey: 'F', width: 35 },
      { id: 'G', display: 'G', baseKey: 'G', width: 35 },
      { id: 'H', display: 'H', baseKey: 'H', width: 35 },
      { id: 'J', display: 'J', baseKey: 'J', width: 35 },
      { id: 'K', display: 'K', baseKey: 'K', width: 35 },
      { id: 'L', display: 'L', baseKey: 'L', width: 35 },
      { id: ';', display: '; :', baseKey: ';', shiftChar: ':', width: 35 },
      { id: "'", display: "' \"", baseKey: "'", shiftChar: '"', width: 35 },
      { id: 'ENTER', display: 'ENTER', baseKey: 'ENTER', width: 85, textSize: 10 },
    ],
    // Row 4: ZXCV
    [
      { id: 'SHIFT_L', display: 'SHIFT', baseKey: 'SHIFT', width: 85, textSize: 10 },
      { id: 'Z', display: 'Z', baseKey: 'Z', width: 35 },
      { id: 'X', display: 'X', baseKey: 'X', width: 35 },
      { id: 'C', display: 'C', baseKey: 'C', width: 35 },
      { id: 'V', display: 'V', baseKey: 'V', width: 35 },
      { id: 'B', display: 'B', baseKey: 'B', width: 35 },
      { id: 'N', display: 'N', baseKey: 'N', width: 35 },
      { id: 'M', display: 'M', baseKey: 'M', width: 35 },
      { id: ',', display: ', <', baseKey: ',', shiftChar: '<', width: 35 },
      { id: '.', display: '. >', baseKey: '.', shiftChar: '>', width: 35 },
      { id: '/', display: '/ ?', baseKey: '/', shiftChar: '?', width: 35 },
      { id: 'SHIFT_R', display: 'SHIFT', baseKey: 'SHIFT', width: 106, textSize: 10 },
    ],
    // Row 5: Space bar row
    [
      { id: 'CTRL_L', display: 'CTRL', baseKey: 'CTRL', width: 45, textSize: 10 },
      { id: 'WIN_L', display: 'WIN', baseKey: 'WIN', width: 45, textSize: 10 },
      { id: 'ALT_L', display: 'ALT', baseKey: 'ALT', width: 45, textSize: 10 },
      { id: 'SPACE', display: 'SPACE', baseKey: 'SPACE', width: 250, textSize: 10 },
      { id: 'ALT_R', display: 'ALT', baseKey: 'ALT', width: 45, textSize: 10 },
      { id: 'WIN_R', display: 'WIN', baseKey: 'WIN', width: 45, textSize: 10 },
      { id: 'MENU', display: 'MENU', baseKey: 'MENU', width: 45, textSize: 10 },
      { id: 'CTRL_R', display: 'CTRL', baseKey: 'CTRL', width: 45, textSize: 10 },
    ],
  ];

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === " ") {
        spaceKeyRef.current && (spaceKeyRef.current.currentTime = 0);
        spaceKeyRef?.current?.play?.();
      } else {
        otherKeyRef.current && (otherKeyRef.current.currentTime = 0);
        otherKeyRef?.current?.play?.();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isFinished) {
      finishKeyRef.current && (finishKeyRef.current.currentTime = 0);
      finishKeyRef?.current?.play?.();
    }
  }, [isFinished]);

  // Helper function to determine if a key should be highlighted
  const isKeyActive = (keyData: any) => {
    const { baseKey, shiftChar } = keyData;
    
    // Handle special cases
    if (baseKey === 'SPACE' && (highlightedKey === ' ' || nextKey === 'SPACE')) return true;
    if (baseKey === 'ENTER' && (highlightedKey === '\n' || nextKey === 'ENTER')) return true;
    if (baseKey === 'TAB' && nextKey === 'TAB') return true;
    if (baseKey === 'BACKSPACE' && highlightedKey === 'backspace') return true;
    
    // Check for direct character match
    if (baseKey.toUpperCase() === highlightedKey.toUpperCase()) return true;
    if (baseKey.toUpperCase() === nextKey.toUpperCase()) return true;
    
    // Check for shifted character match
    if (shiftChar && (shiftChar === targetChar || shiftChar === highlightedKey)) return true;
    
    return false;
  };

  // Helper function to determine if shift should be highlighted
  const shouldHighlightShift = (): boolean => {
    return needsShift || (targetChar ? targetChar !== targetChar.toLowerCase() && /[A-Z]/.test(targetChar) : false);
  };

  return (
    <div className="keyboard" style={{ width: 615, height: 'auto', position: 'relative' }}>
      {keyboardLayout.map((row, rowIndex) => (
        <div 
          key={`row-${rowIndex}`}
          style={{ 
            position: 'absolute', 
            top: 3 + (rowIndex * 41), 
            left: 3, 
            display: 'flex', 
            flexDirection: 'row' 
          }}
        >
          {row.map((keyData, keyIndex) => {
            const isActive = isKeyActive(keyData);
            const isShift = keyData.baseKey === 'SHIFT';
            const shiftHighlighted = isShift && shouldHighlightShift();
            
            return (
              <Key
                key={keyData.id}
                id={keyData.id}
                displayText={keyData.display}
                highlighted={isActive}
                width={keyData.width}
                height={35}
                marginLeft={keyIndex === 0 ? 0 : 6}
                textSize={keyData.textSize || 14}
                isShiftKey={isShift}
                shiftHighlighted={shiftHighlighted}
                isTopRow={rowIndex === 0} // Only apply special layout to first row
              />
            );
          })}
        </div>
      ))}
      
      <audio
        ref={spaceKeyRef}
        src={require('./mp3/spacekey.mp3')}
        crossOrigin="anonymous"
      />
      <audio
        ref={otherKeyRef}
        src={require('./mp3/otherkey.mp3')}
        crossOrigin="anonymous"
      />
      <audio
        ref={finishKeyRef}
        src={require('./mp3/bell.mp3')}
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default Keyboard;
