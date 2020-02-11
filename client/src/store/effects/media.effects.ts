import {
	doListMediaStarted,
	doListMediaSucceeded,
	doListMediaFailed,
	doListMediaError,
	doListMediaEnded,
	doAddMediaStarted,
	doAddMediaSucceeded,
	doAddMediaFailed,
	doAddMediaError,
	doAddMediaEnded,
	doUpdateMediaStarted,
	doUpdateMediaSucceeded,
	doUpdateMediaFailed,
	doUpdateMediaError,
	doUpdateMediaEnded,
	doRemoveMediaStarted,
	doRemoveMediaSucceeded,
	doRemoveMediaFailed,
	doRemoveMediaError,
	doRemoveMediaEnded
} from "../actions/media.action";
import { listMediaService, addMediaService, deleteMediaService, updateMediaService } from "../../services";
import { Effect, IMedia, IResponse } from "../../models";
import { toast } from "react-toastify";

//
// ────────────────────────────────────────────────────────────── LIST MEDIA ─────
//
export const effectListMedia = (): Effect => async (dispatch) => {
	dispatch(doListMediaStarted());
	try {
		const payload: IResponse<IMedia> = await listMediaService();
		if (payload.success && payload.errorCode === 0) {
			dispatch(doListMediaSucceeded(payload));
		} else {
			dispatch(doListMediaFailed(payload));
			toast.warn(`${payload.message}`);
		}
	} catch (e) {
		dispatch(
			doListMediaError({
				success: false,
				errorCode: 5,
				errorMessage: e,
				message: "Ein Error trat beim laden der Bilder auf 😩",
				items: null,
				item: null
			})
		);
		toast.error("Ein Error trat beim laden der Bilder auf.🤮");
	}
	dispatch(doListMediaEnded());
};

//
// ──────────────────────────────────────────────────────────────── ADD MEDIA ─────
//
export const effectAddMedia = (mediaFormData: FormData): Effect => async (dispatch) => {
	dispatch(doAddMediaStarted());
	try {
		const payload: IResponse<IMedia> = await addMediaService(mediaFormData);
		if (payload.success && payload.errorCode === 0) {
			dispatch(doAddMediaSucceeded(payload));
			toast.success(`${payload.message}`);
		} else {
			dispatch(doAddMediaFailed(payload));
			toast.warn(`${payload.message}`);
		}
	} catch (e) {
		dispatch(
			doAddMediaError({
				success: false,
				errorCode: 5,
				errorMessage: e,
				message: "Ein Error trat beim hinzufügen eines Bildes auf 😩",
				items: null,
				item: null
			})
		);
		toast.error("Ein Error trat beim hinzufügen eines Bildes auf.🤮");
	}
	dispatch(doAddMediaEnded());
};

//
// ──────────────────────────────────────────────────────────────── UPDATE MEDIA ─────
//
export const effectUpdateMedia = (id: string, mediaFormData: FormData): Effect => async (dispatch) => {
	dispatch(doUpdateMediaStarted());
	try {
		const payload: IResponse<IMedia> = await updateMediaService(id, mediaFormData);
		if (payload.success && payload.errorCode === 0) {
			dispatch(doUpdateMediaSucceeded(payload));
			toast.success(`${payload.message}`);
		} else {
			dispatch(doUpdateMediaFailed(payload));
			toast.warn(`${payload.message}`);
		}
	} catch (e) {
		dispatch(
			doUpdateMediaError({
				success: false,
				errorCode: 5,
				errorMessage: e,
				message: "Ein Error trat beim aktualisieren eines Bildes auf 😩",
				items: null,
				item: null
			})
		);
		toast.error("Ein Error trat beim aktualisieren eines Bildes auf.🤮");
	}
	dispatch(doUpdateMediaEnded());
};

//
// ──────────────────────────────────────────────────────────────── REMOVE MEDIA ─────
//
export const effectRemoveMedia = (id: string): Effect => async (dispatch) => {
	dispatch(doRemoveMediaStarted());
	try {
		const payload: IResponse<IMedia> = await deleteMediaService(id);
		if (payload.success && payload.errorCode === 0) {
			dispatch(doRemoveMediaSucceeded(payload));
			toast.success(`${payload.message}`);
		} else {
			dispatch(doRemoveMediaFailed(payload));
			toast.warn(`${payload.message}`);
		}
	} catch (e) {
		dispatch(
			doRemoveMediaError({
				success: false,
				errorCode: 5,
				errorMessage: e,
				message: "Ein Error trat beim entfernen eines Bildes auf 😩",
				items: null,
				item: null
			})
		);
		toast.error("Ein Error trat beim entfernen eines Bildes auf.🤮");
	}
	dispatch(doRemoveMediaEnded());
};
