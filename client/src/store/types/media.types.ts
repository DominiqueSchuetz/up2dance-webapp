import { IMedia, IResponse } from "../../models";
import { EReduxActionTypesMedia } from "../../enums";
import { Action } from "redux";

export interface IReduxBaseAction extends Action {
	type: EReduxActionTypesMedia;
}

export interface IReduxLoadMediaAction extends IReduxBaseAction {
	type: EReduxActionTypesMedia.LOAD_MEDIA;
}

export interface IReduxErrorMediaAction extends IReduxBaseAction {
	type: EReduxActionTypesMedia.ERROR_MEDIA;
	payload: IResponse<IMedia>;
}

export interface IReduxGetAllMediaAction extends IReduxBaseAction {
	type: EReduxActionTypesMedia.GET_ALL_MEDIA;
	payload: IResponse<IMedia[]>;
}

export interface IReduxGetMediaByIdAction extends IReduxBaseAction {
	type: EReduxActionTypesMedia.GET_MEDIA_BY_ID;
	payload: IResponse<IMedia>;
}

export interface IReduxCreateMediaAction extends IReduxBaseAction {
	type: EReduxActionTypesMedia.CREATE_MEDIA;
	payload: IResponse<IMedia>;
}

export interface IReduxDeleteMediaAction extends IReduxBaseAction {
	type: EReduxActionTypesMedia.DELETE_MEDIA;
	payload: IResponse<IMedia>;
}

export type ApplicationMediaAction =
	| IReduxLoadMediaAction
	| IReduxErrorMediaAction
	| IReduxGetMediaByIdAction
	| IReduxGetAllMediaAction
	| IReduxCreateMediaAction
	| IReduxDeleteMediaAction;
