import { IResponsePayload, IRequestPayload, IEvent, IUser } from "../models";
import {
	ILoadEventsRequest,
	ILoadEventsSuccess,
	ILoadEventsError,
	ILoadAuthenticationRequest,
	ILoadAuthenticationSuccess,
	ILoadAuthenticationError,
	ILoadCreateEventsRequest,
	ILoadCreatEventSuccess,
	ILoadCreateEventsError
} from "./types";

// Event actions
export const loadEventsRequest = (): ILoadEventsRequest => ({
	type: "loadEventsRequest"
});

export const loadEventsSuccess = (payload: IResponsePayload<IEvent>): ILoadEventsSuccess => ({
	type: "loadEventsSuccess",
	payload
});

export const loadEventsError = (payload: IResponsePayload<IEvent>): ILoadEventsError => ({
	type: "loadEventsError",
	payload
});

export const loadCreateEventsRequest = (): ILoadCreateEventsRequest => ({
	type: "loadCreateEventsRequest"
});

export const loadCreateEventSuccess = (payload: IRequestPayload<IEvent>): ILoadCreatEventSuccess => ({
	type: "loadCreateEventSuccess",
	payload
});

export const loadCreateEventsError = (payload: IRequestPayload<IEvent>): ILoadCreateEventsError => ({
	type: "loadCreateEventsError",
	payload
});

// Authentication actions
export const loadAuthenticationRequest = (): ILoadAuthenticationRequest => ({
	type: "loadAuthenticationRequest"
});

export const loadAuthenticationSuccess = (payload: IResponsePayload<IUser> | any): ILoadAuthenticationSuccess => ({
	type: "loadAuthenticationSuccess",
	payload
});

export const loadAuthenticationError = (payload: IResponsePayload<IUser>): ILoadAuthenticationError => ({
	type: "loadAuthenticationError",
	payload
});
