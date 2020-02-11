import { readFile, unlinkSync } from "fs";
import { BaseController } from "./BaseController";
import { Request, Response, Next } from "restify";
import { IMedia } from "../models/interfaces/IMedia";
import {
	badRequestResponse,
	internalServerErrorResponse,
	successResponse,
	failedServerRespnose
} from "../responses/Responses";
import { isEmpty } from "lodash/fp";

export class MediaController extends BaseController<IMedia> {
	//
	// ──────────────────────────────────────────────────────────────── ADD MEDIA ─────
	//
	/**
	 * 
	 * @param req 
	 * @param res 
	 */
	public async create(req: Request, res: Response): Promise<void> {
		try {
			if (!req.files) {
				failedServerRespnose<IMedia>(res, null, null, "Es trat ein Fehler beim laden aller Bilder auf");
			} else {
				const result: IMedia = await this._helpers.uploadFileToFolder(req);

				if (result) {
					if (result.filePath) {
						req.body.filePath = result.filePath;
					} else {
						req.body.fileUrl = result.fileUrl;
					}
					req.body.fileName = result.fileName;

					try {
						const result: IMedia = await this._repository.create(req.body);
						const results: IMedia[] = await this._repository.list();

						!isEmpty(result)
							? successResponse<IMedia>(
									res,
									result,
									results,
									`Hey ${result.fileName}, wurde erfolgreich erstellt 🥳`
								)
							: failedServerRespnose<IMedia>(
									res,
									null,
									null,
									`Es trat ein Fehler beim der Erstellung des Bildes ${result.fileName} auf`
								);
					} catch (error) {
						internalServerErrorResponse(
							res,
							null,
							null,
							"Es trat ein Fehler beim der Erstellung eines Bildes auf",
							error.message
						);
					}
				} else {
					failedServerRespnose<IMedia>(
						res,
						null,
						null,
						`Es trat ein Fehler beim der Erstellung des Bildes ${result.fileName} auf`
					);
				}
			}
		} catch (error) {
			internalServerErrorResponse(
				res,
				null,
				null,
				"Es trat ein Fehler beim der Erstellung eines Bildes auf",
				error.message
			);
		}
	}

	//
	// ────────────────────────────────────────────────────────── GET MEDIA BY ID ─────
	//
	/**
     * 
     * @param req 
     * @param res  
     */
	protected async getById(req: Request, res: Response): Promise<void> {
		try {
			const result: IMedia = await this._repository.getById(req.params.id);

			readFile(result.filePath, (err: NodeJS.ErrnoException, data: Buffer) => {
				if (!err && data) {
					res.writeHead(200, { "Content-Type": "image/png" });
					res.end(data);
				} else {
					readFile("./uploads/not-found/notFound.png", (err: NodeJS.ErrnoException, data: Buffer) => {
						if (!err && data) {
							res.writeHead(200, { "Content-Type": "image/png" });
							res.end(data);
						} else {
							badRequestResponse(res, "Could not show item by id");
						}
					});
				}
			});
		} catch (error) {
			internalServerErrorResponse(res, null, null, "Es trat ein Fehler beim laden des Bildes auf", error.message);
		}
	}

	//
	// ─────────────────────────────────────────────────────── UPDATE MEDIA BY ID ─────
	//
	/**
     * 
     * @param req 
     * @param res 
     */
	protected async update(req: Request, res: Response): Promise<void> {
		try {
			const newResult: IMedia = await this._helpers.uploadFileToFolder(req);
			const result: IMedia = await this._repository.update(req.params.id, newResult);
			const results: IMedia[] = await this._repository.list();

			!isEmpty(result)
				? successResponse<IMedia>(
						res,
						result,
						results,
						`Das Bild ${result.fileName} wurde erfolgreich aktualisiert 🥳`
					)
				: failedServerRespnose<IMedia>(
						res,
						null,
						null,
						`Es trat ein Fehler beim der Aktualisierung des Bildes ${result.fileName} auf`
					);
		} catch (error) {
			internalServerErrorResponse(
				res,
				null,
				null,
				"Es trat ein Fehler beim der Aktualisierung eines Bildes auf",
				error.message
			);
		}
	}

	//
	// ───────────────────────────────────────────────────────────── REMOVE MEDIA ─────
	//
	/**
     * 
     * @param req 
     * @param res 
     */
	protected async remove(req: Request, res: Response): Promise<void> {
		try {
			const result: IMedia = await this._repository.delete(req.params.id);
			const results: IMedia[] = await this._repository.list();
			await this._helpers.deleteFileToFolder(result.filePath);

			!isEmpty(result)
				? successResponse<IMedia>(
						res,
						result,
						results,
						`Bild ${result.fileName}, wurde erfolgreich gelöscht 🥳`
					)
				: failedServerRespnose<IMedia>(
						res,
						null,
						null,
						`Es trat ein Fehler beim löschen des Bildes ${result.fileName}`
					);
		} catch (error) {
			internalServerErrorResponse(
				res,
				null,
				null,
				"Es trat ein Fehler beim löschen eines Bildes auf",
				error.message
			);
		}
	}
}
