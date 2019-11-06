import { registerUser } from "../store/effects/user.effects";
import { ApplicationReducerState } from "../store/reducers";
import { Register } from "../components/Register";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationReducerState) => ({
	user: state.userReducer.payload.item,
	isLoaded: state.userReducer.loading.isPayloadLoading
});

export const mapDispatchToProps = {
	onRegisterUser: registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
