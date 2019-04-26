import { CrudController } from "../abstract_class/AbstractCrudController";
import { ICustomer } from "../../models/interfaces/ICustomer";
import { Request, Response, Next } from "restify";
import { Helpers } from "../../lib/helpers";
import { MailService } from "../../lib/mailService";

export class CustomerController extends CrudController<ICustomer> {
    private _helpers = new Helpers();

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    protected async create(req: Request, res: Response, next?: Next): Promise<void> {

        let foundCustomerObject: ICustomer;

        try {
            foundCustomerObject = await this._repository.getByEmail(req.body.mail, req.body.lastName);

        } catch (error) {
            res.send(500, { "Message": "There is an Error in function getByEmail() " });
        }

        if (!foundCustomerObject) {

            let newCustomerObject = <ICustomer>{
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                companyName: req.body.companyName,
                mobil: req.body.mobil,
                mail: req.body.mail,
            }

            try {
                const result: ICustomer = await this._repository.create(newCustomerObject);
                if (result && result._id) {
                    foundCustomerObject = result;
                } else {
                    res.send(500, { "Message": Object(foundCustomerObject).name });
                }
            } catch (error) {
                res.send(500, { "Message": "There is an Error in function createCustomer() " });
            }
        }

        if (req.body.event && req.body.event.eventName && req.body.event.eventDate) {
            req.body.event.customerId = foundCustomerObject._id;
            try {
                await this._helpers.sendPostRequestToNewRoute('/api/event/create', req.body.event, req.headers.authorization);
            } catch (error) {
                res.send(500, { "Message": "There is an Error in function sendPostRequestToNewRoute() " });
            }
        }

        // Send Mail
        try {
            const sentMail = await new MailService<ICustomer>().sendMailToClient(req.body);
            if (sentMail) {
                res.send(200, { 'Info': 'Mail was sent to Mailclient' });
            }
        } catch (error) {
            res.send(500, { "Message": "There is an Error in function sendMailToClient() " });
        }
    };
};
