import { Next, Response } from "restify";
import { verify, VerifyErrors } from "jsonwebtoken";
import { IAuthUser } from "../models/interfaces/IAuth";
import { unauthorizedResponse, internalServerErrorResponse, failedServerRespnose } from "../responses/Responses";

export const checkAuth = (req: any, res: Response, next: Next) => {
	try {
		// let splitedToken: string = req.headers.authorization.split(" ")[1];
		let token = req.headers["x-access-token"] || req.headers["authorization"];
		if (token.startsWith("Bearer ")) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}

		if (token) {
			verify(token, "process.env.JWT_KEY", (err: VerifyErrors, decoded: object | string) => {
				if (!err && decoded) {
					req.decoded = decoded;
					next();
				} else {
					unauthorizedResponse<IAuthUser>(
						res,
						{
							isAuthenticated: false,
							jwtToken: null,
							authUser: null
						},
						null,
						"⛔️️ ️Der JWT-Token ist nicht valide ⛔️"
					);
				}
			});
		} else {
			failedServerRespnose<IAuthUser>(
				res,
				null,
				null,
				"Es trat ein Fehler beim der validierung des JWT-Tokens auf"
			);
		}
	} catch (error) {
		internalServerErrorResponse(res, null, null, "⛔️️ ️Du benutzt keine Authentifizierung ⛔️", error.message);
	}
};
