import { verify, VerifyErrors } from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
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
					return res.send(401, {
						success: false,
						message: "Token is not valid"
					});
				}
			});
		} else {
			return res.send(401, {
				success: false,
				message: "Token is not supplied"
			});
		}
	} catch (error) {
		res.send(401, { message: "Auth failed" });
	}
};
