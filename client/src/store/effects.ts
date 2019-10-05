import { ApplicationEventsAction, ApplicationAuthenticationAction } from "./types";
import { ApplicationState, ISignInUserData, IResponsePayload, IEvent } from "../models";
import { loadEventsService, signInUserService, creatEventService } from "../services";
import { ThunkAction } from "redux-thunk";
import { decode } from "jsonwebtoken";
import {
	loadEventsRequest,
	loadEventsSuccess,
	loadEventsError,
	loadCreateEventsRequest,
	loadCreateEventSuccess,
	loadCreateEventsError,
	loadAuthenticationRequest,
	loadAuthenticationSuccess,
	loadAuthenticationError
} from "./actions";

type Effect = ThunkAction<any, ApplicationState, any, ApplicationEventsAction | ApplicationAuthenticationAction>;

// #################  Get all events
export const loadEvents = (): Effect => async (dispatch, getState) => {
	dispatch(loadEventsRequest());
	try {
		const events = await loadEventsService();
		return dispatch(loadEventsSuccess(events));
	} catch (e) {
		return dispatch(loadEventsError(e));
	}
};

// #################  Create new events
export const createEvent = (event: IEvent): Effect => async (dispatch, getState) => {
	dispatch(loadCreateEventsRequest());
	try {
		const response: IResponsePayload = await creatEventService(event);
		if (!!response.success) {
			return dispatch(loadCreateEventSuccess(response));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			return dispatch(loadCreateEventsError(response));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		return dispatch(loadCreateEventsError(e));
	}
};

// #################  SigIn user
export const loginUser = (userData: ISignInUserData): Effect => async (dispatch, getState) => {
	dispatch(loadAuthenticationRequest());
	try {
		const response: IResponsePayload = await signInUserService(userData);
		if (!!response.success) {
			const jwtToken = Object(response.data)!.jwt_token;
			localStorage.setItem("token", jwtToken);
			return dispatch(loadAuthenticationSuccess(decode(jwtToken)));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			return dispatch(loadAuthenticationError(response));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		return dispatch(loadAuthenticationError(e));
	}
};
