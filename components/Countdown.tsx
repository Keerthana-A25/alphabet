import React, { useState, useEffect, useRef, memo } from "react";

type CountdownProps = {
  wordLength: number; // Initial countdown value based on word length
  stop: boolean; // Flag to stop the countdown
  onCountdownUpdate: (currentTime: number) => void; // Callback to inform the parent of the current countdown value
};

const Countdown = memo(
  ({ wordLength, stop, onCountdownUpdate }: CountdownProps) => {
    const [timeLeft, setTimeLeft] = useState<number>(wordLength + 3); // Initialize timeLeft
    const timerRef = useRef<number | null>(null); // Timer reference

    useEffect(() => {
      // Start the timer if it's not already running and stop is false
      if (!timerRef.current && !stop) {
        timerRef.current = window.setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 0) {
              clearInterval(timerRef.current!);
              timerRef.current = null;
              return 0;
            }
            const newTime = prevTime - 1;
            return newTime;
          });
        }, 1000);
      }

      return () => {
        // Cleanup timer on unmount
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }, [stop]); // Re-run the effect when `stop` changes

    useEffect(() => {
      // Stop the timer when the stop flag changes to true
      if (stop) {
        onCountdownUpdate(timeLeft); // Inform parent of the updated time
        timerRef.current && clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, [stop, timeLeft, onCountdownUpdate]);

    // Format time as mm:ss
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
      ).padStart(2, "0")}`;
    };

    return (
      <div>
        <p>{formatTime(timeLeft)}</p>
      </div>
    );
  }
);

export default Countdown;
