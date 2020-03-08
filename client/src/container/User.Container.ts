import {
  effectListUsers,
  effectUpdateUser,
  effectRemoveUser
} from '../store/effects/user.effects';
import { UserCardList } from '../components/Users';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectUsers,
  selectUserPayloadIsLoading,
  selectIsUserAuthenticated
} from '../store/selectors';

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsUserAuthenticated,
  isUserPayloadLoading: selectUserPayloadIsLoading,
  users: selectUsers
});

export const mapDispatchToProps = {
  onListUsers: effectListUsers,
  onUpdateUser: effectUpdateUser,
  onRemoveUser: effectRemoveUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCardList);
