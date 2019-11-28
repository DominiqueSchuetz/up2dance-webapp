import {
	Card,
	Image,
	List,
	Label,
	Button,
	Icon,
	Item,
	Container,
	Segment,
	Header,
	Reveal,
	Menu
} from "semantic-ui-react";
import React, { Fragment, useState } from "react";
import { ModalDialog } from "../../ModalDialog";
import { IAddress, IReduxState, IUser } from "../../../models";
import { UserDeleteDialog } from "..";
import { UserCardForm } from "..";
import { ApplicationUserAction } from "../../../store/types/user.types";
import { userInfo } from "os";

interface IStateProps {
	user: IUser;
	isAuthenticated: boolean;
}

interface IDispatchProps {
	onUpdateUserById?(id: string, user: IUser): Promise<ApplicationUserAction>;
	onDeleteUserById?(id: string): Promise<ApplicationUserAction>;
}

const UserCard: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { user, isAuthenticated, onUpdateUserById, onDeleteUserById } = props;
	const { refId } = user;

	const [modalStatus, setModalStaus] = useState<{ modalOpen: boolean }>({ modalOpen: false });
	const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

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
			onDeleteUserById={onDeleteUserById}
			user={user}
			handleCancelUser={handleSpecialEvent}
			headerText="User Löschen"
		/>
	) : (
			<UserCardForm
				onUpdateUserById={onUpdateUserById}
				user={user}
				handleCancelUser={handleSpecialEvent}
				headerText="User Editieren"
			/>
		);

	const cardButtonGroup: JSX.Element = (
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
				<br />
				<Header.Content>
					{cardButtonGroup}
				</Header.Content>
			</Header>
			<Container text>
				<Segment raised piled>
					<Header as="h1">HEADER</Header>
					<p>
						{user.comment}
					</p>
				</Segment>
			</Container>
		</Fragment>
	);
};

export default UserCard;
