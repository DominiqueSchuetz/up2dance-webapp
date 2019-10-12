import { ApplicationEventsAction, ILoadEventsSuccess } from "../../../store/types";
import React, { useEffect, Fragment } from "react";
import { Segment, Card } from "semantic-ui-react";
import { IEvent } from "../../../models";
import { isArray } from "lodash";
import { EventCard } from "../";

interface IStateProps {
	payload: IEvent[];
}

interface IDispatchProps {
	onGetAllEvents(): Promise<ILoadEventsSuccess>;
	onCreateEvent(event: IEvent): Promise<ApplicationEventsAction>;
}

const EventCardList: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { payload, onGetAllEvents, onCreateEvent } = props;

	useEffect(() => {
		onGetAllEvents();
	}, []);

	const renderEventCards: (events: IEvent[]) => JSX.Element[] | undefined = (events: IEvent[]) => {
		if (isArray(events)) {
			return events.map((event: IEvent) => (
				<Fragment key={event._id}>
					<Segment raised style={{ marginTop: 90, marginBottom: 0, marginRight: 40 }}>
						<EventCard onCreateEvent={onCreateEvent} event={event} />
					</Segment>
				</Fragment>
			));
		}
	};
	return (
		<section>
			<Card.Group itemsPerRow="4" centered stackable>
				{renderEventCards(payload)}
			</Card.Group>
		</section>
	);
};

export default EventCardList;
