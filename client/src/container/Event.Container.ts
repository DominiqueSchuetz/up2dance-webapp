import { connect } from "react-redux";
//import { getAllEvents } from "../actions/Event.Action";
import { loadEvents } from "../store/effects";
import { EventList } from "../components/Event";
import { IEvent } from "../models";

interface IState {
	EventReducer: IEvent[];
}

export const mapStateToProps = (state: any) => ({
	payload: state.eventReducer
});

export const mapDispatchToProps = {
	onGetAllEvents: loadEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
