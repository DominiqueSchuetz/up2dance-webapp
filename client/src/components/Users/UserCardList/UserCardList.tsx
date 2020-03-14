/* eslint-disable no-shadow */
import { isArray } from 'lodash';
import React, { useEffect } from 'react';
import { Segment, Dimmer, Loader, Header, Grid } from 'semantic-ui-react';
import { ApplicationUserAction, IReduxListUsersAction } from '../../../store/types/user.types';
import { IUser } from '../../../models';
import { UserCard } from '..';

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

  useEffect(() => {
    onListUsers();
  }, [onListUsers]);

  // tslint:disable-next-line: no-shadowed-variable
  const renderUserCards = (users: IUser[]) => {
    if (!isUserPayloadLoading) {
      if (isArray(users) && users.length > 0) {
        return users.map((mapUser: IUser) => (
          <Grid.Column key={mapUser?._id}>
            <UserCard isAuthenticated={isAuthenticated} user={mapUser} onUpdateUser={onUpdateUser} onDeleteUser={onDeleteUser} />
          </Grid.Column>
        ));
      }
      return (
        <Segment raised style={{ marginTop: 50, marginBottom: 0, marginRight: 40 }}>
          <Header as="h2">
            Es gibt derzeit keine Benutzer...{' '}
            <span role="img" aria-label="sleeping-emoji">
              😴
            </span>
          </Header>
        </Segment>
      );
    }
    return (
      <Dimmer active inverted page>
        <Loader inline />
      </Dimmer>
    );
  };

  return (
    <section>
      <Header className="headline" textAlign="center">
        MITGLIEDER
      </Header>
      <Grid stackable columns={4} stretched doubling centered>
        <Grid.Row>{renderUserCards(users)}</Grid.Row>
      </Grid>
    </section>
  );
};

export default UserCardList;
