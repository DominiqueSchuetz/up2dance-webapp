import {
  doListEventsStarted,
  doListEventsSucceeded,
  doListEventsFailed,
  doListEventsError,
  doListEventsEnded,
  doAddEventStarted,
  doAddEventSucceeded,
  doAddEventFailed,
  doAddEventError,
  doAddEventEnded,
  doUpdateEventStarted,
  doUpdateEventSucceeded,
  doUpdateEventFailed,
  doUpdateEventError,
  doUpdateEventEnded,
  doRemoveEventStarted,
  doRemoveEventSucceeded,
  doRemoveEventFailed,
  doRemoveEventError,
  doRemoveEventEnded
} from '../actions/event.actions';
import {
  listEventsService,
  addEventService,
  updateEventService,
  deleteEventService
} from '../../services';
import { Effect, IEvent, IResponse } from '../../models';
import { toast } from 'react-toastify';

//
// ────────────────────────────────────────────────────────────── LIST EVENTS ─────
//
export const effectListEvents = (): Effect => async (dispatch) => {
  dispatch(doListEventsStarted());
  try {
    const payload: IResponse<IEvent> = await listEventsService();
    if (payload.success && payload.errorCode === 0) {
      dispatch(doListEventsSucceeded(payload));
    } else {
      dispatch(doListEventsFailed(payload));
      toast.warn(`${payload.message}`);
    }
  } catch (e) {
    dispatch(
      doListEventsError({
        success: false,
        errorCode: 5,
        errorMessage: e,
        message: 'Ein Error trat beim laden der Events auf 😩',
        items: null,
        item: null
      })
    );
    toast.error('Ein Error trat beim laden der Events auf 🤮');
  }
  dispatch(doListEventsEnded());
};

//
// ──────────────────────────────────────────────────────────────── ADD EVENT ─────
//
export const effectAddEvent = (event: IEvent): Effect => async (dispatch) => {
  dispatch(doAddEventStarted());
  try {
    const payload: IResponse<IEvent> = await addEventService(event);
    if (payload.success && payload.errorCode === 0) {
      dispatch(doAddEventSucceeded(payload));
      toast.success(`${payload.message}`);
    } else {
      dispatch(doAddEventFailed(payload));
      toast.warn(`${payload.message}`);
    }
  } catch (e) {
    dispatch(
      doAddEventError({
        success: false,
        errorCode: 5,
        errorMessage: e,
        message: 'Ein Error trat beim hinzufügen eines Events auf.',
        items: null,
        item: null
      })
    );
    toast.error('Ein Error trat beim hinzufügen eines Events auf 🤮');
  }
  dispatch(doAddEventEnded());
};

//
// ──────────────────────────────────────────────────────────────── UPDATE EVENT ─────
//
export const effectUpdateEvent = (id: string, event: IEvent): Effect => async (
  dispatch
) => {
  dispatch(doUpdateEventStarted());
  try {
    const payload: IResponse<IEvent> = await updateEventService(id, event);
    if (payload.success && payload.errorCode === 0) {
      dispatch(doUpdateEventSucceeded(payload));
      console.log('UPDATE => ', payload);

      toast.success(`${payload.message}`);
    } else {
      dispatch(doUpdateEventFailed(payload));
      toast.warn(`${payload.message}`);
    }
  } catch (e) {
    dispatch(
      doUpdateEventError({
        success: false,
        errorCode: 5,
        errorMessage: e,
        message: 'Ein Error trat beim aktualisieren eines Events auf 😩',
        items: null,
        item: null
      })
    );
    toast.error('Ein Error trat beim aktualisieren eines Events auf 🤮');
  }
  dispatch(doUpdateEventEnded());
};

//
// ──────────────────────────────────────────────────────────────── REMOVE EVENT ─────
//
export const effectRemoveEvent = (id: string): Effect => async (dispatch) => {
  dispatch(doRemoveEventStarted());
  try {
    const payload: IResponse<IEvent> = await deleteEventService(id);
    if (payload.success && payload.errorCode === 0) {
      dispatch(doRemoveEventSucceeded(payload));
      toast.success(`${payload.message}`);
    } else {
      dispatch(doRemoveEventFailed(payload));
      toast.warn(`${payload.message}`);
    }
  } catch (e) {
    dispatch(
      doRemoveEventError({
        success: false,
        errorCode: 5,
        errorMessage: e,
        message: 'Ein Error trat beim entfernen eines Events auf 😩',
        items: null,
        item: null
      })
    );
    toast.error('Ein Error trat beim entfernen eines Events auf 🤮');
  }
  dispatch(doRemoveEventEnded());
};
