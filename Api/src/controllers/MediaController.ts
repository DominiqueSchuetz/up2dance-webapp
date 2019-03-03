import { CrudController } from "./CrudController";
import { Request, Response, Next } from "restify";
import { IMedia } from "../models/interfaces/IMedia";
import { Helpers } from "../lib/helpers";

export class MediaController extends CrudController<IMedia> {

    private _helpers = new Helpers();

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public async create(req: Request, res: Response, next: Next): Promise<void> {
        try {
            if (!req.files) {
                res.send(201, { "Info": "This is not a file, right?" });
                next();
            } else {
                const fileUploaded = await this._helpers.uploadFileToFolder(req);
                if (fileUploaded) {
                    try {
                        typeof fileUploaded === 'boolean' ? req.body : req.body.filePath = fileUploaded;
                        const result: IMedia = await this._repository.create(req.body);
                        if (result && result._id) {
                            res.send(201, result);
                        } else {
                            res.send(500, { "Message": Object(result).name });
                        }
                    } catch (error) {
                        res.send(500, { 'Error': error });
                    }
                }
            };
        } catch (error) {
            res.send(401, { "message": "Error in Upload File" });
        }
    };

    // /**
    //  * GET editors by id
    //  * @param req 
    //  * @param res 
    //  */
    // public async getById(req: Request, res: Response): Promise<void> {
    //     try {


    //         const result = await this._repository.getById(req.params.id);
    //         if (result && result._id) {
    //             res.send(201, result)
    //         } else {
    //             res.send(500, { "Message": Object(result).name });
    //         }
    //     } catch (error) {
    //         res.send(500, { 'Error': 'Upps, error in Item create function' });
    //     }
    // };
};