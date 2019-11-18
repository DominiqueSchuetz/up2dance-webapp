import { ApplicationMediaAction } from "../types/media.types";
import { ApplicationState, IMedia } from "../../models";
import { EReduxActionTypesMedia } from "../../enums";
import produce from "immer";

export const initialStateMedia: ApplicationState<IMedia> = {
	loading: { isPayloadLoading: false },
	payload: {
		success: false,
		message: "",
		error_code: 0,
		item: { _id: "", fileName: "", filePath: "", fileUrl: "" },
		items: []
	}
};

export const mediaReducer = (state: ApplicationState<IMedia> = initialStateMedia, action: ApplicationMediaAction) => {
	switch (action.type) {
		case EReduxActionTypesMedia.LOAD_MEDIA:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = true;
			});
		case EReduxActionTypesMedia.GET_MEDIA_BY_ID:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.message = action.payload.message;
				draft.payload.success = action.payload.success;
				draft.payload.item = initialStateMedia.payload.item;
			});
		case EReduxActionTypesMedia.ERROR_MEDIA:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.message = action.payload.message;
				draft.payload.success = action.payload.success;
				draft.payload.item = initialStateMedia.payload.item;
			});
		default:
			return state;
	}
};
