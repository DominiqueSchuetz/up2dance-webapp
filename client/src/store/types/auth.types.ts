import { IResponse, IAuthUser, IUser } from '../../models';
import { EReduxActionTypesAuthUser } from '../../enums';
import { Action } from 'redux';

export interface IReduxBaseAction extends Action {
  type: EReduxActionTypesAuthUser;
}

export interface IReduxIsUserAuthenticated extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.IS_USER_AUTHENTICATED;
  payload: IResponse<IAuthUser>;
}

export interface IReduxIsUserAuthenticatedStarted extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.IS_USER_AUTHENTICATED_STARTED;
}

export interface IReduxIsUserAuthenticatedSucceeded extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.IS_USER_AUTHENTICATED_SUCCEEDED;
  payload: IResponse<IAuthUser>;
}

export interface IReduxIsUserAuthenticatedFailed extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.IS_USER_AUTHENTICATED_FAILED;
  payload: IResponse<IAuthUser>;
}

export interface IReduxIsUserAuthenticatedError extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.IS_USER_AUTHENTICATED_ERROR;
  payload: IResponse<IAuthUser>;
}

//
// ──────────────────────────────────────────────────────────── SIGN_IN USER ─────
//
export interface IReduxSignInUserStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.SIGN_IN_USER_STARTED;
}
export interface IReduxSignInUserAction extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.SIGN_IN_USER;
}
export interface IReduxSignInUserSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.SIGN_IN_USER_SUCCEEDED;
  payload: IResponse<null, IAuthUser>;
}

export interface IReduxSignInUserFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.SIGN_IN_USER_FAILED;
  payload: IResponse<null, IAuthUser>;
}

export interface IReduxSignInUserErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.SIGN_IN_USER_ERROR;
  payload: IResponse<null, IAuthUser>;
}

export interface IReduxSignInUserEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.SIGN_IN_USER_ENDED;
}

//
// ──────────────────────────────────────────────────────────── SIGN_OUT USER ─────
//
export interface IReduxSignOutUserAction extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.SIGN_OUT_USER;
}
export interface IReduxSignOutUserSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.SIGN_OUT_USER_SUCCEEDED;
}

export interface IReduxSignOutUserErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.SIGN_OUT_USER_ERROR;
  payload: IResponse<null, IAuthUser>;
}

//
// ──────────────────────────────────────────────────────────── UPDATE AUTH_USER ─────
//
export interface IReduxUpdateAuthUserSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.UPDATE_AUTH_USER_SUCCEEDED;
  payload: IResponse<IUser, IAuthUser>;
}

export interface IReduxUpdateAuthUserFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.UPDATE_AUTH_USER_FAILED;
  payload: IResponse<IUser, IAuthUser>;
}
export interface IReduxUpdateAuthUserErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesAuthUser.UPDATE_AUTH_USER_ERROR;
  payload: IResponse<IUser, IAuthUser>;
}

export type ApplicationAuthAction =
  | IReduxIsUserAuthenticated
  | IReduxIsUserAuthenticatedStarted
  | IReduxIsUserAuthenticatedSucceeded
  | IReduxIsUserAuthenticatedFailed
  | IReduxIsUserAuthenticatedError
  | IReduxSignInUserStartedAction
  | IReduxSignInUserAction
  | IReduxSignInUserSucceededAction
  | IReduxSignInUserFailedAction
  | IReduxSignInUserErrorAction
  | IReduxSignInUserEndedAction
  | IReduxSignOutUserAction
  | IReduxSignOutUserSucceededAction
  | IReduxSignOutUserErrorAction
  | IReduxUpdateAuthUserSucceededAction
  | IReduxUpdateAuthUserFailedAction
  | IReduxUpdateAuthUserErrorAction;
