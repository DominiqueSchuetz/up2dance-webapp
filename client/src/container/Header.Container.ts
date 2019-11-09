import { connect } from "react-redux";
import { Header } from "../components/Header";
import { ApplicationReducerState } from "../store/reducers";

const mapStateToProps = (state: ApplicationReducerState) => ({
	userPayload: state.userReducer.payload.item
});

export default connect(mapStateToProps)(Header);
