import { CrudController } from "../abstract_class/AbstractCrudController";
import { Request, Response, Next, plugins } from "restify";
import { IMedia } from "../../models/interfaces/IMedia";
import { Helpers } from "../../lib/helpers";
import { readFile, unlinkSync } from "fs";

export class MediaController extends CrudController<IMedia> {

    private _helpers = new Helpers();

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public async create(req: Request, res: Response, next?: Next): Promise<void> {
        try {
            if (!req.files) {
                res.send(201, { "Info": "There is no a file, right?" });
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
                        res.send(500, error);
                    }
                }
            };
        } catch (error) {
            res.send(401, error);
        }
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
                            res.writeHead(201, { 'Content-Type': 'image/png' });
                            res.end(data)
                        } else {
                            res.send(501, err)
                        };
                    });
                } else {
                    res.send(200, result.url);
                }
            } else {
                res.send(500, { "Message": Object(result).name });
                next();
            }
        } catch (error) {
            res.send(500, error);
        }
    };


    /**
     * 
     * @param req 
     * @param res 
     */
    protected async update(req: Request, res: Response): Promise<void> {
        try {
            const mediaObjectInDatabase = await this._repository.getById(req.params.id);
            if (mediaObjectInDatabase.filePath) {
                try {
                    unlinkSync(mediaObjectInDatabase.filePath);
                } catch (error) {
                    res.send(500, error);
                }
                const fileUploaded = await this._helpers.uploadFileToFolder(req);
                if (fileUploaded) {
                    try {
                        typeof fileUploaded === 'boolean' ? req.body : req.body.filePath = fileUploaded;
                        const result: IMedia = await this._repository.update(req.params.id, req.body);
                        if (result && result._id) {
                            res.send(201, result);
                        } else {
                            res.send(500, { "Message": Object(result).name });
                        }
                    } catch (error) {
                        res.send(500, error);
                    }
                }
            } else {
                console.log('Hab ein url dran');
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
    protected async remove(req: Request, res: Response): Promise<void> {

        try {
            const file = await this._repository.getById(req.params.id)
            const result = await this._repository.delete(req.params.id);

            if (result && Object(result).n == 1 && Object(result).ok == 1) {

                //delete file from public folder
                const filePath = file.filePath;
                try {
                    unlinkSync(filePath);
                    //console.log('successfully deleted ' + filePath);
                } catch (error) {
                    res.send(500, error);
                }
                res.send(201, { "Info": "Delete item successfully" });
            } else {
                res.send(500, { "Info": "Could not found any item by given id" });
            }
        } catch (error) {
            res.send(500, { "Error": "Error in delete()" });
        }
    };
};
















    // server.get(null, '/favicon.ico', function(req, res, next) {
    //     fs.readFile('./docs/media/img/favicon.ico', function(err, file) {
    //       if (err) {
    //         res.send(500);
    //         return next();
    //       }

    //       res.send({
    //         code: 200,
    //         noEnd: true
    //       });
    //       res.write(file);
    //       res.end();
    //       return next();
    //     });
    //   }, log.w3c);

    //   server.get(null, /^\/media\/css\/*/, function(req, res, next) {
    //     fs.readFile('./docs' + req.url, 'utf8', function(err, file) {
    //       if (err) {
    //         res.send(500);
    //         return next();
    //       }

    //       res.send({
    //         code: 200,
    //         noEnd: true
    //       });
    //       res.write(file);
    //       res.end();
    //       return next();
    //     });
    //   }, log.w3c);

    //   server.get(null, /^\/media\/img\/*/, function(req, res, next) {
    //     fs.readFile('./docs' + req.url, function(err, file) {
    //       if (err) {
    //         res.send(500);
    //         return next();
    //       }

    //       res.send({
    //         code: 200,
    //         noEnd: true
    //       });
    //       res.write(file);
    //       res.end();
    //       return next();
    //     });
    //   }, log.w3c);