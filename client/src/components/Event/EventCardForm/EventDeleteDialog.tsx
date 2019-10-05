import React, { Fragment } from "react";
import { Button, Header, Icon, ModalActions } from "semantic-ui-react";

interface IStateProps {
	isClicked?: any;
}

const EventDeleteDialog: React.FC<IStateProps> = (props) => {
	const { children } = props;

	return (
		<Fragment>
			<Header as="h2">
				<Header.Content>
					Du möchtest wirklich <Icon color="pink" name="hand point right" /> {Object(children).eventName}{" "}
					<Icon color="pink" name="hand point left" />
					löschen?
				</Header.Content>
			</Header>
			<ModalActions>
				<Button>Ich bin ein Button</Button>
			</ModalActions>
		</Fragment>
	);
};

export default EventDeleteDialog;
