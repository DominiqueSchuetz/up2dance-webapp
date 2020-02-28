import { Modal, ModalProps } from "semantic-ui-react";
import React, { Fragment, memo } from "react";

interface IStateProps {
	trigger?: React.ReactNode;
	modalStatus: boolean;
	onClose?: ((event: React.MouseEvent<HTMLElement, MouseEvent>, data: ModalProps) => void) | undefined;
}

const ModalDialog: React.FC<IStateProps> = memo((props) => {
	const { modalStatus, onClose, trigger, children } = props;

	console.log("Modal gets rendered!");

	return (
			<Modal
				dimmer="blurring"
				centered
				closeOnDimmerClick={false}
				closeIcon
				trigger={trigger}
				open={modalStatus}
				onClose={onClose}
			>
				{children}
			</Modal>
	);
});

export default ModalDialog;
