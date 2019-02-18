import { CrudController } from "./CrudController";
import { AuthController } from "./AuthController";
import { MediaController } from "./MediaController";
import { CustomerController } from "./CustomerController";
import { EventController } from "./EventController";
import { NewsController } from "./NewsController";

import * as EventSchema from '../models/Event';
import { IEvent } from "../models/interfaces/IEvent";

import * as NewsSchema from '../models/News';
import { INews } from "../models/interfaces/INews";

import * as MediaSchema from '../models/Media';
import { IMedia } from "../models/interfaces/IMedia";

import * as CustomerSchema from '../models/Customer';
import { ICustomer } from "../models/interfaces/ICustomer";

const authController = new AuthController();
const customerController: CrudController<ICustomer> = new CustomerController('customer', CustomerSchema);
const mediaController: CrudController<IMedia> = new MediaController('media', MediaSchema);
const eventController: CrudController<IEvent> = new EventController('event', EventSchema);
const newsController: CrudController<INews> = new NewsController('news', NewsSchema);

export const CONTROLLERS = [
    authController,
    customerController,
    mediaController,
    eventController,
    newsController,
];