import { Card, Image, List, Label, Button, Icon } from "semantic-ui-react";
import React, { Fragment, useState } from "react";
import { ModalDialog } from "../../ModalDialog";
import { IEvent } from "../../../models";
import { EventDeleteDialog } from "../";
import { EventCardForm } from "../";
import moment from "moment";

interface IStateProps {
	event: IEvent;
}

const EventCard: React.FC<IStateProps> = (props) => {
	const { event } = props;

	const [ modalStatus, setModalStaus ] = useState<{ modalOpen: boolean }>({ modalOpen: false });
	const [ deleteDialog, setDeleteDialog ] = useState<boolean>(false);
	// const [ specialEvent, setSpecialEvent ] = useState<boolean>(false);

	const openModalDialogEditForm = () => {
		setDeleteDialog(false);
		setModalStaus({ modalOpen: true });
	};

	const openModalDialogDeleteForm = () => {
		setDeleteDialog(true);
		setModalStaus({ modalOpen: true });
	};

	const onCloseEvent = () => {
		setModalStaus({ modalOpen: false });
	};

	const handleSpecialEvent = () => {
		console.log("parent handler");
		onCloseEvent();
	};

	const renderModalComponent: JSX.Element = deleteDialog ? (
		<EventDeleteDialog children={event} handleCancelEvent={handleSpecialEvent} />
	) : (
		<EventCardForm children={event} handleCancelEvent={handleSpecialEvent} />
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
						<span className="date">Am {moment(event.eventDate).locale("de").format("LL")}</span>
					</Card.Meta>
					<Card.Meta textAlign="center">
						<span className="date">Um {moment(event.timeStart).locale("de").format("LT")} Uhr</span>
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
							<List.Header>New York City</List.Header>
							A lovely city
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
