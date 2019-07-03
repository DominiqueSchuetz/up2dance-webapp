import { Document, Types } from "mongoose";
import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { environments } from "../../config";
import { IMedia } from "../models/interfaces/IMedia";
import { renameSync, unlink, existsSync, mkdirSync } from "fs";
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
            if (jwttoken) {
                const splitedToken: string = jwttoken!.split(" ")[1];
                const verifiedObject: string | object = verify(splitedToken, 'process.env.JWT_KEY')
                if (typeof verifiedObject === 'object' && Object(verifiedObject).result._id) {
                    resolve(verifiedObject);
                } else {
                    reject(new Error('Info: Could not verify the jwt token'));
                }
            } else {
                reject(new Error('Info: No JWT-Token was sent'));
            }
        });
    };


    /**
     * 
     * @param id 
     * @param jwtToken 
     */
    public async authorizeItem(id: Types.ObjectId, jwtToken: string): Promise<boolean> {
        try {
            const verifiedObject: string | object = await this.verfiyJwtToken(jwtToken);
            if (typeof verifiedObject === 'object' && Object(verifiedObject).result._id === id) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return error;
        };
    };


    /**
     * 
     * @param req 
     */
    public uploadFileToFolder(req: any): Promise<IMedia> {
        let newFileObject;
        return new Promise((resolve, reject) => {
            if (req.files.hasOwnProperty('filePath')) {
                for (var key in req.files) {
                    const sizeMax = 1024 * 1024 * 5 >= req.files[key].size ? true : false;
                    const availableTypes = ['image/png', 'image/jpeg', 'application/pdf'];
                    if (req.files && availableTypes.indexOf(req.files[key].type) > -1 && sizeMax) {
                        if (req.files.hasOwnProperty(key)) {
                            const { pathToFileUploadFolderDev } = environments.development
                            const { pathToFileUploadFolderProd } = environments.production
                            if (!existsSync(pathToFileUploadFolderProd) || !existsSync(pathToFileUploadFolderDev)) {
                                mkdirSync(pathToFileUploadFolderProd);
                            };
                            const pathToDisk: string = `./uploads/${req.files[key].name}`;
                            renameSync(req.files[key].path, pathToDisk);
                            unlink(req.files[key].path, (err) => {
                                if (!err) reject('Error in uploading a file');
                            });
                            newFileObject = {
                                fileName: req.body.fileName,
                                filePath: pathToDisk,
                                fileUrl: null
                            };
                            resolve(newFileObject);
                        }
                    } else {
                        reject('Sorry, we only support ==> png, jpeg and pdf with a maximum filesize of 5 Mb');
                    }
                };
            } else if (req.body.hasOwnProperty('fileUrl')) {
                newFileObject = {
                    fileName: req.body.fileName,
                    fileUrl: req.body.fileUrl,
                    filePath: null,
                };
                resolve(newFileObject);
            } else {
                reject('No valid key value ==> need either a fileUrl or a filePath');
            }
        });
    };


    /**
     * 
     * @param firstName 
     * @param lastName 
     * @param companyName 
     * @param phone 
     * @param mail 
     * @param commentCustomer 
     */
    public static customerWithoutEvent(firstName, lastName, companyName, phone, mail, commentCustomer) {
        const mailOptions = {
            from: process.env.MAIL_ADDRESS_GMAIL,
            to: process.env.MAIL_RECIPIENT,
            subject: 'Anfrage von ' + firstName + ' ' + lastName + '(' + companyName + ')',

            text:
                '******************************* \n' +
                'Anmerkung vom Kunden:\n\t' + commentCustomer + '\n\n\n' +

                '******************************* \n' +
                'Kontaktperson: \n\t' +
                firstName + ' ' + lastName + '\n\t' +
                companyName + '\n\t' +
                mail + '\n\t' +
                phone + '\n\n\n' +
                'Mit freundlichen Grüßen\n\n' +
                'up2dance.eu'

        };
        return mailOptions;
    };


    /**
     * 
     * @param firstName 
     * @param lastName 
     * @param companyName 
     * @param phone 
     * @param mail 
     * @param commentCustomer 
     * @param eventName 
     * @param eventType 
     * @param paSystem 
     * @param payment 
     * @param address 
     * @param commentEvent 
     * @param eventDate 
     * @param timeStart 
     * @param timeEnd 
     */
    public static customerWithEvent(firstName, lastName, companyName, phone, mail, commentCustomer, eventName, eventType, paSystem, payment, address, commentEvent, eventDate, timeStart, timeEnd) {
        const mailOptions = {
            from: process.env.MAIL_ADDRESS_GMAIL,
            to: process.env.MAIL_RECIPIENT,
            subject: 'Anfrage von ' + firstName + ' ' + lastName + '(' + companyName + ')' +
                ' für ein Konzert in ' + address.city + ' am: ' + eventDate,

            text: 'Hallo Freunde, wir haben eine Anfrage (' + eventType + ') für die Veranstaltung ' + '"'
                + eventName + '"' + 'erhalten.' + '\n\n Der Gig wäre am ' +
                eventDate + ' von  ' + timeStart + ' bis '
                + timeEnd
                + '(' + (timeEnd - timeStart) +
                ' Stunden' + ')' + ' im wunderschönen ' + address.city + ' .' + '\n\n\n' +

                '******************************* \n' +
                'Anmerkung vom Kunden:\n\t' + commentCustomer + '\n\n\n' +

                '******************************* \n' +
                'Gage gesamt beträgt:\n\t' + payment + '€' + '\n\n\n' +

                '******************************* \n' +
                'PA vorhanden ?:\n\t' + paSystem + '\n\n\n' +

                '******************************* \n' +
                'Anfahrt zum Gig: \n\t' +
                address.street + ' ' + address.streetNumber + '\n\t' +
                address.city + ' ' + address.zipcode + '\n\n\n' +

                '******************************* \n' +
                'Anmerkung zum Event:\n\t' + commentEvent + '\n\n\n' +

                '******************************* \n' +
                'Kontaktperson: \n\t' +
                firstName + ' ' + lastName + '\n\t' +
                companyName + '\n\t' +
                mail + '\n\t' +
                phone + '\n\n\n' +
                'Mit freundlichen Grüßen\n\n' +
                'up2dance.eu'
        };
        return mailOptions;
    };
};
