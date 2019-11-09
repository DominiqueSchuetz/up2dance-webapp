import {
	loadEventsRequest,
	getEventsRequest,
	loadEventsError,
	creatEventsRequest,
	updateEventByIdRequest,
	deleteEventByIdRequest
} from "../actions/event.actions";
import { getAllEventsService, creatEventService, updateEventService, deleteEventService } from "../../services";
import { Effect, IEvent, IResponse } from "../../models";
import { toast } from "react-toastify";

// Get all events
export const getAllEvents = (): Effect => async (dispatch, getState) => {
	dispatch(loadEventsRequest());
	try {
		const payload: IResponse<IEvent[]> = await getAllEventsService();
		return dispatch(getEventsRequest(payload));
	} catch (e) {
		return dispatch(loadEventsError(e));
	}
};

// Create event
export const createEvent = (event: IEvent): Effect => async (dispatch, getState) => {
	dispatch(loadEventsRequest());
	try {
		const payload: IResponse<IEvent> = await creatEventService(event);
		if (!!payload.success) {
			toast.success(` 😻 ${payload.message}`);
			return dispatch(creatEventsRequest(payload));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			toast.info(` 😾 ${payload.message}`);
			return dispatch(loadEventsError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		toast.error(` 🙀 ${e}`);
		return dispatch(loadEventsError(e));
	}
};

// Update event by id
export const updateEventById = (id: string, event: IEvent): Effect => async (dispatch, getState) => {
	dispatch(loadEventsRequest());
	try {
		const payload: IResponse<IEvent> = await updateEventService(id, event);
		if (!!payload.success) {
			toast.success(` 😻 ${payload.message}`);
			return dispatch(updateEventByIdRequest(payload));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			toast.info(` 😾 ${payload.message}`);
			return dispatch(loadEventsError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		toast.error(` 🙀 ${e}`);
		return dispatch(loadEventsError(e));
	}
};

// Update event by id
export const deleteEventById = (id: string): Effect => async (dispatch, getState) => {
	dispatch(loadEventsRequest());
	try {
		const payload: IResponse<IEvent> = await deleteEventService(id);
		if (!!payload.success) {
			toast.success(` 😻 ${payload.message}`);
			return dispatch(deleteEventByIdRequest(payload));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			toast.info(` 😾 ${payload.message}`);
			return dispatch(loadEventsError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		toast.error(` 🙀 ${e}`);
		return dispatch(loadEventsError(e));
	}
};
