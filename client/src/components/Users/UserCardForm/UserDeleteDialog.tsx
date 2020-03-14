import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { ApplicationUserAction } from '../../../store/types/user.types';
import { IUser } from '../../../models';

type IStateProps = {
  readonly headerText?: string;
  readonly handleCancelUser?: any;
  readonly user: IUser;
};

type IDispatchProps = {
  onDeleteUser(id: string): Promise<ApplicationUserAction>;
};

const UserDeleteDialog: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { user, handleCancelUser, headerText, onDeleteUser } = props;

  const handleDeleteUser = () => {
    onDeleteUser!(user?._id!);
    handleCancelUser();
  };

  return (
    <>
      <Modal.Header>{headerText}</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header as="h2">
            <Header.Content>
              Du möchtest wirklich <Icon color="pink" name="hand point right" />
              <i style={{ color: 'pink' }}>{user!.firstName}</i> <Icon color="pink" name="hand point left" />
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
    </>
  );
};

export default UserDeleteDialog;
