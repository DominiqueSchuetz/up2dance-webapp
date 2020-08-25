import { Action } from 'redux';
import { IUser, IResponse } from '../../models';
import { EReduxActionTypesUser } from '../../enums';

export interface IReduxBaseAction extends Action {
  type: EReduxActionTypesUser;
}

//
// ────────────────────────────────────────────────────────────── LIST USERS ─────
//
export interface IReduxListUsersStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.LIST_USERS_STARTED;
}
export interface IReduxListUsersAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.LIST_USERS;
}
export interface IReduxListUsersSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.LIST_USERS_SUCCEEDED;
  payload: IResponse<IUser>;
}

export interface IReduxListUsersFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.LIST_USERS_FAILED;
  payload: IResponse<IUser>;
}

export interface IReduxListUsersErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.LIST_USERS_ERROR;
  payload: IResponse<IUser>;
}

export interface IReduxListUsersEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.LIST_USERS_ENDED;
}

//
// ──────────────────────────────────────────────────────────────── ADD USER ─────
//
export interface IReduxAddUserStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.ADD_USER_STARTED;
}
export interface IReduxAddUserAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.ADD_USER;
}
export interface IReduxAddUserSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.ADD_USER_SUCCEEDED;
  payload: IResponse<IUser>;
}

export interface IReduxAddUserFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.ADD_USER_FAILED;
  payload: IResponse<IUser>;
}

export interface IReduxAddUserErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.ADD_USER_ERROR;
  payload: IResponse<IUser>;
}

export interface IReduxAddUserEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.ADD_USER_ENDED;
}

//
// ─────────────────────────────────────────────────────────────────── UPDATE USER ─────
//
export interface IReduxUpdateUserStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.UPDATE_USER_STARTED;
}
export interface IReduxUpdateUserAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.UPDATE_USER;
}
export interface IReduxUpdateUserSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.UPDATE_USER_SUCCEEDED;
  payload: IResponse<IUser>;
}

export interface IReduxUpdateUserFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.UPDATE_USER_FAILED;
  payload: IResponse<IUser>;
}

export interface IReduxUpdateUserErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.UPDATE_USER_ERROR;
  payload: IResponse<IUser>;
}

export interface IReduxUpdateUserEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.UPDATE_USER_ENDED;
}

//
// ──────────────────────────────────────────────────────────── REMOVED USER ─────
//
export interface IReduxRemoveUserStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.REMOVE_USER_STARTED;
}
export interface IReduxRemoveUserAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.REMOVE_USER;
}
export interface IReduxRemoveUserSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.REMOVE_USER_SUCCEEDED;
  payload: IResponse<IUser>;
}

export interface IReduxRemoveUserFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.REMOVE_USER_FAILED;
  payload: IResponse<IUser>;
}

export interface IReduxRemoveUserErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.REMOVE_USER_ERROR;
  payload: IResponse<IUser>;
}

export interface IReduxRemoveUserEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.REMOVE_USER_ENDED;
}

//
// ──────────────────────────────────────────────────────────── REGISTER USER ─────
//
export interface IReduxRegisterUserStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.REGISTER_USER_STARTED;
}
export interface IReduxRegisterUserAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.REGISTER_USER;
}
export interface IReduxRegisterUserSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.REGISTER_USER_SUCCEEDED;
  payload: IResponse<IUser>;
}

export interface IReduxRegisterUserFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.REGISTER_USER_FAILED;
  payload: IResponse<IUser>;
}

export interface IReduxRegisterUserErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.REGISTER_USER_ERROR;
  payload: IResponse<IUser>;
}

export interface IReduxRegisterUserEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesUser.REGISTER_USER_ENDED;
}

export type ApplicationUserAction =
  | IReduxListUsersStartedAction
  | IReduxListUsersAction
  | IReduxListUsersSucceededAction
  | IReduxListUsersFailedAction
  | IReduxListUsersErrorAction
  | IReduxListUsersEndedAction
  | IReduxAddUserStartedAction
  | IReduxAddUserAction
  | IReduxAddUserSucceededAction
  | IReduxAddUserFailedAction
  | IReduxAddUserErrorAction
  | IReduxAddUserEndedAction
  | IReduxUpdateUserStartedAction
  | IReduxUpdateUserAction
  | IReduxUpdateUserSucceededAction
  | IReduxUpdateUserFailedAction
  | IReduxUpdateUserErrorAction
  | IReduxUpdateUserEndedAction
  | IReduxRemoveUserStartedAction
  | IReduxRemoveUserAction
  | IReduxRemoveUserSucceededAction
  | IReduxRemoveUserFailedAction
  | IReduxRemoveUserErrorAction
  | IReduxRemoveUserEndedAction
  | IReduxRegisterUserStartedAction
  | IReduxRegisterUserAction
  | IReduxRegisterUserSucceededAction
  | IReduxRegisterUserFailedAction
  | IReduxRegisterUserErrorAction
  | IReduxRegisterUserEndedAction;
