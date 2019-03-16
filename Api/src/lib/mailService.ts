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

        const companyName = Object(customerPayload).companyName ? Object(customerPayload).companyName : 'keine Angabe';
        const timeStart = Object(customerPayload).event.timeStart ? Object(customerPayload).event.timeStart : 'noch keine Angabe';
        const timeEnd = Object(customerPayload).event.timeEnd ? Object(customerPayload).event.timeEnd : 'noch keine Angabe';
        const comment = Object(customerPayload).event.comment ? Object(customerPayload).event.comment : 'noch keine Angabe';
        const salary = Object(customerPayload).event.salary ? Object(customerPayload).event.salary : 'noch keine Angabe';
        const paSystem = Object(customerPayload).event.paSystem == true ? 'Ja, ist vorhanden. ' : 'Nein, ist nicht vorhanden. ';

        const mailOptions = {
            from: process.env.MAIL_ADDRESS_GMAIL,
            to: process.env.MAIL_RECIPIENT,
            subject: 'Anfrage von ' + Object(customerPayload).firstName + ' ' + Object(customerPayload).lastName + '(' + companyName + ')' +
                ' für ein Konzert in ' + Object(customerPayload).event.address.city + ' am: ' + Object(customerPayload).event.eventDate,

            text: 'Hallo Freunde, wir haben eine Anfrage(' + Object(customerPayload).event.eventType + ') für die Veranstaltung ' + '"'
                + Object(customerPayload).event.eventName + '"' + 'erhalten.' + '\n\n Der Gig wäre am ' +
                Object(customerPayload).event.eventDate + ' von  ' + timeStart + ' bis '
                + timeEnd
                + '(' + (timeEnd - timeStart) +
                ' Stunden' + ')' + ' im wunderschönen ' + Object(customerPayload).event.address.city + ' .' + '\n\n\n' +

                
                '******************************* \n' +
                'Anmerkung vom Kunden:\n\t' + comment + '\n\n\n' +

                '******************************* \n' +
                'Gage gesamt beträgt:\n\t' + salary + '€' + '\n\n\n' +

                '******************************* \n' +
                'PA vorhanden ?:\n\t' + paSystem + '\n\n\n' +

                '******************************* \n' +
                'Anfahrt zum Gig: \n\t' +
                Object(customerPayload).event.address.street + ' ' + Object(customerPayload).event.address.streetNumber + '\n\t' +
                Object(customerPayload).event.address.city + ' ' + Object(customerPayload).event.address.zipcode + '\n\n\n' +

                '******************************* \n' +
                'Kontaktperson: \n\t' +
                Object(customerPayload).firstName + ' ' + Object(customerPayload).lastName + '\n\t' +
                companyName + '\n\t' +
                Object(customerPayload).mail + '\n\t' +
                Object(customerPayload).phone + '\n\n\n' +
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
