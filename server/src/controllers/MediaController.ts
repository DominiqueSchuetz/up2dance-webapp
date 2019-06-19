import { readFile, unlinkSync } from "fs";
import { BaseController } from "./BaseController";
import { Request, Response, Next } from "restify";
import { IMedia } from "../models/interfaces/IMedia";
import { badRequestResponse, internalServerErrorResponse, successResponse } from "../responses/Responses";

export class MediaController extends BaseController<IMedia> {

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public async create(req: Request, res: Response, next?: Next): Promise<void> {

        try {
            if (!req.files) {
                badRequestResponse(res, 'This is not a file, right?');
            } else {
                const fileUploaded = await this._helpers.uploadFileToFolder(req);
                if (Object.keys(fileUploaded).length != 0 && typeof fileUploaded.constructor === 'object') {
                    req.body.filePath = Object(fileUploaded).filePath;
                    req.body.fileName = Object(fileUploaded).fileName;
                    try {
                        const result: IMedia = await this._repository.create(req.body);
                        if (result && result._id) {
                            successResponse(res, result);
                        } else {
                            badRequestResponse(res, 'Cannot create item');
                        }
                    } catch (error) {
                        internalServerErrorResponse(res, error);
                    };
                }
            };
        } catch (error) {
            internalServerErrorResponse(res, error);
        };
    };


    /**
     * GET editors by id
     * @param req 
     * @param res 
     */
    protected async getById(req: Request, res: Response, next?: Next): Promise<void> {
        try {
            const result = await this._repository.getById(req.params.id);
            if (result && result._id) {
                if (result.filePath) {
                    readFile(result.filePath, (err: NodeJS.ErrnoException, data: Buffer) => {
                        if (!err && data) {
                            res.writeHead(200, { 'Content-Type': 'image/png' });
                            res.end(data);
                        } else {
                            badRequestResponse(res, 'Could not show item by id');
                        };
                    });
                } else {
                    successResponse(res, result.fileUrl);
                }
            } else {
                badRequestResponse(res, 'Could not get item by id');
            }
        } catch (error) {
            res.send(500, error);
        };
    };


    /**
     * 
     * @param req 
     * @param res 
     */
    protected async update(req: Request, res: Response): Promise<void> {
        try {
            const mediaObjectInDatabase = await this._repository.getById(req.params.id);
            if (mediaObjectInDatabase!.filePath) {
                try {
                    unlinkSync(mediaObjectInDatabase.filePath);
                } catch (error) {
                    internalServerErrorResponse(res, error.message);
                }
                const fileUploaded = await this._helpers.uploadFileToFolder(req);
                if (fileUploaded) {
                    try {
                        typeof fileUploaded === 'boolean' ? req.body : req.body.filePath = fileUploaded;
                        const result: IMedia = await this._repository.update(req.params.id, req.body);
                        if (result && result._id) {
                            successResponse(res, result);
                        } else {
                            badRequestResponse(res, 'Could not update item by id');
                        }
                    } catch (error) {
                        internalServerErrorResponse(res, error.message);
                    }
                }
            } else {
                try {
                    const result = await this._repository.update(req.params.id, req.body);
                    if (result && result._id) {
                        successResponse(res, result);
                    } else {
                        badRequestResponse(res, 'Could not update item by id');
                    }
                } catch (error) {
                    internalServerErrorResponse(res, error.message);
                }
            }
        } catch (error) {
            internalServerErrorResponse(res, error.message);
        }
    };


    /**
     * 
     * @param req 
     * @param res 
     */
    protected async remove(req: Request, res: Response): Promise<void> {
        try {
            const file = await this._repository.getById(req.params.id)
            const result = await this._repository.delete(req.params.id);

            if (result && Object(result).n == 1 && Object(result).ok == 1) {

                //delete file from public folder
                const filePath = file.filePath;
                try {
                    unlinkSync(filePath);
                } catch (error) {
                    internalServerErrorResponse(res, error.message);
                };
                successResponse(res, null, 'Item successfully deleted');
            } else {
                badRequestResponse(res, 'Could not get item by id');
            }
        } catch (error) {
            internalServerErrorResponse(res, error.message);
        };
    };
};