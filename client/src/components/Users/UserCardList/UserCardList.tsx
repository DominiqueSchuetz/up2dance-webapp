import { Segment, Card, Dimmer, Loader, Header, Container } from "semantic-ui-react";
import { ApplicationUserAction } from "../../../store/types/user.types";
import { IReduxGetUsersAction } from "../../../store/types/user.types";
import { IReduxState, IUser } from "../../../models";
import React, { useEffect, Fragment } from "react";
import { isArray } from "lodash";
import { UserCard } from "..";

interface IStateProps {
	isUserPayloadLoading: boolean;
	isAuthenticated: boolean;
	userPayload: IReduxState<IUser>;
}

interface IDispatchProps {
	onGetAllUsers(): Promise<IReduxGetUsersAction>;
	onUpdateUserById?(id: string, userFormData: FormData): Promise<ApplicationUserAction>;
	onDeleteUserById(id: string): Promise<ApplicationUserAction>;
}

const UserCardList: React.FC<IStateProps & IDispatchProps> = (props) => {
	const {
		isUserPayloadLoading,
		isAuthenticated,
		userPayload,
		onGetAllUsers,
		onUpdateUserById,
		onDeleteUserById
	} = props;
	const users: IUser[] = userPayload.items;

	useEffect(
		() => {
			onGetAllUsers();
		},
		[ onGetAllUsers ]
	);

	const renderUserCards = (users: IUser[]) => {
		if (!isUserPayloadLoading) {
			if (isArray(users)) {
				return users.map((mapUser: IUser) => (
					<div key={mapUser._id} style={{ marginTop: 50, marginBottom: 0, marginRight: 40 }}>
						<UserCard
							isAuthenticated={isAuthenticated}
							user={mapUser}
							onUpdateUserById={onUpdateUserById}
							onDeleteUserById={onDeleteUserById}
						/>
					</div>
				));
			} else {
				return (
					<Fragment>
						<Segment raised style={{ marginTop: 50, marginBottom: 0, marginRight: 40 }}>
							<Header as="h2">
								Es gibt derzeit keine Benutzer...{" "}
								<span role="img" aria-label="sleeping-emoji">
									😴
								</span>
							</Header>
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
				<Header as="h1" style={{ fontSize: "3em" }} textAlign="center">
					MITGLIEDER
				</Header>
			</Container>
			<Card.Group itemsPerRow="4" centered stackable>
				{renderUserCards(users)}
			</Card.Group>
		</section>
	);
};

export default UserCardList;
