import {
  effectListEvents,
  effectAddEvent,
  effectUpdateEvent,
  effectRemoveEvent
} from '../store/effects/event.effects';
import { createStructuredSelector } from 'reselect';
import {
  selectEvents,
  selectEventsPayloadIsLoading,
  selectIsUserAuthenticated
} from '../store/selectors';
import { EventCardList } from '../components/Event';
import { connect } from 'react-redux';

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
