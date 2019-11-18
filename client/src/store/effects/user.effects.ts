import {
	loadUsersRequest,
	loadUserError,
	signInRequest,
	registerRequest,
	isUserAuthenticatedRequest
} from "../actions/user.action";
import { Effect, ISignInUserData, IUser, IResponse, IRegisterUserData } from "../../models";
import { signInUserService, registerUserService, isUserAuthenticatedService } from "../../services";
import { toast } from "react-toastify";
import { decode } from "jsonwebtoken";

// SignIn User
export const signInUser = (userData: ISignInUserData): Effect => async (dispatch, getState) => {
	dispatch(loadUsersRequest());
	try {
		const payload: IResponse<IUser> = await signInUserService(userData);
		if (!!payload.success) {
			const jwtToken = Object(payload.data)!.jwt_token;
			localStorage.setItem("token", jwtToken);
			toast.success(` 😻 ${payload.message}`);
			return dispatch(signInRequest(decode(jwtToken)));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			toast.info(` 😾 ${payload.message}`);
			return dispatch(loadUserError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		toast.error(` 🙀 ${e}`);
		return dispatch(loadUserError(e));
	}
};

// Register User
export const registerUser = (formData: FormData): Effect => async (dispatch, getState) => {
	dispatch(loadUsersRequest());
	try {
		const payload: IResponse<IRegisterUserData> = await registerUserService(formData);
		if (!!payload.success) {
			toast.success(` 😻 ${payload.message}`);
			return dispatch(registerRequest(payload));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			toast.info(` 😾 ${payload.message}`);
			return dispatch(loadUserError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		toast.error(` 🙀 ${e}`);
		return dispatch(loadUserError(e));
	}
};

// SignIn User
export const isUserAuthenticated = (): Effect => async (dispatch, getState) => {
	dispatch(loadUsersRequest());
	try {
		const payload: IResponse<IUser> = await isUserAuthenticatedService();
		if (!!payload.success) {
			return dispatch(isUserAuthenticatedRequest(payload));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			toast.info(` 😾 ${payload.message}`);
			return dispatch(loadUserError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		toast.error(` 🙀 ${e}`);
		return dispatch(loadUserError(e));
	}
};
