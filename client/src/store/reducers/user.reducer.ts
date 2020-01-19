import { ApplicationUserAction } from "../types/user.types";
import { ApplicationState, IUser } from "../../models";
import { EReduxActionTypesUser } from "../../enums";
import produce from "immer";

export const initialStateUser: ApplicationState<IUser> = {
	loading: { isPayloadLoading: false },
	payload: {
		success: false,
		message: "",
		error_code: 0,
		item: { _id: "", firstName: "", lastName: "", email: "", password: "" },
		items: []
	}
};

export const userReducer = (state: ApplicationState<IUser> = initialStateUser, action: ApplicationUserAction) => {
	switch (action.type) {
		case EReduxActionTypesUser.LOAD_USERS:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = true;
			});
		case EReduxActionTypesUser.GET_USERS:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.message = action.payload.message;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.success = action.payload.success;
				draft.payload.items = action.payload.data;

				console.log("items => ", action.payload.data);
			});
		case EReduxActionTypesUser.DELETE_USER:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.message = action.payload.message;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.success = action.payload.success;
				const filteredArray: IUser[] = draft.payload.items.filter(
					(item) => item._id !== action.payload.data._id
				);
				draft.payload.items = filteredArray;
			});
		case EReduxActionTypesUser.SIGNIN_USER:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.message = "You are logged in successfully";
				draft.payload.error_code = 0;
				draft.payload.success = true;
				draft.payload.item = Object(action.payload).result;
			});
		case EReduxActionTypesUser.ERROR_USERS:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.message = action.payload.message;
				draft.payload.success = action.payload.success;
				draft.payload.item = initialStateUser.payload.item;
			});
		case EReduxActionTypesUser.IS_USER_AUTHENTICATED:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.message = action.payload.message;
				draft.payload.success = action.payload.success;
				draft.payload.item = Object(action.payload).data.result;
				console.log("alt => ", draft.payload.item);
				console.log("neu => ", Object(action.payload).data.result);
			});
		case EReduxActionTypesUser.UPDATE_USER:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.message = action.payload.message;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.success = action.payload.success;
				draft.payload.item = action.payload.data;

				const { _id, firstName, lastName, email, refId, comment } = action.payload.data;
				const updatedArray: IUser[] = draft.payload.items.map((item) => {
					if (item._id === _id) {
						return {
							...item,
							_id,
							firstName,
							lastName,
							email,
							refId,
							comment
						};
					}
					return item;
				});
				draft.payload.items = updatedArray;
			});
		case EReduxActionTypesUser.LOG_OUT_USER:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.error_code = initialStateUser.payload.error_code;
				draft.payload.message = initialStateUser.payload.message;
				draft.payload.success = initialStateUser.payload.success;
				draft.payload.item = initialStateUser.payload.item;
			});
		default:
			return state;
	}
};
