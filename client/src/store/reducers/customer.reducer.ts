import { ApplicationCustomersAction } from "../types/customer.types";
import { ApplicationState, ICustomer } from "../../models";
import { EReduxActionTypesCustomer } from "../../enums";
import produce from "immer";

export const initialStateCustomer: ApplicationState<ICustomer> = {
	loading: { isPayloadLoading: false },
	payload: {
		success: false,
		message: "",
		error_code: 0,
		item: { firstName: "", lastName: "", companyName: "", email: "", phone: "", comment: "" },
		items: []
	}
};

export const customerReducer = (
	state: ApplicationState<ICustomer> = initialStateCustomer,
	action: ApplicationCustomersAction
) => {
	switch (action.type) {
		case EReduxActionTypesCustomer.LOAD_CUSTOMERS:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = true;
			});
		case EReduxActionTypesCustomer.ERROR_CUSTOMERS:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.success = action.payload.success;
				draft.payload.error_code = action.payload.error_code;
				draft.payload.message = action.payload.message;
			});
		case EReduxActionTypesCustomer.CREATE_CUSTOMER:
			return produce(state, (draft) => {
				draft.loading.isPayloadLoading = false;
				draft.payload.success = action.payload.success;
				draft.payload.message = action.payload.message;
				draft.payload.error_code = action.payload.error_code;
			});
		default:
			return state;
	}
};
