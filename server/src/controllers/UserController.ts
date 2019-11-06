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
require("dotenv").config();

export class UserController extends BaseController<IUser> {
	/**
     * 
     * @param req 
     * @param res 
     */
	protected async list(req: Request, res: Response): Promise<void> {
		try {
			const allItems = await this._repository.list();
			if (allItems) {
				let mapToNames = allItems.map((customer) => ({
					firstName: customer.firstName,
					lastName: customer.lastName,
					email: customer.email,
					instrument: customer.instrument,
					comment: customer.comment
				}));
				mapToNames.length > 0
					? successResponse(res, { Info: mapToNames })
					: badRequestResponse(res, "No Users in database");
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
		console.log("req => ", req);

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
								"Hey " + createUser.firstName + " , you are successfully registered"
							);
						} else {
							badRequestResponse(res, "Could not create item", 3, Object(createUser).message);
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
							badRequestResponse(res, "Could not create item with file", 3, result);
						}
					} catch (error) {
						internalServerErrorResponse(res, error.message);
					}
				}
			} else {
				badRequestResponse(res, "No valid user");
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
							try {
								const result = await this._repository.update(id, req.body);
								if (result && result._id) {
									try {
										const jwtToken = await this._helpers.createJwtToken(result);
										typeof jwtToken === "string"
											? successResponse(res, {
													Info: "Hey " + result.firstName + ", you are updated successfully",
													JWT_Token: jwtToken
												})
											: badRequestResponse(res, "Could not create jwt-token");
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
				const authResult = await this._helpers.authorizeItem(id, jwtToken);
				if (typeof authResult === "boolean" && authResult === true) {
					try {
						const result = await this._repository.delete(id);
						if (result && Object(result).n == 1 && Object(result).ok == 1) {
							successResponse(res, null, "Delete item successfully");
						} else {
							badRequestResponse(res, "Could not found any item by given id", 3, Object(result).message);
						}
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
