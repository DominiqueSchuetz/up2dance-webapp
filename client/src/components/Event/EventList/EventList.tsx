import { Table, Label, Container, Menu, Icon } from "semantic-ui-react";
import { ApplicationEventsAction } from "../../../store/types";
import { ApplicationState, IEvent } from "../../../models";
import React, { useEffect, useState } from "react";
import EventForm from "../EventForm/EventForm";
import moment from "moment";
import "moment/locale/de";

interface IStateProps {
	payload: ApplicationState;
}

interface IDispatchProps {
	onGetAllEvents(): Promise<ApplicationEventsAction>;
}

const EventList: React.FC<IStateProps & IDispatchProps> = (props) => {
	let events: IEvent[] = [];
	const { payload, onGetAllEvents } = props;

	useEffect(() => {
		onGetAllEvents();
	}, []);

	const eventForm = <EventForm />;

	if (payload) {
		events = payload.payload.data;
		console.log(moment("2019-01-21T18:51:15.724Z").locale("de").format("LL"));
		console.log(moment("2019-01-21T18:51:15.724Z").locale("de").format("LT"));
	}

	return (
		<section>
			<Container>
				<Table celled striped selectable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Veranstaltung</Table.HeaderCell>
							<Table.HeaderCell>Wo</Table.HeaderCell>
							<Table.HeaderCell>Datum</Table.HeaderCell>
							<Table.HeaderCell>Beginn</Table.HeaderCell>
							<Table.HeaderCell>Art der Veranstaltung</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderTableBody(events)}</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell textAlign="right" colSpan="5">
								{events.length} Konzerte
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			</Container>
		</section>
	);
};

export default EventList;

const renderTableBody = (events: IEvent[]) => {
	return events.map((event: IEvent) => (
		<Table.Row key={event._id}>
			{event.eventType === "Hochzeit" ? (
				<Label ribbon>Private Veranstaltung</Label>
			) : (
				<Table.Cell>{event.eventName}</Table.Cell>
			)}
			<Table.Cell>Halle (Saale)</Table.Cell>
			<Table.Cell>{event.eventDate}</Table.Cell>
			<Table.Cell>{event.timeStart}</Table.Cell>
			<Table.Cell>{event.eventType}</Table.Cell>
		</Table.Row>
	));
};
