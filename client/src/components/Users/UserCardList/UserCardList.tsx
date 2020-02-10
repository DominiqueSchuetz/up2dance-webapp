import { Segment, Card, Dimmer, Loader, Header, Container } from "semantic-ui-react";
import { ApplicationUserAction } from "../../../store/types/user.types";
import { IReduxListUsersAction } from "../../../store/types/user.types";
import { IReduxState, IUser } from "../../../models";
import React, { useEffect, Fragment } from "react";
import { isArray } from "lodash";
import { UserCard } from "..";

type IStateProps = {
	readonly isUserPayloadLoading: boolean;
	readonly isAuthenticated: boolean;
	readonly users: IUser[];
};

type IDispatchProps = {
	onListUsers(): Promise<IReduxListUsersAction>;
	onUpdateUser?(id: string, userFormData: FormData): Promise<ApplicationUserAction>;
	onDeleteUser(id: string): Promise<ApplicationUserAction>;
};

const UserCardList: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { isUserPayloadLoading, isAuthenticated, users, onListUsers, onUpdateUser, onDeleteUser } = props;

	useEffect(
		() => {
			onListUsers();
		},
		[ onListUsers ]
	);

	const renderUserCards = (users: IUser[]) => {
		if (!isUserPayloadLoading) {
			if (isArray(users) && users.length > 0) {
				return users.map((mapUser: IUser) => (
					<div key={mapUser._id} style={{ marginTop: 50, marginBottom: 0, marginRight: 40 }}>
						<UserCard
							isAuthenticated={isAuthenticated}
							user={mapUser}
							onUpdateUser={onUpdateUser}
							onDeleteUser={onDeleteUser}
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
