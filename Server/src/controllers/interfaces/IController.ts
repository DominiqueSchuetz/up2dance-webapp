import { IHttpServer } from "../../server/IHttpServer";

export interface IController {
    initialize(httpServer: IHttpServer): void;
};