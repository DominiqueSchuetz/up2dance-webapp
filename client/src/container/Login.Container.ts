import { connect } from "react-redux";
import { loginUser } from "../store/effects";
import { Login } from "../components/Login";
import { IEvent } from "../models";

interface IState {
	EventReducer: IEvent[];
}

export const mapStateToProps = (state: any) => ({
	payload: state.authorizedUserReducer
});

export const mapDispatchToProps = {
	onSignInUser: loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
