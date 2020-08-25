/* eslint-disable @typescript-eslint/indent */
import { ISignInUserData, IResponse, IEvent, IUser, IRegisterUserData, IMedia, ICustomer, IAuthUser } from '../models';
import {
  GET_ALL_EVENTS_API,
  GET_ALL_USERS_API,
  POST_USER_SIGN_IN_API,
  CREATE_EVENT_API,
  UPDATE_EVENT_API,
  DELETE_EVENT_API,
  REGISER_USERS_API,
  IS_USER_AUTHENTICATED_API,
  GET_MEDIA_BY_ID_API,
  UPDATE_MEDIA_API,
  UPDATE_USER_API,
  DELETE_USER_API,
  CREATE_CUSTOMER_API,
  CREATE_MEDIA_API,
  GET_ALL_MEDIA_API,
  DELETE_MEDIA_API
} from '../api';

//
// ? ─────────────────────────────────────────────────────────────────── EVENTS ─────
//
export const listEventsService = async (): Promise<IResponse<IEvent>> => {
  const HEADER = {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
  };
  const fetchedEvents: Response = await fetch(GET_ALL_EVENTS_API, HEADER);
  const responsePayload: Promise<IResponse<IEvent>> = fetchedEvents.json();
  return responsePayload;
};

export const addEventService = async (event: IEvent): Promise<IResponse<IEvent>> => {
  const HEADER = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(event)
  };
  const createNewEvent: Response = await fetch(CREATE_EVENT_API, HEADER);
  const responsePayload: Promise<IResponse<IEvent>> = await createNewEvent.json();
  return responsePayload;
};

export const updateEventService = async (id: string, event: IEvent): Promise<IResponse<IEvent>> => {
  const HEADER = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(event)
  };
  const updateNewEvent: Response = await fetch(UPDATE_EVENT_API + id, HEADER);
  const responsePayload: Promise<IResponse<IEvent>> = await updateNewEvent.json();
  return responsePayload;
};

export const deleteEventService = async (id: string): Promise<IResponse<IEvent>> => {
  const HEADER = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };
  const deleteEvent: Response = await fetch(DELETE_EVENT_API + id, HEADER);
  const responsePayload: Promise<IResponse<IEvent>> = await deleteEvent.json();
  return responsePayload;
};

//
// ? ─────────────────────────────────────────────────────────────────── USERS ─────
//
export const listUsersService = async (): Promise<IResponse<IUser>> => {
  const HEADER = {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
  };
  const fetchedUsers: Response = await fetch(GET_ALL_USERS_API, HEADER);
  const responsePayload: Promise<IResponse<IUser>> = fetchedUsers.json();
  return responsePayload;
};

export const updateUserService = async (id: string, userFormData: FormData): Promise<IResponse<IRegisterUserData>> => {
  const HEADER = {
    method: 'PUT',
    headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    body: userFormData
  };
  const updateUser: Response = await fetch(UPDATE_USER_API + id, HEADER);
  const responsePayload: Promise<IResponse<IRegisterUserData>> = await updateUser.json();
  return responsePayload;
};

export const deleteUserService = async (id: string): Promise<IResponse<IUser>> => {
  const HEADER = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };
  const deleteUser: Response = await fetch(DELETE_USER_API + id, HEADER);
  const responsePayload: Promise<IResponse<IUser>> = await deleteUser.json();
  return responsePayload;
};

export const registerUserService = async (userFormData: FormData): Promise<IResponse<IRegisterUserData>> => {
  const HEADER = {
    method: 'POST',
    body: userFormData
  };

  const postRegisterUser: Response = await fetch(REGISER_USERS_API, HEADER);
  const responsePayload: Promise<IResponse<IRegisterUserData>> = await postRegisterUser.json();
  return responsePayload;
};

export const signInUserService = async (userData: ISignInUserData): Promise<IResponse<null, IAuthUser>> => {
  const HEADER = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(userData)
  };
  const postSignInUser: Response = await fetch(POST_USER_SIGN_IN_API, HEADER);
  const responsePayload: Promise<IResponse<null, IAuthUser>> = await postSignInUser.json();
  return responsePayload;
};

export const isUserAuthenticatedService = async (): Promise<IResponse<IAuthUser>> => {
  const HEADER = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };
  const isUserAuthenticatedEvent: Response = await fetch(IS_USER_AUTHENTICATED_API, HEADER);
  const responsePayload: Promise<IResponse<IAuthUser>> = await isUserAuthenticatedEvent.json();
  return responsePayload;
};

//
// ? ─────────────────────────────────────────────────────────────────── MEDIA ─────
//
export const listMediaService = async (): Promise<IResponse<IMedia>> => {
  const HEADER = {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
  };
  const fetchedMedia: Response = await fetch(GET_ALL_MEDIA_API, HEADER);
  const responsePayload: Promise<IResponse<IMedia>> = fetchedMedia.json();
  return responsePayload;
};

export const addMediaService = async (userFormData: FormData): Promise<IResponse<IMedia>> => {
  const HEADER = {
    method: 'POST',
    headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    body: userFormData
  };

  const postMediaService: Response = await fetch(CREATE_MEDIA_API, HEADER);
  const responsePayload: Promise<IResponse<IMedia>> = await postMediaService.json();
  return responsePayload;
};

export const updateMediaService = async (id: string, mediaFormData: FormData): Promise<IResponse<IMedia>> => {
  const HEADER = {
    method: 'PUT',
    headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    body: mediaFormData
  };

  const updateMedia: Response = await fetch(UPDATE_MEDIA_API + id, HEADER);
  const responsePayload: Promise<IResponse<IRegisterUserData>> = await updateMedia.json();
  return responsePayload;
};

export const getMediaByIdService = async (id: string): Promise<IResponse<IMedia>> => {
  const HEADER = {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
  };
  const getMediaById: Response = await fetch(GET_MEDIA_BY_ID_API + id, HEADER);
  const responsePayload: Promise<IResponse<IMedia>> = await getMediaById.json();
  return responsePayload;
};

export const deleteMediaService = async (id: string): Promise<IResponse<IMedia>> => {
  const HEADER = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };
  const deleteMedia: Response = await fetch(DELETE_MEDIA_API + id, HEADER);
  const responsePayload: Promise<IResponse<IMedia>> = await deleteMedia.json();
  return responsePayload;
};

//
// ? ─────────────────────────────────────────────────────────────────── CUSTOMERS ─────
//
export const creatCustomerService = async (customer: ICustomer): Promise<IResponse<ICustomer>> => {
  const HEADER = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(customer)
  };
  const createNewCustomer: Response = await fetch(CREATE_CUSTOMER_API, HEADER);
  const responsePayload: Promise<IResponse<ICustomer>> = await createNewCustomer.json();
  return responsePayload;
};
