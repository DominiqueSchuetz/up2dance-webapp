import { BaseController } from "./BaseController";
import { Request, Response, Next } from "restify";
import * as moment from "moment";
import "moment/locale/de";
import { toString } from "lodash";
import { IEvent } from "../models/interfaces/IEvent";
import {
	successResponse,
	badRequestResponse,
	internalServerErrorResponse,
	unauthorizedResponse
} from "../responses/responses";

export class EventController extends BaseController<IEvent> {
	/**
     * GET all items
     * @param req 
     * @param res
     * @param next 
     */
	protected async list(req: Request, res: Response, next?: Next): Promise<void> {
		try {
			const allItems: IEvent[] = await this._repository.list();
			allItems.length > 0
				? successResponse(res, allItems)
				: badRequestResponse(res, "No items in database so far");
			//console.log(moment("2019-01-21T18:51:15.724Z").locale("de").format("LL"));
			//console.log(moment("2019-01-21T18:51:15.724Z").locale("de").format("LT"));
		} catch (error) {
			internalServerErrorResponse(res, error.message);
		}
	}
}
