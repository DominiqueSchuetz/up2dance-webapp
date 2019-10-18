import { getAllEvents, createEvent } from "../store/effects/event.effects";
import { ApplicationReducerState } from "../store/reducers";
import { AnyAction, bindActionCreators } from "redux";
import { EventCardList } from "../components/Event";
import { connect } from "react-redux";
import { Dispatch } from "react";

const mapStateToProps = (state: ApplicationReducerState) => ({
	events: state.eventReducer.payload.items,
	isLoaded: state.eventReducer
});

export const mapDispatchToProps = {
	onGetAllEvents: getAllEvents,
	onCreateEvent: createEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventCardList);
