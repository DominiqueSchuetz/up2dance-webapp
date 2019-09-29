import { Card, Image, List, Label, Button, Icon } from "semantic-ui-react";
import { ModalDialog } from "../../ModalDialog";
import { IEvent } from "../../../models";
import React, { Fragment } from "react";
import moment from "moment";

interface IStateProps {
	event: IEvent;
}

const EventCard: React.FC<IStateProps> = (props) => {
	const { event } = props;
	return (
		<Fragment>
			<Card>
				<ModalDialog />
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
		</Fragment>
	);
};

export default EventCard;
