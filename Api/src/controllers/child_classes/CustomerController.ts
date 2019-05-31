import { BaseController } from "../abstract_class/BaseController";
import { ICustomer } from "../../models/interfaces/ICustomer";
import { Request, Response, Next } from "restify";
import { MailService } from "../../lib/mailService";
import * as EventSchema from "../../models/Event";

export class CustomerController extends BaseController<ICustomer> {

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public async create(req: Request, res: Response, next?: Next): Promise<void> {

        let foundCustomerObject: ICustomer;
        const { firstName, lastName, companyName, mobil, mail, event } = req.body

        try {
            foundCustomerObject = await this._repository.getByEmail(mail, lastName);
            console.log(foundCustomerObject);
            
            if (Object.keys(req.body.event).length != 0 && req.body.event.constructor === Object) {

                if (foundCustomerObject) {
                    // Save an old customer object and a new eventObecjt
                    this._repository.createWithCallback(event, EventSchema, async (error, eventResultObject) => {
                        foundCustomerObject.refId = eventResultObject._id;
                        console.log(foundCustomerObject);
                        
                        try {
                            const finalObject = await this._repository.update(foundCustomerObject._id, foundCustomerObject);
                            res.send(200, finalObject);
                        } catch (error) {
                            res.send(500, error)
                        }
                    });
                } else {
                    // Save a new Customer and a new Event object
                    let newCustomerObject = <ICustomer>{
                        firstName,
                        lastName,
                        companyName,
                        mobil,
                        mail,
                    }
                    console.log(event);
                    this._repository.createWithCallback(event, EventSchema, async (error, eventResultObject) => {

                        newCustomerObject.refId = eventResultObject._id;
                        try {
                            const finalObject = await this._repository.create(newCustomerObject);
                            res.send(200, finalObject);
                        } catch (error) {
                            res.send(500, error)
                        }
                    });
                }
            }
        } catch (error) {
            res.send(500, { "Message": "There is an Error in function getByEmail() " });
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
