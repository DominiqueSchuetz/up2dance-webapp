import { connect } from "react-redux";
import { getCurrentEvent } from "../actions/Event.Action";
import { EventList } from "../components/Event";

export const mapStateToProps = (state: any) => {
    return {
        events: state,
    };
};

export const mapDispatchToProps = {
    onGetCurrentEvent: getCurrentEvent(),
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
