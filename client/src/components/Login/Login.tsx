import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Header, Segment, Button, Image, Form, Message, Container } from 'semantic-ui-react';
import { ISignInUserData, IUser, IReduxState } from '../../models';
import { IReduxSignInUserAction } from '../../store/types/auth.types';

interface IStateProps {
  userPayload: IReduxState<IUser>;
}

interface IDispatchProps {
  onSignin(userData: ISignInUserData): Promise<IReduxSignInUserAction>;
}

const Login: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { onSignin } = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name === 'email' ? setEmail(e.target.value) : setPassword(e.target.value);
  };

  const handleLogin = () => {
    onSignin({ email, password });
  };

  return (
    <Container>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="images/avatar/large/matthew.png" /> Log-in
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                type="text"
                name="email"
                defaultValue={email}
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={handleOnChange}
              />
              <Form.Input
                type="password"
                name="password"
                defaultValue={password}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={handleOnChange}
              />
              <Button as={NavLink} to="/" primary color="teal" fluid size="large" onClick={handleLogin}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Noch nicht registriert? <a href="/register">Registrieren</a>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Login;
