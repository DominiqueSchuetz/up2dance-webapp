export interface IEvent {
	_id?: string;
	createdAt?: string;
	updatedAt?: string;
	eventName?: string;
	eventType?: string;
	paSystem?: boolean;
	address?: object;
	commentEvent?: string;
	eventDate?: string;
	timeStart?: string;
	timeEnd?: string;
	payment?: string;
	hidden?: boolean;
}

export interface IResponseObject {
	data: [];
	error_code: number;
	message: string;
	success: boolean;
}
