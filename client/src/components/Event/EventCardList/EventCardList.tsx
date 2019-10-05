import { ApplicationEventsAction } from "../../../store/types";
import { ApplicationState, IEvent } from "../../../models";
import React, { useEffect, Fragment } from "react";
import { Segment, Card } from "semantic-ui-react";
import { EventCard } from "../";

interface IStateProps {
	payload: ApplicationState;
}

interface IDispatchProps {
	onGetAllEvents(): Promise<ApplicationEventsAction>;
}

const EventCardList: React.FC<IStateProps & IDispatchProps> = (props) => {
	let events: IEvent[] = [];
	const { payload, onGetAllEvents } = props;

	useEffect(
		() => {
			onGetAllEvents();
		},
		[ onGetAllEvents ]
	);

	if (payload) {
		events = payload.payload.data;
	}

	return (
		<section>
			<Card.Group itemsPerRow="4" centered stackable>
				{renderEventCards(events)}
			</Card.Group>
		</section>
	);
};

export default EventCardList;

const renderEventCards = (events: IEvent[]) => {
	return events.map((event: IEvent) => (
		<Fragment key={event._id}>
			<Segment raised style={{ marginTop: 90, marginBottom: 0, marginRight: 40 }}>
				<EventCard event={event} />
			</Segment>
		</Fragment>
	));
};
