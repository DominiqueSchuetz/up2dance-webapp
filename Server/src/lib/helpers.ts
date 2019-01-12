import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

import { Repository } from "../repository/Repository";
import { ICustomer } from "../models/interfaces/ICustomer";

import * as CustomerSchema from '../models/Customer';
import * as  mongoose from 'mongoose';
require('dotenv').config()

//import { Document } from "mongoose";

export class Helpers {

    repository: Repository<ICustomer> = new Repository<ICustomer>(CustomerSchema);

    /**
     * 
     * @param password 
     */
    public decrypt(password: string): Promise<string> {
        return hash(password, 8);
    };

    /**
     * 
     * @param result 
     */
    public async createJwtToken(result: any): Promise<string> {

        // Is user in databse
        const user = await this.isUserInDatabase(result.id);
        if (user) {
            // sign(payload, secretKey, expiresIn)
            const jwtToken = await sign({ user },
                'process.env.JWT_KEY', {
                    expiresIn: '1h'
                });
            return jwtToken;
        }
    };

    /**
     * 
     * @param password 
     * @param hashedPassword 
     * @param email 
     */
    public async verfiyUserObject(password: any, hashedPassword: any, email): Promise<boolean> {
        const reqUserIsUserInDatabse = await compare(password, hashedPassword);
        return reqUserIsUserInDatabse && email ? true : false;
    };

    /**
     * 
     * @param token which was sent by the client
     */
    public async verfiyJwtToken(token: string): Promise<object | string> {
        const splitedToken = token.split(" ")[1];
        return await verify(splitedToken, 'process.env.JWT_KEY');
    };

    /**
     * 
     * @param id id which is used by mongoose
     */
    public async isUserInDatabase(id: mongoose.Types.ObjectId): Promise<false | ICustomer> {
        const user = await this.repository.getById(id);
        if (user) {
            return user;
        } else {
            return false;
        }
    };
};