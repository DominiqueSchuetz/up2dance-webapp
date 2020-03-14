import React, { useEffect, useState } from 'react';
import { Button, Dimmer, Loader, Header, Container, Image, Grid } from 'semantic-ui-react';
import { isArray } from 'lodash';
import { ApplicationEventAction } from '../../../store/types/event.types';
import { IEvent } from '../../../models';
import { ModalDialog } from '../../ModalDialog';
import { EventCard, EventCardForm } from '..';
import { EKindOfEventAction } from '../../../enums';
import { filterByActualYear, parseToDateFormat } from '../../../lib';

type IStateProps = {
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly events: IEvent[];
};

type IDispatchProps = {
  onListEvents(): Promise<ApplicationEventAction>;
  onAddEvent(event: IEvent): Promise<ApplicationEventAction>;
  onUpdateEvent(id: string, event: IEvent): Promise<ApplicationEventAction>;
  onRemoveEvent(id: string): Promise<ApplicationEventAction>;
};

const EventCardList: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { events, isLoading, isAuthenticated, onListEvents, onAddEvent, onUpdateEvent, onRemoveEvent } = props;
  const [modalStatus, setModalStatus] = useState<{ modalOpen: boolean }>({
    modalOpen: false
  });

  useEffect(() => {
    onListEvents();
  }, [onListEvents]);

  const openModalDialogEditForm = (): void => {
    setModalStatus({ modalOpen: true });
  };

  const onCloseEvent = (): void => {
    setModalStatus({ modalOpen: false });
  };

  const handleCancelEvent = (): void => {
    onCloseEvent();
  };

  const modalTriggerButton = (
    <>
      {isAuthenticated && (
        <Button circular content="Neues Event" icon="add" labelPosition="right" color="blue" onClick={openModalDialogEditForm} />
      )}
    </>
  );

  const renderEventCards = (renderEvents: IEvent[]) => {
    if (!isLoading) {
      if (isArray(renderEvents) && renderEvents.length > 0) {
        // Sort by Date
        const sortedArray = renderEvents.slice().sort((a, b) => {
          const c = new Date(parseToDateFormat(a.eventDate));
          const d = new Date(parseToDateFormat(b.eventDate));
          return +c - +d;
        });

        // filter by Date
        const filteredArray = sortedArray.filter((date) => filterByActualYear(date.eventDate));
        filteredArray.length = 3;

        const toogleVisibility = isAuthenticated ? sortedArray : filteredArray.filter((e) => e.hidden !== true);
        return toogleVisibility.map((mapEvent: IEvent) => (
          <Grid.Column key={mapEvent._id} largeScreen="5" computer="5" tablet="6" mobile="16">
            <EventCard onRemoveEvent={onRemoveEvent} updateEvent={onUpdateEvent} isAuthenticated={isAuthenticated} event={mapEvent}>
              {modalStatus}
            </EventCard>
          </Grid.Column>
        ));
      }
      return (
        <>
          <Header as="h2">
            Es gibt derzeit keine Events...{' '}
            <span role="img" aria-label="sleeping-emoji">
              😴
            </span>
          </Header>
        </>
      );
    }
    return (
      <Dimmer active inverted page>
        <Loader inline />
      </Dimmer>
    );
  };

  return (
    <section>
      <Header className="headline" textAlign="center">
        KONZERTE
      </Header>
      <Image className="header-space-bottom" src="./images/events.svg" centered />
      <Container textAlign="center">
        <ModalDialog trigger={modalTriggerButton} modalStatus={modalStatus.modalOpen} onClose={onCloseEvent}>
          <EventCardForm
            showToggleHidden
            headerText="Neues Event"
            onAddEvent={onAddEvent}
            kindOfAction={{ kind: EKindOfEventAction.NEW_EVENT }}
            handleCancelEvent={handleCancelEvent}
          />
        </ModalDialog>
      </Container>
      <Grid stackable columns={4} stretched doubling centered>
        <Grid.Row>{renderEventCards(events)}</Grid.Row>
      </Grid>
    </section>
  );
};

export default EventCardList;
