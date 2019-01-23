import { IController } from "./interfaces/IController";
import { IHttpServer } from "../server/IHttpServer";
import { Request, Response, Next } from "restify";
import { Repository } from "../repository/Repository";
import { IEvent } from "../models/interfaces/IEvent";
import { Helpers } from "../lib/helpers";
import * as  mongoose from 'mongoose';
require('dotenv').config();

import * as EventSchema from '../models/Event';
import { checkAuth } from "../lib/auth-service";

export class EventController implements IController {

    repository = new Repository<IEvent>(EventSchema);
    helpers = new Helpers();

    /**
     * 
     * @param httpServer 
     */
    initialize(httpServer: IHttpServer): void {

        /**
         * Get all Events in database
         */
        httpServer.get('/api/event/all', this.list.bind(this));


        /**
         * Create a new Event
         */
        httpServer.post('/api/event/create', checkAuth, this.create.bind(this));

        /**
         * Get a Event by id from database
         */
        httpServer.get('/api/event/:id', this.getById.bind(this));

        /**
         * Update a registered Event
         */
        httpServer.put('/api/event/:id', checkAuth, this.update.bind(this));

        /**
         * Delete a registered Event
         */
        httpServer.del('/api/event/:id', checkAuth, this.remove.bind(this));
    };

    /**
     * GET all editors
     * @param req 
     * @param res 
     */

    private async list(req: Request, res: Response, next?: Next): Promise<void> {
        try {
            const allEvents = await this.repository.list();
            if (allEvents && (allEvents instanceof Array)) {
                if (allEvents.length > 0) {
                    res.send(201, { "Info": allEvents });
                } else {
                    res.send(200, { "Info": "No items in database so far." });
                }
            } else {
                res.send(404, { "Error": "Error in find all events" });
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
            const result = await this.repository.getById(req.params.id);
            if (result && result._id) {
                res.send(201, result)
            } else {
                res.send(500, { "Message": Object(result).name });
            }
        } catch (error) {
            res.send(500, { 'Error': 'Upps, error in event create function' });
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
            const result = await this.repository.create(req.body);
            if (result && result._id) {
                res.send(201, result)
            } else {
                res.send(500, { "Message": Object(result).name });
            }
        } catch (error) {
            res.send(500, { 'Error': 'Upps, error in event create function' });
        }
    };

    /**
     * 
     * @param req 
     * @param res 
     */
    private async update(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.repository.update(req.params.id, req.body);
            if (result && result._id) {
                res.send(201, result)
            } else {
                res.send(500, { "Message": Object(result).name });
            }
        } catch (error) {
            res.send(500, { 'Error': 'Upps, error in event create function' });
        }
    };

    /**
     * 
     * @param req 
     * @param res 
     */
    private async remove(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.repository.delete(req.params.id);
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

