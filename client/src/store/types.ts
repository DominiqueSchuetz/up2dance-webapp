import { Action } from "redux";
import { IResponsePayload } from "../models";

// IEvents
export interface ILoadEventsRequest extends Action {
	type: "loadEventsRequest";
}

export interface ILoadEventsSuccess extends Action {
	type: "loadEventsSuccess";
	payload: IResponsePayload;
}

export interface ILoadEventsError extends Action {
	type: "loadEventsError";
	payload: IResponsePayload;
}

export interface ILoadCreateEventsRequest extends Action {
	type: "loadCreateEventsRequest";
}
export interface ILoadCreatEventSuccess extends Action {
	type: "loadCreateEventSuccess";
	payload: IResponsePayload;
}

export interface ILoadCreateEventsError extends Action {
	type: "loadCreateEventsError";
	payload: IResponsePayload;
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
	payload: IResponsePayload;
}

export interface ILoadAuthenticationError extends Action {
	type: "loadAuthenticationError";
	payload: IResponsePayload;
}

export type ApplicationAuthenticationAction =
	| ILoadAuthenticationRequest
	| ILoadAuthenticationSuccess
	| ILoadAuthenticationError;
