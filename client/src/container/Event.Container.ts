import { connect } from "react-redux";
import { loadEvents, createEvent } from "../store/effects";
import { EventCardList } from "../components/Event";

export const mapStateToProps = (state: any) => ({
	payload: state.eventReducer.payload.data
});

export const mapDispatchToProps = {
	onGetAllEvents: loadEvents,
	onCreateEvent: createEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventCardList);
