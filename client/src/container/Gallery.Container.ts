import { ApplicationReducerState } from "../store/reducers";
import { Gallery } from "../components/Gallery";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationReducerState) => ({});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
