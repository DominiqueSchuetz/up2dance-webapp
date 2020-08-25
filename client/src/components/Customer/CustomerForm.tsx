import React, { useState } from 'react';
import {
  Input,
  Button,
  TextArea,
  Form,
  Container,
  Header,
  DropdownProps,
  InputOnChangeData,
  Message,
  Image,
  List
} from 'semantic-ui-react';
import { ApplicationCustomersAction } from '../../store/types/customer.types';
import { IAddress, IEvent, ICustomer } from '../../models';
import { EKindOfEventAction } from '../../enums';
import { isEmailValid } from '../../lib';
import { ModalDialog } from '../ModalDialog';
import { EventCardForm } from '../Event';
import { GoogleMaps } from '../GoogleMaps';

interface IDispatchProps {
  onCreateCustomer(customer: ICustomer): Promise<ApplicationCustomersAction>;
}

const CustomerForm: React.FC<IDispatchProps> = (props) => {
  const { onCreateCustomer } = props;
  const [modalStatus, setModalStatus] = useState<{ modalOpen: boolean }>({
    modalOpen: false
  });
  const [event, setEvent] = useState<IEvent | undefined>(undefined);
  const [address, setAddress] = useState<IAddress | undefined>(undefined);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const getEventObjectFromForm = (formEvent: IEvent) => {
    setEvent(formEvent);
    setAddress(formEvent.address);
  };

  const openModalDialog = (): void => {
    setModalStatus({ modalOpen: true });
  };

  const onCloseEvent = (): void => {
    setModalStatus({ modalOpen: false });
  };

  const handleCancelEvent = (): void => {
    onCloseEvent();
  };

  const handleOnChange = (changeEvent: React.ChangeEvent<HTMLInputElement>, data: DropdownProps | InputOnChangeData) => {
    switch (changeEvent.target.name || data.name) {
      case 'firstName':
        setFirstName(changeEvent.target.value);
        break;
      case 'lastName':
        setLastName(changeEvent.target.value);
        break;
      case 'companyName':
        setCompanyName(changeEvent.target.value);
        break;
      case 'email':
        setEmail(changeEvent.target.value);
        break;
      case 'phone':
        setPhone(changeEvent.target.value);
        break;
      case 'comment':
        setComment(changeEvent.target.value);
        break;
      default:
        break;
    }
  };

  const submitFormCustomer = () => {
    const customerObject: ICustomer = {
      firstName,
      lastName,
      companyName,
      email,
      phone,
      comment,
      event
    };
    onCreateCustomer(customerObject);

    resetFormFields(setFirstName, setLastName, setCompanyName, setEmail, setPhone, setComment, setEvent, setAddress);
  };

  const eventTriggerButton = (
    <Form.Button
      className="customer-form-modal"
      fluid
      color={address ? 'green' : 'black'}
      circular
      onClick={openModalDialog}
      disabled={!firstName || !lastName || !isEmailValid(email)}
    >
      Veranstaltungsdetails
    </Form.Button>
  );

  const ListExampleIcon = (eventList: IEvent) => (
    <List bulleted>
      {eventList?.eventName && <List.Item content={eventList.eventName} />}
      {eventList?.eventType && <List.Item content={eventList.eventType} />}
      {eventList?.eventDate && <List.Item content={eventList.eventDate} />}
      {eventList?.timeStart && <List.Item content={eventList.timeStart} />}
      {eventList?.timeEnd && <List.Item content={eventList.timeEnd} />}
    </List>
  );

  return (
    <>
      <Header className="headline" textAlign="center">
        ANFRAGE SENDEN
      </Header>
      <Image className="header-space-bottom" src="./images/contact.svg" size="huge" centered />
      <Container>
        <Form autoComplete="off">
          <Form.Group widths="equal">
            <Form.Field
              id="form-input-control-first-name"
              required
              control={Input}
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              label="Vorname"
              placeholder="Vorname"
            />
            <Form.Field
              id="form-input-control-last-name"
              required
              control={Input}
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              label="Nachname"
              placeholder="Nachname"
            />
            <Form.Input
              id="form-input-control-company-name"
              control={Input}
              name="companyName"
              value={companyName}
              onChange={handleOnChange}
              label="Unternehmen/Firma"
              placeholder="Unternehmen/Firma"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              id="form-input-control-email"
              required
              control={Input}
              name="email"
              value={email}
              onChange={handleOnChange}
              label="Email"
              placeholder="Email"
            />
            <Message
              warning
              header="Could you check something   !"
              list={['That e-mail has been subscribed, but you have not yet clicked the verification link in your e-mail.']}
            />
            <Form.Field
              id="form-input-control-phone"
              type="number"
              control={Input}
              name="phone"
              value={phone}
              onChange={handleOnChange}
              label="Telefon"
              placeholder="Telefon"
            />
          </Form.Group>
          <ModalDialog trigger={eventTriggerButton} modalStatus={modalStatus.modalOpen} onClose={onCloseEvent}>
            <EventCardForm
              event={event}
              showToggleHidden={false}
              headerText="Veranstaltungsdetails"
              handleCancelEvent={handleCancelEvent}
              kindOfAction={{ kind: EKindOfEventAction.CUSTOMER_EVENT }}
              getEventObjectFromForm={getEventObjectFromForm}
            />
          </ModalDialog>
          {ListExampleIcon(event!)}
          {address && <GoogleMaps hasSearchBox={false} storedAddress={address!} />}
          <Form.Field
            style={{ minHeight: 200 }}
            id="form-textarea-control-comment"
            control={TextArea}
            name="comment"
            value={comment}
            onChange={handleOnChange}
            label="Kommentar"
            placeholder="Kommentar"
          />
          <Form.Field
            id="form-button-control-public"
            control={Button}
            onClick={submitFormCustomer}
            content="Anfrage absenden"
            color={firstName && lastName && isEmailValid(email) ? 'green' : 'red'}
            disabled={!firstName || !lastName || !isEmailValid(email)}
          />
        </Form>
      </Container>
    </>
  );
};

export default CustomerForm;

function resetFormFields(
  setFirstName: React.Dispatch<React.SetStateAction<string>>,
  setLastName: React.Dispatch<React.SetStateAction<string>>,
  setCompanyName: React.Dispatch<React.SetStateAction<string>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPhone: React.Dispatch<React.SetStateAction<string>>,
  setComment: React.Dispatch<React.SetStateAction<string>>,
  setEvent: React.Dispatch<React.SetStateAction<IEvent | undefined>>,
  setAddress: React.Dispatch<React.SetStateAction<IAddress | undefined>>
) {
  setFirstName('');
  setLastName('');
  setCompanyName('');
  setEmail('');
  setPhone('');
  setComment('');
  setEvent(undefined);
  setAddress(undefined);
}
