import { IHttpServer } from "./IHttpServer";
import { RequestHandler, Server } from "restify";
import { CONTROLLERS } from '../controllers/index';

import * as restify from 'restify';
import * as config from '../../config';


export class ApiServer implements IHttpServer {

    private _restifyServer: Server;

    /**
     * 
     * @param url 
     * @param requestHandler 
     */
    get(url: string, checkAuth: RequestHandler, requestHandler: RequestHandler): void {
        this.addRoute('get', url, checkAuth, requestHandler);
    };

    /**
     * 
     * @param url 
     * @param requestHandler 
     */
    post(url: string, checkAuth: RequestHandler, requestHandler: RequestHandler): void {
        this.addRoute('post', url, checkAuth, requestHandler);
    };

    /**
     * 
     * @param url 
     * @param requestHandler 
     */
    put(url: string, checkAuth: RequestHandler, requestHandler: RequestHandler): void {
        this.addRoute('put', url, checkAuth, requestHandler);
    };

    /**
     * 
     * @param url 
     * @param requestHandler 
     */
    del(url: string, checkAuth: RequestHandler, requestHandler: RequestHandler): void {
        this.addRoute('del', url, checkAuth, requestHandler);
    };

    /**
     * 
     * @param method 
     * @param url 
     * @param requestHandler 
     */
    private addRoute(method: 'get' | 'post' | 'put' | 'del', url: string, checkAuth: RequestHandler, requestHandler: RequestHandler): void {
        this._restifyServer[method](url, checkAuth, (req, res, next) => {
            try {
                requestHandler(req, res, next);
                next();
            } catch (error) {
                res.send(500, error);
            }
        });
        console.log('\x1b[36m%s\x1b[0m', `Added route ${method.toLocaleUpperCase()}: ${url}`);
    };


    /**
     * Start the server
     * @param port 
     */
    public start(port: number): void {

        this._restifyServer = restify.createServer({
            name: config.name
        });

        //server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
        //server.use(restifyPlugins.acceptParser(server.acceptable));
        //server.use(restifyPlugins.queryParser({ mapParams: true }));
        this._restifyServer.use(restify.plugins.bodyParser());
        this._restifyServer.use(restify.plugins.queryParser());
        this._restifyServer.use(restify.plugins.multipartBodyParser())
        this._restifyServer.use(restify.plugins.fullResponse())

        /**
         * Init the Controller
         */
        CONTROLLERS.forEach(controller => {
            controller.initialize(this);
        });

        this._restifyServer.listen(port, () => {
            console.log('\x1b[33m%s\x1b[0m', `${this._restifyServer.name} is up and running on port ${port}`);
        });
    };
};