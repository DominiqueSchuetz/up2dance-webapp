import {
	IReduxLoadMediaAction,
	IReduxGetMediaByIdAction,
	IReduxErrorMediaAction,
	IReduxGetAllMediaAction,
	IReduxCreateMediaAction,
	IReduxDeleteMediaAction
} from "../types/media.types";
import { EReduxActionTypesMedia } from "../../enums";
import { IResponse, IMedia } from "../../models";

export const loadMediaRequest = (): IReduxLoadMediaAction => ({
	type: EReduxActionTypesMedia.LOAD_MEDIA
});

export const loadMediaError = (payload: any): IReduxErrorMediaAction => ({
	type: EReduxActionTypesMedia.ERROR_MEDIA,
	payload
});

export const getAllMediaRequest = (payload: IResponse<IMedia[]>): IReduxGetAllMediaAction => ({
	type: EReduxActionTypesMedia.GET_ALL_MEDIA,
	payload
});

export const getMediaByIdRequest = (payload: any): IReduxGetMediaByIdAction => ({
	type: EReduxActionTypesMedia.GET_MEDIA_BY_ID,
	payload
});

export const createMediaRequest = (payload: IResponse<IMedia>): IReduxCreateMediaAction => ({
	type: EReduxActionTypesMedia.CREATE_MEDIA,
	payload
});

export const deleteMediaRequest = (payload: IResponse<IMedia>): IReduxDeleteMediaAction => ({
	type: EReduxActionTypesMedia.DELETE_MEDIA,
	payload
});
