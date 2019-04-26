import { CrudController } from "../abstract_class/AbstractCrudController";
import { INews } from "../../models/interfaces/INews";

export class NewsController extends CrudController<INews> {};
