import { IResponsePayload } from "../models";
import {
	ILoadEventsRequest,
	ILoadEventsSuccess,
	ILoadEventsError,
	ILoadAuthenticationRequest,
	ILoadAuthenticationSuccess,
	ILoadAuthenticationError
} from "./types";

// Event actions
export const loadEventsRequest = (): ILoadEventsRequest => ({
	type: "loadEventsRequest"
});

export const loadEventsSuccess = (payload: IResponsePayload): ILoadEventsSuccess => ({
	type: "loadEventsSuccess",
	payload
});

export const loadEventsError = (payload: IResponsePayload): ILoadEventsError => ({
	type: "loadEventsError",
	payload
});

// Authentication actions
export const loadAuthenticationRequest = (): ILoadAuthenticationRequest => ({
	type: "loadAuthenticationRequest"
});

export const loadAuthenticationSuccess = (payload: IResponsePayload | any): ILoadAuthenticationSuccess => ({
	type: "loadAuthenticationSuccess",
	payload
});

export const loadAuthenticationError = (payload: IResponsePayload): ILoadAuthenticationError => ({
	type: "loadAuthenticationError",
	payload
});
