import { IHttpServer } from "./IHttpServer";
import { RequestHandler, Server } from "restify";
import { CONTROLLERS } from '../controllers/index';

import * as restify from 'restify';


export class ApiServer implements IHttpServer {

    private _restifyServer: Server;

    /**
     * 
     * @param url 
     * @param requestHandler 
     */
    get(url: string, requestHandler: RequestHandler): void {
        this.addRoute('get', url, requestHandler);
    };

    /**
     * 
     * @param url 
     * @param requestHandler 
     */
    post(url: string, requestHandler: RequestHandler): void {
        this.addRoute('post', url, requestHandler);
    };

    /**
     * 
     * @param url 
     * @param requestHandler 
     */
    put(url: string, requestHandler: RequestHandler): void {
        this.addRoute('put', url, requestHandler);
    };

    /**
     * 
     * @param url 
     * @param requestHandler 
     */
    del(url: string, requestHandler: RequestHandler): void {
        this.addRoute('del', url, requestHandler);
    };

    /**
     * 
     * @param method 
     * @param url 
     * @param requestHandler 
     */
    private addRoute(method: 'get' | 'post' | 'put' | 'del', url: string, requestHandler: RequestHandler): void {
        this._restifyServer[method](url, async (req, res, next) => {
            try {
                await requestHandler(req, res, next);
            } catch (error) {
                console.error(error);
                res.send(500, error);
            }
        });
        console.log(`Added route ${method.toLocaleUpperCase()}: ${url}`);
    };

    /**
     * Start the server
     * @param port 
     */
    public start(port: number): void {

        this._restifyServer = restify.createServer();

        this._restifyServer.use(restify.plugins.bodyParser());
        this._restifyServer.use(restify.plugins.queryParser());

        /**
         * Init the Controller
         */
        CONTROLLERS.forEach(controller => {
            controller.initialize(this);
        });

        this._restifyServer.listen(port, () => {
            console.log(`Server is up and running on port ${port}`);
        });
    };
};