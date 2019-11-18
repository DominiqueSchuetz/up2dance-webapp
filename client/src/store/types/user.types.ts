import { IUser, IResponse, IRegisterUserData } from "../../models";
import { EReduxActionTypesUser } from "../../enums";
import { Action } from "redux";

export interface IReduxBaseAction extends Action {
	type: EReduxActionTypesUser;
}

export interface IReduxLoadUsersAction extends IReduxBaseAction {
	type: EReduxActionTypesUser.LOAD_USERS;
}

export interface IReduxErrorUsersAction extends IReduxBaseAction {
	type: EReduxActionTypesUser.ERROR_USERS;
	payload: IResponse<IUser>;
}

export interface IReduxGetUsersAction extends IReduxBaseAction {
	type: EReduxActionTypesUser.GET_USERS;
	payload: IResponse<IUser>;
}
export interface IReduxGetUserByIdAction extends IReduxBaseAction {
	type: EReduxActionTypesUser.GET_USER_BY_ID;
	payload: IResponse<IUser>;
}
export interface IReduxRegisterUserAction extends IReduxBaseAction {
	type: EReduxActionTypesUser.REGISTER_USER;
	payload: IResponse<IRegisterUserData>;
}

export interface IReduxIsUserAuthenticatedAction extends IReduxBaseAction {
	type: EReduxActionTypesUser.IS_USER_AUTHENTICATED;
	payload: IResponse<IUser>;
}

export interface IReduxLogOutUserAction extends IReduxBaseAction {
	type: EReduxActionTypesUser.LOG_OUT_USER;
}

export interface IReduxSignInUserAction extends IReduxBaseAction {
	type: EReduxActionTypesUser.SIGNIN_USER;
	payload: IResponse<IUser>;
}

export interface IReduxUpdateUserAction extends IReduxBaseAction {
	type: EReduxActionTypesUser.UPDATE_USER;
	payload: IResponse<IUser>;
}

export interface IReduxDeleteUserAction extends IReduxBaseAction {
	type: EReduxActionTypesUser.DELETE_USER;
	payload: IResponse<IUser>;
}

export type ApplicationUserAction =
	| IReduxLoadUsersAction
	| IReduxErrorUsersAction
	| IReduxGetUsersAction
	| IReduxGetUserByIdAction
	| IReduxRegisterUserAction
	| IReduxSignInUserAction
	| IReduxUpdateUserAction
	| IReduxDeleteUserAction
	| IReduxLogOutUserAction
	| IReduxIsUserAuthenticatedAction;
