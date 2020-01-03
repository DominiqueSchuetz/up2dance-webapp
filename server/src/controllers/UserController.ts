import {
	successResponse,
	badRequestResponse,
	internalServerErrorResponse,
	unauthorizedResponse
} from "../responses/responses";
import { Request, Response, Next } from "restify";
import { BaseController } from "./BaseController";
import { IUser } from "../models/interfaces/IUser";
import { Types } from "mongoose";
import { pick, isEmpty, isString } from "lodash";
import { Helpers } from "../lib/helpers";
require("dotenv").config();

export class UserController extends BaseController<IUser> {
	protected _helpers = new Helpers();

	/**
	 * 
	 * @param req 
	 * @param res 
	 */
	protected async isUserAuthenticated(req: Request, res: Response): Promise<void> {
		try {
			const verifiedUser = await this._helpers.verfiyJwtToken(req.headers.authorization);
			if (verifiedUser) {
				successResponse(res, verifiedUser, "User is verified");
			} else {
				badRequestResponse(res, "User is not verified");
			}
		} catch (error) {
			internalServerErrorResponse(res, error.message);
		}
	}

	/**
     * 
     * @param req 
     * @param res 
     */
	protected async list(req: Request, res: Response): Promise<void> {
		try {
			const allItems = await this._repository.list();
			if (allItems) {
				let mapToNames = allItems.map((user: IUser) => ({
					_id: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					instrument: user.instrument,
					refId: user.refId,
					comment: user.comment
				}));
				mapToNames.length > 0
					? successResponse(res, mapToNames)
					: successResponse(res, [], "No items in database so far");
			} else {
				badRequestResponse(res, "Could not list items");
			}
		} catch (error) {
			internalServerErrorResponse(res, error.message);
		}
	}

	/**
     * 
     * @param req 
     * @param res 
     */
	protected async register(req: Request, res: Response, next: Next): Promise<void> {
		const firstName =
			typeof req.body.firstName == "string" && req.body.firstName.trim().length > 1
				? req.body.firstName.trim()
				: false;
		const lastName =
			typeof req.body.lastName == "string" && req.body.lastName.trim().length > 1
				? req.body.lastName.trim()
				: false;
		const email =
			typeof req.body.email == "string" && req.body.email.trim().length > 4 ? req.body.email.trim() : false;
		const password =
			typeof req.body.password == "string" && req.body.password.trim().length > 5
				? req.body.password.trim()
				: false;
		const secretKey =
			typeof req.body.secretKey == "string" &&
			req.body.secretKey.trim().length === 18 &&
			req.body.secretKey.trim() === process.env.SECRET_KEY
				? true
				: false;
		const files = Object.keys(req.files).length ? true : false;
		const fileUrl = typeof req.body.fileUrl == "string" ? true : false;

		try {
			if (firstName && lastName && email && password && secretKey) {
				req.body.password = await this._helpers.encrypt(password);
				if (!files && !fileUrl) {
					try {
						const createUser = await this._repository.create(req.body);
						if (createUser!._id) {
							successResponse(
								res,
								null,
								"Hey " + createUser.firstName + ", you are successfully registered"
							);
						} else {
							badRequestResponse(res, "Could not register user", 3, Object(createUser).message);
						}
					} catch (error) {
						internalServerErrorResponse(res, error.message);
					}
				} else {
					try {
						const result = await this.createByFileReference(req, res);
						if (result!._id) {
							successResponse(res, result);
						} else {
							badRequestResponse(res, "Could not register user with file", 3, result);
						}
					} catch (error) {
						internalServerErrorResponse(res, error.message);
					}
				}
			} else {
				badRequestResponse(res, "No valid user", 3);
			}
		} catch (error) {
			internalServerErrorResponse(res, error.message);
		}
	}

	/**
     * 
     * @param req 
     * @param res 
     */
	protected async signIn(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body;
		if (email && password) {
			try {
				const result = await this._repository.searchForItem(email);
				const auth = await this._helpers.comparingPasswords(password, result.password);
				if (auth && result) {
					const jwtToken: string = await this._helpers.createJwtToken(mapToUserObject(result));
					!isEmpty(jwtToken) && isString(jwtToken)
						? successResponse(
								res,
								{
									jwt_token: jwtToken,
									isLoggedIn: true
								},
								`Hey ${result.firstName}, you're logged in successfully`
							)
						: badRequestResponse(res, "Could not create jwt-token");
				} else {
					unauthorizedResponse(res, `No valid username or password`, 3, {
						JWT_Token: null,
						isLoggedIn: false
					});
				}
			} catch (error) {
				unauthorizedResponse(res, `No valid username or password`, 3, {
					JWT_Token: null,
					isLoggedIn: false
				});
			}
		} else {
			unauthorizedResponse(res, `No valid username or password`, 3, {
				JWT_Token: null,
				isLoggedIn: false
			});
		}
	}

	/**
     * 
     * @param req 
     * @param res 
     */
	protected async update(req: Request, res: Response): Promise<void> {
		const id: Types.ObjectId = typeof req.params.id == "string" && req.params.id != null ? req.params.id : false;
		const jwtToken: string | boolean =
			typeof req.headers.authorization !== null ? req.headers.authorization.trim() : false;
		const firstName =
			typeof req.body.firstName == "string" && req.body.firstName.trim().length > 1
				? req.body.firstName.trim()
				: false;
		const lastName =
			typeof req.body.lastName == "string" && req.body.lastName.trim().length > 1
				? req.body.lastName.trim()
				: false;
		const email =
			typeof req.body.email == "string" && req.body.email.trim().length > 4 ? req.body.email.trim() : false;
		const password =
			typeof req.body.password == "string" && req.body.password.trim().length > 5
				? req.body.password.trim()
				: false;
		const instrument = typeof req.body.instrument == "string" ? req.body.instrument.trim() : false;

		const files = Object.keys(req.files).length ? true : false;
		const fileUrl = typeof req.body.fileUrl == "string" ? true : false;

		if (id && jwtToken) {
			try {
				const authResult = await this._helpers.authorizeItem(id, jwtToken);
				if (
					typeof authResult === "boolean" &&
					authResult === true &&
					((firstName && lastName && email && password) || instrument)
				) {
					try {
						const passwordEnc = await this._helpers.encrypt(password);
						if (passwordEnc) {
							req.body.password = passwordEnc;

							if (!files && !fileUrl) {
								try {
									const result = await this._repository.update(id, req.body);
									if (result && result._id) {
										try {
											const jwtToken = await this._helpers.createJwtToken(result);
											typeof jwtToken === "string"
												? successResponse(res, result, "You updated a item successfully")
												: badRequestResponse(res, "Could not update item by id");
										} catch (error) {
											internalServerErrorResponse(res, error.message);
										}
									} else {
										badRequestResponse(
											res,
											"Could not update item with given id",
											3,
											Object(result).message
										);
									}
								} catch (error) {
									internalServerErrorResponse(res, error.message);
								}
							} else {
								try {
									const getUserObject = await this._repository.getByIdAndRefId(id);
									if (getUserObject.refId && getUserObject.refId.filePath) {
										// Delete file from disc
										const filePath = getUserObject.refId.filePath;
										await this._helpers.deleteFileToFolder(filePath);
									}

									const result = await this.updateByFileReference(req, res, id);
									if (result!._id) {
										successResponse(res, result);
									} else {
										badRequestResponse(res, "Could not register user with file", 3, result);
									}
								} catch (error) {
									internalServerErrorResponse(res, error.message);
								}
							}
						}
					} catch (error) {
						internalServerErrorResponse(res, error.message);
					}
				} else {
					badRequestResponse(res, "Could not authorized by given parameters");
				}
			} catch (error) {
				internalServerErrorResponse(res, error);
			}
		} else {
			badRequestResponse(res, "No valid id or token");
		}
	}

	/**
     * 
     * @param req 
     * @param res 
     */
	protected async remove(req: Request, res: Response): Promise<void> {
		const id: Types.ObjectId = typeof req.params.id == "string" && req.params.id != null ? req.params.id : false;
		const jwtToken: string | boolean =
			typeof req.headers.authorization !== null ? req.headers.authorization.trim() : false;

		if (id && jwtToken) {
			try {
				const authResult: boolean = await this._helpers.authorizeItem(id, jwtToken);
				if (authResult) {
					try {
						const result = await this._repository.delete(id);
						result && result._id
							? successResponse(res, result, "Delete item successfully")
							: badRequestResponse(res, "Could not delete item by id");
					} catch (error) {
						internalServerErrorResponse(res, error.message);
					}
				} else {
					badRequestResponse(res, "Could not authorized by given parameters", 3, Object(authResult).message);
				}
			} catch (error) {
				internalServerErrorResponse(res, error.message);
			}
		} else {
			badRequestResponse(res, "No valid id or token");
		}
	}
}
const mapToUserObject = (data: IUser) => {
	return pick(data, [ "_id", "firstName", "lastName", "email", "instrument", "refId", "comment" ]);
};
