import { ISignInUserData, IResponsePayload } from "../models";
import { GET_ALL_EVENTS_API, GET_ALL_USERS_API, POST_USER_SIGN_IN_API } from "../api";

// ###################################################
// #################  Events
// ###################################################
export const loadEventsService = async (): Promise<IResponsePayload> => {
	const fetchedEvents: Response = await fetch(GET_ALL_EVENTS_API);
	const responsePayload: Promise<IResponsePayload> = fetchedEvents.json();

	return responsePayload;
};

// ###################################################
// #################  Users
// ###################################################
export const loadUsersService = async (): Promise<IResponsePayload> => {
	const fetchedUsers: Response = await fetch(GET_ALL_USERS_API);
	const responsePayload: Promise<IResponsePayload> = fetchedUsers.json();

	return responsePayload;
};

export const signInUserService = async (userData: ISignInUserData): Promise<IResponsePayload> => {
	const POST_HEADER = {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(userData)
	};
	const postSignInUser: Response = await fetch(POST_USER_SIGN_IN_API, POST_HEADER);
	const responsePayload: Promise<IResponsePayload> = await postSignInUser.json();

	return responsePayload;
};
