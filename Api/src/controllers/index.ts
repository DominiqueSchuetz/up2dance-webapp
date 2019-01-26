import { CrudController } from "./CrudController";
import { AuthController } from "./AuthController";

import * as EventSchema from '../models/Event';
import { IEvent } from "../models/interfaces/IEvent";

// import * as EditorSchema from '../models/Editor';
// import { IEditor } from "../models/interfaces/IEditor";

const authController = new AuthController();
const eventController = new CrudController<IEvent>('event', EventSchema);
//const authController = new CrudController<IEditor>('auth', EditorSchema);

export const CONTROLLERS = [
    authController,
    eventController,
];