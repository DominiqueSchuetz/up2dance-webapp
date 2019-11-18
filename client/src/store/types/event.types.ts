import { IEvent, IResponse } from "../../models";
import { EReduxActionTypesEvent } from "../../enums";
import { Action } from "redux";

export interface IReduxBaseAction extends Action {
	type: EReduxActionTypesEvent;
}

export interface IReduxLoadEventsAction extends IReduxBaseAction {
	type: EReduxActionTypesEvent.LOAD_EVENTS;
}

export interface IReduxErrorEventsAction extends IReduxBaseAction {
	type: EReduxActionTypesEvent.ERROR_EVENTS;
	payload: IResponse<IEvent>;
}

export interface IReduxGetEventsAction extends IReduxBaseAction {
	type: EReduxActionTypesEvent.GET_EVENTS;
	payload: IResponse<IEvent[]>;
}
export interface IReduxGetEventByIdAction extends IReduxBaseAction {
	type: EReduxActionTypesEvent.GET_EVENT_BY_ID;
	payload: IResponse<IEvent>;
}
export interface IReduxCreateEventAction extends IReduxBaseAction {
	type: EReduxActionTypesEvent.CREATE_EVENT;
	payload: IResponse<IEvent>;
}
export interface IReduxUpdateEventAction extends IReduxBaseAction {
	type: EReduxActionTypesEvent.UPDATE_EVENT;
	payload: IResponse<IEvent>;
}

export interface IReduxDeleteEventAction extends IReduxBaseAction {
	type: EReduxActionTypesEvent.DELETE_EVENT;
	payload: IResponse<IEvent>;
}

export type ApplicationEventsAction =
	| IReduxLoadEventsAction
	| IReduxErrorEventsAction
	| IReduxGetEventsAction
	| IReduxGetEventByIdAction
	| IReduxCreateEventAction
	| IReduxUpdateEventAction
	| IReduxDeleteEventAction;
