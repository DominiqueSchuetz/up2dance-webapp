import { ApplicationEventsAction } from "../../../store/types/event.types";
import { Card, Image, List, Label, Button, Icon } from "semantic-ui-react";
import { IEvent, IAddress } from "../../../models";
import React, { Fragment, useState } from "react";
import { ModalDialog } from "../../ModalDialog";
import { EventDeleteDialog } from "../";
import { EventCardForm } from "../";
import { EKindOfEventAction } from "../../../enums";

interface IStateProps {
	event: IEvent;
	isAuthenticated: boolean;
}

interface IDispatchProps {
	onCreateEvent?(event: IEvent): Promise<ApplicationEventsAction>;
	onGetEventById?(id: string): Promise<ApplicationEventsAction>;
	updateEventById?(id: string, event: IEvent): Promise<ApplicationEventsAction>;
	onDeleteEventById?(id: string): Promise<ApplicationEventsAction>;
}

const EventCard: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { event, isAuthenticated, updateEventById, onDeleteEventById } = props;
	const address: IAddress | undefined = event.address;

	const [ modalStatus, setModalStaus ] = useState<{ modalOpen: boolean }>({ modalOpen: false });
	const [ deleteDialog, setDeleteDialog ] = useState<boolean>(false);

	const openModalDialogEditForm = (): void => {
		setDeleteDialog(false);
		setModalStaus({ modalOpen: true });
	};

	const openModalDialogDeleteForm = (): void => {
		setDeleteDialog(true);
		setModalStaus({ modalOpen: true });
	};

	const onCloseEvent = (): void => {
		setModalStaus({ modalOpen: false });
	};

	const handleSpecialEvent = (): void => {
		onCloseEvent();
	};

	const renderModalComponent: JSX.Element = deleteDialog ? (
		<EventDeleteDialog
			onDeleteEventById={onDeleteEventById}
			event={event}
			handleCancelEvent={handleSpecialEvent}
			headerText="Event Löschen"
		/>
	) : (
		<EventCardForm
			showToggleHidden={true}
			updateEventById={updateEventById}
			event={event}
			handleCancelEvent={handleSpecialEvent}
			kindOfAction={{ kind: EKindOfEventAction.UPDATE_EVENT }}
			headerText="Event Editieren"
		/>
	);

	const cardButtonGroup: JSX.Element = (
		<Button.Group>
			<Button name="edit" animated onClick={openModalDialogEditForm}>
				<Button.Content visible>Editieren</Button.Content>
				<Button.Content hidden>
					<Icon name="pencil" />
				</Button.Content>
			</Button>
			<Button.Or />
			<Button name="delete" animated color="grey" onClick={openModalDialogDeleteForm}>
				<Button.Content visible>Löschen</Button.Content>
				<Button.Content hidden>
					<Icon name="trash alternate outline" />
				</Button.Content>
			</Button>
		</Button.Group>
	);

	return (
		<Fragment>
			<Card>
				<ModalDialog
					trigger={isAuthenticated ? cardButtonGroup : null}
					modalStatus={modalStatus.modalOpen}
					onClose={onCloseEvent}
				>
					{renderModalComponent}
				</ModalDialog>
				<Image
					src="/images/avatar/large/matthew.png"
					size="medium"
					wrapped
					ui={true}
					label={{
						as: "a",
						color: event.eventType !== "Öffentliche Veranstaltung" ? "orange" : "blue",
						content: `${event.eventType}`,
						icon: "bullhorn",
						ribbon: true
					}}
				/>
				<Card.Content>
					<Card.Header textAlign="center">{event.eventName}</Card.Header>
					<Card.Meta textAlign="center">
						<span className="date">Am {event.eventDate}</span>
					</Card.Meta>
					<Card.Meta textAlign="center">
						<span className="date">Um {event.timeStart} Uhr</span>
					</Card.Meta>
					<Card.Description textAlign="center">
						<Label.Group tag>
							<Label size="small" as="a">
								14 €
							</Label>
						</Label.Group>
					</Card.Description>
				</Card.Content>
				<Card.Content>
					<List>
						<List.Item>
							<List.Header>{address!.city}</List.Header>
							<List.Content>{address!.state}</List.Content>
							<List.Content>{address!.zipCode}</List.Content>
						</List.Item>
						<List.Item>
							<List.Header>Maps</List.Header>
							<a href="/">
								<Icon color="grey" size="big" name="map" />
							</a>
						</List.Item>
					</List>
				</Card.Content>
				<Card.Content textAlign="center" extra>
					<Button circular size="mini" inverted color="blue" icon="facebook" />
					<Button
						style={{ marginLeft: 10, marginRight: 10 }}
						circular
						size="mini"
						inverted
						color="orange"
						icon="instagram"
					/>
					<Button circular size="mini" inverted color="red" icon="youtube" />
				</Card.Content>
			</Card>
		</Fragment>
	);
};

export default EventCard;
