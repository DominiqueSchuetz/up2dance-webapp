import { BaseController } from "./BaseController";
import { UserController } from "./UserController";
import { MediaController } from "./MediaController";
import { CustomerController } from "./CustomerController";
import { EventController } from "./EventController";
import { NewsController } from "./NewsController";

import * as UserSchema from "../models/User";
import { IUser } from "../models/interfaces/IUser";

import * as EventSchema from "../models/Event";
import { IEvent } from "../models/interfaces/IEvent";

import * as NewsSchema from "../models/News";
import { INews } from "../models/interfaces/INews";

import * as MediaSchema from "../models/Media";
import { IMedia } from "../models/interfaces/IMedia";

import * as CustomerSchema from "../models/Customer";
import { ICustomer } from "../models/interfaces/ICustomer";

const userController: BaseController<IUser> = new UserController("user", UserSchema);
const customerController: BaseController<ICustomer> = new CustomerController("customer", CustomerSchema);
const mediaController: BaseController<IMedia> = new MediaController("media", MediaSchema);
const eventController: BaseController<IEvent> = new EventController("event", EventSchema);
const newsController: BaseController<INews> = new NewsController("news", NewsSchema);

export const CONTROLLERS = [ userController, customerController, mediaController, eventController, newsController ];
