import * as React from "react";
import "./Platform.css";
import Keyboard from "./Keyboard";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Countdown from "./components/Countdown";
import { getErrorCount, getKeyErrorMap } from "./utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { ExitModal } from "./ExitModal";
import { ReportModal } from "./ReportModal";

const isValidKey = (key: string) => {
  // Fixed regex: escape the / character
  const validKeysRegex = /^[a-zA-Z0-9!@#$%^&*()_+={}[\]:;"'<>,.?/`~ ]$/;
  return validKeysRegex.test(key);
};

// Stage progression configuration
const STAGE_PROGRESSION = {
  alpha: {
    finalLesson: "Alpha 40",
    nextStage: "beta",
    firstLessonOfNextStage: "Beta 1"
  },
  beta: {
    finalLesson: "Beta 40", 
    nextStage: "gamma",
    firstLessonOfNextStage: "Gamma 1 (S)"
  },
  gamma: {
    finalLesson: "Gamma 40 (R)",
    nextStage: null, // No next stage currently
    firstLessonOfNextStage: null
  }
} as const;

export default function Platform({ params }: any) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get lesson data from Redux store for persistence
  const courseState = useSelector((state: any) => state?.courseState ?? {});
  const currentLessonFromRedux = courseState.currentLesson;
  const nextLessonFromRedux = courseState.nextLesson;
  
  // Use location state if available, otherwise fallback to Redux
  const { lesson = currentLessonFromRedux || {}, nextLesson = nextLessonFromRedux } = location?.state ?? {};
  
  // If no lesson data is available at all, redirect to dashboard
  React.useEffect(() => {
    if (!lesson || Object.keys(lesson).length === 0) {
      console.log("No lesson data found, redirecting to dashboard");
      navigate('/dashboard');
    }
  }, [lesson, navigate]);
  
  const [outputs] = React.useState(lesson);
  const backAudioRef = React.useRef<HTMLMediaElement>(null);
  const [inputs, setInputs] = React.useState("");
  const [resetKey, setResetKey] = React.useState(0); // For remounting Countdown
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [showExitModal, setShowExitModal] = React.useState(false);
  const [showReportModal, setShowReportModal] = React.useState(false);
  const [reportData, setReportData] = React.useState({ totalWord: 0, wpm: 0, accuracy: 0, errors: 0 });
  const outputDataSet = React.useMemo(() => outputs.dataSet.join('').trimEnd().split(''), [outputs]);
  console.log("outputs :" + outputs);


  // Cleanup current lesson data when component unmounts
  React.useEffect(() => {
    return () => {
      // Clear current lesson when leaving the platform
      dispatch({ type: "CLEAR_CURRENT_LESSON" });
    };
  }, [dispatch]);

  // Keyboard input handler
  const onKeyboardCallback = React.useCallback((key: string) => {
  const targetLength = outputDataSet.length;
  const cleanedInputs = inputs.slice(0, targetLength); // prevent overflow
  if (cleanedInputs.length < targetLength) {
    setInputs((prev) => (prev + key).slice(0, targetLength)); // clamp input length
    if (startTime === null) {
      setStartTime(Date.now());
    }
  }
}, [inputs, outputDataSet.length, startTime]);


  // Physical keyboard event
  const onKeydown = React.useCallback(
    (event: any) => {
      event.preventDefault();
      const key = event.key;
      if (isValidKey(key)) {
        onKeyboardCallback(key === "Enter" ? "\n" : key);
      }
      event.stopImmediatePropagation();
    },
    [onKeyboardCallback]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    if (backAudioRef?.current?.volume !== undefined) {
      backAudioRef.current.volume = 0.15;
    }
    return () => window.removeEventListener("keydown", onKeydown);
  }, [onKeydown]);

 


  const unlockNextLession = React.useCallback(() => {
    console.log("unlockNextLession called", { 
      nextLesson, 
      outputsStage: outputs.stage, 
      outputsTitle: outputs.title 
    });
    
    if (nextLesson) {
      // Unlock the next lesson in the current stage
      dispatch({ 
        type: "UNLOCK_LESSON_COURSE", 
        payload: nextLesson.title,
        stage: outputs.stage 
      });
      console.log("Unlocking next lesson:", nextLesson.title);
    } else {
      // If there's no next lesson, we're at the end of the stage
      console.log("No next lesson found, checking for stage completion");
      
      // Get stage progression configuration
      const currentStageConfig = STAGE_PROGRESSION[outputs.stage as keyof typeof STAGE_PROGRESSION];
      
      if (currentStageConfig && outputs.title === currentStageConfig.finalLesson) {
        console.log(`✅ Completed final lesson of ${outputs.stage}: ${outputs.title}`);
        
        if (currentStageConfig.nextStage && currentStageConfig.firstLessonOfNextStage) {
          // Unlock next stage
          dispatch({ type: "UNLOCK_STAGE", payload: currentStageConfig.nextStage });
          
          // Unlock first lesson of next stage
          dispatch({ 
            type: "UNLOCK_LESSON_COURSE", 
            payload: currentStageConfig.firstLessonOfNextStage,
            stage: currentStageConfig.nextStage 
          });
          
          console.log(`🎯 Unlocked ${currentStageConfig.nextStage} stage and ${currentStageConfig.firstLessonOfNextStage}`);
        } else {
          console.log("🎉 Congratulations! You've completed all available stages!");
        }
      } else {
        console.log("Not the final lesson of any stage or unrecognized lesson", {
          stage: outputs.stage,
          title: outputs.title,
          expectedFinalLesson: currentStageConfig?.finalLesson
        });
      }
    }
  }, [nextLesson, dispatch, outputs]);

const onCountdownUpdate = React.useCallback(
  (time: any) => {
    console.log("onCountdownUpdate", time);
    const endTime = Date.now();

    // Clean input and output strings
    const cleanedInput = inputs.trimEnd();
    const cleanedOutput = outputDataSet.join("").trimEnd();

    // Count errors based on cleaned input/output
    const userError = getErrorCount(cleanedInput, cleanedOutput.split(""));

    // Get per-key error map for heatmap
    const keyErrorMap = getKeyErrorMap(cleanedInput, cleanedOutput.split(""));
    dispatch({ type: "UPDATE_HEATMAP", payload: keyErrorMap });

    const error = userError;

    // Total & typed word counts (excluding whitespace)
    const totalWord = cleanedOutput.replace(/\s/g, "").length;
    const typedWord = cleanedInput.replace(/\s/g, "").length;

    // Accuracy calculation
    const correctChars = Math.max(0, totalWord - error);
    const accuracy = totalWord > 0 ? (correctChars / totalWord) * 100 : 0;

    // WPM calculation
    const timeMinutes = Math.max(1 / 60, (endTime - startTime!) / 60000);
    const wpm = typedWord > 0 ? (typedWord / 5) / timeMinutes : 0;

    // Completion status logic
    const errorRate = totalWord > 0 ? (error / totalWord) * 100 : 0;
    const status = accuracy >= 90 && errorRate <= 10 ? "Complete" : "Incomplete";

    // Dispatch performance report
    dispatch({
      type: "UPDATE_REPORT",
      payload: {
        stage: outputs.stage,
        lesson: outputs.title,
        totalWord,
        typedWord,
        index: outputs.index,
        level: outputs.level,
        speed: Math.round(wpm),
        accuracy: Math.round(accuracy),
        errors: userError,
        date: new Date().toISOString(),
        status,
      },
    });


    const isGold = accuracy >= 80 && userError >= 0 && userError <= 2;
const isSilver = accuracy >= 50 && userError >= 3 && userError <= 5;
const isBronze = accuracy >= 30 && userError >= 6 && userError <= 10;
const qualifiesForBadge = isGold || isSilver || isBronze;
    // Show report modal only if fully matched (ignores trailing whitespace)
    if ((cleanedInput === cleanedOutput || qualifiesForBadge) && !showReportModal) {
      setReportData({
        totalWord,
        wpm: Math.round(wpm),
        accuracy: Math.round(accuracy),
        errors: userError,
      });
      setShowReportModal(true);
      backAudioRef?.current?.pause?.();

      if (status === "Complete") {
        unlockNextLession();
      }
    }

    backAudioRef?.current?.pause?.();
  },
  [outputDataSet, inputs, showReportModal, unlockNextLession, backAudioRef, dispatch, startTime, outputs]
);
  
  // useCallback for all event handlers and modal actions
  const handleBackClick = React.useCallback(() => {
    if (inputs.length < outputDataSet.length) {
      setShowExitModal(true);
    } else {
      // If lesson is completed, just navigate back without triggering countdown update
      // The completion logic was already handled during typing
      navigate(-1);
    }
  }, [inputs.length, outputDataSet.length, navigate]);

  const handleResetClick = React.useCallback(() => {
    setShowReportModal(false);
    setInputs("");
    setStartTime(null);
    setResetKey((prev) => prev + 1);
    backAudioRef?.current?.play?.();
  }, [backAudioRef]);

  const handleTryAgain = React.useCallback(() => {
    setShowReportModal(false);
    setInputs("");
    setStartTime(null);
    setResetKey((prev) => prev + 1);
    backAudioRef?.current?.play?.();
  }, [backAudioRef]);

  const handleThanks = React.useCallback(() => {
    //  Clear exited state when user finishes the lesson successfully
  dispatch({
    type: "CLEAR_LESSON_EXITED",
    payload: { language: outputs.stage, index: outputs.index },
  });
    setShowReportModal(false);
    navigate(-1);
  }, [navigate]);

  const handleExitStay = React.useCallback(() => setShowExitModal(false), []);
  const handleExitYes = React.useCallback(() => {
  dispatch({
    type: "MARK_LESSON_EXITED",
    payload: { 
      language: outputs.stage, 
      index: outputs.index 
    }
  });
  setShowExitModal(false);
  navigate(-1);
}, [dispatch, navigate, outputs]);


  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          overflowY: "hidden",
          background: "linear-gradient(to bottom, #1E1E2E, #3A3A5F, #1E1E2E)",
          height: "100vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "5%",
            height: "300px",
            width: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgb(0, 136, 255), transparent)",
            filter: "blur(50px)",
            zIndex: 0,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "0%",
            right: "5%",
            height: "300px",
            width: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 255, 8, 0.4), transparent)",
            filter: "blur(50px)",
            zIndex: 0,
          }}
        ></div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", zIndex: 1, padding: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 20,
                }}
              >
                <div
                  onClick={handleBackClick}
                  style={{ cursor: "pointer" }}
                  className="back-button"
                >
                  <BsArrowLeft fontSize={24} fill="white" />
                </div>
                <div>
                  <div
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      fontSize: 16,
                      color: "blue",
                    }}
                  >
                    {outputs.title}
                  </div>
                  <div style={{ marginLeft: 20, color: "gray" }}>
                    {outputs.description}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginRight: 20,
                }}
              >
                <button onClick={handleResetClick}>Reset</button>
              </div>
            </div>
            <div
              id="platform-content"
              style={{
                padding: 20,
                borderRadius: 10,
                marginTop: 20,
                width: "68%",
                alignSelf: "center",
                background: "#070707",
                color: "white",
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              {outputDataSet?.map?.((o: any, index: number) => {
                let style = { color: "#CCC" };
                const cursorStyle =
                  index === inputs.length ? { borderBottom: "2px solid red" } : {};
                if (inputs.length > index) {
                  style =
                    inputs[index] === o ? { color: "green" } : { color: "red" };
                }
                const className =
                  index === inputs.length
                    ? "font-size blinking-border"
                    : "font-size";
                return (
                  <>
                    <span
                      key={index}
                      className={className}
                      style={{ ...style, ...cursorStyle }}
                    >
                      {o}
                    </span>
                  </>
                );
              })}
            </div>
            <div
              style={{
            marginLeft: "50px", // 👈 shift slightly to the right
    display: "flex",
    justifyContent: "space-between",
    height: "20px",
    width: "calc(100% - 80px)" // maintain spacing on the right side too
              }}
            >
              <div style={{ color: "white" }}>
                <Countdown
                  key={resetKey} // Force remount on reset
                  wordLength={outputDataSet?.length}
                  stop={inputs.length === outputDataSet.length}
                  onCountdownUpdate={onCountdownUpdate}
                />
              </div>
             <div style={{ color: "white", marginRight: "10px" }}>
  {`${inputs.length}/${outputDataSet.length}`}
</div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              height: "auto",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Keyboard
              highlightedKey={String(outputDataSet[inputs.length]).toUpperCase()}
              isFinished={inputs.length === outputDataSet.length}
              targetChar={outputDataSet[inputs.length] || ''}
            />
          </div>
        </div>
        <audio
          ref={backAudioRef}
          autoPlay={true}
          loop={true}
          src={require("./mp3/dark-retro-synth-pop.mp3")}
          crossOrigin="anonymous"
        />
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
    </>);
}

