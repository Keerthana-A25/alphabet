// src/redux/programReducer.ts

import { UnknownAction } from "redux";
import lamdaTopics from "../data/LamdaTopics";
import RustTopics from "../data/RustTopics";
import  PythonTopics  from "../data/PythonTopics";

export type TopicsByLanguage = Record<string, Language>;

type Language = {
  topics: Topic[];
};

export type Topic = {
  title: string;
  description: string;
  program: string;
  mode: "beginner" | "intermediate" | "hard" | "advanced";
  error: number;
  unlock?: boolean;
};

const initialState: TopicsByLanguage = {
  ...lamdaTopics,
  Rust: { topics: RustTopics.topics },
  Python: {
    topics: PythonTopics.topics,
  }
};

// Action types
const UPDATE_TOPIC = "UPDATE_TOPIC";


export default function programReducer(
  state = initialState,
  action: UnknownAction
): TopicsByLanguage {
  if (action.type === UPDATE_TOPIC) {
    const { language, index, payload } = (action as any).payload;
    const updatedLanguage = state[language];
    if (!updatedLanguage) return state;

    const updatedTopics = [...updatedLanguage.topics];
    updatedTopics[index] = {
      ...updatedTopics[index],
      ...payload,
    };

    return {
      ...state,
      [language]: {
        ...updatedLanguage,
        topics: updatedTopics,
      },
    };
  }

  return state;
}
