export interface IHttpServer {
	get(url: string, ...RequestHandler): void;
	post(url: string, ...RequestHandler): void;
	put(url: string, ...RequestHandler): void;
	del(url: string, ...RequestHandler): void;
}
