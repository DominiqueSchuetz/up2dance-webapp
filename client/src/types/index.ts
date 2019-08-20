import { GET_ALL_EVENTS, GET_CURRENT_EVENT } from "../constants";
import { IEvent } from "../models";

export interface IGetAllEvents {
    type: GET_ALL_EVENTS;
    allEvents: IEvent[];
}

export interface IGetCurrentEvent {
    type: GET_CURRENT_EVENT;
    actualEvent: IEvent;
}
