import { CrudController } from "./CrudController";
import { ICustomer } from "../models/interfaces/ICustomer";
import { Request, Response, Next } from "restify";
import { Helpers } from "../lib/helpers";
import { MailService } from "../lib/mailService";

export class CustomerController extends CrudController<ICustomer> {
    private _helpers = new Helpers();

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    protected async create(req: Request, res: Response, next?: Next): Promise<void> {
        try {

            const findCustomerInDatabase: ICustomer = await this._repository.getByEmail(req.body.mail, req.body.lastName);
            if (findCustomerInDatabase._id) {
                if (req.body.event) {
                    req.body.event.customerId = findCustomerInDatabase._id;
                    const resultReq = await this._helpers.sendPostRequestToNewRoute('/api/event/create', req.body.event, req.headers.authorization);
                    res.send(200, { 'Info': 'Customer already exsits, but new Event was created' });
                } else {
                    // No Event
                }
            } else {
                // Save Customer to disk
                let newCustomerObject = <ICustomer>{
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    companyName: req.body.companyName,
                    mobil: req.body.mobil,
                    mail: req.body.mail,
                };

                const result: ICustomer = await this._repository.create(newCustomerObject);
                if (result && result._id) {
                    res.send(201, result);
                } else {
                    res.send(500, { "Message": Object(result).name });
                }
            }
            
            // Send Mail
            await new MailService<ICustomer>().sendMailToClient(req.body);
        } catch (error) {
            res.send(500, { 'Error': error });
        }
    };
};