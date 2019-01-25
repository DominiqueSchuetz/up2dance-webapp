import { CrudController } from "./CrudController";

import * as EventSchema from '../models/Event';
import { IEvent } from "../models/interfaces/IEvent";

import * as EditorSchema from '../models/Editor';
import { IEditor } from "../models/interfaces/IEditor";

const eventController = new CrudController<IEvent>('event', EventSchema);
const authController = new CrudController<IEditor>('auth', EditorSchema);

export const CONTROLLERS = [
    eventController,
    authController
];