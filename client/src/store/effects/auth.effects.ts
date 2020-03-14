import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { Effect, IAuthUser, IResponse, ISignInUserData } from '../../models';
import { isUserAuthenticatedService, signInUserService } from '../../services';
import {
  doIsUserAuthenticatedStartedAction,
  doIsUserAuthenticatedSucceededAction,
  doIsUserAuthenticatedFailedAction,
  doIsUserAuthenticatedErrorAction,
  doSignOutUserSucceeded,
  doSignInUserStarted,
  doSignInUserSucceeded,
  doSignInUserFailed,
  doSignInUserError,
  doSignInUserEnded
} from '../actions/auth.action';
import { removeAndClearJwtTokenFromBrowser, addJwtTokenToApplication } from '../../lib';

export const effetIsUserAuthenticated = (): Effect => async (dispatch, getState) => {
  dispatch(doIsUserAuthenticatedStartedAction());
  try {
    const payload: IResponse<IAuthUser> = await isUserAuthenticatedService();
    if (payload.success && (payload.authPayload as IAuthUser).isAuthenticated) {
      dispatch(doIsUserAuthenticatedSucceededAction(payload));
    } else {
      dispatch(doIsUserAuthenticatedFailedAction(payload));
      removeAndClearJwtTokenFromBrowser();
    }
  } catch (e) {
    dispatch(
      doIsUserAuthenticatedErrorAction({
        success: false,
        errorCode: 5,
        errorMessage: e,
        message: 'Ein Error trat bei der Authentifizierung von einem Benutzer auf.',
        items: null,
        item: null
      })
    );
    removeAndClearJwtTokenFromBrowser();
    toast.error('Ein Error trat bei der Authentifizierung von einem Benutzer auf 🤮');
  }
};

//
// ──────────────────────────────────────────────────────────────── SIGN_IN User ─────
//
export const effectSignIn = (authData: ISignInUserData): Effect => async (dispatch) => {
  dispatch(doSignInUserStarted());
  try {
    const payload: IResponse<null, IAuthUser> = await signInUserService(authData);
    const { isAuthenticated, authUser, jwtToken } = payload.authPayload as IAuthUser;

    if (isAuthenticated && !isEmpty(authUser)) {
      dispatch(doSignInUserSucceeded(payload));
      toast.success(`${payload.message}`);
      addJwtTokenToApplication(jwtToken!);
      dispatch(doSignInUserEnded());
    } else {
      dispatch(doSignInUserFailed(payload));
      removeAndClearJwtTokenFromBrowser();
      toast.warn(`${payload.message}`);
      dispatch(doSignInUserEnded());
    }
  } catch (error) {
    dispatch(
      doSignInUserError({
        success: false,
        errorCode: 5,
        errorMessage: error,
        message: 'Ein Error trat bei der Authentifizierung von einem Benutzer auf 🤮',
        items: null,
        item: null
      })
    );
    dispatch(doSignInUserEnded());
    removeAndClearJwtTokenFromBrowser();
    toast.error('Ein Error trat bei der Authentifizierung von einem Benutzer auf 🤮');
  }
};

//
// ──────────────────────────────────────────────────────────────── SIGN_OUT User ─────
//
export const effectSignOut = (): Effect => async (dispatch, getState) => {
  try {
    dispatch(doSignOutUserSucceeded());
    removeAndClearJwtTokenFromBrowser();
    toast.success('Du bist erfolgreich ausgeloggt');
  } catch (error) {
    dispatch(doSignInUserError(error));
    toast.error('Ein Error trat beim ausloggen eines Benutzer auf 🤮');
  }
};
