import { get } from 'lodash/fp';
import {
  EVENTS_PAYLOAD,
  EVENT_ITEMS,
  EVENTS_PAYLOAD_IS_LOADING,
  USERS_PAYLOAD,
  USERS_PAYLOAD_IS_LOADING,
  USER_ITEMS,
  AUTH_USER,
  AUTH_USER_IS_AUTHENTICATED,
  AUTH_USER_JWT_TOKEN,
  MEDIA_ITEMS,
  MEDIA_PAYLOAD_IS_LOADING
} from './paths';

// Events
export const selectEventsPayloadIsLoading = get(EVENTS_PAYLOAD_IS_LOADING);
export const selectEventsPayload = get(EVENTS_PAYLOAD);
export const selectEvents = get(EVENT_ITEMS);

// Users
export const selectUserPayloadIsLoading = get(USERS_PAYLOAD_IS_LOADING);
export const selectUserPayload = get(USERS_PAYLOAD);
export const selectUsers = get(USER_ITEMS);

// Auth
export const selectAuthenticatedUser = get(AUTH_USER);
export const selectIsUserAuthenticated = get(AUTH_USER_IS_AUTHENTICATED);
export const selectAuthenticatedUserToken = get(AUTH_USER_JWT_TOKEN);

// Media
export const selectMediaPayloadIsLoading = get(MEDIA_PAYLOAD_IS_LOADING);
export const selectMedia = get(MEDIA_ITEMS);
