/* eslint-disable consistent-return */
import React, { ReactNode, useState } from 'react';
import './event-card.css';
import { Button, Icon } from 'semantic-ui-react';
import { IEvent } from '../../../models';
import { ApplicationEventAction } from '../../../store/types/event.types';
import { EventDeleteDialog, EventCardForm } from '..';
import { EKindOfEventAction } from '../../../enums';
import { ModalDialog } from '../../ModalDialog';

type IStateProps = {
  readonly event: IEvent;
  readonly isAuthenticated: boolean;
};

type IDispatchProps = {
  updateEvent?(id: string, event: IEvent): Promise<ApplicationEventAction>;
  onRemoveEvent?(id: string): Promise<ApplicationEventAction>;
};

const EventCard: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { event, isAuthenticated, updateEvent, onRemoveEvent } = props;
  const { address } = event;

  const [modalStatus, setModalStaus] = useState<{ modalOpen: boolean }>({
    modalOpen: false
  });
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

  const openModalDialogEditForm = (): void => {
    setDeleteDialog(false);
    setModalStaus({ modalOpen: true });
  };

  const openModalDialogDeleteForm = (): void => {
    setDeleteDialog(true);
    setModalStaus({ modalOpen: true });
  };

  const onCloseEvent = (): void => {
    setModalStaus({ modalOpen: false });
  };

  const handleSpecialEvent = (): void => {
    onCloseEvent();
  };

  const renderModalComponent: JSX.Element = deleteDialog ? (
    <EventDeleteDialog onRemoveEvent={onRemoveEvent} event={event} handleCancelEvent={handleSpecialEvent} headerText="Event Löschen" />
  ) : (
    <EventCardForm
      showToggleHidden={true}
      updateEvent={updateEvent}
      event={event}
      handleCancelEvent={handleSpecialEvent}
      kindOfAction={{ kind: EKindOfEventAction.UPDATE_EVENT }}
      headerText="Event Editieren"
    />
  );

  const cardButtonGroup: JSX.Element = (
    <Button.Group widths="16" style={{ marginTop: '2rem' }}>
      <Button name="edit" animated onClick={openModalDialogEditForm}>
        <Button.Content visible>Editieren</Button.Content>
        <Button.Content hidden>
          <Icon name="pencil" />
        </Button.Content>
      </Button>
      <Button.Or />
      <Button name="delete" animated color="grey" onClick={openModalDialogDeleteForm}>
        <Button.Content visible>Löschen</Button.Content>
        <Button.Content hidden>
          <Icon name="trash alternate outline" />
        </Button.Content>
      </Button>
    </Button.Group>
  );

  return (
    <>
      <div className="card-container">
        <ModalDialog trigger={isAuthenticated ? cardButtonGroup : null} modalStatus={modalStatus.modalOpen} onClose={onCloseEvent}>
          {renderModalComponent}
        </ModalDialog>
        <div className="card">
          <div className="card__main-content">
            <h5 className="card__timeStart"> {`${event.timeStart} Uhr`} </h5>
            <h2 className="card__venue">{event.venue}</h2>
            <h5 className="card__event-name">{event.eventName}</h5>
          </div>
          <div className="card__date">
            <span>{event.eventDate}</span>
          </div>
          <div className="card__address">
            <span>{`${address?.streetName} ${address?.streetNumber}`} </span>
            <span>{`${address?.zipCode} ${address?.city}`} </span>
          </div>
          <i className="fas fa-arrow-right" />
          <div className="pic" />
          {renderDots(23)}
          <div className="social">
            <i className="fab fa-facebook-f" />
            <i className="fab fa-twitter" />
            <i className="fab fa-instagram" />
          </div>
          <button type="button" aria-label="_" />
        </div>
      </div>
    </>
  );
};

export default EventCard;

const renderDots = (numberOfDots: number): ReactNode => {
  if (numberOfDots < 1) return;

  return (
    <ul>
      {Array.from(Array(numberOfDots)).map((_) => (
        <li key={_} />
      ))}
    </ul>
  );
};
