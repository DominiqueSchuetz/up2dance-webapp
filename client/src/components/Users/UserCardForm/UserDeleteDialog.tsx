import { ApplicationUserAction } from "../../../store/types/user.types";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import React, { Fragment } from "react";
import { IUser } from "../../../models";

interface IStateProps {
	headerText?: string;
	handleCancelUser?: any;
	user: IUser;
}

interface IDispatchProps {
	onDeleteUserById(id: string): Promise<ApplicationUserAction>;
}

const UserDeleteDialog: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { user, handleCancelUser, headerText, onDeleteUserById } = props;

	const handleDeleteUser = () => {
		onDeleteUserById!(user!._id!);
		handleCancelUser();
	};

	return (
		<Fragment>
			<Modal.Header>{headerText}</Modal.Header>
			<Modal.Content image>
				<Modal.Description>
					<Header as="h2">
						<Header.Content>
							Du möchtest wirklich <Icon color="pink" name="hand point right" />
							<i style={{ color: "pink" }}>{user!.firstName}</i>{" "}
							<Icon color="pink" name="hand point left" />
							löschen?
						</Header.Content>
					</Header>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button color="black" onClick={handleCancelUser}>
					Abbrechen
				</Button>
				<Button onClick={handleDeleteUser} positive labelPosition="right" icon="checkmark" content="Löschen" />
			</Modal.Actions>
		</Fragment>
	);
};

export default UserDeleteDialog;
