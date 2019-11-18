import { signInUser } from "../store/effects/user.effects";
import { ApplicationReducerState } from "../store/reducers";
import { AnyAction, bindActionCreators } from "redux";
import { Login } from "../components/Login";
import { connect } from "react-redux";
import { Dispatch } from "react";

const mapStateToProps = (state: ApplicationReducerState) => ({
	userPayload: state.userReducer.payload,
	isLoaded: state.userReducer
});

export const mapDispatchToProps = {
	onSignInUser: signInUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
