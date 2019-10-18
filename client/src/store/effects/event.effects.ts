import { loadEventsRequest, getEventsRequest, loadEventsError, creatEventsRequest } from "../actions/event.actions";
import { Effect, IEvent, IResponse } from "../../models";
import { getAllEventsService, creatEventService } from "../../services";

// Get all events
export const getAllEvents = (): Effect => async (dispatch, getState) => {
	dispatch(loadEventsRequest());
	try {
		const payload: IResponse<IEvent> = await getAllEventsService();
		return dispatch(getEventsRequest(payload));
	} catch (e) {
		return dispatch(loadEventsError(e));
	}
};

// Get all events
export const createEvent = (event: IEvent): Effect => async (dispatch, getState) => {
	dispatch(loadEventsRequest());
	try {
		const response: IResponse<IEvent> = await creatEventService(event);
		if (!!response.success) {
			return dispatch(creatEventsRequest(response));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			return dispatch(loadEventsError(response));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		return dispatch(loadEventsError(e));
	}
};
