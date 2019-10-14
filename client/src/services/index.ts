import { ISignInUserData, IResponsePayload, IEvent, IRequestPayload, IUser } from "../models";
import { GET_ALL_EVENTS_API, GET_ALL_USERS_API, POST_USER_SIGN_IN_API, CREATE_EVENT_API } from "../api";

// ###################################################
// #################  Events
// ###################################################
export const loadEventsService = async (): Promise<IResponsePayload<IEvent>> => {
	const fetchedEvents: Response = await fetch(GET_ALL_EVENTS_API);
	const responsePayload: Promise<IResponsePayload<IEvent>> = fetchedEvents.json();

	return responsePayload;
};

export const creatEventService = async (event: IEvent): Promise<IRequestPayload<IEvent>> => {
	const POST_HEADER = {
		method: "POST",
		headers: { "content-type": "application/json", authorization: `Bearer ${localStorage.getItem("token")}` },
		body: JSON.stringify(event)
	};
	const createNewEvent: Response = await fetch(CREATE_EVENT_API, POST_HEADER);
	const responsePayload: Promise<IRequestPayload<IEvent>> = await createNewEvent.json();

	return responsePayload;
};

// ###################################################
// #################  Users
// ###################################################
export const loadUsersService = async (): Promise<IResponsePayload<IUser>> => {
	const fetchedUsers: Response = await fetch(GET_ALL_USERS_API);
	const responsePayload: Promise<IResponsePayload<IUser>> = fetchedUsers.json();

	return responsePayload;
};

export const signInUserService = async (userData: ISignInUserData): Promise<IResponsePayload<IUser>> => {
	const POST_HEADER = {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(userData)
	};
	const postSignInUser: Response = await fetch(POST_USER_SIGN_IN_API, POST_HEADER);
	const responsePayload: Promise<IResponsePayload<IUser>> = await postSignInUser.json();

	return responsePayload;
};
