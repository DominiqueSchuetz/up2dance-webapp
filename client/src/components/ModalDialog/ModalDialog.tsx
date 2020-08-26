/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect } from 'react';
import { Modal, ModalProps, Button } from 'semantic-ui-react';

interface IStateProps {
  renderActionButtons?: boolean;
  trigger?: React.ReactNode;
  modalStatus: boolean;
  headline?: string;
  onClose?: ((event: React.MouseEvent<HTMLElement, MouseEvent>, data: ModalProps) => void) | undefined;
  isOkayButtonPressed?: (e: boolean) => void;
}

const ModalDialog: React.FC<IStateProps> = (props) => {
  const { modalStatus, onClose, trigger, headline, children, isOkayButtonPressed, renderActionButtons = true } = props;
  const [isModalOpen, setModalStatus] = useState<boolean | undefined>(modalStatus);

  useEffect(() => {
    setModalStatus(modalStatus);
  }, [modalStatus, trigger]);

  const okayModal = () => {
    setModalStatus(false);
    isOkayButtonPressed!(true);
  };

  const cancelModal = () => {
    setModalStatus(false);
    isOkayButtonPressed!(false);
  };

  return (
    <Modal
      headline={headline}
      dimmer="blurring"
      centered
      closeOnDimmerClick={false}
      closeIcon
      trigger={trigger}
      open={isModalOpen}
      onClose={onClose}
    >
      {headline && <Modal.Header>{headline}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
      {renderActionButtons && (
        <Modal.Actions>
          <Button primary onClick={okayModal}>
            OKAY
          </Button>
          <Button onClick={cancelModal}>ABBRECHEN</Button>
        </Modal.Actions>
      )}
    </Modal>
  );
};

export default ModalDialog;
