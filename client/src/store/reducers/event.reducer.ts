import { ApplicationEventsAction } from "../types/event.types";
import { ApplicationState, IEvent } from "../../models";
import { EReduxActionTypesEvent } from "../../enums";
import produce from "immer";

export const initialStateEvent: ApplicationState<IEvent> = {
	loading: { isPayloadLoading: false },
	payload: {
		success: false,
		message: "",
		error_code: 0,
		item: { _id: "", address: undefined, eventName: "", eventDate: "" },
		items: []
	}
};

export const eventReducer = (state: ApplicationState<IEvent> = initialStateEvent, action: ApplicationEventsAction) => {
	switch (action.type) {
		case EReduxActionTypesEvent.LOAD_EVENTS:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = true;
			});
		case EReduxActionTypesEvent.GET_EVENTS:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.message = action.payload.message;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.success = action.payload.success;
				draft.payload.items = action.payload.data;
			});
		case EReduxActionTypesEvent.CREATE_EVENT:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.message = action.payload.message;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.success = action.payload.success;
				draft.payload.items.push(action.payload.data);
			});
		case EReduxActionTypesEvent.ERROR_EVENTS:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.message = action.payload.message;
				draft.payload.success = action.payload.success;
				draft.payload.item = action.payload.data;
			});
		default:
			return state;
	}
};
