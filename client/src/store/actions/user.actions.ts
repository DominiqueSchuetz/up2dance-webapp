import {
  IReduxListUsersStartedAction,
  IReduxListUsersSucceededAction,
  IReduxListUsersFailedAction,
  IReduxListUsersErrorAction,
  IReduxListUsersEndedAction,
  IReduxAddUserStartedAction,
  IReduxAddUserSucceededAction,
  IReduxAddUserFailedAction,
  IReduxAddUserErrorAction,
  IReduxAddUserEndedAction,
  IReduxUpdateUserStartedAction,
  IReduxUpdateUserSucceededAction,
  IReduxUpdateUserFailedAction,
  IReduxUpdateUserEndedAction,
  IReduxUpdateUserErrorAction,
  IReduxRemoveUserStartedAction,
  IReduxRemoveUserSucceededAction,
  IReduxRemoveUserFailedAction,
  IReduxRemoveUserErrorAction,
  IReduxRemoveUserEndedAction,
  IReduxRegisterUserStartedAction,
  IReduxRegisterUserSucceededAction,
  IReduxRegisterUserFailedAction,
  IReduxRegisterUserErrorAction,
  IReduxRegisterUserEndedAction
} from '../types/user.types';
import { EReduxActionTypesUser } from '../../enums';
import { IResponse, IUser } from '../../models';

//
// ────────────────────────────────────────────────────────────── LIST USERS ─────
//
export const doListUsersStarted = (): IReduxListUsersStartedAction => ({
  type: EReduxActionTypesUser.LIST_USERS_STARTED
});

export const doListUsersSucceeded = (payload: IResponse<IUser>): IReduxListUsersSucceededAction => ({
  type: EReduxActionTypesUser.LIST_USERS_SUCCEEDED,
  payload
});

export const doListUsersFailed = (payload: IResponse<IUser>): IReduxListUsersFailedAction => ({
  type: EReduxActionTypesUser.LIST_USERS_FAILED,
  payload
});

export const doListUsersError = (payload: IResponse<IUser>): IReduxListUsersErrorAction => ({
  type: EReduxActionTypesUser.LIST_USERS_ERROR,
  payload
});

export const doListUsersEnded = (): IReduxListUsersEndedAction => ({
  type: EReduxActionTypesUser.LIST_USERS_ENDED
});

//
// ──────────────────────────────────────────────────────────────── ADD USER ─────
//
export const doAddUserStarted = (): IReduxAddUserStartedAction => ({
  type: EReduxActionTypesUser.ADD_USER_STARTED
});

export const doAddUserSucceeded = (payload: IResponse<IUser>): IReduxAddUserSucceededAction => ({
  type: EReduxActionTypesUser.ADD_USER_SUCCEEDED,
  payload
});

export const doAddUserFailed = (payload: IResponse<IUser>): IReduxAddUserFailedAction => ({
  type: EReduxActionTypesUser.ADD_USER_FAILED,
  payload
});

export const doAddUserError = (payload: IResponse<IUser>): IReduxAddUserErrorAction => ({
  type: EReduxActionTypesUser.ADD_USER_ERROR,
  payload
});

export const doAddUserEnded = (): IReduxAddUserEndedAction => ({
  type: EReduxActionTypesUser.ADD_USER_ENDED
});

//
// ───────────────────────────────────────────────────────────── UPDATE USER ─────
//
export const doUpdateUserStarted = (): IReduxUpdateUserStartedAction => ({
  type: EReduxActionTypesUser.UPDATE_USER_STARTED
});

export const doUpdateUserSucceeded = (payload: IResponse<IUser>): IReduxUpdateUserSucceededAction => ({
  type: EReduxActionTypesUser.UPDATE_USER_SUCCEEDED,
  payload
});

export const doUpdateUserFailed = (payload: IResponse<IUser>): IReduxUpdateUserFailedAction => ({
  type: EReduxActionTypesUser.UPDATE_USER_FAILED,
  payload
});

export const doUpdateUserError = (payload: IResponse<IUser>): IReduxUpdateUserErrorAction => ({
  type: EReduxActionTypesUser.UPDATE_USER_ERROR,
  payload
});

export const doUpdateUserEnded = (): IReduxUpdateUserEndedAction => ({
  type: EReduxActionTypesUser.UPDATE_USER_ENDED
});

//
// ───────────────────────────────────────────────────────────── REMOVE USER ─────
//
export const doRemoveUserStarted = (): IReduxRemoveUserStartedAction => ({
  type: EReduxActionTypesUser.REMOVE_USER_STARTED
});

export const doRemoveUserSucceeded = (payload: IResponse<IUser>): IReduxRemoveUserSucceededAction => ({
  type: EReduxActionTypesUser.REMOVE_USER_SUCCEEDED,
  payload
});

export const doRemoveUserFailed = (payload: IResponse<IUser>): IReduxRemoveUserFailedAction => ({
  type: EReduxActionTypesUser.REMOVE_USER_FAILED,
  payload
});

export const doRemoveUserError = (payload: IResponse<IUser>): IReduxRemoveUserErrorAction => ({
  type: EReduxActionTypesUser.REMOVE_USER_ERROR,
  payload
});

export const doRemoveUserEnded = (): IReduxRemoveUserEndedAction => ({
  type: EReduxActionTypesUser.REMOVE_USER_ENDED
});

//
// ───────────────────────────────────────────────────────────── REGISTER USER ─────
//
export const doRegisterUserStarted = (): IReduxRegisterUserStartedAction => ({
  type: EReduxActionTypesUser.REGISTER_USER_STARTED
});

export const doRegisterUserSucceeded = (payload: IResponse<IUser>): IReduxRegisterUserSucceededAction => ({
  type: EReduxActionTypesUser.REGISTER_USER_SUCCEEDED,
  payload
});

export const doRegisterUserFailed = (payload: IResponse<IUser>): IReduxRegisterUserFailedAction => ({
  type: EReduxActionTypesUser.REGISTER_USER_FAILED,
  payload
});

export const doRegisterUserError = (payload: IResponse<IUser>): IReduxRegisterUserErrorAction => ({
  type: EReduxActionTypesUser.REGISTER_USER_ERROR,
  payload
});

export const doRegisterUserEnded = (): IReduxRegisterUserEndedAction => ({
  type: EReduxActionTypesUser.REGISTER_USER_ENDED
});
