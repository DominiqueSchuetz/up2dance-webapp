import { ApplicationEventsAction, IReduxGetEventsAction } from "../../../store/types/event.types";
import React, { useEffect, Fragment, useState } from "react";
import { Segment, Card, Button } from "semantic-ui-react";
import { IEvent } from "../../../models";
import { isArray } from "lodash";
import { EventCard } from "../";

interface IStateProps {
	events: any;
}

interface IDispatchProps {
	onGetAllEvents(): Promise<IReduxGetEventsAction>;
	onCreateEvent(event: IEvent): Promise<ApplicationEventsAction>;
}

const EventCardList: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { events, onGetAllEvents, onCreateEvent } = props;
	const [ modalStatus, setModalStatus ] = useState<{ modalOpen: boolean }>({ modalOpen: false });

	useEffect(
		() => {
			onGetAllEvents();
		},
		[ onGetAllEvents ]
	);

	const openModalDialogEditForm = (): void => {
		setModalStatus({ modalOpen: true });
	};

	const renderEventCards: (events: IEvent[]) => JSX.Element[] | undefined = (events: IEvent[]) => {
		if (isArray(events)) {
			return events.map((event: IEvent) => (
				<Fragment key={event._id}>
					<Segment raised style={{ marginTop: 90, marginBottom: 0, marginRight: 40 }}>
						<EventCard onCreateEvent={onCreateEvent} event={event} children={modalStatus} />
					</Segment>
				</Fragment>
			));
		}
	};
	return (
		<section>
			<Segment textAlign="center">
				<Button circular icon="add" onClick={openModalDialogEditForm} />
			</Segment>
			<Card.Group itemsPerRow="4" centered stackable>
				{renderEventCards(events)}
			</Card.Group>
		</section>
	);
};

export default EventCardList;
