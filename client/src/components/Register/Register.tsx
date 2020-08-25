import React, { useEffect, useState } from 'react';
import { isNil } from 'lodash';
import { Modal } from 'semantic-ui-react';
import { ApplicationUserAction } from '../../store/types/user.types';
import { IUser } from '../../models';
import { RegisterForm } from '.';

type IStateProps = {
  readonly user?: IUser;
  readonly headerText?: string;
};

interface IDispatchProps {
  onRegisterUser?(userFormData: FormData): Promise<ApplicationUserAction>;
  onUpdateUser?(id: string, userFormData: FormData): Promise<ApplicationUserAction>;
}

const Register: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { user, headerText, onRegisterUser, onUpdateUser } = props;
  const [updateForm, setUpdateForm] = useState<boolean>(false);

  useEffect(() => {
    if (!isNil(user)) {
      setUpdateForm(true);
    } else {
      setUpdateForm(false);
    }
  }, [user]);

  const createNewUser = <RegisterForm onRegisterUser={onRegisterUser} />;

  const updateUser = (
    <>
      <Modal.Header>{headerText}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <RegisterForm user={user} onUpdateUser={onUpdateUser} />
        </Modal.Description>
      </Modal.Content>
    </>
  );

  const renderRegisterComponent = updateForm ? updateUser : createNewUser;
  return renderRegisterComponent;
};

export default Register;
