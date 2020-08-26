import React, { useEffect } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { ApplicationEventAction } from '../../../store/types/event.types';
import { IEvent } from '../../../models';

type IStateProps = {
  readonly headerText?: string;
  readonly handleCancelEvent?: any;
  readonly event: IEvent;
};

type IDispatchProps = {
  onRemoveEvent?(id: string): Promise<ApplicationEventAction>;
};

const EventDeleteDialog: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { event, handleCancelEvent, headerText, onRemoveEvent } = props;

  useEffect(() => {
    const modalDialog_1 = document.querySelector('.ui.page.modals.dimmer.transition.visible.active');
    const modalDialog_2 = document.querySelector('.ui.page.modals.dimmer .ui.modal.transition.visible.active');
    const modalDialog_3 = document.querySelector('.ui.modal.transition.visible.active .content');
    modalDialog_1?.classList.add('delete_dialog');
    modalDialog_2?.classList.add('delete_dialog');
    modalDialog_3?.classList.add('delete_dialog');
  }, []);

  const handleDeleteEvent = () => {
    onRemoveEvent!(event!._id!);
    handleCancelEvent();
  };

  return (
    <>
      <Modal.Header>{headerText}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header as="h2">
            <Header.Content>
              Du möchtest wirklich <Icon color="pink" name="hand point right" />
              <i style={{ color: 'pink' }}>{event!.eventName}</i> <Icon color="pink" name="hand point left" />
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
    </>
  );
};

export default EventDeleteDialog;
