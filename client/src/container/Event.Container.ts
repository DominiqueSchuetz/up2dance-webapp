import { connect } from "react-redux";
import { getAllEvents } from "../actions/Event.Action";
import { EventList } from "../components/Event";
import { IEvent } from "../models";

interface IState {
    EventReducer: IEvent[];
}

export const mapStateToProps = (state: IState) => {
    return {
        events: state.EventReducer,
    };
};

export const mapDispatchToProps = {
    onGetAllEvents: getAllEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
