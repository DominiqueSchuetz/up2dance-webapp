import { ApplicationEventsAction, IReduxGetEventsAction } from "../../../store/types/event.types";
import { Segment, Card, Button, Dimmer, Loader, Header, Container } from "semantic-ui-react";
import { IEvent, IReduxState, IUser } from "../../../models";
import React, { useEffect, Fragment, useState } from "react";
import { ModalDialog } from "../../ModalDialog";
import { EventCard, EventCardForm } from "../";
import { isArray } from "lodash";

interface IStateProps {
	events: IEvent[];
	userPayload: IReduxState<IUser>;
	isAuthenticated: boolean;
	isLoaded: boolean;
}

interface IDispatchProps {
	onIsUserAuthenticated(): Promise<boolean>;
	onGetAllEvents(): Promise<IReduxGetEventsAction>;
	onCreateEvent(event: IEvent): Promise<ApplicationEventsAction>;
	onUpdateEventById(id: string, event: IEvent): Promise<ApplicationEventsAction>;
	onDeleteEventById(id: string): Promise<ApplicationEventsAction>;
}

const EventCardList: React.FC<IStateProps & IDispatchProps> = (props) => {
	const {
		events,
		isLoaded,
		onGetAllEvents,
		onCreateEvent,
		onUpdateEventById,
		onDeleteEventById,
		isAuthenticated
	} = props;
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
			{isAuthenticated && (
				<Button
					circular
					content="Neues Event"
					icon="add"
					labelPosition="right"
					color="blue"
					onClick={openModalDialogEditForm}
				/>
			)}
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
								isAuthenticated={isAuthenticated}
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
							<Header as="h2">
								Es gibt derzeit keine Events...{" "}
								<span role="img" aria-label="sleeping-emoji">
									😴
								</span>
							</Header>
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
			<Container text style={{ marginTop: "100px", marginBottom: "100px" }}>
				<Header as="h1" textAlign="center">
					Konzerte
				</Header>
			</Container>
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
