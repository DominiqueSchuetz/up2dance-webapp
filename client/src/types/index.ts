export interface IEvent {
    id?: string;
    eventName?: string;
    eventType?: string;
    paSystem?: boolean;
    address?: object;
    commentEvent?: string;
    eventDate?: number;
    timeStart?: number;
    timeEnd?: Date;
    payment?: string;
    hidden?: boolean;
}
