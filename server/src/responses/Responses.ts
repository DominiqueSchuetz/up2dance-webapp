import { Response } from "restify";

/**
 * 
 * @param res 
 * @param message 
 * @param data 
 */
export const successResponse = (
	res: Response,
	data: unknown = null,
	message: string = "success",
	error_code: number = 0
) => {
	res.status(200);
	res.json({
		success: true,
		error_code,
		message,
		data
	});
};

/**
 * 
 * @param res 
 * @param message 
 * @param data 
 */
export const badRequestResponse = (res: Response, message: string, error_code: number = 3, data: unknown = null) => {
	res.status(400);
	res.json({
		success: false,
		message,
		error_code,
		data
	});
};

/**
 * 
 * @param res 
 * @param message 
 * @param data 
 */
export const internalServerErrorResponse = (
	res: Response,
	message: string,
	error_code: number = 5,
	data: unknown = null
) => {
	res.status(500);
	res.json({
		success: false,
		message,
		error_code,
		data
	});
};
