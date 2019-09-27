import { Label, Icon, Button, List, Segment, Header, Image, Card, Modal } from "semantic-ui-react";
import { ApplicationEventsAction } from "../../../store/types";
import { ApplicationState, IEvent } from "../../../models";
import React, { useEffect, useState, Fragment } from "react";
import EventForm from "../EventForm/EventForm";
import moment from "moment";
import "moment/locale/de";

interface IStateProps {
	payload: ApplicationState;
}

interface IDispatchProps {
	onGetAllEvents(): Promise<ApplicationEventsAction>;
}

const EventList: React.FC<IStateProps & IDispatchProps> = (props) => {
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

export default EventList;

const renderEventCards = (events: IEvent[]) => {
	const openModal = () => {
		return { open: false };
	};

	return events.map((event: IEvent) => (
		<Fragment>
			<Segment key={event._id} raised style={{ marginTop: 0, marginBottom: 0 }}>
				<Card key={event._id}>
					<Modal
						closeIcon
						trigger={
							<Button.Group>
								<Button>Edit</Button>
								<Button.Or />
								<Button color="grey">Delete</Button>
							</Button.Group>
						}
					>
						<Modal.Header>Select a Photo</Modal.Header>
						<Modal.Content image>
							<Image wrapped size="medium" src="/images/avatar/large/rachel.png" />
							<Modal.Description>
								<Header>Default Profile Image</Header>
								<p>We've found the following gravatar image associated with your e-mail address.</p>
								<p>Is it okay to use this photo?</p>
							</Modal.Description>
						</Modal.Content>
						<Modal.Actions>
							<Button color="black" onClick={openModal}>
								Nope
							</Button>
							<Button
								positive
								icon="checkmark"
								labelPosition="right"
								content="Yep, that's me"
								onClick={openModal}
							/>
						</Modal.Actions>
					</Modal>
					<Image
						src="/images/avatar/large/matthew.png"
						size="large"
						wrapped
						ui={false}
						label={{
							as: "a",
							color: "teal",
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
									<Icon color="teal" size="big" name="map" />
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
