import { combineReducers } from "redux";
import { eventReducer } from "./event.reducer";
import { userReducer } from "./user.reducer";
import { registerReducer } from "./register.reducer";

export const rootReducer = combineReducers({ userReducer, eventReducer, registerReducer });
export type ApplicationReducerState = ReturnType<typeof rootReducer>;
