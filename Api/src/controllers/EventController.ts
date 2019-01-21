import { IController } from "./interfaces/IController";
import { IHttpServer } from "../server/IHttpServer";
import { Request, Response, Next } from "restify";
import { Repository } from "../repository/Repository";
import { IEvent } from "../models/interfaces/IEvent";
import { Helpers } from "../lib/helpers";
import * as  mongoose from 'mongoose';
require('dotenv').config();

import * as EventSchema from '../models/Event';

export class EventController implements IController {

    repository = new Repository<IEvent>(EventSchema);
    helpers = new Helpers();

    /**
     * 
     * @param httpServer 
     */
    initialize(httpServer: IHttpServer): void {

        /**
         * Get all Editors in database
         */
        httpServer.get('/api/event/all', this.list.bind(this));

        /**
         * Get a Editor by id from database
         */
        //httpServer.get('/api/auth/:id', this.getById.bind(this));

        /**
         * Register a new Editor
         */
        httpServer.post('/api/event/create', this.create.bind(this));

        /**
         * Sign in a registered Editor
         */
        //httpServer.post('/api/auth/signIn', this.signIn.bind(this));

        /**
         * Sign out a registered Editor
         */
        //httpServer.post('/api/auth/signOut', this.signIn.bind(this));

        /**
         * Update a registered Editor
         */
        //httpServer.put('/api/auth/:id', this.update.bind(this));

        /**
         * Delete a registered Editor
         */
        //httpServer.del('/api/auth/:id', this.remove.bind(this));
    };

    /**
     * GET all editors
     * @param req 
     * @param res 
     */

    private async list(req: Request, res: Response, next?: Next): Promise<void> {
        try {
            const allEditors = await this.repository.list();
            if (allEditors && (allEditors instanceof Array)) {
                if (allEditors.length > 0) {
                    res.send(200, { "Info": allEditors });
                } else {
                    res.send(200, { "Info": "No items in database so far." });
                }
            } else {
                res.send(404, { "Error": "Error in find all editors" });
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
    // private async getById(req: Request, res: Response): Promise<void> {
    //     const id: mongoose.Types.ObjectId = typeof req.params.id == 'string' && req.params.id != null ? req.params.id : false;
    //     const jwtToken: string | boolean = typeof req.headers.authorization !== null ? req.headers.authorization.trim() : false;

    //     if (id && jwtToken) {
    //         try {
    //             const authResult = await this.helpers.authorizeItem(id, jwtToken);
    //             if (typeof authResult === 'boolean' && authResult === true) {
    //                 try {
    //                     const result = await this.repository.getById(id);
    //                     if (result && result._id) {
    //                         res.send(200, { "Info": result });
    //                     } else {
    //                         res.send(200, { "Info": "Could not found any item by given id" });
    //                     }
    //                 } catch (error) {
    //                     res.send(404, { "Error": "Error in getById()" });
    //                 }
    //             } else {
    //                 res.send(200, { "Info": "Could not authorized by given parameters", "JWT-message": Object(authResult).message });
    //             }
    //         } catch (error) {
    //             res.send(404, { "Error": "Error in authorizeItem()" });
    //         }
    //     } else {
    //         res.send(200, { "Info": "No valid id or token" });
    //     }
    // };

    /**
     * 
     * @param req 
     * @param res 
     */
    // private async signIn(req: Request, res: Response): Promise<void> {
    //     const email = typeof req.body.email == 'string' && req.body.email.trim().length > 4 ? req.body.email.trim() : false;
    //     const password = typeof req.body.password == 'string' && req.body.password.trim().length > 5 ? req.body.password.trim() : false;

    //     if (email && password) {
    //         try {
    //             const result = await this.repository.searchForItem(email);
    //             if (result && result._id) {
    //                 try {
    //                     const auth = await this.helpers.comparingPasswords(password, result.password);
    //                     if (auth) {
    //                         try {
    //                             const jwtToken = await this.helpers.createJwtToken(result);
    //                             if (jwtToken) {
    //                                 res.send('Hey ' + result.firstName + ' you are now logged in');
    //                                 console.log(jwtToken);
    //                             } else {
    //                                 res.send(404, { "Info": "Could not create JWT-Token" });
    //                             }
    //                         } catch (error) {
    //                             res.send(404, { "Error": "Error in createJwtToken()" });
    //                         }
    //                     } else {
    //                         res.send(404, { "Info": "Could not authenticate with given password" });
    //                     }
    //                 } catch (error) {
    //                     res.send(404, { "Error": "Error in comparingPasswords()" });
    //                 }
    //             } else {
    //                 res.send(404, { "Info": "Your email address might be wrong" });
    //             }
    //         } catch (error) {
    //             res.send(404, { "Error": "Error in searchForItem()" });
    //         }
    //     } else {
    //         res.send(200, 'No valid username or password.');
    //     }
    // };

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    private async create(req: Request, res: Response, next?: Next): Promise<void> {
        const eventName = typeof req.body.eventName == 'string' && req.body.eventName.trim().length > 1 ? req.body.eventName.trim() : false;
        const eventDate = typeof req.body.eventDate == 'string' && req.body.eventDate? req.body.eventDate : false;

        
        
        
        // const lastName = typeof req.body.lastName == 'string' && req.body.lastName.trim().length > 1 ? req.body.lastName.trim() : false;
        // const email = typeof req.body.email == 'string' && req.body.email.trim().length > 4 ? req.body.email.trim() : false;
        // const password = typeof req.body.password == 'string' && req.body.password.trim().length > 5 ? req.body.password.trim() : false;
        // const secretKey = typeof req.body.secretKey == 'string' && req.body.secretKey.trim().length === 18 && req.body.secretKey.trim() === process.env.SECRET_KEY ? true : false;

        if (eventName && eventDate) {
            try {
                const result = await this.repository.create(req.body);
                console.log(req.body);
                
                res.send(200, result)
            } catch (error) {
                res.send(error.message)
            }
            // try {
            //     const passwordEnc = await this.helpers.encrypt(password);
            //     if (passwordEnc) {
            //         req.body.password = passwordEnc;
            //         try {
            //             const result = await this.repository.create(req.body);
            //             if (result && result._id) {
            //                 res.send(200, result);
            //             } else {
            //                 res.send(200, { "Message": Object(result).name });
            //             }
            //         } catch (error) {
            //             res.send(404, { "Error": "Error in create()" });
            //         }
            //     }
            // } catch (error) {
            //     res.send(404, { "Error": "Error in encrypt()" });
            // }
        } else {
            res.send(200, 'No valid Customers.');
        }
    };

    /**
     * 
     * @param req 
     * @param res 
     */
    // private async update(req: Request, res: Response): Promise<void> {
    //     const id: mongoose.Types.ObjectId = typeof req.params.id == 'string' && req.params.id != null ? req.params.id : false;
    //     const jwtToken: string | boolean = typeof req.headers.authorization !== null ? req.headers.authorization.trim() : false;
    //     const firstName = typeof req.body.firstName == 'string' && req.body.firstName.trim().length > 1 ? req.body.firstName.trim() : false;
    //     const lastName = typeof req.body.lastName == 'string' && req.body.lastName.trim().length > 1 ? req.body.lastName.trim() : false;
    //     const email = typeof req.body.email == 'string' && req.body.email.trim().length > 4 ? req.body.email.trim() : false;
    //     const password = typeof req.body.password == 'string' && req.body.password.trim().length > 5 ? req.body.password.trim() : false;
    //     const instrument = typeof req.body.instrument == 'string' ? req.body.instrument.trim() : false;

    //     if (id && jwtToken) {
    //         try {
    //             const authResult = await this.helpers.authorizeItem(id, jwtToken);
    //             if ((typeof authResult === 'boolean' && authResult === true) && (firstName && lastName && email && password || instrument)) {
    //                 try {
    //                     const passwordEnc = await this.helpers.encrypt(password);
    //                     if (passwordEnc) {
    //                         req.body.password = passwordEnc;
    //                         try {
    //                             const result = await this.repository.update(id, req.body);
    //                             if (result && result._id) {
    //                                 try {
    //                                     const jwtToken = await this.helpers.createJwtToken(result);
    //                                     if (jwtToken) {
    //                                         res.send(200, { "Info": result });
    //                                         console.log(jwtToken);
    //                                     } else {
    //                                         res.send(404, { "Info": "Could not create JWT-Token" });
    //                                     }
    //                                 } catch (error) {
    //                                     res.send(404, { "Error": "Error in createJwtToken()" });
    //                                 }
    //                             } else {
    //                                 res.send(200, { "Info": "Could not found any item by given id" });
    //                             }
    //                         } catch (error) {
    //                             res.send(404, { "Error": "Error in update()" });
    //                         }
    //                     }
    //                 } catch (error) {
    //                     res.send(404, { "Error": "Error in encrypt()" });
    //                 }
    //             } else {
    //                 res.send(200, { "Info": "Could not authorized by given parameters", "JWT-message": Object(authResult).message });
    //             }
    //         } catch (error) {
    //             res.send(404, { "Error": "Error in authorizeItem()" });
    //         }
    //     } else {
    //         res.send(200, { "Info": "No valid id or token" });
    //     }
    // };

    /**
     * 
     * @param req 
     * @param res 
     */
    // private async remove(req: Request, res: Response): Promise<void> {
    //     const id: mongoose.Types.ObjectId = typeof req.params.id == 'string' && req.params.id != null ? req.params.id : false;
    //     const jwtToken: string | boolean = typeof req.headers.authorization !== null ? req.headers.authorization.trim() : false;

    //     if (id && jwtToken) {
    //         try {
    //             const authResult = await this.helpers.authorizeItem(id, jwtToken);
    //             if (typeof authResult === 'boolean' && authResult === true) {
    //                 try {
    //                     const result = await this.repository.delete(id);
    //                     if (result && Object(result).n == 1 && Object(result).ok == 1) {
    //                         res.send(200, { "Info": "Delete item successfully" });
    //                     } else {
    //                         res.send(200, { "Info": "Could not found any item by given id" });
    //                     }
    //                 } catch (error) {
    //                     res.send(404, { "Error": "Error in delete()" });
    //                 }
    //             } else {
    //                 res.send(200, { "Info": "Could not authorized by given parameters", "JWT-message": Object(authResult).message });
    //             }
    //         } catch (error) {
    //             res.send(404, { "Error": "Error in authorizeItem()" });
    //         }
    //     } else {
    //         res.send(200, { "Info": "No valid id or token" });
    //     }
    // };
}