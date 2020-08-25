import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { effectSignIn } from '../store/effects/auth.effects';
import { Login } from '../components/Login';
import { selectUserPayload } from '../store/selectors';
import { effectRegisterUser } from '../store/effects/user.effects';

const mapStateToProps = createStructuredSelector({
  userPayload: selectUserPayload
});

const mapDispatchToProps = {
  onSignin: effectSignIn,
  onRegisterUser: effectRegisterUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
