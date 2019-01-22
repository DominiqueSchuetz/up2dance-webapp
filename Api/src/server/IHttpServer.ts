import { RequestHandler, Next } from "restify";

export interface IHttpServer {
    get(url: string, checkAuth?: RequestHandler, requestHandler?: RequestHandler): void;
    post(url: string, checkAuth?: RequestHandler, requestHandler?: RequestHandler): void;
    put(url: string, checkAuth?: RequestHandler, requestHandler?: RequestHandler): void;
    del(url: string, checkAuth?: RequestHandler, requestHandler?: RequestHandler): void;
};