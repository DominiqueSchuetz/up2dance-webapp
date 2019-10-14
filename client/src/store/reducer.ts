import { ApplicationEventsAction, ApplicationAuthenticationAction } from "./types";
import { ApplicationState, IEvent, IUser } from "../models";
import produce from "immer";

export const initialStateEvent: ApplicationState<IEvent> = {
	loading: {
		isPayloadLoading: false
	},
	payload: { success: false, error_code: 0, message: "", data: [] }
};

export const eventReducer = (state = initialStateEvent, action: ApplicationEventsAction) => {
	switch (action.type) {
		case "loadEventsRequest":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = true;
			});
		case "loadEventsSuccess":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.message = action.payload.message;
				draft.payload.success = action.payload.success;
				draft.payload = action.payload;
			});
		case "loadEventsError":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.message = action.payload.message;
				draft.payload.success = action.payload.success;
			});
		case "loadCreateEventsRequest":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = true;
			});
		case "loadCreateEventSuccess":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.message = action.payload.message;
				draft.payload.success = action.payload.success;
				draft.payload.data.push(action.payload.data);
			});
		case "loadCreateEventsError":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.message = action.payload.message;
				draft.payload.success = action.payload.success;
			});
		default:
			return state;
	}
};

export const initialStateUser: ApplicationState<IUser> = {
	loading: {
		isPayloadLoading: false
	},
	payload: { success: false, error_code: 0, message: "", data: [] }
};

export const authorizedUserReducer = (state = initialStateUser, action: ApplicationAuthenticationAction) => {
	switch (action.type) {
		case "loadAuthenticationRequest":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = true;
			});

		case "loadAuthenticationSuccess":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload = action.payload;
			});

		case "loadAuthenticationError":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload = action.payload;
			});
		default:
			return state;
	}
};
