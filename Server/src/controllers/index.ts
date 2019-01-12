import { CustomerController } from "./CustomerController";
import { EventController } from './EventController'

export const CONTROLLERS = [
    new CustomerController(),
    new EventController(),
];