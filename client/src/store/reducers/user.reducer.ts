import produce from 'immer';
import { ApplicationUserAction } from '../types/user.types';
import { ApplicationState, IUser, INITIAL_STATE } from '../../models';
import { EReduxActionTypesUser } from '../../enums';

const etst = '';

export const userReducer = produce(
  (draft: ApplicationState<IUser>, action: ApplicationUserAction) => {
    switch (action.type) {
      //
      // ─────────────────────────────────────────────── LIST Users ─────
      //
      case EReduxActionTypesUser.LIST_USERS_STARTED:
        draft.isLoading = true;
        break;

      case EReduxActionTypesUser.LIST_USERS_SUCCEEDED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.items = action.payload.items;
        draft.payload.errorCode = null;
        draft.payload.errorMessage = null;
        break;

      case EReduxActionTypesUser.LIST_USERS_FAILED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.errorCode = action.payload.errorCode;
        draft.payload.errorMessage = action.payload.errorMessage;
        break;

      case EReduxActionTypesUser.LIST_USERS_ENDED:
        draft.isLoading = false;
        break;
      //
      // ───────────────────────────────────────────────── ADD User ─────
      //
      case EReduxActionTypesUser.ADD_USER_STARTED:
        draft.isLoading = true;
        break;

      case EReduxActionTypesUser.ADD_USER_SUCCEEDED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.item = action.payload.item;
        draft.payload.items = action.payload.items;
        draft.payload.errorCode = null;
        draft.payload.errorMessage = null;
        break;

      case EReduxActionTypesUser.ADD_USER_FAILED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.item = null;
        draft.payload.errorCode = action.payload.errorCode;
        draft.payload.errorMessage = action.payload.errorMessage;
        break;

      case EReduxActionTypesUser.ADD_USER_ENDED:
        draft.isLoading = false;
        break;
      //
      // ────────────────────────────────────────────── UPDATE User ─────
      //
      case EReduxActionTypesUser.UPDATE_USER_STARTED:
        draft.isLoading = true;
        break;

      case EReduxActionTypesUser.UPDATE_USER_SUCCEEDED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.item = action.payload.item;
        draft.payload.items = action.payload.items;
        draft.payload.errorCode = null;
        draft.payload.errorMessage = null;
        break;

      case EReduxActionTypesUser.UPDATE_USER_FAILED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.item = null;
        draft.payload.errorCode = action.payload.errorCode;
        draft.payload.errorMessage = action.payload.errorMessage;
        break;

      case EReduxActionTypesUser.UPDATE_USER_FAILED:
        draft.isLoading = false;
        break;
      //
      // ────────────────────────────────────────────── REMOVE User ─────
      //
      case EReduxActionTypesUser.REMOVE_USER_STARTED:
        draft.isLoading = true;
        break;

      case EReduxActionTypesUser.REMOVE_USER_SUCCEEDED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.item = action.payload.item;
        draft.payload.items = action.payload.items;
        draft.payload.errorCode = null;
        draft.payload.errorMessage = null;
        break;

      case EReduxActionTypesUser.REMOVE_USER_FAILED:
        draft.isLoading = false;
        draft.payload.success = action.payload.success;
        draft.payload.message = action.payload.message;
        draft.payload.item = null;
        draft.payload.errorCode = action.payload.errorCode;
        draft.payload.errorMessage = action.payload.errorMessage;
        break;

      case EReduxActionTypesUser.REMOVE_USER_ENDED:
        draft.isLoading = false;
        break;
      default:
    }
  },
  INITIAL_STATE<IUser>()
);
