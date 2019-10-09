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
	const { headerContent, modalStatus, onClose, trigger, children } = props;

	return (
		<Fragment>
			<Modal closeOnDimmerClick={false} closeIcon trigger={trigger} open={modalStatus} onClose={onClose}>
				{children}
			</Modal>
		</Fragment>
	);
};

export default ModalDialog;
