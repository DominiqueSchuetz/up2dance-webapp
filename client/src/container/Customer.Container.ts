import { ApplicationReducerState } from "../store/reducers";
import { Customer } from "../components/Customer";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationReducerState) => ({});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
