const nodemailer = require('nodemailer');
const result = require('dotenv').config();
import { Document } from "mongoose";
require('dotenv').config()


export class MailService<T extends Document> {

    public sendMailToClient(customerPayload: T) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_ADDRESS_GMAIL,
                pass: process.env.MAIL_PASSWORD_GMAIL
            }
        });

        const paText = Object(customerPayload).pa == true ? 'Ja, ist vorhanden. ' : 'Nein, ist nicht vorhanden. ';

        const mailOptions = {
            from: process.env.MAIL_ADDRESS_GMAIL,
            to: process.env.MAIL_RECIPIENT,
            subject: 'Anfrage von ' + Object(customerPayload).firstName + ' ' + Object(customerPayload).lastName + '(' + Object(customerPayload).companyName + ')' +
                ' für Konzert in ' + Object(customerPayload).event.address.city + ' am: ' + Object(customerPayload).event.eventDate,
            text: 'Hallo Freunde, wir haben eine Anfrage für ' + '"' + Object(customerPayload).event.eventName + '"' + 'erhalten.' + '\n\n Der Gig wäre am ' +
            Object(customerPayload).event.eventDate + ' von  ' + Object(customerPayload).event.timeStart + ' bis ' + Object(customerPayload).event.timeEnd + '(' + (Object(customerPayload).event.timeEnd - Object(customerPayload).event.timeStart) +
                ' Stunden' + ')' + ' im wunderschönen ' + 'Leipzig. \n\n\n' +

                '******************************* \n' +
                'Anmerkung vom Kunden:\n\t' + Object(customerPayload).event.comment + '\n\n\n' +

                '******************************* \n' +
                'Gage gesamt beträgt:\n\t' + Object(customerPayload).event.salary + '€' + '\n\n\n' +

                '******************************* \n' +
                'PA vorhanden ?:\n\t' + paText + '\n\n\n' +

                '******************************* \n' +
                'Anfahrt zum Gig: \n\t' +
                Object(customerPayload).event.address.street + ' ' + Object(customerPayload).event.address.streetNumber + '\n\t' +
                Object(customerPayload).event.address.city + ' ' + Object(customerPayload).event.address.zipcode + '\n\n\n' +

                '******************************* \n' +
                'Kontaktperson: \n\t' +
                Object(customerPayload).firstName + ' ' + Object(customerPayload).lastName + '\n\t' +
                Object(customerPayload).companyName + '\n\t' +
                Object(customerPayload).companyName + '\n\t' +
                Object(customerPayload).companyName + '\n\n\n' +
                'Mit freundlichen Grüßen\n\n' +
                'Up2Dance.eu'
        
        
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (!err) {
                    console.log('Mail sent ' + info.response);
                    resolve(true);
                    //callback('Mail was sent');
                } else {
                    console.log('Upps, something went wrong ' + err);
                    reject(err);
                }
            });
        });
    };
};
