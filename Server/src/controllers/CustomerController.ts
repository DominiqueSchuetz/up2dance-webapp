import { IController } from "./interfaces/IController";
import { IHttpServer } from "../server/IHttpServer";
import { Request, Response, Next } from "restify";
import { Repository } from "../repository/Repository";
import { ICustomer } from "../models/interfaces/ICustomer";
import { Helpers } from "../lib/helpers";
require('dotenv').config()

import * as CustomerSchema from '../models/Customer';

export class CustomerController implements IController {

    repository = new Repository<ICustomer>(CustomerSchema);
    helpers = new Helpers();

    /**
     * 
     * @param httpServer 
     */
    initialize(httpServer: IHttpServer): void {

        httpServer.get('/customers', this.list.bind(this));

        httpServer.get('/customer/:id', this.getById.bind(this));

        httpServer.post('/customer/signIn', this.signIn.bind(this));

        httpServer.post('/customer/signOut', this.signIn.bind(this));

        httpServer.post('/customer/register', this.register.bind(this));

        httpServer.post('/customer/testForJWT', this.onlySignInUsersAreAllowedToDoThis.bind(this));

        httpServer.put('/customer/:id', this.update.bind(this));

        httpServer.del('/customer/:id', this.remove.bind(this));
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    private list(req: Request, res: Response): void {
        this.repository.list((err, result) => {
            if (!err && result) {
                result instanceof Array && result.length > 0 ? res.send(200, result) : res.send(200, { 'Info': 'No Customers in database so far.' });
            } else {
                res.send(404, err)
            }
        });
    };

    /**
     * 
     * @param req 
     * @param res 
     */
    private async getById(req: Request, res: Response): Promise<void> {
        const id = typeof req.params.id == 'string' && req.params.id != null ? req.params.id : false;
        // Take the Object and compare the Password
        if (id) {
            try {
                res.send(await this.repository.getById(req.params.id, (err, result) => {
                    if (!err) {
                        res.send(201, result);
                        // Compare the given Password from jwt
                    } else {
                        res.send(200, { 'Info': 'Could not FIND Customers by given id.' });
                    }
                }));
            } catch (error) {
                //console.log(error);
            }
        } else {
            res.send(200, 'No valid id in query.');
        }
    };

    /**
     * 
     * @param req 
     * @param res 
     */
    private async signIn(req: Request, res: Response): Promise<void> {

        const email = typeof req.body.email == 'string' && req.body.email.trim().length > 4 ? req.body.email.trim() : false;
        const password = typeof req.body.password == 'string' && req.body.password.trim().length > 5 ? req.body.password.trim() : false;

        if (email && password) {
            try {
                await this.repository.getByEmail(email, async (err, result) => {
                    if (!err && result) {
                        const userIsAuthenticated = await this.helpers.verfiyUserObject(password, result.password, email)
                        if (userIsAuthenticated) {
                            const jwtToken = await this.helpers.createJwtToken(result);
                            console.log(jwtToken);
                            res.send('Hey, ' + result.firstName)
                        } else {
                            res.send({ 'Info': 'User is not authenticated ==> ' });
                        }
                    } else {
                        res.send({ 'Info': 'User with  given Email was not found ==> ' + err });
                    }
                });

            } catch (error) {
                res.send('Could not find a valid registered user ==> ', error.message);
            }
        } else {
            res.send(200, 'No valid Customers.');
        }
    };

    /**
     * 
     * @param req 
     * @param res 
     */
    private async onlySignInUsersAreAllowedToDoThis(req: Request, res: Response): Promise<void> {

        const jwtToken = typeof req.headers.authorization !== null ? req.headers.authorization.trim() : false;
        if (jwtToken) {
            try {
                const verifyUser = await this.helpers.verfiyJwtToken(jwtToken);
                if (verifyUser) {
                    console.log('You are allowed to do this')

                    // let test = JSON.stringify(verifyUser).split('firstName":"')[1]
                    // let test2 = test.split('","lastName')[0]
                    // console.log(test2);
                    res.send({ 'Bearer ': jwtToken })
                }
            } catch (error) {
                console.log('Not allowed to do this')
                console.log('Something went wrong after verifying a user ==> ', error.message);
                res.send({ 'Info': error.message })
            }
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    private async register(req: Request, res: Response, next?: Next): Promise<void> {

        const firstName = typeof req.body.firstName == 'string' && req.body.firstName.trim().length > 1 ? req.body.firstName.trim() : false;
        const lastName = typeof req.body.lastName == 'string' && req.body.lastName.trim().length > 1 ? req.body.lastName.trim() : false;
        const email = typeof req.body.email == 'string' && req.body.email.trim().length > 4 ? req.body.email.trim() : false;
        const password = typeof req.body.password == 'string' && req.body.password.trim().length > 5 ? req.body.password.trim() : false;
        const secretKey = typeof req.body.secretKey == 'string' && req.body.secretKey.trim().length === 18 && req.body.secretKey.trim() === process.env.SECRET_KEY ? true : false;


        if (firstName && lastName && email && password && secretKey) {
            try {
                const passwordEnc = await this.helpers.decrypt(password);
                req.body.password = passwordEnc;

                await this.repository.create(req.body, async (err, result) => {
                    if (!err) {
                        res.send(201, result);
                    } else {
                        res.send({ 'Info': 'User already exists ==> ' + err });
                    }
                });
            } catch (error) {

            }
        } else {
            res.send(200, 'No valid Customers.');
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    private async update(req: Request, res: Response): Promise<void> {
        const id = typeof req.params.id == 'string' && req.params.id != null ? req.params.id : false;
        const body = typeof req.body == 'object' && req.body != null ? req.body : false;

        if (id && body) {
            try {
                res.send(await this.repository.update(req.params.id, req.body, (err, result) => {
                    if (!err) {
                        res.send(201, result)
                    } else {
                        res.send(200, { 'Info': 'Could not UPDATE the Customers by given id or payload.' });
                    }
                }));
            } catch (error) {

            }
        } else {
            res.send(200, 'No valid id or payload');
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    private async remove(req: Request, res: Response): Promise<void> {
        const id = typeof req.params.id == 'string' && req.params.id != null ? req.params.id : false;
        if (id) {
            try {
                res.send(await this.repository.delete(req.params.id, (err, result) => {
                    if (!err) {
                        res.send(201, result);
                    } else {
                        res.send(200, { 'Info': 'Could not DELETE the Customers by given id.' });
                    }
                }));
            } catch (error) {
            }
        } else {
            res.send(200, 'No valid id.');
        }
    }
}