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
}

interface IDispatchProps {
	onUpdateUserById?(id: string, user: IUser): Promise<ApplicationUserAction>;
	onDeleteUserById?(id: string): Promise<ApplicationUserAction>;
}

const UserCard: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { user, onUpdateUserById, onDeleteUserById } = props;
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

	// const renderModalComponent: JSX.Element = deleteDialog ? (
	// 	<UserDeleteDialog
	// 		onDeleteEventById={onDeleteEventById}
	// 		event={event}
	// 		handleCancelEvent={handleSpecialEvent}
	// 		headerText="Event Löschen"
	// 	/>
	// ) : (
	// 	<UserCardForm
	// 		updateEventById={updateEventById}
	// 		event={event}
	// 		handleCancelEvent={handleSpecialEvent}
	// 		headerText="Event Editieren"
	// 	/>
	// );

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
			<Segment textAlign="center" raised piled>
				<Image centered circular src={refId ? "http://localhost:8080/api/media/" + refId : ""} size="medium" />
			</Segment>
			<Header as="h1" textAlign="center">
				<Header.Content>{user.firstName}</Header.Content>
				<br />
				<Header.Content>
					<Button.Group>
						<Button animated="vertical">
							<Button.Content hidden>
								<Icon name="pencil alternate" />
							</Button.Content>
							<Button.Content visible>Bearbeiten</Button.Content>
						</Button>
						<Button.Or />
						<Button color="grey" animated="vertical">
							<Button.Content hidden>
								<Icon name="trash alternate" />
							</Button.Content>
							<Button.Content visible>Löschen</Button.Content>
						</Button>
					</Button.Group>
				</Header.Content>
			</Header>

			<Container text>
				<Header as="h1">HEADER</Header>
				<p>
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
					massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
					Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
					enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
				</p>
			</Container>

			{/* <Segment attached="top">
				<img src="/images/paragraph.png" />
			</Segment>

			<Menu attached="bottom" tabular>
				<Menu.Item name="active" active={true}>
					Bio
				</Menu.Item>

				<Menu.Item name="2">Project #2</Menu.Item>

				<Menu.Item name="3">Project #3</Menu.Item>
			</Menu> */}
		</Fragment>
	);
};

export default UserCard;
