import React, { Fragment } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

interface IStateProps {
	headerText?: string;
	handleCancelEvent?: any;
}

const EventDeleteDialog: React.FC<IStateProps> = (props) => {
	const { handleCancelEvent, children, headerText } = props;

	return (
		<Fragment>
			<Modal.Header>{headerText}</Modal.Header>
			<Modal.Content image>
				<Modal.Description>
					<Header as="h2">
						<Header.Content>
							Du möchtest wirklich <Icon color="pink" name="hand point right" />
							<i style={{ color: "pink" }}>{Object(children).eventName}</i>{" "}
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
				<Button onClick={handleCancelEvent} positive labelPosition="right" icon="checkmark" content="Na klar" />
			</Modal.Actions>
		</Fragment>
	);
};

export default EventDeleteDialog;
