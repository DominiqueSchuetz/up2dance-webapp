import { CrudController } from "./CrudController";
import { AuthController } from "./AuthController";

import * as EventSchema from '../models/Event';
import { IEvent } from "../models/interfaces/IEvent";

import * as NewsSchema from '../models/News';
import { INews } from "../models/interfaces/INews";

const authController = new AuthController();
const eventController = new CrudController<IEvent>('event', EventSchema);
const newsController = new CrudController<INews>('news', NewsSchema);

export const CONTROLLERS = [
    authController,
    eventController,
    newsController,
];