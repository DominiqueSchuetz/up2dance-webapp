import { ApplicationReducerState } from "../store/reducers";
import { CustomerForm } from "../components/Customer";
import { createCustomer } from "../store/effects/customer.effects";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationReducerState) => ({});

export const mapDispatchToProps = {
	onCreateCustomer: createCustomer
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
