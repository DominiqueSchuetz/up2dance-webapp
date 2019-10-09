export interface IResponsePayload {
	success: boolean;
	error_code: number;
	message: string;
	data: [];
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
	_id: string;
	address: IAddress;
	eventName: string;
	eventType: string;
	eventDate: string;
	timeStart: string;
	commentEvent: string;
}

export interface IUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	instrument: string;
	comment: string;
}

export interface ISignInUserData {
	email: string;
	password: string;
}

export interface ILoadingState {
	isPayloadLoading: boolean;
}

export interface ApplicationState {
	loading: ILoadingState;
	payload: IResponsePayload;
}
