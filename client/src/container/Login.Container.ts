import { loginUser } from "../store/effects/user.effects";
import { ApplicationReducerState } from "../store/reducers";
import { AnyAction, bindActionCreators } from "redux";
import { Login } from "../components/Login";
import { connect } from "react-redux";
import { Dispatch } from "react";

const mapStateToProps = (state: ApplicationReducerState) => ({
	users: state.userReducer.payload.items,
	isLoaded: state.userReducer
});

export const mapDispatchToProps = {
	onSignInUser: loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
