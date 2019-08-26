const nodemailer = require("nodemailer");
import { Document } from "mongoose";
import { Repository } from "../repository/repository";
import { Helpers } from "../lib/helpers";

export class MailService<T extends Document> {
	protected _repository: Repository<T>;
	private eventObject;
	private firstName;
	private lastName;
	private companyName;
	private phone;
	private mail;
	private commentCustomer;

	private eventName;
	private eventType;
	private paSystem;
	private payment;
	private address;
	private commentEvent;
	private eventDate;
	private timeStart;
	private timeEnd;
	private mailOptions;

	constructor(result: T, _repository: Repository<T>) {
		this._repository = _repository;
		this.sendMailToClient(result);
	}

	public sendMailToClient(result: T): Promise<{}> {
		const { _id, refId } = Object(result);
		return new Promise(async (resolve, reject) => {
			const transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: process.env.MAIL_ADDRESS_GMAIL,
					pass: process.env.MAIL_PASSWORD_GMAIL
				}
			});

			try {
				if (refId) {
					this.eventObject = await this._repository.getByIdAndRefId(_id);
					let { firstName, lastName, companyName, phone, mail, commentCustomer } = this.eventObject;

					this.firstName = firstName;
					this.lastName = lastName;
					this.companyName = companyName;
					this.phone = phone;
					this.mail = mail;
					this.commentCustomer = commentCustomer;

					let {
						eventName,
						eventType,
						paSystem,
						payment,
						address,
						commentEvent,
						eventDate,
						timeStart,
						timeEnd
					} = this.eventObject!.refId;
					this.eventName = eventName;
					this.eventType = eventType;
					this.paSystem = paSystem;
					this.payment = payment;
					this.address = address;
					this.commentEvent = commentEvent;
					this.eventDate = eventDate;
					this.timeStart = timeStart;
					this.timeEnd = timeEnd;

					// Customer-Object
					this.firstName = this.firstName ? this.firstName : "noch keine Angabe";
					this.lastName = this.lastName ? this.lastName : "noch keine Angabe";
					this.companyName = this.companyName ? this.companyName : "noch keine Angabe";
					this.phone = this.phone ? this.phone : "noch keine Angabe";
					this.mail = this.mail ? this.mail : "noch keine Angabe";
					this.commentCustomer = this.commentCustomer ? this.commentCustomer : "noch keine Angabe";

					// Event-Object
					this.eventName = this.eventName ? this.eventName : "noch keine Angabe";
					this.eventType = this.eventType ? this.eventType : "noch keine Angabe";
					this.paSystem = this.paSystem ? "Ja" : "noch keine Angabe";
					this.payment = this.payment ? this.payment : "noch keine Angabe";
					this.address = this.address ? this.address : "noch keine Angabe";
					this.commentEvent = this.commentEvent ? this.commentEvent : "noch keine Angabe";
					this.eventDate = this.eventDate ? this.eventDate : "noch keine Angabe";
					this.timeStart = this.timeStart ? this.timeStart : "noch keine Angabe";
					this.timeEnd = this.timeEnd ? this.timeEnd : "noch keine Angabe";

					this.mailOptions = Helpers.customerWithEvent(
						this.firstName,
						this.lastName,
						this.companyName,
						this.phone,
						this.mail,
						this.commentCustomer,
						this.eventName,
						this.eventType,
						this.paSystem,
						this.payment,
						this.address,
						this.commentEvent,
						this.eventDate,
						this.timeStart,
						this.timeEnd
					);
				} else {
					this.eventObject = result;
					let { firstName, lastName, companyName, phone, mail, commentCustomer } = this.eventObject;
					this.firstName = firstName;
					this.lastName = lastName;
					this.companyName = companyName;
					this.phone = phone;
					this.mail = mail;
					this.commentCustomer = commentCustomer;

					// Customer-Object
					this.firstName = this.firstName ? this.firstName : "noch keine Angabe";
					this.lastName = this.lastName ? this.lastName : "noch keine Angabe";
					this.companyName = this.companyName ? this.companyName : "noch keine Angabe";
					this.phone = this.phone ? this.phone : "noch keine Angabe";
					this.mail = this.mail ? this.mail : "noch keine Angabe";
					this.commentCustomer = this.commentCustomer ? this.commentCustomer : "noch keine Angabe";

					this.mailOptions = Helpers.customerWithoutEvent(
						this.firstName,
						this.lastName,
						this.companyName,
						this.phone,
						this.mail,
						this.commentCustomer
					);
				}

				transporter.sendMail(this.mailOptions, (err, info) => {
					if (!err) {
						console.log("Mail sent " + info.response);
						return resolve(true);
					} else {
						console.log("Upps, something went wrong " + err);
						return reject(err);
					}
				});
			} catch (error) {
				return error;
			}
		});
	}
}
