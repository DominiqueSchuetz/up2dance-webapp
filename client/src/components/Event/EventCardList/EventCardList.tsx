import { ApplicationEventsAction, IReduxGetEventsAction } from "../../../store/types/event.types";
import { Segment, Card, Button, Dimmer, Loader, Header } from "semantic-ui-react";
import React, { useEffect, Fragment, useState } from "react";
import { ModalDialog } from "../../ModalDialog";
import { EventCard, EventCardForm } from "../";
import { IEvent } from "../../../models";
import { isArray } from "lodash";

interface IStateProps {
	event: IEvent;
	events: IEvent[];
	isLoaded: boolean;
}

interface IDispatchProps {
	onGetAllEvents(): Promise<IReduxGetEventsAction>;
	onCreateEvent(event: IEvent): Promise<ApplicationEventsAction>;
	onUpdateEventById(id: string, event: IEvent): Promise<ApplicationEventsAction>;
	onDeleteEventById(id: string): Promise<ApplicationEventsAction>;
}

const EventCardList: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { events, event, isLoaded, onGetAllEvents, onCreateEvent, onUpdateEventById, onDeleteEventById } = props;
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

	const onCloseEvent = (): void => {
		setModalStatus({ modalOpen: false });
	};

	const handleCancelEvent = (): void => {
		onCloseEvent();
	};

	const modalTriggerButton = (
		<Segment vertical textAlign="center" style={{ marginTop: 90, marginBottom: 0, marginRight: 40 }}>
			<Button
				circular
				content="Neues Event"
				icon="add"
				labelPosition="right"
				color="blue"
				onClick={openModalDialogEditForm}
			/>
		</Segment>
	);

	const renderEventCards = (events: IEvent[]) => {
		if (!isLoaded) {
			if (isArray(events)) {
				return events.map((mapEvent: IEvent) => (
					<Fragment key={mapEvent._id}>
						<Segment raised style={{ marginTop: 50, marginBottom: 0, marginRight: 40 }}>
							<EventCard
								onDeleteEventById={onDeleteEventById}
								updateEventById={onUpdateEventById}
								event={mapEvent}
								children={modalStatus}
							/>
						</Segment>
					</Fragment>
				));
			} else {
				return (
					<Fragment>
						<Segment raised style={{ marginTop: 50, marginBottom: 0, marginRight: 40 }}>
							<Header as="h2">Es gibt derzeit keine Events... 😴</Header>
						</Segment>
					</Fragment>
				);
			}
		} else {
			return (
				<Dimmer active inverted page>
					<Loader inline />
				</Dimmer>
			);
		}
	};

	return (
		<section>
			<ModalDialog trigger={modalTriggerButton} modalStatus={modalStatus.modalOpen} onClose={onCloseEvent}>
				<EventCardForm
					headerText="Neues Event"
					onCreateEvent={onCreateEvent}
					handleCancelEvent={handleCancelEvent}
				/>
			</ModalDialog>
			<Card.Group itemsPerRow="4" centered stackable>
				{renderEventCards(events)}
			</Card.Group>
		</section>
	);
};

export default EventCardList;
