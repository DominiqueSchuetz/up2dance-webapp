import {
	IReduxIsUserAuthenticatedSucceeded,
	IReduxIsUserAuthenticatedFailed,
	IReduxIsUserAuthenticatedStarted,
	IReduxIsUserAuthenticated,
	IReduxIsUserAuthenticatedError,
	IReduxSignInUserStartedAction,
	IReduxSignInUserSucceededAction,
	IReduxSignInUserFailedAction,
	IReduxSignInUserErrorAction,
	IReduxSignInUserEndedAction,
	IReduxSignOutUserAction,
	IReduxSignOutUserSucceededAction,
	IReduxSignOutUserErrorAction,
	ApplicationAuthAction
} from "../types/auth.types";
import { EReduxActionTypesAuthUser } from "../../enums";
import { IResponse, IAuthUser, IUser } from "../../models";

export const doIsUserAuthenticatedStartedAction = (): IReduxIsUserAuthenticatedStarted => ({
	type: EReduxActionTypesAuthUser.IS_USER_AUTHENTICATED_STARTED
});

export const doIsUserAuthenticatedAction = (payload: IResponse<IAuthUser>): IReduxIsUserAuthenticated => ({
	type: EReduxActionTypesAuthUser.IS_USER_AUTHENTICATED,
	payload
});

export const doIsUserAuthenticatedSucceededAction = (
	payload: IResponse<IAuthUser>
): IReduxIsUserAuthenticatedSucceeded => ({
	type: EReduxActionTypesAuthUser.IS_USER_AUTHENTICATED_SUCCEEDED,
	payload
});

export const doIsUserAuthenticatedFailedAction = (payload: IResponse<IAuthUser>): IReduxIsUserAuthenticatedFailed => ({
	type: EReduxActionTypesAuthUser.IS_USER_AUTHENTICATED_FAILED,
	payload
});

export const doIsUserAuthenticatedErrorAction = (payload: IResponse<IAuthUser>): IReduxIsUserAuthenticatedError => ({
	type: EReduxActionTypesAuthUser.IS_USER_AUTHENTICATED_ERROR,
	payload
});

//
// ───────────────────────────────────────────────────────────── SIGN_IN USER ─────
//
export const doSignInUserStarted = (): IReduxSignInUserStartedAction => ({
	type: EReduxActionTypesAuthUser.SIGN_IN_USER_STARTED
});

export const doSignInUserSucceeded = (payload: IResponse<null, IAuthUser>): IReduxSignInUserSucceededAction => ({
	type: EReduxActionTypesAuthUser.SIGN_IN_USER_SUCCEEDED,
	payload
});

export const doSignInUserFailed = (payload: IResponse<null, IAuthUser>): IReduxSignInUserFailedAction => ({
	type: EReduxActionTypesAuthUser.SIGN_IN_USER_FAILED,
	payload
});

export const doSignInUserError = (payload: IResponse<null, IAuthUser>): IReduxSignInUserErrorAction => ({
	type: EReduxActionTypesAuthUser.SIGN_IN_USER_ERROR,
	payload
});

export const doSignInUserEnded = (): IReduxSignInUserEndedAction => ({
	type: EReduxActionTypesAuthUser.SIGN_IN_USER_ENDED
});

//
// ───────────────────────────────────────────────────────────── SIGN_OUT USER ─────
//
export const doSignOutUser = (): IReduxSignOutUserAction => ({
	type: EReduxActionTypesAuthUser.SIGN_OUT_USER
});

export const doSignOutUserSucceeded = (): IReduxSignOutUserSucceededAction => ({
	type: EReduxActionTypesAuthUser.SIGN_OUT_USER_SUCCEEDED
});

export const doSignOutUserError = (payload: IResponse<null, IAuthUser>): IReduxSignOutUserErrorAction => ({
	type: EReduxActionTypesAuthUser.SIGN_OUT_USER_ERROR,
	payload
});

//
// ───────────────────────────────────────────────────────────── UPDATE AUTH_USER ─────
//
export const doUpdateAuthUserSucceeded = (payload: IResponse<IUser, IAuthUser>): ApplicationAuthAction => ({
	type: EReduxActionTypesAuthUser.UPDATE_AUTH_USER_SUCCEEDED,
	payload
});

export const doUpdateAuthUserFailed = (payload: IResponse<IUser, IAuthUser>): ApplicationAuthAction => ({
	type: EReduxActionTypesAuthUser.UPDATE_AUTH_USER_FAILED,
	payload
});

export const doUpdateAuthUserError = (payload: IResponse<IUser, IAuthUser>): ApplicationAuthAction => ({
	type: EReduxActionTypesAuthUser.UPDATE_AUTH_USER_ERROR,
	payload
});
