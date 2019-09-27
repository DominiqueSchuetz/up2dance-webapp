import { ApplicationState, ISignInUserData } from "../../models";
import { ILoadAuthenticationSuccess } from "../../store/types";
import React, { useState, useEffect } from "react";
import { Grid, Header, Segment, Button, Image, Form, Message } from "semantic-ui-react";

interface IStateProps {
	payload: ApplicationState;
}

interface IDispatchProps {
	onSignInUser(userData: ISignInUserData): Promise<ILoadAuthenticationSuccess>;
}

const Login: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { onSignInUser } = props;
	const [ email, setEmail ] = useState<string>("");
	const [ password, setPassword ] = useState<string>("");

	useEffect(() => {
		console.log("loading login component...");
	}, []);

	const handleOnChange = (e: any) => {
		e.target.name === "email" ? setEmail(e.target.value) : setPassword(e.target.value);
	};

	const handleLogin = async () => {
		const response: ILoadAuthenticationSuccess = await onSignInUser({ email, password });
	};

	return (
		<div className="App">
			<Grid textAlign="center" style={{}} verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h2" color="teal" textAlign="center">
						<Image src="images/avatar/large/matthew.png" /> Log-in to your account
					</Header>
					<Form size="large">
						<Segment stacked>
							<Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
							<Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" />
							<Button color="teal" fluid size="large">
								Login
							</Button>
						</Segment>
					</Form>
					<Message>
						New to us? <a href="#">Sign Up</a>
					</Message>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default Login;
