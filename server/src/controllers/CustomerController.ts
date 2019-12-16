import { BaseController } from "./BaseController";
import { ICustomer } from "../models/interfaces/ICustomer";
import { Request, Response, Next } from "restify";
import { MailService } from "../lib/mailService";
import * as EventSchema from "../models/Event";
import { badRequestResponse, internalServerErrorResponse, successResponse } from "../Responses/Responses";

export class CustomerController extends BaseController<ICustomer> {
	/**
     * 
     * @param req 
     * @param res 
     */
	protected async list(req: Request, res: Response): Promise<void> {
		try {
			const result = await this._helpers.verfiyJwtToken(req.headers.authorization);
			if (result) {
				try {
					const allItems = await this._repository.list();
					if (allItems) {
						let mapToNames = allItems.map((customer) => ({
							firstName: customer.firstName,
							lastName: customer.lastName,
							email: customer.email
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
			} else {
				badRequestResponse(res, "Could not authorize by given jwt token");
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
	public async create(req: Request, res: Response): Promise<void> {
		let foundCustomerObject: ICustomer;
		let result;
		const hasEvent = typeof req.body.event === "object" ? true : false;
		const { firstName, lastName, companyName, phone, email, comment } = req.body;

		try {
			foundCustomerObject = await this._repository.getByEmail(email);
			if (!foundCustomerObject) {
				if (!hasEvent) {
					let newCustomerObject = <ICustomer>{
						firstName,
						lastName,
						companyName,
						phone,
						email,
						comment
					};
					try {
						result = await this._repository.create(newCustomerObject);
						if (result) {
							try {
								const emailServiceResult = await new MailService(result, this._repository);
								if (emailServiceResult) {
									successResponse(res, result);
								} else {
									badRequestResponse(res, "Could not sent the email");
								}
							} catch (error) {
								internalServerErrorResponse(res, error);
							}
						} else {
							badRequestResponse(res, "Could not create new customer without event object");
						}
					} catch (e) {
						internalServerErrorResponse(res, e.message);
					}
				} else {
					let newCustomerObject = <ICustomer>{
						firstName,
						lastName,
						companyName,
						phone,
						email,
						comment
					};
					try {
						await this._repository.createWithCallback(
							req.body.event,
							EventSchema,
							async (error, eventResultObject) => {
								if (error) throw new Error(error);
								newCustomerObject.refId = eventResultObject._id;
								try {
									result = await this._repository.create(newCustomerObject);
									if (result) {
										try {
											const emailServiceResult = await new MailService(result, this._repository);
											if (emailServiceResult) {
												successResponse(res, result);
											} else {
												badRequestResponse(res, "Could not sent the email");
											}
										} catch (error) {
											internalServerErrorResponse(res, error);
										}
									} else {
										badRequestResponse(res, "Could not create new customer with event object");
									}
								} catch (error) {
									internalServerErrorResponse(res, error.message);
								}
							}
						);
					} catch (error) {
						internalServerErrorResponse(res, error.message);
					}
				}
			} else {
				if (!hasEvent) {
					try {
						result = await this._repository.update(foundCustomerObject._id, foundCustomerObject);
						if (result) {
							try {
								const emailServiceResult = await new MailService(result, this._repository);
								if (emailServiceResult) {
									successResponse(res, result);
								} else {
									badRequestResponse(res, "Could not sent the email");
								}
							} catch (error) {
								internalServerErrorResponse(res, error);
							}
						} else {
							badRequestResponse(res, "Could not update customer without event object");
						}
					} catch (error) {
						internalServerErrorResponse(res, error);
					}
				} else {
					try {
						await this._repository.createWithCallback(
							req.body.event,
							EventSchema,
							async (error, eventResultObject) => {
								if (error) throw new Error(error);
								foundCustomerObject.refId = eventResultObject._id;
								try {
									result = await this._repository.update(
										foundCustomerObject._id,
										foundCustomerObject
									);
									if (result) {
										try {
											const emailServiceResult = await new MailService(result, this._repository);
											if (emailServiceResult) {
												successResponse(res, result);
											} else {
												badRequestResponse(res, "Could not sent the email");
											}
										} catch (error) {
											internalServerErrorResponse(res, error);
										}
									} else {
										badRequestResponse(res, "Could not update customer with event object");
									}
								} catch (error) {
									internalServerErrorResponse(res, error.message);
								}
							}
						);
					} catch (error) {
						internalServerErrorResponse(res, error.message);
					}
				}
			}
		} catch (error) {
			internalServerErrorResponse(res, error.message);
		}
	}
}
