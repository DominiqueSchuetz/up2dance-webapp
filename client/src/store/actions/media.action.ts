import {
  IReduxListMediaStartedAction,
  IReduxListMediaSucceededAction,
  IReduxListMediaFailedAction,
  IReduxListMediaErrorAction,
  IReduxListMediaEndedAction,
  IReduxAddMediaStartedAction,
  IReduxAddMediaSucceededAction,
  IReduxAddMediaFailedAction,
  IReduxAddMediaErrorAction,
  IReduxAddMediaEndedAction,
  IReduxUpdateMediaStartedAction,
  IReduxUpdateMediaSucceededAction,
  IReduxUpdateMediaFailedAction,
  IReduxUpdateMediaEndedAction,
  IReduxUpdateMediaErrorAction,
  IReduxRemoveMediaStartedAction,
  IReduxRemoveMediaSucceededAction,
  IReduxRemoveMediaFailedAction,
  IReduxRemoveMediaErrorAction,
  IReduxRemoveMediaEndedAction
} from '../types/media.types';
import { EReduxActionTypesMedia } from '../../enums';
import { IResponse } from '../../models';
import { IMedia } from '../../models';

//
// ────────────────────────────────────────────────────────────── LIST MEDIA ─────
//
export const doListMediaStarted = (): IReduxListMediaStartedAction => ({
  type: EReduxActionTypesMedia.LIST_MEDIA_STARTED
});

export const doListMediaSucceeded = (
  payload: IResponse<IMedia>
): IReduxListMediaSucceededAction => ({
  type: EReduxActionTypesMedia.LIST_MEDIA_SUCCEEDED,
  payload
});

export const doListMediaFailed = (
  payload: IResponse<IMedia>
): IReduxListMediaFailedAction => ({
  type: EReduxActionTypesMedia.LIST_MEDIA_FAILED,
  payload
});

export const doListMediaError = (
  payload: IResponse<IMedia>
): IReduxListMediaErrorAction => ({
  type: EReduxActionTypesMedia.LIST_MEDIA_ERROR,
  payload
});

export const doListMediaEnded = (): IReduxListMediaEndedAction => ({
  type: EReduxActionTypesMedia.LIST_MEDIA_ENDED
});

//
// ──────────────────────────────────────────────────────────────── ADD MEDIA ─────
//
export const doAddMediaStarted = (): IReduxAddMediaStartedAction => ({
  type: EReduxActionTypesMedia.ADD_MEDIA_STARTED
});

export const doAddMediaSucceeded = (
  payload: IResponse<IMedia>
): IReduxAddMediaSucceededAction => ({
  type: EReduxActionTypesMedia.ADD_MEDIA_SUCCEEDED,
  payload
});

export const doAddMediaFailed = (
  payload: IResponse<IMedia>
): IReduxAddMediaFailedAction => ({
  type: EReduxActionTypesMedia.ADD_MEDIA_FAILED,
  payload
});

export const doAddMediaError = (
  payload: IResponse<IMedia>
): IReduxAddMediaErrorAction => ({
  type: EReduxActionTypesMedia.ADD_MEDIA_ERROR,
  payload
});

export const doAddMediaEnded = (): IReduxAddMediaEndedAction => ({
  type: EReduxActionTypesMedia.ADD_MEDIA_ENDED
});

//
// ───────────────────────────────────────────────────────────── UPDATE MEDIA ─────
//
export const doUpdateMediaStarted = (): IReduxUpdateMediaStartedAction => ({
  type: EReduxActionTypesMedia.UPDATE_MEDIA_STARTED
});

export const doUpdateMediaSucceeded = (
  payload: IResponse<IMedia>
): IReduxUpdateMediaSucceededAction => ({
  type: EReduxActionTypesMedia.UPDATE_MEDIA_SUCCEEDED,
  payload
});

export const doUpdateMediaFailed = (
  payload: IResponse<IMedia>
): IReduxUpdateMediaFailedAction => ({
  type: EReduxActionTypesMedia.UPDATE_MEDIA_FAILED,
  payload
});

export const doUpdateMediaError = (
  payload: IResponse<IMedia>
): IReduxUpdateMediaErrorAction => ({
  type: EReduxActionTypesMedia.UPDATE_MEDIA_ERROR,
  payload
});

export const doUpdateMediaEnded = (): IReduxUpdateMediaEndedAction => ({
  type: EReduxActionTypesMedia.UPDATE_MEDIA_ENDED
});

//
// ───────────────────────────────────────────────────────────── REMOVE MEDIA ─────
//
export const doRemoveMediaStarted = (): IReduxRemoveMediaStartedAction => ({
  type: EReduxActionTypesMedia.REMOVE_MEDIA_STARTED
});

export const doRemoveMediaSucceeded = (
  payload: IResponse<IMedia>
): IReduxRemoveMediaSucceededAction => ({
  type: EReduxActionTypesMedia.REMOVE_MEDIA_SUCCEEDED,
  payload
});

export const doRemoveMediaFailed = (
  payload: IResponse<IMedia>
): IReduxRemoveMediaFailedAction => ({
  type: EReduxActionTypesMedia.REMOVE_MEDIA_FAILED,
  payload
});

export const doRemoveMediaError = (
  payload: IResponse<IMedia>
): IReduxRemoveMediaErrorAction => ({
  type: EReduxActionTypesMedia.REMOVE_MEDIA_ERROR,
  payload
});

export const doRemoveMediaEnded = (): IReduxRemoveMediaEndedAction => ({
  type: EReduxActionTypesMedia.REMOVE_MEDIA_ENDED
});
