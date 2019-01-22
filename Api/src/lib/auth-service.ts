import { verify, VerifyErrors } from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    try {
        const splitedToken: string = req.headers.authorization.split(" ")[1];
        verify(splitedToken, 'process.env.JWT_KEY', (err: VerifyErrors, decoded: object | string) => {
            if (!err && decoded) {
                // req.body.userData = decoded;
                next();
            } else {
                res.send(401, { "message": err.message });
            }
        });
    } catch (error) {
        res.send(401, { "message": "Auth failed" });
    }
}
