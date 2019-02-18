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
                // Save the File to folder
                const fileUploaded = await this._helpers.uploadFileToFolder(req);
                if (fileUploaded) {
                    // Save the path to database
                    console.log("Save file to db");  
                } 
                res.send(201, { "file": "created" })
            };
        } catch (error) {
            res.send(401, { "message": "Error in Upload File" });
        }
        return
    };
};