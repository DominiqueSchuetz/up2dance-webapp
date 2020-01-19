import { Effect, ISignInUserData, IUser, IResponse, IRegisterUserData } from "../../models";
import {
	signInUserService,
	registerUserService,
	isUserAuthenticatedService,
	getAllUsersService,
	updateUserService,
	deleteUserService
} from "../../services";
import {
	loadUsersRequest,
	loadUserError,
	signInRequest,
	registerRequest,
	isUserAuthenticatedRequest,
	getUsersRequest,
	updateUserByIdRequest,
	deleteUserByIdRequest
} from "../actions/user.action";
import { toast } from "react-toastify";
import { decode } from "jsonwebtoken";
import { removeString } from "../../lib";

// Get all users
export const getAllUsers = (): Effect => async (dispatch, getState) => {
	dispatch(loadUsersRequest());
	try {
		const payload: IResponse<IUser[]> = await getAllUsersService();
		dispatch(getUsersRequest(payload));
	} catch (e) {
		dispatch(loadUserError(e));
	}
};

// Update user by id
export const updateUserById = (id: string, userFormData: FormData): Effect => async (dispatch, getState) => {
	dispatch(loadUsersRequest());
	try {
		const payload: IResponse<IRegisterUserData> = await updateUserService(id, userFormData);
		if (!!payload.success) {
			toast.success(` 😻 ${payload.message}`);
			localStorage.removeItem("token");
			localStorage.clear();
			localStorage.setItem("token", removeString(payload.jwtToken, "Bearer"));
			dispatch(updateUserByIdRequest(payload));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			toast.info(` 😾 ${payload.message}`);
			dispatch(loadUserError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		toast.error(` 🙀 ${e}`);
		dispatch(loadUserError(e));
	}
};

// Update user by id
export const deleteUserById = (id: string): Effect => async (dispatch, getState) => {
	dispatch(loadUsersRequest());
	try {
		const payload: IResponse<IUser> = await deleteUserService(id);
		if (!!payload.success) {
			toast.success(` 😻 ${payload.message}`);
			dispatch(deleteUserByIdRequest(payload));
			localStorage.removeItem("token");
			localStorage.clear();
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			toast.info(` 😾 ${payload.message}`);
			dispatch(loadUserError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		toast.error(` 🙀 ${e}`);
		dispatch(loadUserError(e));
	}
};

// SignIn user
export const signInUser = (userData: ISignInUserData): Effect => async (dispatch, getState) => {
	dispatch(loadUsersRequest());
	try {
		const payload: IResponse<IUser> = await signInUserService(userData);
		if (!!payload.success) {
			const jwtToken = payload.jwtToken;
			localStorage.setItem("token", jwtToken);
			toast.success(` 😻 ${payload.message}`);
			dispatch(signInRequest(decode(jwtToken)));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			toast.info(` 😾 ${payload.message}`);
			dispatch(loadUserError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		toast.error(` 🙀 ${e}`);
		dispatch(loadUserError(e));
	}
};

// Register user
export const registerUser = (formData: FormData): Effect => async (dispatch, getState) => {
	dispatch(loadUsersRequest());
	try {
		const payload: IResponse<IRegisterUserData> = await registerUserService(formData);
		if (!!payload.success) {
			toast.success(` 😻 ${payload.message}`);
			dispatch(registerRequest(payload));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			toast.info(` 😾 ${payload.message}`);
			dispatch(loadUserError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		toast.error(` 🙀 ${e}`);
		dispatch(loadUserError(e));
	}
};

// Is user authenticated ?
export const isUserAuthenticated = (): Effect => async (dispatch, getState) => {
	dispatch(loadUsersRequest());
	try {
		const payload: IResponse<IUser> = await isUserAuthenticatedService();

		console.log("payload => ", payload);

		if (!!payload.success) {
			dispatch(isUserAuthenticatedRequest(payload));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			// toast.error(` 😾 Du bist nicht angemeldet`);
			dispatch(loadUserError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		toast.error(` 🙀 ${e}`);
		dispatch(loadUserError(e));
	}
};
