import React, { Fragment, useEffect, useState } from "react";
import { Grid, Header, Image, Message, Modal } from "semantic-ui-react";
import { ApplicationUserAction } from "../../store/types/user.types";
import { IUser } from "../../models";
import { RegisterForm } from "./";
import { isNil } from "lodash";

interface IStateProps {
	user?: IUser;
	headerText?: string;
}

interface IDispatchProps {
	onRegisterUser?(userFormData: FormData): Promise<ApplicationUserAction>;
	onUpdateUser?(id: string, userFormData: FormData): Promise<ApplicationUserAction>;
	handleCancelUser(): any;
}

const Register: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { user, headerText, onRegisterUser, onUpdateUser } = props;
	const [ updateForm, setUpdateForm ] = useState<boolean>(false);

	useEffect(
		() => {
			if (!isNil(user)) {
				setUpdateForm(true);
			} else {
				setUpdateForm(false);
			}
		},
		[ user ]
	);

	const createNewUser = (
		<Grid textAlign="center" verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 950 }}>
				<Header as="h2" color="teal" textAlign="center">
					<Image src="images/avatar/large/matthew.png" /> Register
				</Header>
				<RegisterForm onRegisterUser={onRegisterUser} />
				<Message>
					Du bist schon registriert? <a href="/login">Login</a>
				</Message>
			</Grid.Column>
		</Grid>
	);

	const updateUser = (
		<Fragment>
			<Modal.Header>{headerText}</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<RegisterForm user={user} onUpdateUser={onUpdateUser} />
				</Modal.Description>
			</Modal.Content>
		</Fragment>
	);

	const renderRegisterComponent = updateForm ? updateUser : createNewUser;
	return renderRegisterComponent;
};

export default Register;
