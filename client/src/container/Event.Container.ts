import { getAllEvents, createEvent, updateEventById, deleteEventById } from "../store/effects/event.effects";
import { isUserAuthenticated } from "../store/effects/user.effects";
import { ApplicationReducerState } from "../store/reducers";
import { AnyAction, bindActionCreators } from "redux";
import { EventCardList } from "../components/Event";
import { connect } from "react-redux";
import { Dispatch } from "react";

const mapStateToProps = (state: ApplicationReducerState) => ({
	events: state.eventReducer.payload.items,
	event: state.eventReducer.payload.item,
	isAuthenticated: state.registerReducer.payload.success,
	userPayload: state.userReducer.payload,
	isLoaded: state.eventReducer.loading.isPayloadLoading
});

export const mapDispatchToProps = {
	onIsUserAuthenticated: isUserAuthenticated,
	onGetAllEvents: getAllEvents,
	onUpdateEventById: updateEventById,
	onDeleteEventById: deleteEventById,
	onCreateEvent: createEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventCardList);
