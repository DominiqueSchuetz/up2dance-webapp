import { CrudController } from "./abstract_class/AbstractCrudController";
import { AuthController } from "./child_classes/AuthController";
import { MediaController } from "./child_classes/MediaController";
import { CustomerController } from "./child_classes/CustomerController";
import { EventController } from "./child_classes/EventController";
import { NewsController } from "./child_classes/NewsController";

import * as UserSchema from '../models/User'
import { IUser  } from "../models/interfaces/IUser";

import * as EventSchema from '../models/Event';
import { IEvent } from "../models/interfaces/IEvent";

import * as NewsSchema from '../models/News';
import { INews } from "../models/interfaces/INews";

import * as MediaSchema from '../models/Media';
import { IMedia } from "../models/interfaces/IMedia";

import * as CustomerSchema from '../models/Customer';
import { ICustomer } from "../models/interfaces/ICustomer";

const authController: CrudController<IUser> = new AuthController('auth', UserSchema);
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