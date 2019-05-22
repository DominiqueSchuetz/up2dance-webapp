import { Document } from "mongoose";
import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { request } from "http";
import { renameSync, unlink } from "fs";

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
            if (typeof verifiedObject === 'object' && Object(verifiedObject).result._id) {
                resolve(verifiedObject);
            } else {
                throw new Error('Info: Could not verify the jwt token');
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

    public sendPostRequestToNewRoute(path, payload, token): Promise<{}> {
        return new Promise((resolve, reject) => {
            let respondedEventObject = {};
            let requestDetails = {
                'protocol': 'http:',
                'hostname': 'localhost',
                'port': 8080,
                'method': 'POST',
                'path': path,
                'headers': {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
            }
            // Send a request
            let req = request(requestDetails, (res) => {

                res.setEncoding('utf8');
                res.on('data', (eventObject) => {
                    respondedEventObject = JSON.parse(eventObject);
                    resolve(respondedEventObject);
                });
                res.on('end', () => { });
                //callback(res);
            });
            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
            });
            // write data to request body
            req.write(JSON.stringify(payload));
            req.end();




            // const req = request(requestDetails, (res) => {
            //     console.log(`STATUS: ${res.statusCode}`);
            //     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            //     res.setEncoding('utf8');
            //     res.on('data', (chunk) => {
            //         console.log(`BODY: ${chunk}`);
            //     });
            //     res.on('end', () => {
            //         console.log('No more data in response.');
            //     });
            // });

            // req.on('error', (e) => {
            //     console.error(`problem with request: ${e.message}`);
            // });

            // // write data to request body
            // req.write(JSON.stringify(payload));
            // req.end();
        });
    }

    /**
     * uploadFileToFolder
     */

    // // TODO Entweder ein file oder ne url
    public uploadFileToFolder(req: any): Promise<object | boolean | string> {

        return new Promise((resolve, reject) => {

            if (req.files.hasOwnProperty('filePath')) {




                for (var key in req.files) {


                    // Accepts only file sizes less or equal than 5 Mbit
                    const sizeMax = 1024 * 1024 * 5 >= req.files[key].size ? true : false;
                    const availableTypes = ['image/png', 'image/jpeg', 'application/pdf'];

                    if (req.files && availableTypes.indexOf(req.files[key].type) > -1 && sizeMax) {

                        if (req.files.hasOwnProperty(key)) {

                            const pathToDisk: string = `./uploads/${req.files[key].name}`;

                            renameSync(req.files[key].path, pathToDisk);
                            unlink(req.files[key].path, (err) => {
                                if (!err) {
                                    reject('Error in uploading a file')
                                }
                            });

                            let fileName: string = req.files.filePath.name.split(".")[0];
                            let fileObject = {
                                fileName: fileName,
                                filePath: pathToDisk
                            }
                            resolve(fileObject);
                        }
                    } else {
                        reject('Sorry, we only support ==> png, jpeg and pdf.');
                    }
                };
            } else if (req.body.hasOwnProperty('fileUrl')) {
                resolve(true);
            } else {
                reject('No valid key value ==> need either a url or a file');
            }
        });
    }
};