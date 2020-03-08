import {
  loadCustomersRequest,
  loadCustomerError,
  creatCustomersRequest
} from '../actions/customer.actions';
import { Effect, IResponse, ICustomer } from '../../models';
import { creatCustomerService } from '../../services';
import { toast } from 'react-toastify';

// Create customer
export const createCustomer = (customer: ICustomer): Effect => async (
  dispatch,
  getState
) => {
  dispatch(loadCustomersRequest());
  try {
    const payload: IResponse<ICustomer> = await creatCustomerService(customer);
    if (!!payload.success) {
      toast.success(`${payload.message} 😻`);
      return dispatch(creatCustomersRequest(payload));
    } else {
      toast.info(`${payload.message} 😾`);
      return dispatch(loadCustomerError(payload));
    }
  } catch (e) {
    toast.error(`${e}🙀`);
    return dispatch(loadCustomerError(e));
  }
};
