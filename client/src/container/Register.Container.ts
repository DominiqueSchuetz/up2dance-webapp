import { connect } from 'react-redux';
import { effectRemoveMedia } from '../store/effects/media.effects';
import { effectRegisterUser } from '../store/effects/user.effects';
import { Register } from '../components/Register';

export const mapDispatchToProps = {
  onRegisterUser: effectRegisterUser,
  onDeleteMediaById: effectRemoveMedia
};

export default connect(null, mapDispatchToProps)(Register);
