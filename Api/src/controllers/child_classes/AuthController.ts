import { Request, Response, Next } from "restify";
import { CrudController } from "../abstract_class/AbstractCrudController";
import * as MediaSchema from '../../models/Media';
import { IUser } from "../../models/interfaces/IUser";
import { Helpers } from "../../lib/helpers";
import * as  mongoose from 'mongoose';
import { MediaController } from "./MediaController";
require('dotenv').config();

export class AuthController extends CrudController<IUser> {

    private _helpers = new Helpers();

    /**
     * 
     * @param req 
     * @param res 
     */
    protected async list(req: Request, res: Response): Promise<void> {
        try {
            await this._helpers.verfiyJwtToken(req.headers.authorization);
            const allItems = await this._repository.list();
            let mapToNames = allItems.map((user) => ({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }));
            mapToNames.length > 0 ? res.send(200, { "Info": mapToNames }) : res.send(200, { "Info": 'No Users in database' });
        } catch (error) {
            res.send(401, error.message);
        };
    };


    /**
     * 
     * @param req 
     * @param res 
     */
    protected async register(req: Request, res: Response, next: Next): Promise<void> {
        const firstName = typeof req.body.firstName == 'string' && req.body.firstName.trim().length > 1 ? req.body.firstName.trim() : false;
        const lastName = typeof req.body.lastName == 'string' && req.body.lastName.trim().length > 1 ? req.body.lastName.trim() : false;
        const email = typeof req.body.email == 'string' && req.body.email.trim().length > 4 ? req.body.email.trim() : false;
        const password = typeof req.body.password == 'string' && req.body.password.trim().length > 5 ? req.body.password.trim() : false;
        const secretKey = typeof req.body.secretKey == 'string' && req.body.secretKey.trim().length === 18 && req.body.secretKey.trim() === process.env.SECRET_KEY ? true : false;

        if (firstName && lastName && email && password && secretKey) {
            try {
                req.body.password = await this._helpers.encrypt(password);
                const createUser = await this._repository.create(req.body);

                if (createUser._id) {
                    res.send(201, { Info: "Hey " + createUser.firstName + ", you are successfully registered" });
                    // if (req.files) {
                    //     let mediaController = new MediaController('media', MediaSchema);
                    //     let test = await mediaController.create(req, res)
                    // }
                } else {
                    res.send(403, Object(createUser).errmsg);
                }
            } catch (error) {
                res.send(401, error.message);
            };
        } else {
            res.send(403, 'No valid Customers');
        }
    };


    /**
     * 
     * @param req 
     * @param res 
     */
    protected async signIn(req: Request, res: Response): Promise<void> {
        const email = typeof req.body.email == 'string' && req.body.email.trim().length > 4 ? req.body.email.trim() : false;
        const password = typeof req.body.password == 'string' && req.body.password.trim().length > 5 ? req.body.password.trim() : false;

        if (email && password) {
            try {
                const result = await this._repository.searchForItem(email);
                const auth = await this._helpers.comparingPasswords(password, result.password);
                if (auth) {
                    const jwtToken = await this._helpers.createJwtToken(result);
                    if (jwtToken) {
                        res.send('Hey ' + result.firstName + ', you are logged in successfully');
                        console.log(jwtToken);
                    } else {
                        res.send(404, { "Info": "Could not create JWT-Token" });
                    }
                } else {
                    res.send(404, { "Info": "Could not authenticate with given password" });
                }
            } catch (error) {
                res.send(500, error.message);
            };
        } else {
            res.send(200, 'No valid username or password.');
        }
    };


    /**
     * 
     * @param req 
     * @param res 
     */
    protected async update(req: Request, res: Response): Promise<void> {
        const id: mongoose.Types.ObjectId = typeof req.params.id == 'string' && req.params.id != null ? req.params.id : false;
        const jwtToken: string | boolean = typeof req.headers.authorization !== null ? req.headers.authorization.trim() : false;
        const firstName = typeof req.body.firstName == 'string' && req.body.firstName.trim().length > 1 ? req.body.firstName.trim() : false;
        const lastName = typeof req.body.lastName == 'string' && req.body.lastName.trim().length > 1 ? req.body.lastName.trim() : false;
        const email = typeof req.body.email == 'string' && req.body.email.trim().length > 4 ? req.body.email.trim() : false;
        const password = typeof req.body.password == 'string' && req.body.password.trim().length > 5 ? req.body.password.trim() : false;
        const instrument = typeof req.body.instrument == 'string' ? req.body.instrument.trim() : false;

        if (id && jwtToken) {
            try {
                const authResult = await this._helpers.authorizeItem(id, jwtToken);
                if ((typeof authResult === 'boolean' && authResult === true) && (firstName && lastName && email && password || instrument)) {
                    try {
                        const passwordEnc = await this._helpers.encrypt(password);
                        if (passwordEnc) {
                            req.body.password = passwordEnc;
                            try {
                                const result = await this._repository.update(id, req.body);
                                if (result && result._id) {
                                    try {
                                        const jwtToken = await this._helpers.createJwtToken(result);
                                        if (jwtToken) {
                                            res.send(200, { "Info": result });
                                            console.log(jwtToken);
                                        } else {
                                            res.send(404, { "Info": "Could not create JWT-Token" });
                                        }
                                    } catch (error) {
                                        res.send(404, { "Error": "Error in createJwtToken()" });
                                    }
                                } else {
                                    res.send(200, { "Info": "Could not found any item by given id" });
                                }
                            } catch (error) {
                                res.send(404, { "Error": "Error in update()" });
                            }
                        }
                    } catch (error) {
                        res.send(404, { "Error": "Error in encrypt()" });
                    }
                } else {
                    res.send(200, { "Info": "Could not authorized by given parameters", "JWT-message": Object(authResult).message });
                }
            } catch (error) {
                res.send(404, { "Error": "Error in authorizeItem()" });
            }
        } else {
            res.send(200, { "Info": "No valid id or token" });
        }
    };
}
