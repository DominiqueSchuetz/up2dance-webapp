import { combineReducers } from "redux";
import { eventReducer } from "./event.reducer";
import { userReducer } from "./user.reducer";
import { mediaReducer } from "./media.reducer";
import { registerReducer } from "./register.reducer";
import { customerReducer } from "./customer.reducer";

export const rootReducer = combineReducers({
	userReducer,
	eventReducer,
	registerReducer,
	mediaReducer,
	customerReducer
});
export type ApplicationReducerState = ReturnType<typeof rootReducer>;
