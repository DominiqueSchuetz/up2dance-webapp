import { BaseController } from "./abstract_class/BaseController";
import { UserController } from "./child_classes/UserController";
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

const userController: BaseController<IUser> = new UserController('user', UserSchema);
const customerController: BaseController<ICustomer> = new CustomerController('customer', CustomerSchema);
const mediaController: BaseController<IMedia> = new MediaController('media', MediaSchema);
const eventController: BaseController<IEvent> = new EventController('event', EventSchema);
const newsController: BaseController<INews> = new NewsController('news', NewsSchema);

export const CONTROLLERS = [
    userController,
    customerController,
    mediaController,
    eventController,
    newsController,
];