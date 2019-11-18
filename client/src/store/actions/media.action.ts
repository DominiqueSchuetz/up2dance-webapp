import { IReduxLoadMediaAction, IReduxGetMediaByIdAction, IReduxErrorMediaAction } from "../types/media.types";
import { EReduxActionTypesMedia } from "../../enums";

export const loadMediaRequest = (): IReduxLoadMediaAction => ({
	type: EReduxActionTypesMedia.LOAD_MEDIA
});

export const loadMediaError = (payload: any): IReduxErrorMediaAction => ({
	type: EReduxActionTypesMedia.ERROR_MEDIA,
	payload
});

export const getMediaByIdRequest = (payload: any): IReduxGetMediaByIdAction => ({
	type: EReduxActionTypesMedia.GET_MEDIA_BY_ID,
	payload
});
