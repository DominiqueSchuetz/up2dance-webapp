import { combineReducers } from "redux";
import { eventReducer } from "./event.reducer";
import { userReducer } from "./user.reducer";

export const rootReducer = combineReducers({ userReducer, eventReducer });
export type ApplicationReducerState = ReturnType<typeof rootReducer>;
