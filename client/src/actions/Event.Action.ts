import { GET_CURRENT_EVENT } from "../constants";
import { IEvent } from "../types";

interface IGetCurrentEvent {
    type: GET_CURRENT_EVENT;
    actualEvent: IEvent;
}

export type ItemAction = IGetCurrentEvent;

export const getCurrentEvent = (): ItemAction => ({
    actualEvent: {},
    type: GET_CURRENT_EVENT,
});
