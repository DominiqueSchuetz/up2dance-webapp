import { Image, Button, Icon, Container, Segment, Header } from "semantic-ui-react";
import { ApplicationUserAction } from "../../../store/types/user.types";
import React, { Fragment, useState } from "react";
import { ModalDialog } from "../../ModalDialog";
import { Register } from "../../Register";
import { IUser } from "../../../models";
import { UserDeleteDialog } from "../";

interface IStateProps {
	user: IUser;
	isAuthenticated: boolean;
}

interface IDispatchProps {
	onUpdateUserById?(id: string, userFormData: FormData): Promise<ApplicationUserAction>;
	onDeleteUserById(id: string): Promise<ApplicationUserAction>;
}

const UserCard: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { user, isAuthenticated, onDeleteUserById, onUpdateUserById } = props;
	const { refId } = user;

	const [ modalStatus, setModalStaus ] = useState<{ modalOpen: boolean }>({ modalOpen: false });
	const [ deleteDialog, setDeleteDialog ] = useState<boolean>(false);

	const openModalDialogEditForm = (): void => {
		setDeleteDialog(false);
		setModalStaus({ modalOpen: true });
	};

	const openModalDialogDeleteForm = (): void => {
		setDeleteDialog(true);
		setModalStaus({ modalOpen: true });
	};

	const onCloseEvent = (): void => {
		setModalStaus({ modalOpen: false });
	};

	const handleSpecialEvent = (): void => {
		onCloseEvent();
	};

	const renderModalComponent: JSX.Element = deleteDialog ? (
		<UserDeleteDialog
			user={user}
			handleCancelUser={handleSpecialEvent}
			onDeleteUserById={onDeleteUserById}
			headerText="User Löschen"
		/>
	) : (
		<Register
			user={user}
			handleCancelUser={handleSpecialEvent}
			onUpdateUserById={onUpdateUserById}
			headerText="User Editieren"
		/>
	);

	const cardButtonGroup: JSX.Element = (
		<Container textAlign="center">
			<Button.Group>
				<Button name="edit" animated onClick={openModalDialogEditForm}>
					<Button.Content visible>Editieren</Button.Content>
					<Button.Content hidden>
						<Icon name="pencil" />
					</Button.Content>
				</Button>
				<Button.Or />
				<Button name="delete" animated color="grey" onClick={openModalDialogDeleteForm}>
					<Button.Content visible>Löschen</Button.Content>
					<Button.Content hidden>
						<Icon name="trash alternate outline" />
					</Button.Content>
				</Button>
			</Button.Group>
		</Container>
	);

	return (
		<Fragment>
			<ModalDialog
				trigger={isAuthenticated ? cardButtonGroup : null}
				modalStatus={modalStatus.modalOpen}
				onClose={onCloseEvent}
			>
				{renderModalComponent}
			</ModalDialog>
			<Segment textAlign="center">
				<Image centered circular src={refId ? "http://localhost:8080/api/media/" + refId : ""} size="medium" />
			</Segment>
			<Header as="h1" textAlign="center">
				<Header.Content>{user.firstName}</Header.Content>
			</Header>
			<Container text>
				<Segment raised piled>
					<Header as="h1">HEADER</Header>
					<p>{user.comment}</p>
				</Segment>
			</Container>
		</Fragment>
	);
};

export default UserCard;
