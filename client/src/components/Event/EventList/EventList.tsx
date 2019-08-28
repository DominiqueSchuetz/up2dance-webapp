import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal } from "react-materialize";
import { IEvent } from "../../../models";
import { IGetAllEvents } from "../../../types";
import EventForm from "../EventForm/EventForm";

interface IStateProps {
	events: IEvent[];
}

interface IDispatchProps {
	onGetAllEvents(): Promise<IGetAllEvents>;
}

const EventList: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { events, onGetAllEvents } = props;
	const [ headerName, setHeaderName ] = useState<string>("");

	useEffect(
		() => {
			onGetAllEvents();
		},
		[ onGetAllEvents ]
	);

	const handleClick = (e: any) => {
		const target = e.target || e.srcElement;
		setHeaderName(target.name + ` ${"EVENT"}`);
	};

	const modalActions = [
		<Button key="123" modal="close" flat={true}>
			Abbrechen
		</Button>
	];

	const eventForm = <EventForm />;

	const renderAllEvents = events.map((event: IEvent) => (
		<Fragment key={event._id}>
			<tr key={event._id}>
				<td>{event.eventName}</td>
				<td>{event.eventType}</td>
				<td>{event.eventDate}</td>
				<td>{event.timeStart}</td>
				<td>
					<a href="#">{event.commentEvent}</a>
				</td>
				<td>
					<Button name="edit" href="#modal9" className="modal-trigger" onClick={handleClick}>
						EDIT EVENT
					</Button>
					<Button name="edit" href="#modal9" className="modal-trigger" onClick={handleClick}>
						DELETE EVENT
					</Button>
					<Modal
						className="event-form"
						options={{ inDuration: 700, outDuration: 2100, opacity: 0.75 }}
						id="modal9"
						header={headerName.toUpperCase()}
						bottomSheet={true}
						// fixedFooter={true}
						actions={modalActions}
					>
						{eventForm}
					</Modal>
				</td>
			</tr>
		</Fragment>
	));

	const renderTableWrapper = (
		<table className="striped centered responsive-table content-top-margin">
			<thead>
				<tr>
					<th>KONZERT</th>
					<th>ANLASS</th>
					<th>DATUM</th>
					<th>BEGINN</th>
					<th>WEITERE INFOS</th>
				</tr>
			</thead>
			<tbody>{renderAllEvents}</tbody>
		</table>
	);

	return (
		<Fragment>
			<article>
				<div className="circle-reveal-wrapper header event-section-color">
					<div className="circle-background pink" />
					<div className="header-wrapper row valign-wrapper">
						<div className="col s12 m8 offset-m2">
							<h1>ALL EVENTS</h1>
							{renderTableWrapper}
							<Button name="add" href="#modal9" className="modal-trigger" onClick={handleClick}>
								ADD NEW EVENT
							</Button>
							<span className="tagline">Show off your business in a whole new way.</span>
							<button className="read-more">
								<i className="icon-caret-down" />
							</button>
						</div>
					</div>
				</div>
			</article>
		</Fragment>
	);
};

export default EventList;
