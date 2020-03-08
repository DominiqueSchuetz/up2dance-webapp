import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  effetIsUserAuthenticated,
  effectSignIn,
  effectSignOut
} from '../store/effects/auth.effects';
import { Header } from '../components/Header';
import {
  selectAuthenticatedUser,
  selectIsUserAuthenticated
} from '../store/selectors';

const mapStateToProps = createStructuredSelector({
  user: selectAuthenticatedUser,
  isAuthenticated: selectIsUserAuthenticated
});

export const mapDispatchToProps = {
  onIsUserAuthenticated: effetIsUserAuthenticated,
  onSignOut: effectSignOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
