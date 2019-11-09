import { ISignInUserData, IUser, IReduxState } from "../../models";
import { Grid, Header, Segment, Button, Image, Form, Message } from "semantic-ui-react";
import { IReduxSignInUserAction } from "../../store/types/user.types";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Toast } from "../Toast";

interface IStateProps {
	userPayload: IReduxState<IUser>;
}

interface IDispatchProps {
	onSignInUser(userData: ISignInUserData): Promise<IReduxSignInUserAction>;
}

const Login: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { onSignInUser } = props;
	const { message, success } = props.userPayload;
	const [ email, setEmail ] = useState<string>("");
	const [ password, setPassword ] = useState<string>("");

	const handleOnChange = (e: any) => {
		e.target.name === "email" ? setEmail(e.target.value) : setPassword(e.target.value);
	};

	const handleLogin = () => {
		onSignInUser({ email, password });
	};

	return (
		<div className="App">
			<Toast message={message} success={success} />
			<Grid textAlign="center" style={{}} verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h2" color="teal" textAlign="center">
						<Image src="images/avatar/large/matthew.png" /> Log-in to your account
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
						New to us? <a href="/register">Registrieren</a>
					</Message>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default Login;
