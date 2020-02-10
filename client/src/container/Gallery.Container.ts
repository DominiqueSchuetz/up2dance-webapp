import { effectListMedia, effectAddMedia, effectRemoveMedia } from "../store/effects/media.effects";
import { Gallery } from "../components/Gallery";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectMediaPayloadIsLoading, selectMedia, selectIsUserAuthenticated } from "../store/selectors";

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectIsUserAuthenticated,
	isMediaLoading: selectMediaPayloadIsLoading,
	media: selectMedia
});

export const mapDispatchToProps = {
	onListMedia: effectListMedia,
	onAddMedia: effectAddMedia,
	onRemoveMedia: effectRemoveMedia
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
