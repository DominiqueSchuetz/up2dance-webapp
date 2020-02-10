import { IUser } from "./IUser";

export interface IAuthUser {
	isAuthenticated: boolean;
	jwtToken: string | undefined;
	authUser: IUser | undefined;
}
