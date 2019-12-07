import { ApplicationReducerState } from "../store/reducers";
import { getAllUsers, deleteUserById, updateUserById } from "../store/effects/user.effects";
import { UserCardList } from "../components/Users";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationReducerState) => ({
	isUserPayloadLoading: state.userReducer.loading.isPayloadLoading,
	isAuthenticated: state.registerReducer.payload.success,
	userPayload: state.userReducer.payload
});

export const mapDispatchToProps = {
	onGetAllUsers: getAllUsers,
	onUpdateUserById: updateUserById,
	onDeleteUserById: deleteUserById
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCardList);
