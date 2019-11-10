import { connect } from "react-redux";
import { Header } from "../components/Header";
import { ApplicationReducerState } from "../store/reducers";
import { isUserAuthenticated } from "../store/effects/user.effects";

const mapStateToProps = (state: ApplicationReducerState) => ({
	userPayload: state.userReducer.payload.item
});

export const mapDispatchToProps = {
	onIsUserAuthenticated: isUserAuthenticated
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
