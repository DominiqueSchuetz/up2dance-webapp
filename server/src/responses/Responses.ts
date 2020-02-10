import { Response } from "restify";

/**
 * 
 * @param res 
 * @param item 
 * @param items 
 * @param message 
 * @param errorCode 
 * @param errorMessage 
 */
export const successResponse = <T, S = null>(
	res: Response,
	item: T = null,
	items: T[] = null,
	message: string = null,
	authPayload: S = null,
	errorMessage: string = null,
	errorCode: number = 0
) => {
	res.status(200);
	res.json({
		success: true,
		item,
		items,
		message,
		authPayload,
		errorCode,
		errorMessage
	});
};

/**
 * 
 * @param res 
 * @param item 
 * @param items 
 * @param message 
 * @param errorCode 
 * @param errorMessage 
 */
export const failedServerRespnose = <T = null>(
	res: Response,
	item: T = null,
	items: T[] = null,
	message: string = null,
	errorMessage: string = null,
	errorCode: number = 2
) => {
	res.status(500);
	res.json({
		success: false,
		item,
		items,
		message,
		errorMessage,
		errorCode
	});
};

/**
 * 
 * @param res 
 * @param item 
 * @param items 
 * @param message 
 * @param errorCode 
 * @param errorMessage 
 */
export const internalServerErrorResponse = <T>(
	res: Response,
	item: T = null,
	items: T[] = null,
	message: string = null,
	errorMessage: string = null,
	errorCode: number = 3
) => {
	res.status(500);
	res.json({
		success: false,
		item,
		items,
		message,
		errorMessage,
		errorCode
	});
};

/**
 * 
 * @param res 
 * @param message 
 * @param errorCode 
 * @param errorMessage 
 */
export const badRequestResponse = (
	res: Response,
	message: string,
	errorMessage: string = null,
	errorCode: number = 4
) => {
	res.status(400);
	res.json({
		success: false,
		message,
		errorMessage,
		errorCode
	});
};

/**
 * 
 * @param res 
 * @param item 
 * @param items 
 * @param message 
 * @param errorCode 
 * @param errorMessage 
 */
export const unauthorizedResponse = <T>(
	res: Response,
	authPayload: T = null,
	message: string = null,
	errorMessage: string = null,
	errorCode: number = 2
) => {
	res.status(401);
	res.json({
		success: false,
		authPayload,
		message,
		errorMessage,
		errorCode
	});
};
