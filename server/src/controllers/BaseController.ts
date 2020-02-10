import { Request, Response, Next } from "restify";
import { Document, Model, Types } from "mongoose";
import * as MediaSchema from "../models/Media";
import { IHttpServer } from "../routes/IHttpServer";
import { Repository } from "../repository/repository";
import { IController } from "./interfaces/IController";
import { checkAuth } from "../lib/auth-service";
import { Helpers } from "../lib/helpers";
import {
	badRequestResponse,
	internalServerErrorResponse,
	successResponse,
	failedServerRespnose
} from "../responses/Responses";
import { isNil, isEmpty } from "lodash/fp";
require("dotenv").config();

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
	}

	/**
     * 
     * @param httpServer 
     */
	initialize(httpServer: IHttpServer): void {
		if (this._routes === "customer") {
			httpServer.post("/api/" + this._routes + "/create", this.create.bind(this));
		} else {
			httpServer.post("/api/" + this._routes + "/create", checkAuth, this.create.bind(this));
		}

		if (this._routes === "user") {
			httpServer.get("/api/" + this._routes + "/isUserAuthenticated", this.isUserAuthenticated.bind(this));
		}

		httpServer.get("/api/" + this._routes + "/all", this.list.bind(this));
		httpServer.get("/api/" + this._routes + "/:id", this.getById.bind(this));
		httpServer.put("/api/" + this._routes + "/:id", checkAuth, this.update.bind(this));
		httpServer.del("/api/" + this._routes + "/:id", checkAuth, this.remove.bind(this));

		/**
         * save a media reference to model
         */
		if (this._routes !== "media") {
			httpServer.post(
				"/api/" + this._routes + "/createByFileReference",
				checkAuth,
				this.createByFileReference.bind(this)
			);
		}

		/**
         * authenticate
         */
		if (this._routes === "user") {
			httpServer.post("/api/" + this._routes + "/register", this.register.bind(this));
			httpServer.post("/api/" + this._routes + "/signin", this.signIn.bind(this));
			httpServer.post("/api/" + this._routes + "/signout", this.signOut.bind(this));
		}
	}

	//
	//? ─────────────────────────────────────────────────────────────── LIST ITEMS ─────
	//
	/**
	 * 
	 * @param req 
     * @param req 
	 * @param req 
     * @param req 
	 * @param req 
     * @param req 
	 * @param req 
	 * @param res 
     * @param res
	 * @param res 
     * @param res
	 * @param res 
     * @param res
	 * @param res 
	 */
	protected async list(req: Request, res: Response): Promise<T[]> {
		try {
			const results: T[] = await this._repository.list();

			if (!results) {
				failedServerRespnose<T>(res, null, null, "Es trat ein Fehler beim laden der Items auf");
				return null;
			}

			results.length > 0
				? successResponse<T>(res, null, results)
				: successResponse<T>(res, null, [], "Es gibt derzeit keine Items");
		} catch (error) {
			internalServerErrorResponse(
				res,
				null,
				null,
				"Error beim laden der Items",
				error.message || "Internal Server Error"
			);
		}
	}

	//
	//? ─────────────────────────────────────────────────────────── GET ITEM BY ID ─────
	//
	/**
     *
     * @param req 
     * @param res 
     */
	protected async getById(req: Request, res: Response): Promise<void> {
		try {
			const result: T = await this._repository.getById(req.params.id);

			!isEmpty(result)
				? successResponse(res, result)
				: badRequestResponse(res, "Konnte das angeforderte Item nicht finden.");
		} catch (error) {
			internalServerErrorResponse(
				res,
				null,
				null,
				"Error beim finden eines Items",
				error.message || "Internal Server Error"
			);
		}
	}

	//
	//? ───────────────────────────────────────────────────────────────── ADD ITEM ─────
	//
	/**
     * 
     * @param req 
     * @param res 
     */
	protected async create(req: Request, res: Response): Promise<void> {
		try {
			const result: T = await this._repository.create(req.body);
			const results: T[] = await this._repository.list();

			!isEmpty(result) && !isEmpty(results)
				? successResponse<T>(res, result, results, "Neues Item erfolgreich hinzugefügt")
				: badRequestResponse(res, "Fehler beim erstellen eines neues Items");
		} catch (error) {
			internalServerErrorResponse(
				res,
				null,
				null,
				"Error beim erstellen eines Items",
				error.message || "Internal Server Error"
			);
		}
	}

	//
	//? ────────────────────────────────────────────────────────────── UPDATE ITEM ─────
	//
	/**
     * 
     * @param req 
     * @param res 
     */
	protected async update(req: Request, res: Response): Promise<void> {
		try {
			const result: T = await this._repository.update(req.params.id, req.body);
			const results: T[] = await this._repository.list();

			!isEmpty(result) && !isEmpty(results)
				? successResponse(res, result, results, "Item erfolgreich aktualisiert")
				: badRequestResponse(res, "Fehler beim aktualisieren eines Items");
		} catch (error) {
			internalServerErrorResponse(
				res,
				null,
				null,
				"Error beim erstellen eines Items",
				error.message || "Internal Server Error"
			);
		}
	}

	//
	//? ────────────────────────────────────────────────────────────── DELETE ITEM ─────
	//
	/**
     * 
     * @param req 
     * @param res 
     */
	protected async remove(req: Request, res: Response): Promise<void> {
		try {
			const result: T = await this._repository.delete<T>(req.params.id);
			const results: T[] = await this._repository.list();

			!isEmpty(result) && !isEmpty(results)
				? successResponse(res, result, results, "Item erfolgreich gelöscht")
				: badRequestResponse(res, "Fehler beim löschen eines Items");
		} catch (error) {
			internalServerErrorResponse(
				res,
				null,
				null,
				"Error beim löschen eines Items",
				error.message || "Internal Server Error"
			);
		}
	}

	//
	//? ───────────────────────────────────────────── CREATE ITEM WITH MEDIA REFID ─────
	//
	/**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
	protected async createByFileReference(req: Request, res: Response): Promise<T> {
		if (typeof req.files === "object" || typeof req.body.fileUrl === "string") {
			try {
				const result = await this._helpers.uploadFileToFolder(req);

				if (Object.keys(result)!.length != 0 && result!.constructor === Object) {
					let newFileReqObject = {
						fileName: Object(result)!.fileName,
						filePath: Object(result)!.filePath ? Object(result)!.filePath : null,
						fileUrl: Object(result)!.fileUrl ? Object(result)!.fileUrl : null,
						isUserPicture: req.body.isUserPicture || false
					};
					try {
						return await this._repository.createWithCallback(
							newFileReqObject,
							MediaSchema,
							async (error, respondedMediaObject) => {
								if (error) throw new Error(error);
								req.body.refId = respondedMediaObject._id;
								try {
									const finalResult = await this._repository.create(req.body);

									if (finalResult && finalResult._id) {
										return finalResult;
									} else {
										return new Error(Object(finalResult).message);
									}
								} catch (error) {
									return error;
								}
							}
						);
					} catch (error) {
						return error;
					}
				}
			} catch (error) {
				return error;
			}
		} else {
			badRequestResponse(res, "Invalid image");
		}
	}

	//
	//? ───────────────────────────────────────────── UPDATE ITEM WITH MEDIA REFID ─────
	//
	/**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
	protected async updateByFileReference(req: Request, res: Response, id: Types.ObjectId): Promise<T> {
		if (typeof req.files === "object" || typeof req.body.fileUrl === "string") {
			try {
				const result = await this._helpers.uploadFileToFolder(req);

				if (Object.keys(result)!.length != 0 && result!.constructor === Object) {
					let newFileReqObject = {
						fileName: Object(result)!.fileName,
						filePath: Object(result)!.filePath ? Object(result)!.filePath : null,
						fileUrl: Object(result)!.fileUrl ? Object(result)!.fileUrl : null,
						isUserPicture: req.body.isUserPicture || false
					};
					try {
						return await this._repository.createWithCallback(
							newFileReqObject,
							MediaSchema,
							async (error, respondedMediaObject) => {
								if (error) throw new Error(error);
								req.body.refId = respondedMediaObject._id;
								try {
									const finalResult = await this._repository.update(id, req.body);
									if (finalResult && finalResult._id) {
										return finalResult;
									} else {
										return new Error(Object(finalResult).message);
									}
								} catch (error) {
									return error;
								}
							}
						);
					} catch (error) {
						return error;
					}
				}
			} catch (error) {
				return error;
			}
		} else {
			badRequestResponse(res, "Invalid image");
		}
	}

	/**
    * 
    * @param req 
    * @param res 
    * @param next 
    */
	protected async register(req: Request, res: Response, next?: Next): Promise<void> {}

	/**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
	protected async signIn(req: Request, res: Response, next?: Next): Promise<void> {}

	/**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
	protected async signOut(req: Request, res: Response, next?: Next): Promise<void> {}

	/**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
	protected async isUserAuthenticated(req: Request, res: Response, next?: Next): Promise<void> {}
}
