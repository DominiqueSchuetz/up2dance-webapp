import { GET_ALL_EVENTS } from "../constants";
import { IEvent } from "../models";
import { IGetAllEvents } from "../types";

export const EventReducer = (state: IEvent[] = [], action: IGetAllEvents): IEvent[] => {
	switch (action.type) {
		case GET_ALL_EVENTS:
			return action.allEvents;
		default:
			return state;
	}
};
