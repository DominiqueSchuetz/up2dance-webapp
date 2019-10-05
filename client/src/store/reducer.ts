import produce from "immer";
import { ApplicationState } from "../models";
import { ApplicationEventsAction, ApplicationAuthenticationAction } from "./types";

export const initialState: ApplicationState = {
	loading: {
		isPayloadLoading: false
	},
	payload: { success: false, error_code: 0, message: "", data: [] || {} }
};

export const eventReducer = (state = initialState, action: ApplicationEventsAction) => {
	switch (action.type) {
		case "loadEventsRequest":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = true;
			});
		case "loadEventsSuccess":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload = action.payload;
			});

		case "loadEventsError":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload = action.payload;
			});
		case "loadCreateEventsRequest":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = true;
			});
		case "loadCreateEventSuccess":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload = action.payload;
			});

		case "loadCreateEventsError":
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload = action.payload;
			});
		default:
			return state;
	}
};

export const authorizedUserReducer = (state = initialState, action: ApplicationAuthenticationAction) => {
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
