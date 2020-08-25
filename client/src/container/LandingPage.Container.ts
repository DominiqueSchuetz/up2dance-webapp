import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { effetIsUserAuthenticated, effectSignOut } from '../store/effects/auth.effects';
import { LandingPage } from '../components/LandingPage';
import { selectAuthenticatedUser, selectIsUserAuthenticated } from '../store/selectors';

const mapStateToProps = createStructuredSelector({
  user: selectAuthenticatedUser,
  isAuthenticated: selectIsUserAuthenticated
});

export const mapDispatchToProps = {
  onIsUserAuthenticated: effetIsUserAuthenticated,
  onSignOut: effectSignOut
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
