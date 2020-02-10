import { CustomerForm } from "../components/Customer";
import { createCustomer } from "../store/effects/customer.effects";
import { connect } from "react-redux";

export const mapDispatchToProps = {
	onCreateCustomer: createCustomer
};

export default connect(null, mapDispatchToProps)(CustomerForm);
