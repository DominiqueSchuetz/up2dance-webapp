import { IHttpServer } from "../../routes/IHttpServer";

export interface IController {
    initialize(httpServer: IHttpServer): void;
};