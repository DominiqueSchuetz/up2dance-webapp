import { CrudController } from "../abstract_class/AbstractCrudController";
import { IEvent } from "../../models/interfaces/IEvent";

export class EventController extends CrudController<IEvent> {};
