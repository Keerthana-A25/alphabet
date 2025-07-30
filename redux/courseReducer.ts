import alphaLessons from "../data/alphaLesson.json";
import betaLessons from "../data/betaLesson.json";
import gammaLessons from "../data/gammaLesson.json";

const initialState: any = {
  courses: [
    {
      title: "Stage Alpha",
      description: "Practice on Letters",
      id: "alpha",
      unlocked: true,
    },
    {
      title: "Stage Beta",
      description: "Practice on Words",
      id: "beta",
      unlocked: false,
    },
    {
      title: "Stage Gamma",
      description: "Practice on Grammar",
      id: "gamma",
      unlocked: false,
    },
  ],
  alpha: alphaLessons,
  beta: betaLessons,
  gamma: gammaLessons,
  currentLesson: null, // Store current lesson for persistence through refreshes
  nextLesson: null, // Store next lesson for navigation
};

const unlockCourseCourse = (state: any, action: any) => {
  // Handle different stages
  const stage = action.stage || "alpha"; // Default to alpha for backward compatibility
  return state?.[stage]?.map((course: { title: string; }, index: number) => {
    if (course.title === action.payload) {
      return { ...course, unlocked: true };
    }
    return course;
  })
}

const unlockStage = (state: any, stageId: string) => {
  return state.courses.map((course: any) => {
    if (course.id === stageId) {
      return { ...course, unlocked: true };
    }
    return course;
  });
}

export const courseReducer = (state = initialState, action: { type: any, payload: any, stage?: string }) => {
  console.log("courseReducer action:", action);
  
  switch (action.type) {
    case "UNLOCK_LESSON_COURSE":
      const stage = action.stage || "alpha";
      console.log("Unlocking lesson in stage:", stage, "lesson:", action.payload);
      const updatedStageData = unlockCourseCourse(state, action);
      const newStateWithLesson = { ...state, [stage]: updatedStageData };
      console.log(`Updated ${stage} lessons:`, updatedStageData);
      return newStateWithLesson;
    case "UNLOCK_STAGE":
      console.log("Unlocking stage:", action.payload);
      const newState = { ...state, courses: unlockStage(state, action.payload) };
      console.log("New courses state:", newState.courses);
      return newState;
    case "SET_CURRENT_LESSON":
      console.log("Setting current lesson:", action.payload);
      return { 
        ...state, 
        currentLesson: action.payload.lesson,
        nextLesson: action.payload.nextLesson 
      };
    case "CLEAR_CURRENT_LESSON":
      console.log("Clearing current lesson");
      return { 
        ...state, 
        currentLesson: null,
        nextLesson: null 
      };
       case "MARK_LESSON_EXITED":
      const stageKey = action.payload.language;
      const updatedLessons = state[stageKey].map(
        (lesson: any, idx: number) =>
          idx === action.payload.index
            ? { ...lesson, exited: true, completed: false }
            : lesson
      );
      return {
        ...state,
        [stageKey]: updatedLessons,
      };
      case "CLEAR_LESSON_EXITED":
  const clearStage = action.payload.language;
  const clearedLessons = state[clearStage].map(
    (lesson: any, idx: number) =>
      idx === action.payload.index
        ? { ...lesson, exited: false }
        : lesson
  );
  return {
    ...state,
    [clearStage]: clearedLessons,
  };

    default:
      return state;
  }
};
