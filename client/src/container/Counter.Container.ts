import { connect } from "react-redux";
import { getAllEvents, getCurrentEvent } from "../actions/Event.Action";
import { Counter } from "../components/Counter";

// export const mapStateToProps = (state: any) => ({
//     events: state.EventReducer,
// });

export const mapStateToProps = (state: any) => {
	console.log("My map to state", state);
	return {
		events: state.EventReducer
	};
};

export const mapDispatchToProps = {
	onGetAllEvents: getAllEvents,
	onGetCurrentEvent: getCurrentEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
