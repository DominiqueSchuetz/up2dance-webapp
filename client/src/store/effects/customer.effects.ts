import { toast } from 'react-toastify';
import { loadCustomersRequest, loadCustomerError, creatCustomersRequest } from '../actions/customer.actions';
import { Effect, IResponse, ICustomer } from '../../models';
import { creatCustomerService } from '../../services';

// Create customer
export const createCustomer = (customer: ICustomer): Effect => async (dispatch, _) => {
  dispatch(loadCustomersRequest());
  try {
    const payload: IResponse<ICustomer> = await creatCustomerService(customer);
    if (payload.success) {
      toast.success(`${payload.message} 😻`);
      dispatch(creatCustomersRequest(payload));
    } else {
      toast.info(`${payload.message} 😾`);
      dispatch(loadCustomerError(payload));
    }
  } catch (e) {
    toast.error(`${e}🙀`);
    dispatch(loadCustomerError(e));
  }
};
