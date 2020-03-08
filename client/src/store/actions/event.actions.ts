import {
  IReduxListEventsStartedAction,
  IReduxListEventsSucceededAction,
  IReduxListEventsFailedAction,
  IReduxListEventsErrorAction,
  IReduxListEventsEndedAction,
  IReduxAddEventStartedAction,
  IReduxAddEventSucceededAction,
  IReduxAddEventFailedAction,
  IReduxAddEventErrorAction,
  IReduxAddEventEndedAction,
  IReduxUpdateEventStartedAction,
  IReduxUpdateEventSucceededAction,
  IReduxUpdateEventFailedAction,
  IReduxUpdateEventEndedAction,
  IReduxUpdateEventErrorAction,
  IReduxRemoveEventStartedAction,
  IReduxRemoveEventSucceededAction,
  IReduxRemoveEventFailedAction,
  IReduxRemoveEventErrorAction,
  IReduxRemoveEventEndedAction
} from '../types/event.types';
import { EReduxActionTypesEvent } from '../../enums';
import { IResponse } from '../../models';
import { IEvent } from '../../models';

//
// ────────────────────────────────────────────────────────────── LIST EVENTS ─────
//
export const doListEventsStarted = (): IReduxListEventsStartedAction => ({
  type: EReduxActionTypesEvent.LIST_EVENTS_STARTED
});

export const doListEventsSucceeded = (
  payload: IResponse<IEvent>
): IReduxListEventsSucceededAction => ({
  type: EReduxActionTypesEvent.LIST_EVENTS_SUCCEEDED,
  payload
});

export const doListEventsFailed = (
  payload: IResponse<IEvent>
): IReduxListEventsFailedAction => ({
  type: EReduxActionTypesEvent.LIST_EVENTS_FAILED,
  payload
});

export const doListEventsError = (
  payload: IResponse<IEvent>
): IReduxListEventsErrorAction => ({
  type: EReduxActionTypesEvent.LIST_EVENTS_ERROR,
  payload
});

export const doListEventsEnded = (): IReduxListEventsEndedAction => ({
  type: EReduxActionTypesEvent.LIST_EVENTS_ENDED
});

//
// ──────────────────────────────────────────────────────────────── ADD EVENT ─────
//
export const doAddEventStarted = (): IReduxAddEventStartedAction => ({
  type: EReduxActionTypesEvent.ADD_EVENT_STARTED
});

export const doAddEventSucceeded = (
  payload: IResponse<IEvent>
): IReduxAddEventSucceededAction => ({
  type: EReduxActionTypesEvent.ADD_EVENT_SUCCEEDED,
  payload
});

export const doAddEventFailed = (
  payload: IResponse<IEvent>
): IReduxAddEventFailedAction => ({
  type: EReduxActionTypesEvent.ADD_EVENT_FAILED,
  payload
});

export const doAddEventError = (
  payload: IResponse<IEvent>
): IReduxAddEventErrorAction => ({
  type: EReduxActionTypesEvent.ADD_EVENT_ERROR,
  payload
});

export const doAddEventEnded = (): IReduxAddEventEndedAction => ({
  type: EReduxActionTypesEvent.ADD_EVENT_ENDED
});

//
// ───────────────────────────────────────────────────────────── UPDATE EVENT ─────
//
export const doUpdateEventStarted = (): IReduxUpdateEventStartedAction => ({
  type: EReduxActionTypesEvent.UPDATE_EVENT_STARTED
});

export const doUpdateEventSucceeded = (
  payload: IResponse<IEvent>
): IReduxUpdateEventSucceededAction => ({
  type: EReduxActionTypesEvent.UPDATE_EVENT_SUCCEEDED,
  payload
});

export const doUpdateEventFailed = (
  payload: IResponse<IEvent>
): IReduxUpdateEventFailedAction => ({
  type: EReduxActionTypesEvent.UPDATE_EVENT_FAILED,
  payload
});

export const doUpdateEventError = (
  payload: IResponse<IEvent>
): IReduxUpdateEventErrorAction => ({
  type: EReduxActionTypesEvent.UPDATE_EVENT_ERROR,
  payload
});

export const doUpdateEventEnded = (): IReduxUpdateEventEndedAction => ({
  type: EReduxActionTypesEvent.UPDATE_EVENT_ENDED
});

//
// ───────────────────────────────────────────────────────────── REMOVE EVENT ─────
//
export const doRemoveEventStarted = (): IReduxRemoveEventStartedAction => ({
  type: EReduxActionTypesEvent.REMOVE_EVENT_STARTED
});

export const doRemoveEventSucceeded = (
  payload: IResponse<IEvent>
): IReduxRemoveEventSucceededAction => ({
  type: EReduxActionTypesEvent.REMOVE_EVENT_SUCCEEDED,
  payload
});

export const doRemoveEventFailed = (
  payload: IResponse<IEvent>
): IReduxRemoveEventFailedAction => ({
  type: EReduxActionTypesEvent.REMOVE_EVENT_FAILED,
  payload
});

export const doRemoveEventError = (
  payload: IResponse<IEvent>
): IReduxRemoveEventErrorAction => ({
  type: EReduxActionTypesEvent.REMOVE_EVENT_ERROR,
  payload
});

export const doRemoveEventEnded = (): IReduxRemoveEventEndedAction => ({
  type: EReduxActionTypesEvent.REMOVE_EVENT_ENDED
});
