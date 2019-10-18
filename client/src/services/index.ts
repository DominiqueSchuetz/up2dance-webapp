import { GET_ALL_EVENTS_API, GET_ALL_USERS_API, POST_USER_SIGN_IN_API, CREATE_EVENT_API } from "../api";
import { ISignInUserData, IResponse, IEvent, IUser } from "../models";

// ###################################################
// #################  Events
// ###################################################
export const getAllEventsService = async (): Promise<IResponse<IEvent>> => {
	const fetchedEvents: Response = await fetch(GET_ALL_EVENTS_API);
	const responsePayload: Promise<IResponse<IEvent>> = fetchedEvents.json();
	return responsePayload;
};

export const creatEventService = async (event: IEvent): Promise<IResponse<IEvent>> => {
	const POST_HEADER = {
		method: "POST",
		headers: { "content-type": "application/json", authorization: `Bearer ${localStorage.getItem("token")}` },
		body: JSON.stringify(event)
	};
	const createNewEvent: Response = await fetch(CREATE_EVENT_API, POST_HEADER);
	const responsePayload: Promise<IResponse<IEvent>> = await createNewEvent.json();
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
	const POST_HEADER = {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(userData)
	};
	const postSignInUser: Response = await fetch(POST_USER_SIGN_IN_API, POST_HEADER);
	const responsePayload: Promise<IResponse<IUser>> = await postSignInUser.json();
	return responsePayload;
};
