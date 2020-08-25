/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form, DropdownProps, InputOnChangeData } from 'semantic-ui-react';
import { isEmailValid } from '../../lib';
import { ISignInUserData } from '../../models';
import { IReduxSignInUserAction } from '../../store/types/auth.types';

type IStateProps = {};
type IDispatchProps = {
  onSignin(userData: ISignInUserData): Promise<IReduxSignInUserAction>;
};

const SignInForm: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { onSignin } = props;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement> | any, data: DropdownProps | InputOnChangeData | any) => {
    switch (event.target.name || data.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleRegister = () => {
    onSignin({ email, password });
  };

  return (
    <Form autoComplete="off">
      <Form.Input
        type="text"
        name="email"
        value={email}
        fluid
        icon="user"
        iconPosition="left"
        placeholder="Email adresse"
        onChange={handleOnChange}
        error={!(email!.length > 1 && isEmailValid(email))}
      />
      <Form.Input
        type="password"
        name="password"
        value={password}
        fluid
        icon="lock"
        iconPosition="left"
        placeholder="Password"
        onChange={handleOnChange}
        error={!(email!.length > 4)}
      />

      <Button as={NavLink} to="/" primary fluid size="large" onClick={handleRegister} disabled={!email || !password}>
        Login
      </Button>
    </Form>
  );
};

export default SignInForm;
