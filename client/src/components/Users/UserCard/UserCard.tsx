import React, { useState } from 'react';
import { Image, Button, Icon, Container, Header } from 'semantic-ui-react';
import { ApplicationUserAction } from '../../../store/types/user.types';
import { ModalDialog } from '../../ModalDialog';
import { Register } from '../../Register';
import { IUser } from '../../../models';
import { UserDeleteDialog } from '..';

type IStateProps = {
  readonly user: IUser;
  readonly isAuthenticated: boolean;
};

type IDispatchProps = {
  onUpdateUser?(id: string, userFormData: FormData): Promise<ApplicationUserAction>;
  onDeleteUser(id: string): Promise<ApplicationUserAction>;
};

const UserCard: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { user, isAuthenticated, onDeleteUser, onUpdateUser } = props;
  const { refId } = user;

  const [modalStatus, setModalStaus] = useState<{ modalOpen: boolean }>({
    modalOpen: false
  });
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
    <UserDeleteDialog user={user} handleCancelUser={handleSpecialEvent} onDeleteUser={onDeleteUser} headerText="User Löschen" />
  ) : (
    <Register user={user} onUpdateUser={onUpdateUser} headerText="User Editieren" />
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
    <>
      <ModalDialog trigger={isAuthenticated ? cardButtonGroup : null} modalStatus={modalStatus.modalOpen} onClose={onCloseEvent}>
        {renderModalComponent}
      </ModalDialog>
      <Image centered bordered circular src={refId ? `http://localhost:8080/api/media/${refId}` : ''} size="medium" />

      <Header textAlign="center">{user.firstName}</Header>
      <Container text>
        <p>{user.comment}</p>
      </Container>
    </>
  );
};

export default UserCard;
