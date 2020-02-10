import { Request, Response } from "restify";
import { BaseController } from "./BaseController";
import { IEvent } from "../models/interfaces/IEvent";

export class EventController extends BaseController<IEvent> {}
