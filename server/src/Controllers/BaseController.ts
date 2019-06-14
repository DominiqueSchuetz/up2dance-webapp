import { Document, Model } from "mongoose";
import { Helpers } from "../lib/helpers";
import * as MediaSchema from '../models/Media';
import { Request, Response, Next } from "restify";
import { checkAuth } from "../lib/auth-service";
import { IHttpServer } from "../routes/IHttpServer";
import { IController } from "./interfaces/IController";
import { Repository } from "../repository/Repository";
import { badRequestResponse, internalServerErrorResponse, successResponse } from "../Responses/Responses";
require('dotenv').config();

export abstract class BaseController<T extends Document> implements IController {

    private _model: Model<any>;
    private _routes: string;
    protected _helpers = new Helpers();
    protected _repository: Repository<T>;

    /**
     * 
     * @param schemaModel 
     */
    constructor(routes: string, schemaModel: Model<Document>) {
        this._model = schemaModel;
        this._routes = routes;
        this._repository = new Repository<T>(this._model);
    };

    /**
     * 
     * @param httpServer 
     */
    initialize(httpServer: IHttpServer): void {

        httpServer.get('/api/' + this._routes + '/all', this.list.bind(this));
        httpServer.get('/api/' + this._routes + '/:id', this.getById.bind(this));
        httpServer.post('/api/' + this._routes + '/create', this.create.bind(this));
        httpServer.put('/api/' + this._routes + '/:id', this.update.bind(this));
        httpServer.del('/api/' + this._routes + '/:id', checkAuth, this.remove.bind(this));

        /**
         * save a media reference to model
         */
        if (this._routes !== 'media') {
            httpServer.post('/api/' + this._routes + '/createByFileReference', this.createByFileReference.bind(this));
        }

        /**
         * authenticate
         */
        if (this._routes === 'user') {
            httpServer.post('/api/' + this._routes + '/register', this.register.bind(this));
            httpServer.post('/api/' + this._routes + '/signin', this.signIn.bind(this));
            httpServer.post('/api/' + this._routes + '/signout', this.signOut.bind(this));
        }
    };

    /**
     * GET all items
     * @param req 
     * @param res
     * @param next 
     */
    protected async list(req: Request, res: Response, next?: Next): Promise<void> {
        try {
            const allItems: T[] = await this._repository.list();
            allItems.length > 0 ? successResponse(res, allItems) : badRequestResponse(res, 'No items in database so far');
        } catch (error) {
            internalServerErrorResponse(res, error.message);
        };
    };

    /**
     * GET item by id
     * @param req 
     * @param res 
     */
    protected async getById(req: Request, res: Response): Promise<void> {
        try {
            const result: T = await this._repository.getById(req.params.id);
            result && result._id ? successResponse(res, result) : badRequestResponse(res, 'Could not get item by given id');
        } catch (error) {
            internalServerErrorResponse(res, error.message);
        }
    };

    /**
     * CREATE item
     * @param req 
     * @param res 
     */
    public async create(req: Request, res: Response): Promise<void | string> {
        try {
            const result: T = await this._repository.create(req.body);
            result && result._id ? successResponse(res, result) : badRequestResponse(res, 'Could not create item');
        } catch (error) {
            internalServerErrorResponse(res, error.message);
        }
    };

    /**
     * UPDATE item by id
     * @param req 
     * @param res 
     */
    protected async update(req: Request, res: Response): Promise<void> {
        try {
            const result: T = await this._repository.update(req.params.id, req.body);
            result && result._id ? successResponse(res, result) : badRequestResponse(res, 'Could not update item by id');
        } catch (error) {
            internalServerErrorResponse(res, error.message);
        }
    };

    /**
     * DELETE item by id
     * @param req 
     * @param res 
     */
    protected async remove(req: Request, res: Response): Promise<void> {
        try {
            const result = await this._repository.delete(req.params.id);
            result && Object(result).n == 1 && Object(result).ok == 1 ? successResponse(res, null, 'Delete item successfully') :
                badRequestResponse(res, 'Could not delete item by id');
        } catch (error) {
            internalServerErrorResponse(res, error.message);
        }
    };

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    protected async createByFileReference(req: Request, res: Response): Promise<any> {
        if (typeof req.files === 'object') {
            try {
                const result = await this._helpers.uploadFileToFolder(req);
                if (Object.keys(result)!.length != 0 && result!.constructor === Object) {
                    let newFileReqObject = {
                        fileName: Object(result)!.fileName,
                        filePath: Object(result)!.filePath ? Object(result)!.filePath : null,
                        fileUrl: Object(result)!.fileUrl ? Object(result)!.fileUrl : null
                    };
                    try {
                        await this._repository.createWithCallback(newFileReqObject, MediaSchema, async (error, respondedMediaObject) => {
                            if (error) throw new Error(error);
                            req.body.refId = respondedMediaObject._id;
                            try {
                                const finalResult = await this._repository.create(req.body);
                                if (finalResult && finalResult._id) {
                                    res.send(201, finalResult);

                                } else {
                                    res.send(500, { "Message": Object(finalResult).name });
                                }
                            } catch (error) {
                                internalServerErrorResponse(res, error.message);
                            }
                        });
                    } catch (error) {
                        internalServerErrorResponse(res, error.message);
                    }
                }
            } catch (error) {
                internalServerErrorResponse(res, error)
            };
        }
        else {
            badRequestResponse(res, 'Invalid image');
        }
    };

    /**
    * 
    * @param req 
    * @param res 
    * @param next 
    */
    protected async register(req: Request, res: Response, next?: Next): Promise<void> { };

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    protected async signIn(req: Request, res: Response, next?: Next): Promise<void> { };

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    protected async signOut(req: Request, res: Response, next?: Next): Promise<void> { };
};































// /**
    //  * GET files by filename
    //  * @param req 
    //  * @param res 
    //  */
    // protected async getByFilePath(req: Request, res: Response, next?: Next): Promise<void> {
    //     try {
    //         console.log(req.params);

    //         readFile('./uploads/' + req.params.filepath, (err: NodeJS.ErrnoException, data: Buffer) => {
    //             if (!err && data) {
    //                 res.writeHead(201, { 'Content-Type': 'image/png' });
    //                 res.end(data);
    //             } else {
    //                 res.send(501, err);
    //             };
    //         });
    //     } catch (error) {
    //         res.send(404, error);
    //     }
    // };