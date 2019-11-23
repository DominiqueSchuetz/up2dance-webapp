import { connect } from "react-redux";
import { Header } from "../components/Header";
import { ApplicationReducerState } from "../store/reducers";
import { logOutUserRequest } from "../store/actions/user.action";
import { isUserAuthenticated } from "../store/effects/user.effects";

const mapStateToProps = (state: ApplicationReducerState) => ({
	userPayload: state.userReducer.payload
});

export const mapDispatchToProps = {
	onIsUserAuthenticated: isUserAuthenticated,
	onLogOutUser: logOutUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
