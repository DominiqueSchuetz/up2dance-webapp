import { ApplicationUserAction } from "../../../store/types/user.types";
import { Segment, Card, Button, Dimmer, Loader, Header, Container } from "semantic-ui-react";
import { IEvent, IReduxState, IUser } from "../../../models";
import React, { useEffect, Fragment, useState } from "react";
import { ModalDialog } from "../../ModalDialog";
import { UserCard, UserCardForm } from "..";
import { isArray } from "lodash";
import { IReduxGetUsersAction } from "../../../store/types/user.types";

interface IStateProps {
	isUserPayloadLoading: boolean;
	isAuthenticated: boolean;
	userPayload: IReduxState<IUser>;
}

interface IDispatchProps {
	onGetAllUsers(): Promise<IReduxGetUsersAction>;
	onUpdateUserById?(id: string, user: IUser): Promise<ApplicationUserAction>;
	onDeleteUserById(id: string): Promise<ApplicationUserAction>;
}

const UserCardList: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { isUserPayloadLoading, isAuthenticated, userPayload, onGetAllUsers } = props;
	const users: IUser[] = userPayload.items;

	useEffect(
		() => {
			onGetAllUsers();
		},
		[ onGetAllUsers ]
	);

	console.log("users => ", users);

	const renderUserCards = (users: IUser[]) => {
		if (!isUserPayloadLoading) {
			if (isArray(users)) {
				return users.map((mapUser: IUser) => (
					<div key={mapUser._id} style={{ marginTop: 50, marginBottom: 0, marginRight: 40 }}>
						<UserCard isAuthenticated={isAuthenticated} user={mapUser} />
					</div>
				));
			} else {
				return (
					<Fragment>
						<Segment raised style={{ marginTop: 50, marginBottom: 0, marginRight: 40 }}>
							<Header as="h2">Es gibt derzeit keine Events... 😴</Header>
						</Segment>
					</Fragment>
				);
			}
		} else {
			return (
				<Dimmer active inverted page>
					<Loader inline />
				</Dimmer>
			);
		}
	};

	return (
		<section>
			<Container text style={{ marginTop: "100px", marginBottom: "100px" }}>
				<Header as="h1" textAlign="center">
					Mitglieder
				</Header>
			</Container>
			<Card.Group itemsPerRow="4" centered stackable>
				{renderUserCards(users)}
			</Card.Group>
		</section>
	);
};

export default UserCardList;
