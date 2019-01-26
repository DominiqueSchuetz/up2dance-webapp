import { Model, Document } from "mongoose";

import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

import * as  mongoose from 'mongoose';
require('dotenv').config()

export class Helpers<T extends Document> {

    /**
     * 
     * @param password 
     */
    public encrypt(password: string): Promise<string> {
        return hash(password, 8);
    };

    /**
     * 
     * @param result 
     */
    public async createJwtToken(result: T): Promise<{}> {
        return new Promise((resolve, reject) => {
            const token: string = sign({ result }, 'process.env.JWT_KEY', { expiresIn: '1h' });
            if (token) {
                return resolve(token)
            } else {
                reject(null);
            }
        });
    };

    /**
     * 
     * @param password 
     * @param hashedPassword 
     */
    public async comparingPasswords(password: string, hashedPassword: string): Promise<boolean> {
        try {
            const result = await compare(password, hashedPassword);
            if (result) {
                return result;
            }
        } catch (error) {
            return error;
        }
    };

    /**
     * 
     * @param jwttoken which was sent by the client
     */
    public verfiyJwtToken(jwttoken: string): Promise<string | object> {
        return new Promise((resolve, reject) => {
            const splitedToken: string = jwttoken.split(" ")[1];
            const verifiedObject: string | object = verify(splitedToken, 'process.env.JWT_KEY')
            if (typeof verifiedObject == 'object' && Object(verifiedObject).result._id) {
                resolve(verifiedObject);
            } else {
                reject(false);
            }
        });
    };

    /**
     * 
     * @param id 
     * @param jwtToken 
     */
    public async authorizeItem(id: mongoose.Types.ObjectId, jwtToken: string): Promise<boolean> {
        try {
            const verifiedObject: string | object = await this.verfiyJwtToken(jwtToken);
            if (typeof verifiedObject == 'object' && Object(verifiedObject).result._id === id) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return error;
        }
    };
};