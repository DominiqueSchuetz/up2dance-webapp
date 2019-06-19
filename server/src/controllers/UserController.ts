import { Request, Response, Next } from "restify";
import { BaseController } from "./BaseController";
import { IUser } from "../models/interfaces/IUser";
import { successResponse, badRequestResponse, internalServerErrorResponse } from "../responses/Responses";
import * as  mongoose from 'mongoose';
require('dotenv').config();

export class UserController extends BaseController<IUser> {

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
            mapToNames.length > 0 ? successResponse(res, { "Info": mapToNames }) : badRequestResponse(res, 'No Users in database');
        } catch (error) {
            internalServerErrorResponse(res, error);
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
        const files = Object.keys(req.files).length ? true : false;

        if (firstName && lastName && email && password && secretKey) {
            try {
                req.body.password = await this._helpers.encrypt(password);
                if (!files) {
                    const createUser = await this._repository.create(req.body);
                    if (createUser!._id) {
                        successResponse(res, null, 'Hey ' + createUser.firstName + ' , you are successfully registered')
                    } else {
                        badRequestResponse(res, 'Could not create item');
                    }
                } else {
                    try {
                        const result = await this.createByFileReference(req, res);
                        if (result!._id) {
                            successResponse(res, result)
                        } else {
                            badRequestResponse(res, 'Could not create item with file');
                        }
                    } catch (error) {
                        internalServerErrorResponse(res, error.message);
                    };
                }
            } catch (error) {
                internalServerErrorResponse(res, error.message);
            };
        } else {
            badRequestResponse(res, 'No valid user');
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
                    typeof jwtToken === 'string' ? successResponse(res, { Info: 'Hey ' + result.firstName + ', you are logged in successfully', JWT_Token: jwtToken }) : badRequestResponse(res, 'Could not create jwt-token');
                } else {
                    badRequestResponse(res, 'Could not authenticate with given password');
                }
            } catch (error) {
                internalServerErrorResponse(res, error);
            };
        } else {
            badRequestResponse(res, 'No valid username or password');
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
                                        typeof jwtToken === 'string' ? successResponse(res, { Info: 'Hey ' + result.firstName + ', you are updated successfully', JWT_Token: jwtToken }) : badRequestResponse(res, 'Could not create jwt-token');
                                    } catch (error) {
                                        internalServerErrorResponse(res, error.message);
                                    }
                                } else {
                                    badRequestResponse(res, 'Could not update item with given id');
                                }
                            } catch (error) {
                                internalServerErrorResponse(res, error.message);
                            }
                        }
                    } catch (error) {
                        internalServerErrorResponse(res, error.message);
                    }
                } else {
                    badRequestResponse(res, 'Could not authorized by given parameters');
                }
            } catch (error) {
                internalServerErrorResponse(res, error);
            }
        } else {
            badRequestResponse(res, 'No valid id or token');
        }
    };
};