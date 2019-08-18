import { ItemAction } from "../actions/Event.Action";
import { GET_CURRENT_EVENT } from "../constants";
import { IEvent } from "../types";

export const EventReducer = (state: IEvent | IEvent[], action: ItemAction) => {
    switch (action.type) {
        case GET_CURRENT_EVENT:
            return state;
        default:
            return state;
    }
};
