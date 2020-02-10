import { ApplicationAuthAction } from "../types/auth.types";
import { ApplicationState, IAuthUser, INITIAL_STATE } from "../../models";
import { EReduxActionTypesAuthUser } from "../../enums";
import produce from "immer";

export const authReducer = produce((draft: ApplicationState<IAuthUser>, action: ApplicationAuthAction) => {
	switch (action.type) {
		case EReduxActionTypesAuthUser.IS_USER_AUTHENTICATED_STARTED:
			draft.isLoading = true;
			break;
		case EReduxActionTypesAuthUser.IS_USER_AUTHENTICATED_SUCCEEDED:
			draft.isLoading = false;
			draft.payload.success = action.payload.success;
			draft.payload.message = action.payload.message;
			draft.payload.errorCode = action.payload.errorCode;
			draft.payload.errorMessage = action.payload.errorMessage;
			draft.payload.authPayload = action.payload.authPayload;
			break;
		case EReduxActionTypesAuthUser.IS_USER_AUTHENTICATED_FAILED:
			draft.isLoading = false;
			draft.payload.success = action.payload.success;
			draft.payload.message = action.payload.message;
			draft.payload.errorCode = action.payload.errorCode;
			draft.payload.errorMessage = action.payload.errorMessage;
			draft.payload.authPayload = {};
			break;
		case EReduxActionTypesAuthUser.SIGN_IN_USER_SUCCEEDED:
			draft.isLoading = false;
			draft.payload.success = action.payload.success;
			draft.payload.message = action.payload.message;
			draft.payload.errorMessage = action.payload.errorMessage;
			draft.payload.authPayload = action.payload.authPayload;
			break;
		case EReduxActionTypesAuthUser.SIGN_OUT_USER_SUCCEEDED:
			draft.isLoading = false;
			draft.payload.success = false;
			draft.payload.message = null;
			draft.payload.errorMessage = null;
			draft.payload.authPayload = null;
			break;
		case EReduxActionTypesAuthUser.UPDATE_AUTH_USER_SUCCEEDED:
			draft.isLoading = false;
			draft.payload.success = action.payload.success;
			draft.payload.message = action.payload.message;
			draft.payload.errorMessage = action.payload.errorMessage;
			draft.payload.authPayload = action.payload.authPayload;
			break;
		default:
	}
}, INITIAL_STATE<IAuthUser>());
