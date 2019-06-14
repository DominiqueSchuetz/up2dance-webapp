import { BaseController } from "./BaseController";
import { ICustomer } from "../models/interfaces/ICustomer";
import { Request, Response, Next } from "restify";
import { MailService } from "../lib/mailService";
import * as EventSchema from "../models/Event";
import { badRequestResponse, internalServerErrorResponse, successResponse } from "../Responses/Responses";

export class CustomerController extends BaseController<ICustomer> {

    /**
     * @override
     * @param req 
     * @param res 
     * @param next 
     */
    public async create(req: Request, res: Response): Promise<void> {

        let foundCustomerObject: ICustomer;
        let result;
        const hasEvent = typeof req.body.event === 'object' ? true : false;
        const { firstName, lastName, companyName, phone, mail, comment } = req.body;

        try {
            foundCustomerObject = await this._repository.getByEmail(mail);
            if (!foundCustomerObject) {
                if (!hasEvent) {
                    let newCustomerObject = <ICustomer>{
                        firstName,
                        lastName,
                        companyName,
                        phone,
                        mail,
                        comment,
                    };
                    try {
                        result = await this._repository.create(newCustomerObject);
                        if (result) {
                            successResponse(res, result);
                        } else {
                            badRequestResponse(res, 'Could not create new customer without event object')
                        }
                    } catch (e) {
                        internalServerErrorResponse(res, e.message);
                    }
                } else {
                    let newCustomerObject = <ICustomer>{
                        firstName,
                        lastName,
                        companyName,
                        phone,
                        mail,
                        comment,
                    };
                    try {
                        await this._repository.createWithCallback(req.body.event, EventSchema, async (error, eventResultObject) => {
                            if (error) throw new Error(error);
                            newCustomerObject.refId = eventResultObject._id;
                            try {
                                result = await this._repository.create(newCustomerObject);
                                if (result) {
                                    successResponse(res, result);
                                } else {
                                    badRequestResponse(res, 'Could not create new customer with event object')
                                }
                            } catch (error) {
                                internalServerErrorResponse(res, error.message)
                            }
                        });
                    } catch (error) {
                        internalServerErrorResponse(res, error.message);
                    }
                }
            } else {
                if (!hasEvent) {
                    try {
                        result = await this._repository.update(foundCustomerObject._id, foundCustomerObject);
                        if (result) {
                            successResponse(res, result);
                        } else {
                            badRequestResponse(res, 'Could not update customer without event object')
                        }
                    } catch (error) {
                        internalServerErrorResponse(res, error);
                    }
                } else {
                    try {
                        await this._repository.createWithCallback(req.body.event, EventSchema, async (error, eventResultObject) => {
                            //if (error) throw new Error(error);
                            foundCustomerObject.refId = eventResultObject._id;
                            try {
                                result = await this._repository.update(foundCustomerObject._id, foundCustomerObject);
                                if (result) {
                                    successResponse(res, result);
                                } else {
                                    badRequestResponse(res, 'Could not update customer with event object')
                                }
                            } catch (error) {
                                internalServerErrorResponse(res, error.message);
                            }
                        });
                    } catch (error) {
                        internalServerErrorResponse(res, error.message);
                    }
                }
            };
        } catch (error) {
            internalServerErrorResponse(res, error.message);
        }

        //TODO Integrate it
        if (typeof result!.refId === 'object') {
            try {
                const wholeObject = await this._repository.getByIdAndRefId(result._id);
                if (wholeObject) {
                    successResponse(res, wholeObject);
                } else {
                    badRequestResponse(res, 'Could not get object by refId')
                }
            } catch (error) {
                internalServerErrorResponse(res, error)
            }
        } else {
            console.log('hab keine');
        }


        // Send Mail
        // try {
        //     const sentMail = await new MailService<ICustomer>().sendMailToClient(req.body);
        //     if (sentMail) {
        //         res.send(200, { 'Info': 'Mail was sent to Mailclient' });
        //     }
        // } catch (error) {
        //     res.send(500, { "Message": "There is an Error in function sendMailToClient() " });
        // }
    };
};
