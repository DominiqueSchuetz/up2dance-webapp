import {
	IReduxLoadCustomersAction,
	IReduxErrorCustomersAction,
	IReduxCreateCustomerAction
} from "../types/customer.types";
import { EReduxActionTypesCustomer } from "../../enums";
import { IResponse, ICustomer } from "../../models";

export const loadCustomersRequest = (): IReduxLoadCustomersAction => ({
	type: EReduxActionTypesCustomer.LOAD_CUSTOMERS
});

export const loadCustomerError = (payload: any): IReduxErrorCustomersAction => ({
	type: EReduxActionTypesCustomer.ERROR_CUSTOMERS,
	payload
});

export const creatCustomersRequest = (payload: IResponse<ICustomer>): IReduxCreateCustomerAction => ({
	type: EReduxActionTypesCustomer.CREATE_CUSTOMER,
	payload
});
