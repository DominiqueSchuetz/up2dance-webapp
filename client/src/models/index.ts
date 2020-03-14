/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/indent */
import { ThunkAction } from 'redux-thunk';
import { ApplicationReducerState } from '../store/reducers';
import { ApplicationEventAction } from '../store/types/event.types';
import { ApplicationUserAction } from '../store/types/user.types';
import { ApplicationMediaAction } from '../store/types/media.types';
import { ApplicationCustomersAction } from '../store/types/customer.types';
import { ApplicationAuthAction } from '../store/types/auth.types';

export interface ApplicationState<T, S = null> {
  isLoading: boolean;
  payload: IReduxState<T, S>;
}

export interface IReduxState<T, S = null> {
  success: boolean;
  errorCode: number | undefined | null;
  errorMessage: string | undefined | null;
  message: string | undefined | null;
  authPayload?: S | {} | undefined | null;
  items: T[] | undefined | null;
  item: T | {} | undefined | null;
}

export interface IResponse<T, S = null> {
  success: boolean;
  errorCode: number | undefined | null;
  errorMessage: string | undefined | null;
  authPayload?: S | {} | undefined | null;
  message: string | undefined | null;
  items: T[] | undefined | null;
  item: T | {} | undefined | null;
}

export interface IAddress {
  streetNumber?: string | undefined | null;
  streetName?: string | undefined | null;
  city: string | undefined | null;
  sublocalityLevel1?: string | undefined | null;
  sublocalityLevel2?: string | undefined | null;
  zipCode?: string | undefined | null;
  state: string | undefined | null;
  formattedAddress?: string | undefined;
  location?: { coordinates: number[] } | undefined | null;
}

export interface IEvent {
  _id?: string | undefined;
  address: IAddress | undefined;
  eventName: string;
  eventType?: string | undefined;
  eventDate: string;
  timeStart?: string | undefined;
  timeEnd?: string | undefined;
  comment?: string | undefined;
  entry?: string | undefined;
  hidden?: boolean | undefined;
}

export interface IMedia {
  _id?: string | undefined;
  fileName?: string;
  filePath?: string;
  fileUrl?: string;
  isUserPicture?: boolean;
}

export interface IUser {
  _id?: string | undefined;
  firstName: string;
  lastName: string;
  refId?: string | undefined;
  instrument?: string | undefined;
  email: string;
  password?: string | undefined;
  comment?: string | undefined;
}

export interface ICustomer {
  _id?: string | undefined;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
  email: string;
  comment: string;
  event?: IEvent;
}

export interface ISignInUserData {
  email: string;
  password: string;
}

export interface IRegisterUserData {
  _id?: string | undefined;
  firstName: string;
  lastName: string;
  refId?: string | undefined;
  media?: IMedia;
  instrument?: string | undefined;
  email: string;
  password: string;
  secretKey: string;
  comment?: string | undefined;
}

export interface IAuthUser {
  isAuthenticated: boolean;
  jwtToken: string | undefined;
  authUser: IUser | undefined;
}

export const INITIAL_STATE = <T, S = null>(): ApplicationState<T> => ({
  isLoading: false,
  payload: {
    success: false,
    errorCode: 0,
    errorMessage: undefined,
    message: undefined,
    items: undefined,
    item: undefined
  }
});

export type Effect = ThunkAction<
  any,
  ApplicationReducerState,
  any,
  ApplicationEventAction | ApplicationUserAction | ApplicationMediaAction | ApplicationCustomersAction | ApplicationAuthAction
>;
