import { connect } from 'react-redux';
import { CustomerForm } from '../components/Customer';
import { createCustomer } from '../store/effects/customer.effects';

export const mapDispatchToProps = {
  onCreateCustomer: createCustomer
};

export default connect(null, mapDispatchToProps)(CustomerForm);
