import { ApplicationEventAction } from "../../../store/types/event.types";
import { Card, Image, List, Label, Button, Icon, Grid, GridColumn, Header } from "semantic-ui-react";
import { IEvent, IAddress } from "../../../models";
import React, { Fragment, useState } from "react";
import { ModalDialog } from "../../ModalDialog";
import { EventDeleteDialog } from "../";
import { EventCardForm } from "../";
import { EKindOfEventAction } from "../../../enums";

type IStateProps = {
	readonly event: IEvent;
	readonly isAuthenticated: boolean;
};

type IDispatchProps = {
	updateEvent?(id: string, event: IEvent): Promise<ApplicationEventAction>;
	onRemoveEvent?(id: string): Promise<ApplicationEventAction>;
};

const EventCard: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { event, isAuthenticated, updateEvent, onRemoveEvent } = props;
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
			onRemoveEvent={onRemoveEvent}
			event={event}
			handleCancelEvent={handleSpecialEvent}
			headerText="Event Löschen"
		/>
	) : (
		<EventCardForm
			showToggleHidden={true}
			updateEvent={updateEvent}
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
			<ModalDialog
				trigger={isAuthenticated ? cardButtonGroup : null}
				modalStatus={modalStatus.modalOpen}
				onClose={onCloseEvent}
			>
				{renderModalComponent}
			</ModalDialog>
			<Card raised fluid header="de">
				<Card.Content className="card-content" textAlign="center">
					<Icon name="chess rock" size="small" color="orange" />
					<Card.Meta>Am</Card.Meta>
					<Card.Header>{event.eventDate}</Card.Header>
					<Card.Header textAlign="center" content={event.eventName} />
					<Card.Meta>im</Card.Meta>
					<Card.Header textAlign="center" content="Objekt 5" />
					<Card.Meta>um</Card.Meta>
					<Card.Header>{event.timeStart}</Card.Header>
					<Card.Meta>in</Card.Meta>
					<Card.Description>{address!.city}</Card.Description>
					<Icon size="small" name="heart" color="orange" />
				</Card.Content>
			</Card>
		</Fragment>
	);
};

export default EventCard;
