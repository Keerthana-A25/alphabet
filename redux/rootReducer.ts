import { combineReducers, Reducer } from "redux";
import { courseReducer } from "./courseReducer";
import { badgeReducer } from "./badgeReducer";
import { reportReducer } from "./reportReducer";
import programReducer from "./programReducer";


export interface RootState {
  courseState: any;
  badgeState: any;
  reportState: any;
  programState: any; // Use 'any' or your actual state type, not 'programReducer'
}


const state = {
  courseState: courseReducer,
  badgeState: badgeReducer,
  reportState: reportReducer,
  programState: programReducer, // Use the reducer function here
}

export const rootReducer: Reducer<RootState, { type: string; payload: any }> = combineReducers(state);

export default rootReducer;