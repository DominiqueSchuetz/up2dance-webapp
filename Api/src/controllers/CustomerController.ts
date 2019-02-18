import { CrudController } from "./CrudController";
import { ICustomer } from "../models/interfaces/ICustomer";

export class CustomerController extends CrudController<ICustomer> {};