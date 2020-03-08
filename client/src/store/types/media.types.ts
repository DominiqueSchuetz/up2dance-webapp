import { IMedia, IResponse } from '../../models';
import { EReduxActionTypesMedia } from '../../enums';
import { Action } from 'redux';

export interface IReduxBaseAction extends Action {
  type: EReduxActionTypesMedia;
}

//
// ────────────────────────────────────────────────────────────── LIST MEDIA ─────
//
export interface IReduxListMediaStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.LIST_MEDIA_STARTED;
}
export interface IReduxListMediaAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.LIST_MEDIA;
}
export interface IReduxListMediaSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.LIST_MEDIA_SUCCEEDED;
  payload: IResponse<IMedia>;
}

export interface IReduxListMediaFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.LIST_MEDIA_FAILED;
  payload: IResponse<IMedia>;
}

export interface IReduxListMediaErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.LIST_MEDIA_ERROR;
  payload: IResponse<IMedia>;
}

export interface IReduxListMediaEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.LIST_MEDIA_ENDED;
}

//
// ──────────────────────────────────────────────────────────────── ADD MEDIA ─────
//
export interface IReduxAddMediaStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.ADD_MEDIA_STARTED;
}
export interface IReduxAddMediaAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.ADD_MEDIA;
}
export interface IReduxAddMediaSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.ADD_MEDIA_SUCCEEDED;
  payload: IResponse<IMedia>;
}

export interface IReduxAddMediaFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.ADD_MEDIA_FAILED;
  payload: IResponse<IMedia>;
}

export interface IReduxAddMediaErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.ADD_MEDIA_ERROR;
  payload: IResponse<IMedia>;
}

export interface IReduxAddMediaEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.ADD_MEDIA_ENDED;
}

//
// ─────────────────────────────────────────────────────────────────── UPDATE MEDIA ─────
//
export interface IReduxUpdateMediaStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.UPDATE_MEDIA_STARTED;
}
export interface IReduxUpdateMediaAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.UPDATE_MEDIA;
}
export interface IReduxUpdateMediaSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.UPDATE_MEDIA_SUCCEEDED;
  payload: IResponse<IMedia>;
}

export interface IReduxUpdateMediaFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.UPDATE_MEDIA_FAILED;
  payload: IResponse<IMedia>;
}

export interface IReduxUpdateMediaErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.UPDATE_MEDIA_ERROR;
  payload: IResponse<IMedia>;
}

export interface IReduxUpdateMediaEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.UPDATE_MEDIA_ENDED;
}

//
// ──────────────────────────────────────────────────────────── REMOVE MEDIA ─────
//
export interface IReduxRemoveMediaStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.REMOVE_MEDIA_STARTED;
}
export interface IReduxRemoveMediaAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.REMOVE_MEDIA;
}
export interface IReduxRemoveMediaSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.REMOVE_MEDIA_SUCCEEDED;
  payload: IResponse<IMedia>;
}

export interface IReduxRemoveMediaFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.REMOVE_MEDIA_FAILED;
  payload: IResponse<IMedia>;
}

export interface IReduxRemoveMediaErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.REMOVE_MEDIA_ERROR;
  payload: IResponse<IMedia>;
}

export interface IReduxRemoveMediaEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesMedia.REMOVE_MEDIA_ENDED;
}

export type ApplicationMediaAction =
  | IReduxListMediaStartedAction
  | IReduxListMediaAction
  | IReduxListMediaSucceededAction
  | IReduxListMediaFailedAction
  | IReduxListMediaErrorAction
  | IReduxListMediaEndedAction
  | IReduxAddMediaStartedAction
  | IReduxAddMediaAction
  | IReduxAddMediaSucceededAction
  | IReduxAddMediaFailedAction
  | IReduxAddMediaErrorAction
  | IReduxAddMediaEndedAction
  | IReduxUpdateMediaStartedAction
  | IReduxUpdateMediaAction
  | IReduxUpdateMediaSucceededAction
  | IReduxUpdateMediaFailedAction
  | IReduxUpdateMediaErrorAction
  | IReduxUpdateMediaEndedAction
  | IReduxRemoveMediaStartedAction
  | IReduxRemoveMediaAction
  | IReduxRemoveMediaSucceededAction
  | IReduxRemoveMediaFailedAction
  | IReduxRemoveMediaErrorAction
  | IReduxRemoveMediaEndedAction;
