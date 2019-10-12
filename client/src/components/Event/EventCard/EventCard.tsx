import { Card, Image, List, Label, Button, Icon, ButtonProps } from "semantic-ui-react";
import React, { Fragment, useState } from "react";
import { ModalDialog } from "../../ModalDialog";
import { IEvent, IAddress } from "../../../models";
import { EventDeleteDialog } from "../";
import { EventCardForm } from "../";
import { ApplicationEventsAction } from "../../../store/types";

interface IStateProps {
	event: IEvent;
}

interface IDispatchProps {
	onCreateEvent(event: IEvent): Promise<ApplicationEventsAction>;
}

const EventCard: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { event, onCreateEvent } = props;
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
		console.log("parent handler");
		onCloseEvent();
	};

	const renderModalComponent: JSX.Element = deleteDialog ? (
		<EventDeleteDialog children={event} handleCancelEvent={handleSpecialEvent} />
	) : (
		<EventCardForm onCreateEvent={onCreateEvent} children={event} handleCancelEvent={handleSpecialEvent} />
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
					trigger={cardButtonGroup}
					modalStatus={modalStatus.modalOpen}
					headerContent={deleteDialog ? "LÖSCHEN" : "EDITIEREN"}
					onClose={onCloseEvent}
					specialEvent={handleSpecialEvent}
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
						color: "grey",
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
