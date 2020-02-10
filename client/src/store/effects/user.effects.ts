import {
	doListUsersStarted,
	doListUsersSucceeded,
	doListUsersFailed,
	doListUsersError,
	doListUsersEnded,
	doAddUserStarted,
	doAddUserSucceeded,
	doAddUserFailed,
	doAddUserError,
	doAddUserEnded,
	doUpdateUserStarted,
	doUpdateUserSucceeded,
	doUpdateUserFailed,
	doUpdateUserError,
	doUpdateUserEnded,
	doRemoveUserStarted,
	doRemoveUserSucceeded,
	doRemoveUserFailed,
	doRemoveUserError,
	doRemoveUserEnded
} from "../actions/user.actions";
import { listUsersService, registerUserService, updateUserService, deleteUserService } from "../../services";
import { Effect, IUser, IResponse } from "../../models";
import { toast } from "react-toastify";

//
// ────────────────────────────────────────────────────────────── LIST Users ─────
//
export const effectListUsers = (): Effect => async (dispatch) => {
	dispatch(doListUsersStarted());
	try {
		const payload: IResponse<IUser> = await listUsersService();
		if (payload.success && payload.errorCode === 0) {
			dispatch(doListUsersSucceeded(payload));
		} else {
			dispatch(doListUsersFailed(payload));
			toast.warn(`😩${payload.message}`);
		}
	} catch (e) {
		dispatch(
			doListUsersError({
				success: false,
				errorCode: 5,
				errorMessage: e,
				message: "Ein Error trat beim laden der Users auf.",
				items: null,
				item: null
			})
		);
		toast.error("🤮🤮🤮Ein Error trat beim laden der Users auf.🤮🤮🤮");
	}
	dispatch(doListUsersEnded());
};

//
// ──────────────────────────────────────────────────────────────── ADD User ─────
//
export const effectRegisterUser = (userFormData: FormData): Effect => async (dispatch) => {
	dispatch(doAddUserStarted());
	try {
		const payload: IResponse<IUser> = await registerUserService(userFormData);
		if (payload.success && payload.errorCode === 0) {
			dispatch(doAddUserSucceeded(payload));
			toast.success(`🤩${payload.message}`);
		} else {
			dispatch(doAddUserFailed(payload));
			toast.warn(`😩${payload.message}`);
		}
	} catch (e) {
		dispatch(
			doAddUserError({
				success: false,
				errorCode: 5,
				errorMessage: e,
				message: "Ein Error trat beim hinzufügen eines Users auf.",
				items: null,
				item: null
			})
		);
		toast.error("🤮🤮🤮Ein Error trat beim hinzufügen eines Users auf.🤮🤮🤮");
	}
	dispatch(doAddUserEnded());
};

//
// ──────────────────────────────────────────────────────────────── UPDATE User ─────
//
export const effectUpdateUser = (id: string, userFormData: FormData): Effect => async (dispatch) => {
	dispatch(doUpdateUserStarted());
	try {
		const payload: IResponse<IUser> = await updateUserService(id, userFormData);
		if (payload.success && payload.errorCode === 0) {
			dispatch(doUpdateUserSucceeded(payload));
			toast.success(`🤩${payload.message}`);
		} else {
			dispatch(doUpdateUserFailed(payload));
			toast.warn(`😩${payload.message}`);
		}
	} catch (e) {
		dispatch(
			doUpdateUserError({
				success: false,
				errorCode: 5,
				errorMessage: e,
				message: "Ein Error trat beim aktualisieren eines Users auf.",
				items: null,
				item: null
			})
		);
		toast.error("🤮🤮🤮Ein Error trat beim aktualisieren eines Users auf.🤮🤮🤮");
	}
	dispatch(doUpdateUserEnded());
};

//
// ──────────────────────────────────────────────────────────────── REMOVE User ─────
//
export const effectRemoveUser = (id: string): Effect => async (dispatch) => {
	dispatch(doRemoveUserStarted());
	try {
		const payload: IResponse<IUser> = await deleteUserService(id);
		if (payload.success && payload.errorCode === 0) {
			dispatch(doRemoveUserSucceeded(payload));
			toast.success(`🤩${payload.message}`);
		} else {
			dispatch(doRemoveUserFailed(payload));
			toast.warn(`😩${payload.message}`);
		}
	} catch (e) {
		dispatch(
			doRemoveUserError({
				success: false,
				errorCode: 5,
				errorMessage: e,
				message: "Ein Error trat beim entfernen eines Users auf.",
				items: null,
				item: null
			})
		);
		toast.error("🤮🤮🤮Ein Error trat beim entfernen eines Users auf.🤮🤮🤮");
	}
	dispatch(doRemoveUserEnded());
};
