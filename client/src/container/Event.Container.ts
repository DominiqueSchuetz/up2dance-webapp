import { getAllEvents, createEvent, updateEventById, deleteEventById } from "../store/effects/event.effects";
import { ApplicationReducerState } from "../store/reducers";
import { AnyAction, bindActionCreators } from "redux";
import { EventCardList } from "../components/Event";
import { connect } from "react-redux";
import { Dispatch } from "react";

const mapStateToProps = (state: ApplicationReducerState) => ({
	events: state.eventReducer.payload.items,
	event: state.eventReducer.payload.item,
	isLoaded: state.eventReducer.loading.isPayloadLoading
});

export const mapDispatchToProps = {
	onGetAllEvents: getAllEvents,
	onUpdateEventById: updateEventById,
	onDeleteEventById: deleteEventById,
	onCreateEvent: createEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventCardList);
