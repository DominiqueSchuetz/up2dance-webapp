import { effectSignIn } from "../store/effects/auth.effects";
import { Login } from "../components/Login";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserPayload } from "../store/selectors";

const mapStateToProps = createStructuredSelector({
	userPayload: selectUserPayload
});

export const mapDispatchToProps = {
	onSignin: effectSignIn
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
