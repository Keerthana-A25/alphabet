import { Snippet } from "../utils/lambda";
import { Topic } from "../redux/programReducer";

/**
 * Calculates the error count by comparing two datasets.
 * @param inputs - The input array.
 * @param outputDataSet - The output array to compare against.
 * @returns The count of mismatched elements.
 */
export const getErrorCount = (inputs: string, target: string[]) => {
  let errors = 0;
  const maxLen = Math.max(inputs.length, target.length);
  for (let i = 0; i < maxLen; i++) {
    const inputChar = inputs[i];
    const targetChar = target[i];
    if (!inputChar) {
      // Missing character
      errors++;
    } else if (inputChar !== targetChar) {
      errors++;
    }
  }

  return errors;
};

export const getNextTopic = (topics: Topic[], activeId: number): number => {
  if (activeId + 1 < topics.length) {
    return activeId + 1;
  }
  return activeId;
};

export const shiftMap: Record<string, string> = {
  "!": "1", "@": "2", "#": "3", "$": "4", "%": "5",
  "^": "6", "&": "7", "*": "8", "(": "9", ")": "0",
  "_": "-", "+": "=", "{": "[", "}": "]", "|": "\\",
  ":": ";", "\"": "'", "<": ",", ">": ".", "?": "/",
};

export function getDifficulty(level: "beginner" | "intermediate" | "advanced") {
  const map = { beginner: "easy", intermediate: "medium", advanced: "hard", hard: "hard", easy: "easy", medium: "medium",};
  return map[level] ?? level;
}

export function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function calculateAccuracyAndErrorRate(typed: string[], expected: string): {
  accuracy: number;
  errorCount: number;
  status: "Complete" | "Incomplete";
} {
 const errors = typed.reduce((count, char, index) => {
  return char.toLowerCase() !== expected[index]?.toLowerCase() ? count + 1 : count;
}, 0);

  const total = expected.length;
  const accuracy = ((total - errors) / total) * 100;
  const status = accuracy >= 95 && errors <= 2 ? "Complete" : "Incomplete";

  return {
    accuracy: Math.round(accuracy),
    errorCount: errors,
    status,
  };
}
export function getInitialSnippets(cTopics: Snippet[]): Snippet[] {
  return cTopics.map((s, i) => ({
    ...s,
    unlock: i === 0 ? true : s.unlock || false,
  }));
}

export function calculateTimer(index: number): number {
  if (index <= 13) return 180;
  if (index <= 26) return 120;
  return 60;
}

export function getNextKey(
  char: string,
  lookahead: string = ""
): { key: string; shift: boolean } {
  let key = char;
  let shift = false;

  // Treat 4 spaces as a Tab
  if (lookahead.startsWith("  ")) {
    return { key: "TAB", shift: false };
  }

  if (key === " ") key = "SPACE";
  else if (key === "\n") key = "ENTER";
  else if (key === "\t") key = "TAB";
  else if (shiftMap[key]) {
    shift = true;
    key = shiftMap[key];
  }

  return { key: key.toUpperCase(), shift };
}
export function isKeyHighlighted(
  key: string,
  target: string,
  highlightShift: boolean
): boolean {
  const keyUpper = key.toUpperCase();
  const targetUpper = target.toUpperCase();
  if (keyUpper === targetUpper) return true;
  if (highlightShift && keyUpper === "SHIFT") return true;
   if (highlightShift && shiftMap[key] === target) return true; // highlight key part of Shift combo
  return false;
}                                                                                            


export function calculateProgressData(report: any[]) {
  if (!report || report.length === 0) return null;

  const sorted = [...report].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const wpm = sorted.reduce((sum, r) => sum + (r.speed || 0), 0) / sorted.length;
  const accuracy = sorted.reduce((sum, r) => sum + (r.accuracy || 0), 0) / sorted.length;
  const wordsTyped = sorted.reduce((sum, r) => {
    const total = r.typedWord ?? 0;
    const errors = r.errors ?? 0;
    return sum + Math.max(total - errors, 0);
  }, 0);

  const totalLessons = sorted.length;
  const completedLessons = sorted.filter((r) => r.status?.toLowerCase() === "complete").length;
  const levelProgress = totalLessons > 0 ? completedLessons / totalLessons : 0;

  // Create last 7 days (including today)
  const last7Days: string[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i)); // Chronological order
    return d.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  });

  // Build wpmTrend and accuracyTrend for the last 7 days
  const wpmTrend: number[] = [];
  const accuracyTrend: number[] = [];
  const dates: string[] = [];

  for (const day of last7Days) {
    const dailyReports = sorted.filter(r => r.date.startsWith(day));
    const dailyWPM = dailyReports.length > 0
      ? dailyReports.reduce((sum, r) => sum + (r.speed || 0), 0) / dailyReports.length
      : 0;
    const dailyAccuracy = dailyReports.length > 0
      ? dailyReports.reduce((sum, r) => sum + (r.accuracy || 0), 0) / dailyReports.length
      : 0;

    wpmTrend.push(Math.round(dailyWPM));
    accuracyTrend.push(Math.round(dailyAccuracy));

    const displayDate = new Date(day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    dates.push(displayDate);
  }

  return {
    wpm: Math.round(wpm),
    accuracy: Math.round(accuracy),
    wordsTyped,
    level: completedLessons,
    levelProgress: Number(levelProgress.toFixed(2)),
    wpmTrend,
    accuracyTrend,
    dates,
  };
}

export function getTotalWords(sorted: any[]) {
  return sorted.reduce((sum: any, r: any) => sum + (r.totalword ?? 0), 0);
}

export function getKeyErrorMap(inputs: string, outputDataSet: string[]): Record<string, number> {
  const errorMap: Record<string, number> = {};
  outputDataSet?.forEach((expected, index) => {
    if (inputs.length > index && inputs[index] !== expected) {
      const key = expected.toUpperCase();
      errorMap[key] = (errorMap[key] || 0) + 1;
    }
  });
  return errorMap;
}

export function updateHeatmapKeys(
  currentHeatmap: { key: string; errors: number }[],
  keyErrorMap: Record<string, number>
): { key: string; errors: number }[] {
  const heatmapMap = new Map<string, number>(
    currentHeatmap.map(item => [item.key, item.errors])
  );
  const resultMap = new Map(heatmapMap);
  Object.entries(keyErrorMap).forEach(([key, count]) => {
    resultMap.set(key, (resultMap.get(key) || 0) + count);
  });
  return Array.from(resultMap.entries()).map(([key, errors]) => ({ key, errors }));
}