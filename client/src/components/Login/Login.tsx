/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line import/no-unresolved
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { ISignInUserData, IUser, IReduxState } from '../../models';
import { IReduxSignInUserAction } from '../../store/types/auth.types';
import { Register } from '../Register';
import { SignInForm } from '../SignIn';
import './styles.css';

type IStateProps = { readonly userPayload: IReduxState<IUser> };
type IDispatchProps = {
  onSignin(userData: ISignInUserData): Promise<IReduxSignInUserAction>;
  onRegisterUser(userFormData: FormData);
};

const Login: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { onSignin, onRegisterUser } = props;

  const toggleForm = () => {
    const container = document.querySelector('.login-container');
    const form = document.querySelectorAll('form')[1];
    form.classList.toggle('active');
    container?.classList.toggle('active');
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="user signinBx">
          <div className="imgBx">
            <img src="./images/left_side.jpg" width="auto" height="700px" alt="pic_1" />
          </div>
          <div className="formBx">
            <Button as={NavLink} to="/" size="tiny" basic color="orange" labelPosition="left" icon="left chevron" content="Back" />
            <h2 className="signin-text">Sign In</h2>
            <SignInForm onSignin={onSignin} />
            <p className="signup">
              Noch nicht registriert?{' '}
              <a href="#" onClick={toggleForm}>
                Sign up.
              </a>
            </p>
          </div>
        </div>
        <div className="user signupBx">
          <div className="formBx">
            <Button as={NavLink} to="/" size="tiny" basic color="orange" labelPosition="left" icon="left chevron" content="Back" />
            <h2 className="signup-text">Create an account</h2>
            <Register onRegisterUser={onRegisterUser} />
            <p className="signin">
              Du bist schon registriert?{' '}
              <a href="#" onClick={toggleForm}>
                Sign in.
              </a>
            </p>
          </div>
          <div className="imgBx">
            <img src="./images/right_side.jpg" alt="pic_2" width="400px" height="700px" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
