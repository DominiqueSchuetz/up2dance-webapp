import { loadUsersRequest, loadUserError, signInRequest } from "../actions/user.action";
import { Effect, ISignInUserData, IUser, IResponse } from "../../models";
import { signInUserService } from "../../services";
import { decode } from "jsonwebtoken";

// SignIn User
export const loginUser = (userData: ISignInUserData): Effect => async (dispatch, getState) => {
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
