import { CrudController } from "./CrudController";
import { AuthController } from "./AuthController";

import * as EventSchema from '../models/Event';
import { IEvent } from "../models/interfaces/IEvent";

import * as NewsSchema from '../models/News';
import { INews } from "../models/interfaces/INews";

import * as MediaSchema from '../models/Media';
import { IMedia } from "../models/interfaces/IMedia";

import * as CustomerSchema from '../models/Customer';
import { ICustomer } from "../models/interfaces/ICustomer";
import { MediaController } from "./MediaController";
import { CustomerController } from "./CustomerController";

const authController = new AuthController();
const customerController: CrudController<ICustomer> = new CustomerController('customer', CustomerSchema);
const mediaController: CrudController<IMedia> = new MediaController('media', MediaSchema);


// const eventController = new CrudController<IEvent>('event', EventSchema);
// const newsController = new CrudController<INews>('news', NewsSchema);
// const mediaController = new CrudController<IMedia>('media', MediaSchema);
// const customerController = new CrudController<ICustomer>('customer', CustomerSchema);


export const CONTROLLERS = [
    authController,
    customerController,
    mediaController
    // eventController,
    // newsController,
    // mediaController,
];