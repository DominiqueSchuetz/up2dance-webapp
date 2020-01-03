import { ApplicationReducerState } from "../store/reducers";
import { getAllMedia, createMedia, deleteMediaById } from "../store/effects/media.effects";
import { Gallery } from "../components/Gallery";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationReducerState) => ({
	allMedia: state.mediaReducer.payload.items,
	media: state.mediaReducer.payload.item,
	hasLoaded: state.mediaReducer.loading.isPayloadLoading,
	isAuthenticated: state.registerReducer.payload.success
});

export const mapDispatchToProps = {
	onGetAllMedia: getAllMedia,
	onCreateMedia: createMedia,
	onDeleteMediaById: deleteMediaById
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
