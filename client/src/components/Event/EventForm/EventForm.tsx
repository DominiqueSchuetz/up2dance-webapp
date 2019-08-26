import React, { Fragment, useEffect } from "react";
import { Button, Icon } from "react-materialize";
// import { Datepicker } from "materialize-css";

const EventForm: React.FC = (props) => {
	return (
		<div className="row">
			<form className="col s12">
				<div className="row">
					<div className="input-field col s12 m6 l3">
						<input id="eventName" type="text" className="validate event-form" />
						<label htmlFor="eventName" className="event-form">
							Veranstaltungsname
						</label>
					</div>
					<div className="input-field col s12 m6 l3">
						<input id="address" type="text" className="validate event-form" />
						<label htmlFor="address" className="event-form">
							Ort
						</label>
					</div>
					<div className="input-field col s12 m6 l3">
						<input id="eventType" type="text" className="validate event-form" />
						<label htmlFor="eventType" className="event-form">
							Anlass
						</label>
					</div>
					<div className="input-field col s12 m6 l3">
						<input id="eventDate" type="text" className="validate event-form datepicker" />
						<label htmlFor="eventDate" className="event-form">
							Datum
						</label>
					</div>
					<div className="input-field col s12 m6 l3">
						<input id="timeStart" type="text" className="validate event-form datepicker" />
						<label htmlFor="timeStart" className="event-form">
							Beginn
						</label>
					</div>
				</div>
				<div className="row">
					<div className="col s12 m6 l11" />
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
