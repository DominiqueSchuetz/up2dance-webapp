import { ISignInUserData, IResponse, IEvent, IUser, IRegisterUserData, IMedia } from "../models";
import {
	GET_ALL_EVENTS_API,
	GET_ALL_USERS_API,
	POST_USER_SIGN_IN_API,
	CREATE_EVENT_API,
	UPDATE_EVENT_API,
	DELETE_EVENT_API,
	REGISER_USERS_API,
	IS_USER_AUTHENTICATED_API,
	GET_MEDIA_BY_ID_API
} from "../api";

// ###################################################
// #################  Events
// ###################################################
export const getAllEventsService = async (): Promise<IResponse<IEvent[]>> => {
	const HEADER = {
		method: "GET",
		headers: { "content-type": "application/json" }
	};
	const fetchedEvents: Response = await fetch(GET_ALL_EVENTS_API, HEADER);
	const responsePayload: Promise<IResponse<IEvent[]>> = fetchedEvents.json();
	return responsePayload;
};

export const creatEventService = async (event: IEvent): Promise<IResponse<IEvent>> => {
	const HEADER = {
		method: "POST",
		headers: { "content-type": "application/json", authorization: `Bearer ${localStorage.getItem("token")}` },
		body: JSON.stringify(event)
	};
	const createNewEvent: Response = await fetch(CREATE_EVENT_API, HEADER);
	const responsePayload: Promise<IResponse<IEvent>> = await createNewEvent.json();
	return responsePayload;
};

export const updateEventService = async (id: string, event: IEvent): Promise<IResponse<IEvent>> => {
	const HEADER = {
		method: "PUT",
		headers: { "content-type": "application/json", authorization: `Bearer ${localStorage.getItem("token")}` },
		body: JSON.stringify(event)
	};
	const updateNewEvent: Response = await fetch(UPDATE_EVENT_API + id, HEADER);
	const responsePayload: Promise<IResponse<IEvent>> = await updateNewEvent.json();
	return responsePayload;
};

export const deleteEventService = async (id: string): Promise<IResponse<IEvent>> => {
	const HEADER = {
		method: "DELETE",
		headers: { "content-type": "application/json", authorization: `Bearer ${localStorage.getItem("token")}` }
	};
	const deleteEvent: Response = await fetch(DELETE_EVENT_API + id, HEADER);
	const responsePayload: Promise<IResponse<IEvent>> = await deleteEvent.json();
	return responsePayload;
};

// ###################################################
// #################  Users
// ###################################################
export const loadUsersService = async (): Promise<IResponse<IUser>> => {
	const fetchedUsers: Response = await fetch(GET_ALL_USERS_API);
	const responsePayload: Promise<IResponse<IUser>> = fetchedUsers.json();
	return responsePayload;
};

export const signInUserService = async (userData: ISignInUserData): Promise<IResponse<IUser>> => {
	const HEADER = {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(userData)
	};
	const postSignInUser: Response = await fetch(POST_USER_SIGN_IN_API, HEADER);
	const responsePayload: Promise<IResponse<IUser>> = await postSignInUser.json();
	return responsePayload;
};

export const registerUserService = async (formData: FormData): Promise<IResponse<IRegisterUserData>> => {
	const HEADER = {
		method: "POST",
		body: formData
	};

	const postRegisterUser: Response = await fetch(REGISER_USERS_API, HEADER);
	const responsePayload: Promise<IResponse<IRegisterUserData>> = await postRegisterUser.json();
	return responsePayload;
};

export const isUserAuthenticatedService = async (): Promise<IResponse<IUser>> => {
	const HEADER = {
		method: "GET",
		headers: { "content-type": "application/json", authorization: `Bearer ${localStorage.getItem("token")}` }
	};
	const isUserAuthenticatedEvent: Response = await fetch(IS_USER_AUTHENTICATED_API, HEADER);
	const responsePayload: Promise<IResponse<IUser>> = await isUserAuthenticatedEvent.json();
	return responsePayload;
};

// ###################################################
// #################  Media
// ###################################################
export const getMediaByIdService = async (id: string): Promise<IResponse<IMedia>> => {
	const HEADER = {
		method: "GET",
		headers: { "content-type": "application/json" }
	};
	const getMediaById: Response = await fetch(GET_MEDIA_BY_ID_API + id, HEADER);
	const responsePayload: Promise<IResponse<IMedia>> = await getMediaById.json();
	return responsePayload;
};
