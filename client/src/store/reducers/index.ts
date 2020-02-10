import { combineReducers } from "redux";
import { eventReducer } from "./event.reducer";
import { userReducer } from "./user.reducer";
import { mediaReducer } from "./media.reducer";
import { authReducer } from "./auth.reducer";

export const rootReducer = combineReducers({
	authReducer,
	userReducer,
	eventReducer,
	mediaReducer
});
export type ApplicationReducerState = ReturnType<typeof rootReducer>;
