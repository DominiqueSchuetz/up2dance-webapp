import { Action } from 'redux';
import { IEvent, IResponse } from '../../models';
import { EReduxActionTypesEvent } from '../../enums';

export interface IReduxBaseAction extends Action {
  type: EReduxActionTypesEvent;
}

//
// ────────────────────────────────────────────────────────────── LIST EVENTS ─────
//
export interface IReduxListEventsStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.LIST_EVENTS_STARTED;
}
export interface IReduxListEventsAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.LIST_EVENTS;
}
export interface IReduxListEventsSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.LIST_EVENTS_SUCCEEDED;
  payload: IResponse<IEvent>;
}

export interface IReduxListEventsFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.LIST_EVENTS_FAILED;
  payload: IResponse<IEvent>;
}

export interface IReduxListEventsErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.LIST_EVENTS_ERROR;
  payload: IResponse<IEvent>;
}

export interface IReduxListEventsEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.LIST_EVENTS_ENDED;
}

//
// ──────────────────────────────────────────────────────────────── ADD EVENT ─────
//
export interface IReduxAddEventStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.ADD_EVENT_STARTED;
}
export interface IReduxAddEventAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.ADD_EVENT;
}
export interface IReduxAddEventSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.ADD_EVENT_SUCCEEDED;
  payload: IResponse<IEvent>;
}

export interface IReduxAddEventFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.ADD_EVENT_FAILED;
  payload: IResponse<IEvent>;
}

export interface IReduxAddEventErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.ADD_EVENT_ERROR;
  payload: IResponse<IEvent>;
}

export interface IReduxAddEventEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.ADD_EVENT_ENDED;
}

//
// ─────────────────────────────────────────────────────────────────── UPDATE ─────
//
export interface IReduxUpdateEventStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.UPDATE_EVENT_STARTED;
}
export interface IReduxUpdateEventAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.UPDATE_EVENT;
}
export interface IReduxUpdateEventSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.UPDATE_EVENT_SUCCEEDED;
  payload: IResponse<IEvent>;
}

export interface IReduxUpdateEventFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.UPDATE_EVENT_FAILED;
  payload: IResponse<IEvent>;
}

export interface IReduxUpdateEventErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.UPDATE_EVENT_ERROR;
  payload: IResponse<IEvent>;
}

export interface IReduxUpdateEventEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.UPDATE_EVENT_ENDED;
}

//
// ──────────────────────────────────────────────────────────── EVENT REMOVED ─────
//
export interface IReduxRemoveEventStartedAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.REMOVE_EVENT_STARTED;
}
export interface IReduxRemoveEventAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.REMOVE_EVENT;
}
export interface IReduxRemoveEventSucceededAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.REMOVE_EVENT_SUCCEEDED;
  payload: IResponse<IEvent>;
}

export interface IReduxRemoveEventFailedAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.REMOVE_EVENT_FAILED;
  payload: IResponse<IEvent>;
}

export interface IReduxRemoveEventErrorAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.REMOVE_EVENT_ERROR;
  payload: IResponse<IEvent>;
}

export interface IReduxRemoveEventEndedAction extends IReduxBaseAction {
  type: EReduxActionTypesEvent.REMOVE_EVENT_ENDED;
}

export type ApplicationEventAction =
  | IReduxListEventsStartedAction
  | IReduxListEventsAction
  | IReduxListEventsSucceededAction
  | IReduxListEventsFailedAction
  | IReduxListEventsErrorAction
  | IReduxListEventsEndedAction
  | IReduxAddEventStartedAction
  | IReduxAddEventAction
  | IReduxAddEventSucceededAction
  | IReduxAddEventFailedAction
  | IReduxAddEventErrorAction
  | IReduxAddEventEndedAction
  | IReduxUpdateEventStartedAction
  | IReduxUpdateEventAction
  | IReduxUpdateEventSucceededAction
  | IReduxUpdateEventFailedAction
  | IReduxUpdateEventErrorAction
  | IReduxUpdateEventEndedAction
  | IReduxRemoveEventStartedAction
  | IReduxRemoveEventAction
  | IReduxRemoveEventSucceededAction
  | IReduxRemoveEventFailedAction
  | IReduxRemoveEventErrorAction
  | IReduxRemoveEventEndedAction;
