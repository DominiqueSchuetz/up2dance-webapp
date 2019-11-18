import { connect } from "react-redux";
import { Header } from "../components/Header";
import { ApplicationReducerState } from "../store/reducers";
import { logOutUserRequest } from "../store/actions/user.action";
import { getMediaById } from "../store/effects/media.effects";
import { isUserAuthenticated } from "../store/effects/user.effects";

const mapStateToProps = (state: ApplicationReducerState) => ({
	userPayload: state.userReducer.payload,
	mediaPayload: state.mediaReducer.payload.item
});

export const mapDispatchToProps = {
	onIsUserAuthenticated: isUserAuthenticated,
	onLogOutUser: logOutUserRequest,
	onGetMediaById: getMediaById
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
