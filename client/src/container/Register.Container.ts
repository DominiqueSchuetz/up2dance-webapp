import { registerUser } from "../store/effects/user.effects";
import { ApplicationReducerState } from "../store/reducers";
import { Register } from "../components/Register";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationReducerState) => ({
	isLoaded: state.userReducer.loading.isPayloadLoading,
	userPayload: state.userReducer.payload.item
	// registerPayload: state.registerReducer.payload,
});

export const mapDispatchToProps = {
	onRegisterUser: registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
