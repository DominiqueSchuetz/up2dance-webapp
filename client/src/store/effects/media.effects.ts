import { loadMediaRequest, loadMediaError, getMediaByIdRequest } from "../actions/media.action";
import { getMediaByIdService } from "../../services";
import { Effect, IResponse, IMedia } from "../../models";

// Update media by id
export const getMediaById = (id: string, media: IMedia): Effect => async (dispatch, getState) => {
	dispatch(loadMediaRequest());
	try {
		const payload: IResponse<IMedia> = await getMediaByIdService(id, media);
		if (!!payload.success) {
			return dispatch(getMediaByIdRequest(payload));
		} else {
			return dispatch(loadMediaError(payload));
		}
	} catch (e) {
		return dispatch(loadMediaError(e));
	}
};
