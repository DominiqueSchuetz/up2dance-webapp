import {
	IReduxGetEventsAction,
	IReduxCreateEventAction,
	IReduxLoadEventsAction,
	IReduxErrorEventsAction,
	IReduxUpdateEventAction,
	IReduxDeleteEventAction
} from "../types/event.types";
import { EReduxActionTypesEvent } from "../../enums";
import { IResponse } from "../../models";
import { IEvent } from "../../models";

export const loadEventsRequest = (): IReduxLoadEventsAction => ({
	type: EReduxActionTypesEvent.LOAD_EVENTS
});

export const getEventsRequest = (payload: IResponse<IEvent[]>): IReduxGetEventsAction => ({
	type: EReduxActionTypesEvent.GET_EVENTS,
	payload
});

export const creatEventsRequest = (payload: IResponse<IEvent>): IReduxCreateEventAction => ({
	type: EReduxActionTypesEvent.CREATE_EVENT,
	payload
});
export const updateEventByIdRequest = (payload: IResponse<IEvent>): IReduxUpdateEventAction => ({
	type: EReduxActionTypesEvent.UPDATE_EVENT,
	payload
});
export const deleteEventByIdRequest = (payload: IResponse<IEvent>): IReduxDeleteEventAction => ({
	type: EReduxActionTypesEvent.DELETE_EVENT,
	payload
});

export const loadEventsError = (payload: any): IReduxErrorEventsAction => ({
	type: EReduxActionTypesEvent.ERROR_EVENTS,
	payload
});
