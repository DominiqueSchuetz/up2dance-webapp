import { ApplicationState, ISignInUserData } from "../../models";
import { ILoadAuthenticationSuccess } from "../../store/types";
import React, { useState, useEffect } from "react";

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
			<h1>Hello from login</h1>
		</div>
	);
};

export default Login;
