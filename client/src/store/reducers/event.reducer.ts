import { ApplicationEventAction } from '../types/event.types';
import { ApplicationState, IEvent, INITIAL_STATE } from '../../models';
import { EReduxActionTypesEvent } from '../../enums';
import produce from 'immer';

export const eventReducer = produce(
  (draft: ApplicationState<IEvent>, action: ApplicationEventAction) => {
    switch (action.type) {
      //
      // ─────────────────────────────────────────────── LIST EVENTS ─────
      //
      case EReduxActionTypesEvent.LIST_EVENTS_STARTED:
        draft.isLoading = true;
        break;

      case EReduxActionTypesEvent.LIST_EVENTS_SUCCEEDED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.items = action.payload.items;
        draft.payload.errorCode = null;
        draft.payload.errorMessage = null;
        break;

      case EReduxActionTypesEvent.LIST_EVENTS_FAILED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.errorCode = action.payload.errorCode;
        draft.payload.errorMessage = action.payload.errorMessage;
        break;

      case EReduxActionTypesEvent.LIST_EVENTS_ENDED:
        draft.isLoading = false;
        break;
      //
      // ───────────────────────────────────────────────── ADD EVENT ─────
      //
      case EReduxActionTypesEvent.ADD_EVENT_STARTED:
        draft.isLoading = true;
        break;

      case EReduxActionTypesEvent.ADD_EVENT_SUCCEEDED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.item = action.payload.item;
        draft.payload.items = action.payload.items;
        draft.payload.errorCode = null;
        draft.payload.errorMessage = null;
        break;

      case EReduxActionTypesEvent.ADD_EVENT_FAILED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.item = null;
        draft.payload.errorCode = action.payload.errorCode;
        draft.payload.errorMessage = action.payload.errorMessage;
        break;

      case EReduxActionTypesEvent.ADD_EVENT_ENDED:
        draft.isLoading = false;
        break;
      //
      // ────────────────────────────────────────────── UPDATE EVENT ─────
      //
      case EReduxActionTypesEvent.UPDATE_EVENT_STARTED:
        draft.isLoading = true;
        break;

      case EReduxActionTypesEvent.UPDATE_EVENT_SUCCEEDED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.item = action.payload.item;
        draft.payload.items = action.payload.items;
        draft.payload.errorCode = null;
        draft.payload.errorMessage = null;
        break;

      case EReduxActionTypesEvent.UPDATE_EVENT_FAILED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.item = null;
        draft.payload.errorCode = action.payload.errorCode;
        draft.payload.errorMessage = action.payload.errorMessage;
        break;

      case EReduxActionTypesEvent.UPDATE_EVENT_FAILED:
        draft.isLoading = false;
        break;
      //
      // ────────────────────────────────────────────── REMOVE EVENT ─────
      //
      case EReduxActionTypesEvent.REMOVE_EVENT_STARTED:
        draft.isLoading = true;
        break;

      case EReduxActionTypesEvent.REMOVE_EVENT_SUCCEEDED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.item = action.payload.item;
        draft.payload.items = action.payload.items;
        draft.payload.errorCode = null;
        draft.payload.errorMessage = null;
        break;

      case EReduxActionTypesEvent.REMOVE_EVENT_FAILED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.item = null;
        draft.payload.errorCode = action.payload.errorCode;
        draft.payload.errorMessage = action.payload.errorMessage;
        break;

      case EReduxActionTypesEvent.REMOVE_EVENT_ENDED:
        draft.isLoading = false;
        break;
      default:
    }
  },
  INITIAL_STATE<IEvent>()
);
