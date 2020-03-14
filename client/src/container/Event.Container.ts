import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { effectListEvents, effectAddEvent, effectUpdateEvent, effectRemoveEvent } from '../store/effects/event.effects';
import { selectEvents, selectEventsPayloadIsLoading, selectIsUserAuthenticated } from '../store/selectors';
import { EventCardList } from '../components/Event';

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsUserAuthenticated,
  isLoading: selectEventsPayloadIsLoading,
  events: selectEvents
});

export const mapDispatchToProps = {
  onListEvents: effectListEvents,
  onAddEvent: effectAddEvent,
  onUpdateEvent: effectUpdateEvent,
  onRemoveEvent: effectRemoveEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventCardList);
