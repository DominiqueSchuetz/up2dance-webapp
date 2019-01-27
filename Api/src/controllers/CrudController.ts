import { IController } from "./interfaces/IController";
import { IHttpServer } from "../server/IHttpServer";
import { Request, Response, Next } from "restify";
import { Repository } from "../repository/Repository";
import { Helpers } from "../lib/helpers";
import { MailService } from "../lib/mailService";
require('dotenv').config();

import { Document, Model } from "mongoose";
import { checkAuth } from "../lib/auth-service";
1
export class CrudController<T extends Document> implements IController {

    private _model: Model<any>;
    private _routes: string;
    private _repository: Repository<T>;
    private _helpers = new Helpers();

    /**
     * 
     * @param schemaModel 
     */
    constructor(routes: string, schemaModel: Model<Document>) {
        this._model = schemaModel;
        this._routes = routes;
        this._repository = new Repository<T>(this._model);
    };

    /**
     * 
     * @param httpServer 
     */
    initialize(httpServer: IHttpServer): void {

        /**
         * Get all Items in database
         */
        httpServer.get('/api/' + this._routes + '/all', this.list.bind(this));

        /**
         * Create a new Item
         */
        httpServer.post('/api/' + this._routes + '/create', checkAuth, this.create.bind(this));

        /**
         * Get a Item by id from database
         */
        httpServer.get('/api/' + this._routes + '/:id', this.getById.bind(this));

        /**
         * Update a registered Item
         */
        httpServer.put('/api/' + this._routes + '/:id', checkAuth, this.update.bind(this));

        /**
         * Delete a registered Item
         */
        httpServer.del('/api/' + this._routes + '/:id', checkAuth, this.remove.bind(this));
    };

    /**
     * GET all editors
     * @param req 
     * @param res 
     */

    private async list(req: Request, res: Response, next?: Next): Promise<void> {
        try {
            const allItems = await this._repository.list();
            if (allItems && (allItems instanceof Array)) {
                if (allItems.length > 0) {
                    res.send(201, { "Info": allItems });
                } else {
                    res.send(200, { "Info": "No items in database so far." });
                }
            } else {
                res.send(404, { "Error": "Error in find all Items" });
            }
        } catch (error) {
            res.send(404, { "Error": "Error in list()" });
        };
    };

    /**
     * GET editors by id
     * @param req 
     * @param res 
     */
    private async getById(req: Request, res: Response): Promise<void> {
        try {
            const result = await this._repository.getById(req.params.id);
            if (result && result._id) {
                res.send(201, result)
            } else {
                res.send(500, { "Message": Object(result).name });
            }
        } catch (error) {
            res.send(500, { 'Error': 'Upps, error in Item create function' });
        }
    };

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    private async create(req: Request, res: Response, next?: Next): Promise<void> {
        try {
            const result: T = await this._repository.create(req.body);
            if (result && result._id && !Object(result).event) {
                res.send(201, result)
            } else if (result && result._id && Object(result).event) {
                try {
                    const resultReq = await this._helpers
                        .sendPostRequestToNewRoute('/api/event/create', Object(result).event, req.headers.authorization);
                    if (resultReq) {
                        await new MailService<T>().sendMailToClient(result);
                    }
                } catch (error) {
                    res.send(500, { 'Error': error });
                }
                res.send(201, result);
            } else {
                console.log('in errr');
                res.send(500, { "Message": Object(result).name });
            }
        } catch (error) {
            res.send(500, { 'Error': error });
        }
    };

    /**
     * 
     * @param req 
     * @param res 
     */
    private async update(req: Request, res: Response): Promise<void> {
        try {
            const result = await this._repository.update(req.params.id, req.body);
            if (result && result._id) {
                res.send(201, result)
            } else {
                res.send(500, { "Message": Object(result).name });
            }
        } catch (error) {
            res.send(500, { 'Error': 'Upps, error in Item create function' });
        }
    };

    /**
     * 
     * @param req 
     * @param res 
     */
    private async remove(req: Request, res: Response): Promise<void> {
        try {
            const result = await this._repository.delete(req.params.id);
            if (result && Object(result).n == 1 && Object(result).ok == 1) {
                res.send(201, { "Info": "Delete item successfully" });
            } else {
                res.send(500, { "Info": "Could not found any item by given id" });
            }
        } catch (error) {
            res.send(500, { "Error": "Error in delete()" });
        }
    };
};

