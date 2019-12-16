import { EReduxActionTypesCustomer } from "../../enums";
import { IResponse, ICustomer } from "../../models";
import { Action } from "redux";

export interface IReduxBaseAction extends Action {
	type: EReduxActionTypesCustomer;
}

export interface IReduxLoadCustomersAction extends IReduxBaseAction {
	type: EReduxActionTypesCustomer.LOAD_CUSTOMERS;
}

export interface IReduxErrorCustomersAction extends IReduxBaseAction {
	type: EReduxActionTypesCustomer.ERROR_CUSTOMERS;
	payload: IResponse<ICustomer>;
}

export interface IReduxCreateCustomerAction extends IReduxBaseAction {
	type: EReduxActionTypesCustomer.CREATE_CUSTOMER;
	payload: IResponse<ICustomer>;
}

export type ApplicationCustomersAction =
	| IReduxLoadCustomersAction
	| IReduxErrorCustomersAction
	| IReduxCreateCustomerAction;
