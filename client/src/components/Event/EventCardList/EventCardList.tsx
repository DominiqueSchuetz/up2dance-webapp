import { Label, Icon, Button, List, Segment, Divider, Checkbox, Form, Image, Card, Modal } from "semantic-ui-react";
import { ApplicationEventsAction } from "../../../store/types";
import { ApplicationState, IEvent } from "../../../models";
import React, { useEffect, useState, Fragment } from "react";
import EventForm from "../EventCardForm/EventCardForm";
import { GoogleMaps } from "../../GoogleMaps";
import moment from "moment";
import "moment/locale/de";

interface IStateProps {
	payload: ApplicationState;
}

interface IDispatchProps {
	onGetAllEvents(): Promise<ApplicationEventsAction>;
}

const EventCardList: React.FC<IStateProps & IDispatchProps> = (props) => {
	let events: IEvent[] = [];
	const { payload, onGetAllEvents } = props;
	const [ visible, setVisibility ] = useState(false);

	useEffect(() => {
		onGetAllEvents();
	}, []);

	const eventForm = <EventForm />;

	const handleOnClick = () => {
		setVisibility(!visible);
	};

	if (payload) {
		events = payload.payload.data;
		console.log(moment("2019-01-21T18:51:15.724Z").locale("de").format("LL"));
		console.log(moment("2019-01-21T18:51:15.724Z").locale("de").format("LT"));
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
	const openModal = () => {
		return { open: false };
	};

	return events.map((event: IEvent) => (
		<Fragment>
			<Segment key={event._id} raised style={{ marginTop: 90, marginBottom: 0, marginRight: 40 }}>
				<Card>
					<Modal
						// open
						closeIcon
						trigger={
							<Button.Group>
								<Button animated>
									<Button.Content visible>Editieren</Button.Content>
									<Button.Content hidden>
										<Icon name="pencil" />
									</Button.Content>
								</Button>
								<Button.Or />
								<Button animated color="grey">
									<Button.Content visible>Löschen</Button.Content>
									<Button.Content hidden>
										<Icon name="trash alternate outline" />
									</Button.Content>
								</Button>
							</Button.Group>
						}
					>
						<Modal.Header>BEARBEITEN</Modal.Header>
						<Modal.Content image>
							<Modal.Description>
								<Form>
									<Form.Group widths="equal">
										<Form.Input
											error="Bitte gib noch den Namen der Veranstaltung ein"
											required
											fluid
											label="Veranstaltungsname"
											placeholder="Veranstaltungsname"
										/>
										<Form.Input
											error="Bitte gib noch die Art der Veranstaltung ein"
											required
											fluid
											label="Veranstaltungsart"
											placeholder="Veranstaltungsart"
										/>
									</Form.Group>
									<Form.Group widths="equal">
										<Form.Input
											error="Bitte gib noch ein Datum für die Veranstaltung ein"
											required
											type="date"
											fluid
											label="Datum"
											placeholder="Datum"
										/>
										<Form.Input
											error="Bitte gib noch den Beginn der Veranstaltung ein"
											required
											type="time"
											fluid
											label="Beginn"
											placeholder="Beginn"
										/>
									</Form.Group>
									<Form.Group widths="equal">
										<Form.Input type="text" fluid label="Eintritt" placeholder="Eintritt" />
									</Form.Group>
									<Form.Group>
										<Segment raised>{<GoogleMaps />}</Segment>
									</Form.Group>
								</Form>
							</Modal.Description>
						</Modal.Content>
						<Modal.Actions>
							<Button color="black" onClick={openModal}>
								Abbrechen
							</Button>
							<Button
								positive
								icon="checkmark"
								labelPosition="right"
								content="Okay"
								onClick={openModal}
							/>
						</Modal.Actions>
					</Modal>
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
								<a href="">
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
			</Segment>
		</Fragment>
	));
};
