import React, { Fragment } from "react";
import { EventCardForm } from "../Event";
import { Modal, Button, Icon } from "semantic-ui-react";

const ModalDialog: React.FC = (props) => {
	const openModal = () => {
		return { open: false };
	};

	return (
		<Fragment>
			<Modal
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
						<EventCardForm />
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button color="black" onClick={openModal}>
						Abbrechen
					</Button>
					<Button positive icon="checkmark" labelPosition="right" content="Okay" onClick={openModal} />
				</Modal.Actions>
			</Modal>
		</Fragment>
	);
};

export default ModalDialog;
