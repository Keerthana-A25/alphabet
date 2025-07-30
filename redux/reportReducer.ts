import { calculateProgressData, updateHeatmapKeys } from "../utils/helper";

//inteface for report
export interface Report {
  stage: string;
  //index: number;
  lesson: string;
  speed: number;
  accuracy: number;
  errors: number;
  date: string;
  status: string;
  level?: string; // Optional for Lambda stage
  totalWord: number; // Optional for total words typed
  typedWord: number; // Optional for words typed
}

const initialState = {
  report: [] as Report[],
  progressData: {
    wpm: 0,
    accuracy: 0,
    wordsTyped: 0,
    level: 0,
    levelProgress: 0,
    wpmTrend: [],
    accuracyTrend: [],
    dates: [],
  },

  heatmapKeys: [] as { key: string; errors: number }[],
  fingerUsage: [
    { finger: "Left Pinky", percent: 5 },
    { finger: "Left Ring", percent: 10 },
    { finger: "Left Middle", percent: 15 },
    { finger: "Left Index", percent: 20 },
    { finger: "Right Index", percent: 20 },
    { finger: "Right Middle", percent: 15 },
    { finger: "Right Ring", percent: 10 },
    { finger: "Right Pinky", percent: 5 },
  ],
  achievements: [
    { name: "Speed Demon", desc: "50+ WPM", earned: true },
    { name: "Accuracy Ace", desc: "95%+ for 5 sessions", earned: true },
    {
      name: "Marathon Typist",
      desc: "Type 10,000 words",
      earned: false,
      progress: 0.8,
    },
  ],
};

export const reportReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  console.log("reportReducer", action);
  switch (action.type) {
    case "UPDATE_REPORT": {
      const payloadStage = typeof action.payload?.stage === "string" ? action.payload.stage.toLowerCase() : "";
      const payloadLesson = typeof action.payload?.lesson === "string" ? action.payload.lesson.toLowerCase() : "";
      const payloadLevel = action.payload?.level;
      // Check if the report for the given stage and lesson already exists
      const existingReportIndex = state.report.findIndex(
        (report) => {
          const reportStage = typeof report.stage === "string" ? report.stage.toLowerCase() : "";
          const reportLesson = typeof report.lesson === "string" ? report.lesson.toLowerCase() : "";
          return (
            reportStage === payloadStage &&
            reportLesson === payloadLesson &&
            (report.level === payloadLevel || !payloadLevel)

          );
        });
      let updatedReportList: Report[];

      if (existingReportIndex !== -1) {
        // Create a completely new report object
        const existingReport = state.report[existingReportIndex];
        const updatedReport: Report = {
          ...existingReport,
          typedWord: Math.max(action.payload.typedWord ?? 0, existingReport.typedWord ?? 0),
          accuracy: Math.max(action.payload.accuracy ?? 0, existingReport.accuracy ?? 0),
          speed: Math.max(action.payload.speed ?? 0, existingReport.speed ?? 0),
          errors: Math.min(action.payload.errors ?? Infinity, existingReport.errors ?? Infinity),
          //status: action.payload.status ?? existingReport.status,
          status:
            action.payload.status === "Complete" || existingReport.status === "Complete"
              ? "Complete"
              : action.payload.status,

          date: action.payload.date ?? existingReport.date,
        };

        updatedReportList = [
          ...state.report.slice(0, existingReportIndex),
          updatedReport,
          ...state.report.slice(existingReportIndex + 1)
        ];
      } else {
        updatedReportList = [...state.report, action.payload];
      }

      return {
        ...state,
        report: updatedReportList,
        progressData: calculateProgressData(updatedReportList),
      };
    }
    case "UPDATE_HEATMAP": {
      // action.payload: keyErrorMap
      // Create a completely new heatmap array without any reference to old state
      const currentHeatmapCopy = state.heatmapKeys.map(item => ({
        key: item.key,
        errors: item.errors
      }));

      const newHeatmapKeys = updateHeatmapKeys(currentHeatmapCopy, action.payload);

      return {
        ...state,
        heatmapKeys: newHeatmapKeys,
      };
    }

    default:
      return state;
  }
};
