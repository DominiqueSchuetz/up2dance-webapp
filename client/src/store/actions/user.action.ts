import {
	IReduxLoadUsersAction,
	IReduxErrorUsersAction,
	IReduxSignInUserAction,
	IReduxRegisterUserAction,
	IReduxLogOutUserAction,
	IReduxIsUserAuthenticatedAction
} from "../types/user.types";
import { EReduxActionTypesUser } from "../../enums";
import { IResponse, IUser, IRegisterUserData } from "../../models";

export const loadUsersRequest = (): IReduxLoadUsersAction => ({
	type: EReduxActionTypesUser.LOAD_USERS
});

export const signInRequest = (payload: IResponse<IUser> | any): IReduxSignInUserAction => ({
	type: EReduxActionTypesUser.SIGNIN_USER,
	payload
});

export const registerRequest = (payload: IResponse<IRegisterUserData> | any): IReduxRegisterUserAction => ({
	type: EReduxActionTypesUser.REGISTER_USER,
	payload
});

export const isUserAuthenticatedRequest = (payload: IResponse<IUser> | any): IReduxIsUserAuthenticatedAction => ({
	type: EReduxActionTypesUser.IS_USER_AUTHENTICATED,
	payload
});

export const logOutUserRequest = (): IReduxLogOutUserAction => ({
	type: EReduxActionTypesUser.LOG_OUT_USER
});

export const loadUserError = (payload: any): IReduxErrorUsersAction => ({
	type: EReduxActionTypesUser.ERROR_USERS,
	payload
});
