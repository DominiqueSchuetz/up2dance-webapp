import { ThunkAction } from "redux-thunk";
import { ApplicationReducerState } from "../store/reducers";
import { ApplicationEventsAction } from "../store/types/event.types";
import { ApplicationUserAction } from "../store/types/user.types";

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
	location: any;
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

export interface IUser {
	_id?: string | undefined;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	instrument?: string | undefined;
	comment?: string | undefined;
}

export interface ISignInUserData {
	email: string;
	password: string;
}

export type Effect = ThunkAction<any, ApplicationReducerState, any, ApplicationEventsAction | ApplicationUserAction>;
