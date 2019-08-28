import React, { Fragment, useEffect } from "react";
import { Button, Icon, Select } from "react-materialize";
import { Datepicker, Timepicker } from "materialize-css";

const datepickerOptions = { showClearBtn: true, format: "dddd, d mmmm yyyy", firstDay: 1, showMonthAfterYear: true };
const timepickerOptions = { showClearBtn: true, defaultTime: "20:00", twelveHour: false };

const EventForm: React.FC = (props) => {
	useEffect(() => {
		const datepicker = document.querySelectorAll(".datepicker");
		const timepicker = document.querySelectorAll(".timepicker");
		Datepicker.init(datepicker, datepickerOptions);
		Timepicker.init(timepicker, timepickerOptions);
	});

	const actionHandler = () => {};

	return (
		<div className="row">
			<form className="col s12">
				<div className="row">
					<div className="input-field col s12 m6 l2">
						<input id="eventName" type="text" className="validate event-form" />
						<label htmlFor="eventName" className="event-form">
							Veranstaltungsname
						</label>
					</div>
					<div className="input-field col s12 m6 l2">
						<input id="address" type="text" className="validate event-form" />
						<label htmlFor="address" className="event-form">
							Ort
						</label>
					</div>
					<div className="input-field col s12 m6 l2">
						<Select
							m={12}
							options={{ classes: "event-form" }}
							validate={true}
							value=""
							onChange={actionHandler}
						>
							<option value="" disabled>
								Art des Events
							</option>
							<option value="1">Hochzeit</option>
							<option value="2">Öffentliche Veranstaltung</option>
							<option value="3">Private Veranstaltung</option>
						</Select>
					</div>
					<div className="input-field col s12 m6 l2">
						<input id="eventDate" type="text" className="datepicker event-form validate" />
						<label htmlFor="eventDate" className="event-form">
							Datum
						</label>
					</div>
					<div className="input-field col s12 m6 l2">
						<input id="timeStart" type="text" className="timepicker event-form validate" />
						<label htmlFor="timeStart" className="event-form">
							Beginn
						</label>
					</div>
					<div className="input-field col s12 m6 l2">
						<input id="comments" type="text" className="event-form" />
						<label htmlFor="comments" className="event-form">
							Weiter Infos
						</label>
					</div>
				</div>
				<div className="row">
					<div className="col s12 m6 l5" />
					<div className="col s12 m6 l1">
						<Button className="event-form" modal="close" type="button" waves="light">
							Speichern
							<Icon className="event-form" right>
								send
							</Icon>
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EventForm;
