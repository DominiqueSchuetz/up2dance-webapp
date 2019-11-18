import React, { Fragment } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { ApplicationEventsAction } from "../../../store/types/event.types";
import { IEvent } from "../../../models";

interface IStateProps {
	headerText?: string;
	handleCancelEvent?: any;
	event: IEvent;
}

interface IDispatchProps {
	onDeleteEventById?(id: string): Promise<ApplicationEventsAction>;
}

const EventDeleteDialog: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { event, handleCancelEvent, headerText, onDeleteEventById } = props;

	const handleDeleteEvent = () => {
		onDeleteEventById!(event!._id!);
		handleCancelEvent();
	};

	return (
		<Fragment>
			<Modal.Header>{headerText}</Modal.Header>
			<Modal.Content image>
				<Modal.Description>
					<Header as="h2">
						<Header.Content>
							Du möchtest wirklich <Icon color="pink" name="hand point right" />
							<i style={{ color: "pink" }}>{event!.eventName}</i>{" "}
							<Icon color="pink" name="hand point left" />
							löschen?
						</Header.Content>
					</Header>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button color="black" onClick={handleCancelEvent}>
					Abbrechen
				</Button>
				<Button onClick={handleDeleteEvent} positive labelPosition="right" icon="checkmark" content="Löschen" />
			</Modal.Actions>
		</Fragment>
	);
};

export default EventDeleteDialog;
