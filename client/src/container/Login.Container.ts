import { signInUser } from "../store/effects/user.effects";
import { ApplicationReducerState } from "../store/reducers";
import { Login } from "../components/Login";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationReducerState) => ({
	userPayload: state.userReducer.payload,
	isLoaded: state.userReducer
});

export const mapDispatchToProps = {
	onSignInUser: signInUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
