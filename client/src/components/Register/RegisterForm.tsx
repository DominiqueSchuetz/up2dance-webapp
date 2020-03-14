/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Segment, Button, Form, DropdownProps, InputOnChangeData } from 'semantic-ui-react';
import { ApplicationUserAction } from '../../store/types/user.types';
import { IUser, IRegisterUserData, IReduxState } from '../../models';
import { EBandMemberInstrument } from '../../enums';
import { isEmailValid } from '../../lib';
import { FileUpload } from '../FileUpload';

interface IStateProps {
  registerPayload?: IReduxState<IRegisterUserData>;
  user?: IUser;
}

interface IDispatchProps {
  onRegisterUser?(userFormData: FormData): Promise<ApplicationUserAction>;
  onUpdateUser?(id: string, userFormData: FormData): Promise<ApplicationUserAction>;
}

const instrumentOption = [
  {
    text: EBandMemberInstrument.VOCAL,
    value: EBandMemberInstrument.VOCAL
  },
  {
    text: EBandMemberInstrument.VOCAL_AND_GUITAR,
    value: EBandMemberInstrument.VOCAL_AND_GUITAR
  },
  {
    text: EBandMemberInstrument.KEYS,
    value: EBandMemberInstrument.KEYS
  },
  {
    text: EBandMemberInstrument.GUITAR_LEAD,
    value: EBandMemberInstrument.GUITAR_LEAD
  },
  {
    text: EBandMemberInstrument.GUITAR_SOLO,
    value: EBandMemberInstrument.GUITAR_SOLO
  },
  {
    text: EBandMemberInstrument.BASS_GUITAR,
    value: EBandMemberInstrument.BASS_GUITAR
  },
  {
    text: EBandMemberInstrument.DRUMS,
    value: EBandMemberInstrument.DRUMS
  }
];

const RegisterForm: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { user, onRegisterUser, onUpdateUser } = props;

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [refId, setRefId] = useState<string>('');
  const [filePath, setFilePath] = useState<any | undefined>(undefined);
  const [fileName, setFileName] = useState<string | undefined>('');

  const [password, setPassword] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isUpdatedComponent, setIsUpdatedComponent] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setRefId(user.refId!);
    setComment(user.comment!);
    setIsUpdatedComponent(true);
  }, [user]);

  const getImageObjectFromComponent = (imageObject: { file: any; fileNameWithoutType: any }) => {
    setFilePath(imageObject.file);
    setFileName(imageObject.fileNameWithoutType);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement> | any, data: DropdownProps | InputOnChangeData | any) => {
    switch (event.target.name || data.name) {
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'fileName':
        setFileName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'secretKey':
        setSecretKey(event.target.value);
        break;
      case 'comment':
        setComment(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleRegister = () => {
    const userFormData: FormData = new FormData();

    userFormData.append('firstName', firstName);
    userFormData.append('lastName', lastName);
    userFormData.append('filePath', filePath);
    userFormData.append('fileName', fileName!);
    userFormData.append('isUserPicture', JSON.stringify(true));
    userFormData.append('email', email);
    userFormData.append('password', password);
    userFormData.append('secretKey', secretKey);
    userFormData.append('comment', comment);

    if (isUpdatedComponent) {
      onUpdateUser!(user?._id!, userFormData);
    } else {
      onRegisterUser!(userFormData);
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setSecretKey('');
    setRefId('');
    setComment('');
  };

  return (
    <Form autoComplete="off" size="large">
      <Segment stacked>
        <Form.Input
          type="text"
          name="firstName"
          value={firstName}
          fluid
          placeholder="Vorname"
          onChange={handleOnChange}
          error={!(firstName!.length > 1)}
        />
        <Form.Input
          type="text"
          name="lastName"
          value={lastName}
          fluid
          placeholder="Nachname"
          onChange={handleOnChange}
          error={!(lastName!.length > 1)}
        />
        <FileUpload
          id="file-upload"
          name="filePath"
          size="medium"
          centered
          refId={refId}
          circular
          getImageObjectFromComponent={getImageObjectFromComponent}
        />
        <Form.Dropdown
          name="instrument"
          clearable
          placeholder="Instrument"
          fluid
          selection
          options={instrumentOption}
          onChange={handleOnChange}
        />
        <Form.Input
          type="text"
          name="email"
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
          name="password"
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
          name="secretKey"
          value={secretKey}
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Secret-Key"
          onChange={handleOnChange}
          error={!(email!.length > 4)}
        />
        <Form.TextArea style={{ minHeight: 200 }} name="comment" value={comment} placeholder="Kommentar..." onChange={handleOnChange} />
        <Button
          as={NavLink}
          to={isUpdatedComponent ? '#' : '/login'}
          primary
          color="teal"
          fluid
          size="large"
          onClick={handleRegister}
          disabled={!firstName || !lastName || !email || !password || !secretKey}
        >
          Registrieren
        </Button>
      </Segment>
    </Form>
  );
};

export default RegisterForm;
