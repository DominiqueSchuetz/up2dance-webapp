import { Action } from "redux";
import { IResponsePayload, IRequestPayload, IEvent, IUser } from "../models";

// IEvents
export interface ILoadEventsRequest extends Action {
	type: "loadEventsRequest";
}

export interface ILoadEventsSuccess extends Action {
	type: "loadEventsSuccess";
	payload: IResponsePayload<IEvent>;
}

export interface ILoadEventsError extends Action {
	type: "loadEventsError";
	payload: IResponsePayload<IEvent>;
}

export interface ILoadCreateEventsRequest extends Action {
	type: "loadCreateEventsRequest";
}
export interface ILoadCreatEventSuccess extends Action {
	type: "loadCreateEventSuccess";
	payload: IRequestPayload<IEvent>;
}

export interface ILoadCreateEventsError extends Action {
	type: "loadCreateEventsError";
	payload: IRequestPayload<IEvent>;
}

export type ApplicationEventsAction =
	| ILoadEventsRequest
	| ILoadEventsSuccess
	| ILoadEventsError
	| ILoadCreateEventsRequest
	| ILoadCreatEventSuccess
	| ILoadCreateEventsError;

// IAuthentication
export interface ILoadAuthenticationRequest extends Action {
	type: "loadAuthenticationRequest";
}

export interface ILoadAuthenticationSuccess extends Action {
	type: "loadAuthenticationSuccess";
	payload: IResponsePayload<IUser>;
}

export interface ILoadAuthenticationError extends Action {
	type: "loadAuthenticationError";
	payload: IResponsePayload<IUser>;
}

export type ApplicationAuthenticationAction =
	| ILoadAuthenticationRequest
	| ILoadAuthenticationSuccess
	| ILoadAuthenticationError;
