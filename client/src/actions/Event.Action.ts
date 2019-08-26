import { Dispatch } from "redux";
import { GET_ALL_EVENTS_API } from "../api";
import { GET_ALL_EVENTS, GET_CURRENT_EVENT } from "../constants";
import { IResponseObject } from "../models";
import { IGetAllEvents, IGetCurrentEvent } from "../types";

// Get all events
export const getAllEvents = () => async (dispatch: Dispatch<IGetAllEvents>): Promise<IGetAllEvents> => {
	const fetchGetAllEventsFromApi: Response = await fetch(GET_ALL_EVENTS_API);
	const responseToJson: IResponseObject = await fetchGetAllEventsFromApi.json();

	return dispatch({
		allEvents: responseToJson.data,
		type: GET_ALL_EVENTS
	});
};

// Get current events
export const getCurrentEvent = (): IGetCurrentEvent => ({
	actualEvent: {},
	type: GET_CURRENT_EVENT
});
