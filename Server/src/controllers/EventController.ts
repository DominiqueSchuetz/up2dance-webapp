import { IController } from "./interfaces/IController";
import { IHttpServer } from "../server/IHttpServer";
import { Request, Response, Next } from "restify";
import { Repository } from "../repository/Repository";
import { IEvent } from "../models/interfaces/IEvent";
import { Helpers } from "../lib/helpers";
require('dotenv').config()

import * as EventSchema from '../models/Event';

export class EventController implements IController {

    repository = new Repository<IEvent>(EventSchema);
    helpers = new Helpers();

    /**
     * 
     * @param httpServer 
     */
    initialize(httpServer: IHttpServer): void {

        httpServer.get('/events', this.list.bind(this));
        httpServer.post('/event', this.createNewEvent.bind(this));
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    private async list(req: Request, res: Response): Promise<void> {
        try {
            res.send(await this.repository.list((err, result) => {
                if (!err) {
                    res.send(200, result);
                } else {
                    res.send(200, { 'Info': 'No Events in database so far.' });
                }
            }));
        } catch (error) {
            res.send('Upps, something went wrong ', error.message);
        }
    }

    private async createNewEvent(req: Request, res: Response): Promise<void> {
        const name = typeof req.body.name == 'string' && req.body.name.trim().length > 0 ? req.body.name.trim() : false;
        if (name) {
            try {
                await this.repository.create(req.body, async (err, result) => {
                    if (!err) {
                        res.send(200, result);
                    } else {
                        res.send({ 'Info': 'Upps', err })
                    }
                });
            } catch (error) {
                res.send(400, error.message);
            }
        } else {
            console.log('Out', name);
            
            res.send('No valid name for evnet');
        }
    };
}