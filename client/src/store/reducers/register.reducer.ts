import { ApplicationUserAction } from "../types/user.types";
import { ApplicationState, IRegisterUserData } from "../../models";
import { EReduxActionTypesUser } from "../../enums";
import produce from "immer";

export const initialStateUser: ApplicationState<IRegisterUserData> = {
	loading: { isPayloadLoading: false },
	payload: {
		success: false,
		message: "",
		error_code: 0,
		item: { firstName: "", lastName: "", email: "", password: "", secretKey: "" },
		items: []
	}
};

export const registerReducer = (
	state: ApplicationState<IRegisterUserData> = initialStateUser,
	action: ApplicationUserAction
) => {
	switch (action.type) {
		case EReduxActionTypesUser.LOAD_USERS:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = true;
			});
		case EReduxActionTypesUser.REGISTER_USER:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.message = action.payload.message;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.success = action.payload.success;
				draft.payload.item = action.payload.data;
			});
		case EReduxActionTypesUser.ERROR_USERS:
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
