import { IController } from "../interfaces/IController";
import { IHttpServer } from "../../server/IHttpServer";
import { Request, Response, Next } from "restify";
import { Repository } from "../../repository/Repository";
import { Document, Model } from "mongoose";
import { checkAuth } from "../../lib/auth-service";
import { readFile } from "fs";
import { Helpers } from "../../lib/helpers";
import * as MediaSchema from "../../models/Media";

require('dotenv').config();

export abstract class BaseController<T extends Document | null> implements IController {
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

        /**
         * Get all Items in database
         */
        httpServer.get('/api/' + this._routes + '/all', this.list.bind(this));

        /**
         * Create a new Item
         */
        httpServer.post('/api/' + this._routes + '/create', this.create.bind(this));

        if (this._routes !== 'media') {
            /**
             * Create a new Item and save a reference
             */
            httpServer.post('/api/' + this._routes + '/createByFileReference', checkAuth, this.createByFileReference.bind(this));
        }


        if (this._routes === 'user') {
            /**
            * Register a new User
            */
            httpServer.post('/api/' + this._routes + '/register', this.register.bind(this));

            /**
            * Sign in a registered User
            */
            httpServer.post('/api/' + this._routes + '/signin', this.signIn.bind(this));

            /**
            * Sign in a registered User
            */
            httpServer.post('/api/' + this._routes + '/signout', this.signOut.bind(this));
        }

        /**
         * Get a Item by id from database
         */
        httpServer.get('/api/' + this._routes + '/:id', this.getById.bind(this));

        /**
         * Update a registered Item
         */
        httpServer.put('/api/' + this._routes + '/:id', checkAuth, this.update.bind(this));

        /**
         * Delete a registered Item
         */
        httpServer.del('/api/' + this._routes + '/:id', checkAuth, this.remove.bind(this));
    };


    /**
     * GET all editors
     * @param req 
     * @param res 
     */
    protected async list(req: Request, res: Response, next?: Next): Promise<void> {
        try {
            const allItems = await this._repository.list();
            if (allItems && (allItems instanceof Array)) {
                if (allItems.length > 0) {
                    res.send(201, { "Info": allItems });
                } else {
                    res.send(200, { "Info": "No items in database so far." });
                }
            } else {
                res.send(404, { "Error": "Error in find all Items" });
            }
        } catch (error) {
            res.send(404, { "Error": "Error in list()" });
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
                res.send(201, result)
            } else {
                res.send(500, { "Message": Object(result).name });
            }
        } catch (error) {
            res.send(500, { 'Error': 'Upps, error in Item create function' });
        }
    };


    /**
     * GET files by filename
     * @param req 
     * @param res 
     */
    protected async getByFilePath(req: Request, res: Response, next?: Next): Promise<void> {
        try {
            console.log(req.params);

            readFile('./uploads/' + req.params.filepath, (err: NodeJS.ErrnoException, data: Buffer) => {
                if (!err && data) {
                    res.writeHead(201, { 'Content-Type': 'image/png' });
                    res.end(data);
                } else {
                    res.send(501, err);
                };
            });
        } catch (error) {
            res.send(404, error);
        }
    };


    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public async create(req: Request, res: Response, next?: Next): Promise<void | string> {
        try {
            const result: T = await this._repository.create(req.body);
            if (result && result._id) {
                res.send(201, result);
            } else {
                res.send(500, { "Message": Object(result).name });
            }
        } catch (error) {
            res.send(500, { 'Error': error });
        }
    };

    /**
     * 
     * @param req 
     * @param res 
     */
    protected async update(req: Request, res: Response, next?: Next): Promise<void> {
        try {
            const result = await this._repository.update(req.params.id, req.body);
            if (result && result._id) {
                res.send(201, result)
            } else {
                res.send(500, { "Message": Object(result).name });
            }
        } catch (error) {
            res.send(500, { 'Error': 'Upps, error in Item create function' });
        }
    };


    /**
     * 
     * @param req 
     * @param res 
     */
    protected async remove(req: Request, res: Response, next?: Next): Promise<void> {
        try {
            const result = await this._repository.delete(req.params.id);
            if (result && Object(result).n == 1 && Object(result).ok == 1) {
                res.send(201, { "Info": "Delete item successfully" });
            } else {
                res.send(500, { "Info": "Could not found any item by given id" });
            }
        } catch (error) {
            res.send(500, { "Error": "Error in delete()" });
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

    /**
    * 
    * @param req 
    * @param res 
    * @param next 
    */
    protected async createByFileReference(req: Request, res: Response, next?: Next): Promise<any> {
        if (!req.files) res.send(200, { "Info": "There is no file on req object" });
        const fileUploaded = await this._helpers.uploadFileToFolder(req);

        if (Object.keys(fileUploaded).length != 0 && fileUploaded.constructor === Object) {

            let newFileReqObject = {
                fileName: Object(fileUploaded).fileName,
                filePath: Object(fileUploaded).filePath ? Object(fileUploaded).filePath : Object(fileUploaded).fileUrl
            }

            this._repository.createWithCallback(newFileReqObject, MediaSchema, async (error, respMediaObject) => {
                req.body.refId = respMediaObject._id;
                const finalResult = await this._repository.create(req.body)
                if (finalResult && finalResult._id) {
                    res.send(201, finalResult);
                } else {
                    res.send(500, { "Message": Object(finalResult).name });
                }
            });
        }
    };
};
