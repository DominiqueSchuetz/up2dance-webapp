import { ISignInUserData, IUser } from "../../models";
import { Grid, Header, Segment, Button, Image, Form, Message } from "semantic-ui-react";
import { IReduxSignInUserAction } from "../../store/types/user.types";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface IStateProps {
	// payload: IUser;
}

interface IDispatchProps {
	// onSignInUser(userData: ISignInUserData): Promise<IReduxSignInUserAction>;
}

const instrumentOption: any = [
	{
		key: "1234",
		text: "Gesang",
		value: "Gesang"
	},
	{
		key: "2345",
		text: "Gesang/Gitarre",
		value: "Gesang/Gitarre"
	},
	{
		key: "3456",
		text: "Keyboard/Synth",
		value: "Keyboard/Synth"
	},
	{
		key: "4567",
		text: "Gitarre(Lead)",
		value: "Gitarre(Lead)"
	},
	{
		key: "5678",
		text: "Gitarre(Solo)",
		value: "Gitarre(Solo)"
	},
	{
		key: "6789",
		text: "Bass",
		value: "Bass"
	},
	{
		key: "789",
		text: "Schlagzeug",
		value: "Schlagzeug"
	}
];

const Register: React.FC<IStateProps & IDispatchProps> = (props) => {
	//const { onSignInUser } = props;
	const [ email, setEmail ] = useState<string>("");
	const [ password, setPassword ] = useState<string>("");

	useEffect(() => {
		console.log("loading login component...");
	}, []);

	const handleOnChange = (e: any) => {
		e.target.name === "email" ? setEmail(e.target.value) : setPassword(e.target.value);
	};

	const handleRegister = async () => {
		// await onSignInUser({ email, password });
	};

	return (
		<div className="App">
			<Grid textAlign="center" style={{}} verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h2" color="teal" textAlign="center">
						<Image src="images/avatar/large/matthew.png" /> Register
					</Header>
					<Form size="large">
						<Segment stacked>
							<Form.Input
								type="text"
								name="firstName"
								fluid
								placeholder="Vorname"
								onChange={handleOnChange}
							/>
							<Form.Input
								type="text"
								name="lastName"
								fluid
								placeholder="Nachname"
								onChange={handleOnChange}
							/>
							<Form.Button
								type="file"
								name="lastName"
								content="Benutzer-Foto?"
								icon="upload"
								fluid
								placeholder="Nachname"
								onChange={handleOnChange}
							/>
							<Form.Dropdown
								name="instrument"
								// value={eventType}
								clearable
								placeholder="Instrument"
								fluid
								selection
								options={instrumentOption}
								onChange={handleOnChange}
							/>
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
							<Form.TextArea
								style={{ minHeight: 200 }}
								fluid
								placeholder="Kommentar..."
								onChange={handleOnChange}
							/>
							<Button
								as={NavLink}
								to="/"
								primary
								color="teal"
								fluid
								size="large"
								onClick={handleRegister}
							>
								Registrieren
							</Button>
						</Segment>
					</Form>
					<Message>
						Du bist schon registriert? <a href="/login">Login</a>
					</Message>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default Register;
