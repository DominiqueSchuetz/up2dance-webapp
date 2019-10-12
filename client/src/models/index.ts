export interface IResponsePayload {
	success: boolean;
	error_code: number;
	message: string;
	data: IEvent[];
}

export interface ICreateEvent {
	success: boolean;
	error_code: number;
	message: string;
	data: IEvent;
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
	admissionCharge?: string | undefined;
	hidden?: boolean | undefined;
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
