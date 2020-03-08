import {
  Segment,
  Card,
  Dimmer,
  Loader,
  Header,
  Container,
  Grid
} from 'semantic-ui-react';
import { ApplicationUserAction } from '../../../store/types/user.types';
import { IReduxListUsersAction } from '../../../store/types/user.types';
import { IReduxState, IUser } from '../../../models';
import { Card as NewCard } from '../../Card';
import React, { useEffect, Fragment } from 'react';
import { isArray } from 'lodash';
import { UserCard } from '..';

type IStateProps = {
  readonly isUserPayloadLoading: boolean;
  readonly isAuthenticated: boolean;
  readonly users: IUser[];
};

type IDispatchProps = {
  onListUsers(): Promise<IReduxListUsersAction>;
  onUpdateUser?(
    id: string,
    userFormData: FormData
  ): Promise<ApplicationUserAction>;
  onDeleteUser(id: string): Promise<ApplicationUserAction>;
};

const UserCardList: React.FC<IStateProps & IDispatchProps> = (props) => {
  const {
    isUserPayloadLoading,
    isAuthenticated,
    users,
    onListUsers,
    onUpdateUser,
    onDeleteUser
  } = props;

  useEffect(() => {
    onListUsers();
  }, [onListUsers]);

  const renderUserCards = (users: IUser[]) => {
    if (!isUserPayloadLoading) {
      if (isArray(users) && users.length > 0) {
        return users.map((mapUser: IUser) => (
          <Grid.Column>
            {/* <NewCard user={mapUser} /> */}
            <UserCard
              isAuthenticated={isAuthenticated}
              user={mapUser}
              onUpdateUser={onUpdateUser}
              onDeleteUser={onDeleteUser}
            />
          </Grid.Column>
        ));
      } else {
        return (
          <Fragment>
            <Segment
              raised
              style={{ marginTop: 50, marginBottom: 0, marginRight: 40 }}
            >
              <Header as="h2">
                Es gibt derzeit keine Benutzer...{' '}
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
