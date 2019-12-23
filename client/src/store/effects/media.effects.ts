import {
	loadMediaRequest,
	loadMediaError,
	getMediaByIdRequest,
	getAllMediaRequest,
	createMediaRequest,
	deleteMediaRequest
} from "../actions/media.action";
import { getAllMediaService, getMediaByIdService, createMediaService, deleteMediaService } from "../../services";
import { Effect, IResponse, IMedia } from "../../models";
import { toast } from "react-toastify";

// Get all media
export const getAllMedia = (): Effect => async (dispatch, getState) => {
	dispatch(loadMediaRequest());
	try {
		const payload: IResponse<IMedia[]> = await getAllMediaService();
		dispatch(getAllMediaRequest(payload));
	} catch (e) {
		dispatch(loadMediaError(e));
	}
};

// Update media by id
export const getMediaById = (id: string): Effect => async (dispatch, getState) => {
	dispatch(loadMediaRequest());
	try {
		const payload: IResponse<IMedia> = await getMediaByIdService(id);
		if (!!payload.success) {
			return dispatch(getMediaByIdRequest(payload));
		} else {
			return dispatch(loadMediaError(payload));
		}
	} catch (e) {
		return dispatch(loadMediaError(e));
	}
};

// Create media
export const createMedia = (mediaFormData: FormData): Effect => async (dispatch, getState) => {
	dispatch(loadMediaRequest());
	try {
		const payload: IResponse<IMedia> = await createMediaService(mediaFormData);
		if (!!payload.success) {
			toast.success(` 😻 ${payload.message}`);
			return dispatch(createMediaRequest(payload));
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			toast.info(` 😾 ${payload.message}`);
			return dispatch(loadMediaError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		toast.error(` 🙀 ${e}`);
		return dispatch(loadMediaError(e));
	}
};

// Update media by id
export const deleteMediaById = (id: string): Effect => async (dispatch, getState) => {
	dispatch(loadMediaRequest());
	try {
		const payload: IResponse<IMedia> = await deleteMediaService(id);
		if (!!payload.success) {
			toast.success(` 😻 ${payload.message}`);
			dispatch(deleteMediaRequest(payload));
			localStorage.removeItem("token");
			localStorage.clear();
		} else {
			localStorage.removeItem("token");
			localStorage.clear();
			toast.info(` 😾 ${payload.message}`);
			dispatch(loadMediaError(payload));
		}
	} catch (e) {
		localStorage.removeItem("token");
		localStorage.clear();
		toast.error(` 🙀 ${e}`);
		dispatch(loadMediaError(e));
	}
};
