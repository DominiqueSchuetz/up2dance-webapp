import { ThunkAction } from "redux-thunk";
import { ApplicationReducerState } from "../store/reducers";
import { ApplicationEventsAction } from "../store/types/event.types";
import { ApplicationUserAction } from "../store/types/user.types";
import { ApplicationMediaAction } from "../store/types/media.types";

export interface ILoadingState {
	isPayloadLoading: boolean;
}

export interface ApplicationState<T> {
	loading: ILoadingState;
	payload: IReduxState<T>;
}

export interface IReduxState<T> {
	success: boolean;
	error_code: number;
	message: string;
	items: T[];
	item: T;
}

export interface IResponse<T> {
	success: boolean;
	error_code: number;
	message: string;
	data: T[] & T;
}

export interface IAddress {
	streetName?: string;
	streetNumber?: string;
	zipCode?: string;
	city: string;
	state: string;
	formatted_address?: string | undefined;
	location: { coordinates: number[] };
}

export interface IEvent {
	_id?: string | undefined;
	address: IAddress | undefined;
	eventName: string;
	eventType?: string | undefined;
	eventDate: string;
	timeStart?: string | undefined;
	timeEnd?: string | undefined;
	comment?: string | undefined;
	entry?: string | undefined;
	hidden?: boolean | undefined;
}

export interface IMedia {
	_id?: string | undefined;
	fileName?: string;
	filePath?: string;
	fileUrl?: string;
}

export interface IUser {
	_id?: string | undefined;
	firstName: string;
	lastName: string;
	refId?: string | undefined;
	instrument?: string | undefined;
	email: string;
	password?: string | undefined;
	comment?: string | undefined;
}

export interface ISignInUserData {
	email: string;
	password: string;
}

export interface IRegisterUserData {
	_id?: string | undefined;
	firstName: string;
	lastName: string;
	refId?: string | undefined;
	filePath?: FileList | File | undefined;
	fileName?: string | undefined;
	instrument?: string | undefined;
	email: string;
	password: string;
	secretKey: string;
	comment?: string | undefined;
}

export type Effect = ThunkAction<
	any,
	ApplicationReducerState,
	any,
	ApplicationEventsAction | ApplicationUserAction | ApplicationMediaAction
>;
