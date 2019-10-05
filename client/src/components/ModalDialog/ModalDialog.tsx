import { Modal, Button, ModalProps } from "semantic-ui-react";
import React, { Fragment } from "react";

interface IStateProps {
	trigger: React.ReactNode;
	headerContent: string;
	modalStatus: boolean;
	onClose: ((event: React.MouseEvent<HTMLElement, MouseEvent>, data: ModalProps) => void) | undefined;
	specialEvent?: any;
}

const ModalDialog: React.FC<IStateProps> = (props) => {
	const { headerContent, modalStatus, onClose, trigger, children, specialEvent } = props;

	return (
		<Fragment>
			<Modal closeIcon trigger={trigger} open={modalStatus} onClose={onClose}>
				<Modal.Header content={headerContent} />
				<Modal.Content image>
					<Modal.Description content={children} />
				</Modal.Content>
				<Modal.Actions
					content={
						<Button color="black" onClick={specialEvent}>
							Abbrechen
						</Button>
					}
				/>
			</Modal>
		</Fragment>
	);
};

export default ModalDialog;
