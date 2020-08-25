/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form, DropdownProps, InputOnChangeData, Icon, Container, Input } from 'semantic-ui-react';
import { ApplicationUserAction } from '../../store/types/user.types';
import { IUser, IRegisterUserData, IReduxState, ISocialMediaUrl } from '../../models';
import { EEventTargetName, instrumentOption } from '../../enums';
import { isEmailValid } from '../../lib';
import { FileUpload } from '../FileUpload';
import { ModalDialog } from '../ModalDialog';

interface IStateProps {
  registerPayload?: IReduxState<IRegisterUserData>;
  user?: IUser;
}

interface IDispatchProps {
  onRegisterUser?(userFormData: FormData): Promise<ApplicationUserAction>;
  onUpdateUser?(id: string, userFormData: FormData): Promise<ApplicationUserAction>;
}

const RegisterForm: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { user, onRegisterUser, onUpdateUser } = props;

  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [refId, setRefId] = useState<string | undefined>('');
  const [instrument, setInstrument] = useState<string | undefined>();
  const [filePath, setFilePath] = useState<any | undefined>(undefined);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [socialMediaUrl, setSocialMediaUrl] = useState<ISocialMediaUrl | undefined>({ facebookUrl: '', instagramUrl: '' });
  const [modalFacebookIsOpen, setModalFacebookIsOpen] = useState<boolean>(false);
  const [resetImage, setResetImage] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [comment, setComment] = useState<string | undefined>(undefined);
  const [isUpdatedComponent, setIsUpdatedComponent] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<{ modalOpen: boolean }>({
    modalOpen: false
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    setFirstName(user.firstName);
    setEmail(user.email);
    setRefId(user.refId!);
    setComment(user.comment!);
    setSocialMediaUrl(user.socialMediaUrl!);
    setIsUpdatedComponent(true);
  }, [user]);

  const getImageObjectFromComponent = (imageObject: { mediaFile: any; fileNameWithoutType: any }) => {
    setFilePath(imageObject.mediaFile);
    setFileName(imageObject.fileNameWithoutType);
    addCssState();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement> | any, data: DropdownProps | InputOnChangeData | any) => {
    switch (event.target.name || data.name) {
      case EEventTargetName.firstName:
        setFirstName(event.target.value);
        break;
      case EEventTargetName.email:
        setEmail(event.target.value);
        break;
      case EEventTargetName.password:
        setPassword(event.target.value);
        break;
      case EEventTargetName.secretKey:
        setSecretKey(event.target.value);
        break;
      case EEventTargetName.instrument:
        setInstrument(data.value);
        break;
      case EEventTargetName.fileName:
        setFileName(event.target.value);
        break;
      case EEventTargetName.comment:
        setComment(event.target.value);
        break;
      case EEventTargetName.socialMediaUrl:
        modalFacebookIsOpen
          ? setSocialMediaUrl({ facebookUrl: event.target.value, instagramUrl: socialMediaUrl!.instagramUrl })
          : setSocialMediaUrl({ facebookUrl: socialMediaUrl!.facebookUrl, instagramUrl: event.target.value });
        break;
    }
  };

  const isOkayButtonPressed = () => {
    setModalStatus({ modalOpen: false });
  };

  const handleRegister = () => {
    const userFormData: FormData = new FormData();
    const socialUrl: ISocialMediaUrl = { facebookUrl: socialMediaUrl?.facebookUrl, instagramUrl: socialMediaUrl?.instagramUrl };

    userFormData.append(EEventTargetName.firstName, firstName);
    userFormData.append(EEventTargetName.filePath, filePath);
    userFormData.append(EEventTargetName.fileName, fileName!);
    userFormData.append('isUserPicture', JSON.stringify(true));
    userFormData.append(EEventTargetName.email, email);
    userFormData.append(EEventTargetName.password, password);
    userFormData.append(EEventTargetName.secretKey, secretKey);
    userFormData.append(EEventTargetName.instrument, instrument!);

    if (socialMediaUrl?.facebookUrl || socialMediaUrl?.instagramUrl || comment) {
      userFormData.append(EEventTargetName.socialMediaUrl, JSON.stringify(socialUrl));
      userFormData.append(EEventTargetName.comment, comment!);
    }

    if (isUpdatedComponent) {
      onUpdateUser!(user?._id!, userFormData);
    } else {
      onRegisterUser!(userFormData);
    }

    setFirstName('');
    setEmail('');
    setPassword('');
    setInstrument('');
    setSecretKey('');
    setRefId(undefined);
    setFileName('');
    setFilePath(undefined);
    setComment('');
    setSocialMediaUrl({ facebookUrl: '', instagramUrl: '' });
    setResetImage(true);
    removeCssState();
  };

  const openModalDialogEditForm = (e: any): void => {
    setModalStatus({ modalOpen: true });
    e.target.id === 'facebook' ? setModalFacebookIsOpen(true) : setModalFacebookIsOpen(false);
  };

  const modalTriggerButton = (
    <Container textAlign="center" fluid>
      <Icon id="facebook" name="facebook f" color="black" size="large" onClick={openModalDialogEditForm} />
      <Icon id="instagram" name="instagram" color="black" size="large" onClick={openModalDialogEditForm} />
    </Container>
  );

  const onCloseEvent = (): void => {
    setModalStatus({ modalOpen: false });
  };

  return (
    <Form autoComplete="off">
      <Form.Input
        type="text"
        name={EEventTargetName.firstName}
        value={firstName}
        fluid
        placeholder="Vorname"
        onChange={handleOnChange}
        error={!(firstName!.length > 1)}
      />
      <FileUpload
        id="file-upload"
        name={EEventTargetName.filePath}
        size="medium"
        centered
        refId={refId}
        circular
        getImageObjectFromComponent={getImageObjectFromComponent}
        resetImageUpload={resetImage}
      />
      <Form.Dropdown
        name={EEventTargetName.instrument}
        clearable
        placeholder="Instrument"
        fluid
        selection
        options={instrumentOption}
        onChange={handleOnChange}
        value={instrument}
      />
      <ModalDialog
        isOkayButtonPressed={isOkayButtonPressed}
        headline="Gib deine Url ein"
        trigger={modalTriggerButton}
        modalStatus={modalStatus.modalOpen}
        onClose={onCloseEvent}
      >
        <Input
          type="text"
          name={EEventTargetName.socialMediaUrl}
          icon={modalFacebookIsOpen ? 'facebook f' : 'instagram'}
          iconPosition="left"
          placeholder={modalFacebookIsOpen ? 'Facebook url...' : 'Instagram url...'}
          value={modalFacebookIsOpen ? socialMediaUrl?.facebookUrl : socialMediaUrl?.instagramUrl}
          onChange={handleOnChange}
        />
      </ModalDialog>
      <Form.Input
        type="text"
        name={EEventTargetName.email}
        value={email}
        fluid
        icon="user"
        iconPosition="left"
        placeholder="Email adresse"
        onChange={handleOnChange}
        error={!(email!.length > 1 && isEmailValid(email))}
      />
      <Form.Input
        type="password"
        name={EEventTargetName.password}
        value={password}
        fluid
        icon="lock"
        iconPosition="left"
        placeholder="Password"
        onChange={handleOnChange}
        error={!(email!.length > 4)}
      />
      <Form.Input
        type="password"
        name={EEventTargetName.secretKey}
        value={secretKey}
        fluid
        icon="lock"
        iconPosition="left"
        placeholder="Secret-Key"
        onChange={handleOnChange}
        error={!(email!.length > 4)}
      />

      <Form.TextArea
        style={{ minHeight: 200 }}
        name={EEventTargetName.comment}
        value={comment}
        placeholder="Beschreibe dich selbst..."
        onChange={handleOnChange}
      />
      <Button
        as={NavLink}
        to={isUpdatedComponent ? '#' : '/login'}
        primary
        fluid
        size="large"
        onClick={handleRegister}
        disabled={!firstName || !email || !password || !secretKey}
      >
        Registrieren
      </Button>
    </Form>
  );
};

export default RegisterForm;

const addCssState = () => {
  const signinNode = document.querySelector('.signin');
  const form = document.querySelectorAll('form')[1];
  signinNode?.classList.add('image-visible');
  form.classList.add('image-visible');
};

const removeCssState = () => {
  const signinNode = document.querySelector('.signin');
  signinNode?.classList.remove('image-visible');
};
