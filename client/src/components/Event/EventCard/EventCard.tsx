import { ApplicationEventAction } from "../../../store/types/event.types";
import { Card, Image, List, Label, Button, Icon, Grid, GridColumn, Accordion } from "semantic-ui-react";
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
			<Card raised>
				<ModalDialog
					trigger={isAuthenticated ? cardButtonGroup : null}
					modalStatus={modalStatus.modalOpen}
					onClose={onCloseEvent}
				>
					{renderModalComponent}
				</ModalDialog>
				{/* <Image
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
				/> */}

				<Card.Content textAlign="center" style={{ height: "450px" }}>
					<Grid doubling columns="5" textAlign="center" style={{ fontSize: "17px", fontWeight: "bold" }}>
						<GridColumn>10</GridColumn>
						<GridColumn>05</GridColumn>
						<GridColumn>20</GridColumn>
					</Grid>

					<Icon
						name="chess rock"
						size="small"
						color="orange"
						style={{ marginTop: "40px", marginBottom: "40px" }}
					/>
					<Card.Header
						textAlign="center"
						style={{ fontSize: "20px", fontWeight: "bold" }}
						content="UP2DANCE"
					/>
					<Card.Description
						textAlign="center"
						style={{ fontFamily: "Lucida Console", marginTop: "30px", marginBottom: "30px" }}
					>
						<span>spielt/</span>
					</Card.Description>

					<Card.Header
						textAlign="center"
						style={{ fontSize: "31px", fontWeight: "bold", fontVariant: "small-caps" }}
						content={event.eventName}
					/>

					<Card.Header
						textAlign="center"
						style={{ fontSize: "14px", marginTop: "60px", marginBottom: "10px" }}
					>
						<p>HALLE (SAALE), SA </p>
						<p>OBJEKT 5</p>
						<span className="date">Am {event.eventDate}</span>
					</Card.Header>

					{/* <Icon
						name="map"
						color="orange"
						size="big"

						// style={{ marginTop: "40px", marginBottom: "40px" }}
					/> */}

					<Icon
						size="small"
						name="heart"
						color="orange"
						style={{ marginTop: "40px", marginBottom: "40px" }}
					/>

					{/* <Card.Header textAlign="center">{event.eventName}</Card.Header>
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
					</Card.Description> */}
				</Card.Content>

				{/* <Card.Content>
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
				</Card.Content> */}
			</Card>
		</Fragment>
	);
};

export default EventCard;
