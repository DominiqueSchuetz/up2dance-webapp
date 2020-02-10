import { ApplicationMediaAction } from "../types/media.types";
import { ApplicationState, INITIAL_STATE, IMedia } from "../../models";
import { EReduxActionTypesMedia } from "../../enums";
import produce from "immer";

export const mediaReducer = produce((draft: ApplicationState<IMedia>, action: ApplicationMediaAction) => {
	switch (action.type) {
		//
		// ─────────────────────────────────────────────── LIST Media ─────
		//
		case EReduxActionTypesMedia.LIST_MEDIA_STARTED:
			draft.isLoading = true;
			break;

		case EReduxActionTypesMedia.LIST_MEDIA_SUCCEEDED:
			draft.isLoading = false;
			draft.payload.success = action.payload.success;
			draft.payload.message = action.payload.message;
			draft.payload.items = action.payload.items;
			draft.payload.errorCode = null;
			draft.payload.errorMessage = null;
			break;

		case EReduxActionTypesMedia.LIST_MEDIA_FAILED:
			draft.isLoading = false;
			draft.payload.success = action.payload.success;
			draft.payload.message = action.payload.message;
			draft.payload.errorCode = action.payload.errorCode;
			draft.payload.errorMessage = action.payload.errorMessage;
			break;

		case EReduxActionTypesMedia.LIST_MEDIA_ENDED:
			draft.isLoading = false;
			break;
		//
		// ───────────────────────────────────────────────── ADD Media ─────
		//
		case EReduxActionTypesMedia.ADD_MEDIA_STARTED:
			draft.isLoading = true;
			break;

		case EReduxActionTypesMedia.ADD_MEDIA_SUCCEEDED:
			draft.isLoading = false;
			draft.payload.success = action.payload.success;
			draft.payload.message = action.payload.message;
			draft.payload.item = action.payload.item;
			draft.payload.items = action.payload.items;
			draft.payload.errorCode = null;
			draft.payload.errorMessage = null;
			break;

		case EReduxActionTypesMedia.ADD_MEDIA_FAILED:
			draft.isLoading = false;
			draft.payload.success = action.payload.success;
			draft.payload.message = action.payload.message;
			draft.payload.item = null;
			draft.payload.errorCode = action.payload.errorCode;
			draft.payload.errorMessage = action.payload.errorMessage;
			break;

		case EReduxActionTypesMedia.ADD_MEDIA_ENDED:
			draft.isLoading = false;
			break;
		//
		// ────────────────────────────────────────────── UPDATE Media ─────
		//
		case EReduxActionTypesMedia.UPDATE_MEDIA_STARTED:
			draft.isLoading = true;
			break;

		case EReduxActionTypesMedia.UPDATE_MEDIA_SUCCEEDED:
			draft.isLoading = false;
			draft.payload.success = action.payload.success;
			draft.payload.message = action.payload.message;
			draft.payload.item = action.payload.item;
			draft.payload.items = action.payload.items;
			draft.payload.errorCode = null;
			draft.payload.errorMessage = null;
			break;

		case EReduxActionTypesMedia.UPDATE_MEDIA_FAILED:
			draft.isLoading = false;
			draft.payload.success = action.payload.success;
			draft.payload.message = action.payload.message;
			draft.payload.item = null;
			draft.payload.errorCode = action.payload.errorCode;
			draft.payload.errorMessage = action.payload.errorMessage;
			break;

		case EReduxActionTypesMedia.UPDATE_MEDIA_FAILED:
			draft.isLoading = false;
			break;
		//
		// ────────────────────────────────────────────── REMOVE Media ─────
		//
		case EReduxActionTypesMedia.REMOVE_MEDIA_STARTED:
			draft.isLoading = true;
			break;

		case EReduxActionTypesMedia.REMOVE_MEDIA_SUCCEEDED:
			draft.isLoading = false;
			draft.payload.success = action.payload.success;
			draft.payload.message = action.payload.message;
			draft.payload.item = action.payload.item;
			draft.payload.items = action.payload.items;
			draft.payload.errorCode = null;
			draft.payload.errorMessage = null;
			break;

		case EReduxActionTypesMedia.REMOVE_MEDIA_FAILED:
			draft.isLoading = false;
			draft.payload.success = action.payload.success;
			draft.payload.message = action.payload.message;
			draft.payload.item = null;
			draft.payload.errorCode = action.payload.errorCode;
			draft.payload.errorMessage = action.payload.errorMessage;
			break;

		case EReduxActionTypesMedia.REMOVE_MEDIA_ENDED:
			draft.isLoading = false;
			break;
		default:
	}
}, INITIAL_STATE<IMedia>());
