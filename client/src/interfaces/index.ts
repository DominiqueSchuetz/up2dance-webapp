import { EKindOfEventAction } from "../enums";

export interface IEventType {
	kind: EKindOfEventAction.NEW_EVENT | EKindOfEventAction.UPDATE_EVENT | EKindOfEventAction.CUSTOMER_EVENT;
}
