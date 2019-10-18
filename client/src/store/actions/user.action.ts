import { IReduxLoadUsersAction, IReduxErrorUsersAction, IReduxSignInUserAction } from "../types/user.types";
import { EReduxActionTypesUser } from "../../enums";
import { IResponse, IUser } from "../../models";

export const loadUsersRequest = (): IReduxLoadUsersAction => ({
	type: EReduxActionTypesUser.LOAD_USERS
});

export const signInRequest = (payload: IResponse<IUser> | any): IReduxSignInUserAction => ({
	type: EReduxActionTypesUser.SIGNIN_USER,
	payload
});

export const loadUserError = (payload: any): IReduxErrorUsersAction => ({
	type: EReduxActionTypesUser.ERROR_USERS,
	payload
});
