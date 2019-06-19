import { IHttpServer } from "./IHttpServer";
import { RequestHandler, Server } from "restify";
import { CONTROLLERS } from '../controllers';
import * as socketIo from "socket.io";
import { cpus, hostname } from "os";
import { readFileSync } from "fs";

import * as restify from 'restify';
import * as config from '../../config';

export class ApiServer implements IHttpServer {

    private _restifyServer: Server;
    private _restifyHttpsServer: Server;
    private io: SocketIO.Server;



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
                return next();
            } catch (error) {
                res.send(500, error);
            }
        });
        console.log('\x1b[36m%s\x1b[0m', `Added route ${method.toLocaleUpperCase()}: ${url}`);
        this._restifyHttpsServer[method](url, checkAuth, (req, res, next) => {
            try {
                requestHandler(req, res, next);
                return next();
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
    public start(port?: number): void {
        const certificate = readFileSync(config.default.root + '/src/routes/sslcert/cert.pem');
        const key = readFileSync(config.default.root + '/src/routes/sslcert/key.pem')

        this._restifyServer = restify.createServer({
            name: config.default.name
        });

        this._restifyHttpsServer = restify.createServer({
            name: config.default.name,
            certificate,
            key,
            requestCert: true,
            rejectUnauthorized: true
        });

        // Implement Socket-IO as realtime server
        this.io = socketIo(this._restifyServer);
        this.io.on('connection', function (socket) {
            socket.on('chat message', function (msg) {
                this._io.emit('chat message', msg);
            });
        });

        this._restifyServer.use(restify.plugins.acceptParser(this._restifyServer.acceptable));
        this._restifyServer.use(restify.plugins.queryParser({ mapParams: true }));
        this._restifyServer.use(restify.plugins.bodyParser({
            mapParams: true,
        }));

        /**
         * Init the Controller
         */
        CONTROLLERS.forEach(controller => {
            controller.initialize(this);
        });

        this._restifyServer.listen(port, () => {
            console.log('\x1b[33m%s\x1b[0m', `[${config.default.envName}]-mode Started http server with ${cpus().length} clusters on Host ${hostname} => http://localhost:${config.default.httpPort} for Process Id ${process.pid}`);
        });

        this._restifyHttpsServer.listen(config.default.httpsPort, () => {
            console.log('\x1b[33m%s\x1b[0m', `[${config.default.envName}]-mode Started https server with ${cpus().length} clusters on Host ${hostname} => https://localhost:${config.default.httpsPort} for Process Id ${process.pid}`);
        });
    };
};
