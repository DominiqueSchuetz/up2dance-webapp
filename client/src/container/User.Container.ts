import { ApplicationReducerState } from "../store/reducers";
import { getAllUsers, deleteUserById, updateUserById } from "../store/effects/user.effects";
import { AnyAction, bindActionCreators } from "redux";
import { UserCardList } from "../components/Users";
import { connect } from "react-redux";
import { Dispatch } from "react";

const mapStateToProps = (state: ApplicationReducerState) => ({
	isUserPayloadLoading: state.userReducer.loading.isPayloadLoading,
	isAuthenticated: state.registerReducer.payload.success,
	userPayload: state.userReducer.payload
});

export const mapDispatchToProps = {
	onGetAllUsers: getAllUsers,
	onDeleteUserById: deleteUserById
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCardList);
