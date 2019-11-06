import { loadUsersRequest, loadUserError, signInRequest, registerRequest } from "../actions/user.action";
import { Effect, ISignInUserData, IUser, IResponse, IRegisterUserData } from "../../models";
import { signInUserService, registerUserService } from "../../services";
import { decode } from "jsonwebtoken";

// SignIn User
export const signInUser = (userData: ISignInUserData): Effect => async (dispatch, getState) => {
	dispatch(loadUsersRequest());
	try {
		const response: IResponse<IUser> = await signInUserService(userData);
		if (!!response.success) {
			const jwtToken = Object(response.data)!.jwt_token;
			localStorage.setItem("token", jwtToken);
			return dispatch(signInRequest(decode(jwtToken)));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			return dispatch(loadUserError(response));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		return dispatch(loadUserError(e));
	}
};

// Register User
export const registerUser = (formData: FormData): Effect => async (dispatch, getState) => {
	dispatch(loadUsersRequest());
	try {
		const payload: IResponse<IUser> = await registerUserService(formData);
		if (!!payload.success) {
			return dispatch(registerRequest(payload));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			return dispatch(loadUserError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		return dispatch(loadUserError(e));
	}
};
