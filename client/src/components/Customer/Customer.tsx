import { Input, Button, TextArea, Form, Container, Header, DropdownProps, InputOnChangeData } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { ModalDialog } from "../ModalDialog";
import { EventCardForm } from "../Event";
import { EKindOfEventAction } from "../../enums";
import { GoogleMaps } from "../GoogleMaps";
import { IAddress, IEvent, ICustomer } from "../../models";
import { ApplicationCustomersAction } from "../../store/types/customer.types";

interface IStateProps {}

interface IDispatchProps {
	onCreateCustomer(customer: ICustomer): Promise<ApplicationCustomersAction>;
}

const Customer: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { onCreateCustomer } = props;

	const [ modalStatus, setModalStatus ] = useState<{ modalOpen: boolean }>({ modalOpen: false });
	const [ event, setEvent ] = useState<IEvent | undefined>(undefined);
	const [ address, setAddress ] = useState<IAddress | undefined>(undefined);

	const [ firstName, setFirstName ] = useState<string>("");
	const [ lastName, setLastName ] = useState<string>("");
	const [ phone, setPhone ] = useState<string>("");
	const [ email, setEmail ] = useState<string>("");
	const [ companyName, setCompanyName ] = useState<string>("");
	const [ comment, setComment ] = useState<string>("");

	useEffect(() => {}, []);

	const getEventObjectFromForm = (event: IEvent) => {
		console.log("onAddress 345 ", event);
		setEvent(event);
		setAddress(event.address);
		//address.city.length > 3 ? setAddress(address) : setAddress(undefined);
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

	const handleOnChange = (
		event: React.ChangeEvent<HTMLInputElement> | any,
		data: DropdownProps | InputOnChangeData | any
	) => {
		switch (event.target.name || data.name) {
			case "firstName":
				setFirstName(event.target.value);
				break;
			case "lastName":
				setLastName(event.target.value);
				break;
			case "companyName":
				setCompanyName(event.target.value);
				break;
			case "email":
				setEmail(event.target.value);
				break;
			case "phone":
				setPhone(event.target.value);
				break;
			case "comment":
				setComment(event.target.value);
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
	};

	const eventTriggerButton = (
		<Form.Button
			style={{ marginBottom: "50px", marginTop: "50px" }}
			fluid
			color={address ? "green" : "black"}
			circular
			onClick={openModalDialog}
		>
			Veranstaltungsdetails
		</Form.Button>
	);

	const CustomerForm = () => (
		<Form autoComplete="off">
			<Form.Group widths="equal">
				<Form.Field
					id="form-input-control-first-name"
					error={firstName.length > 2 ? false : true}
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
					error={lastName.length > 2 ? false : true}
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
					error={lastName.length > 2 ? false : true}
					required
					control={Input}
					name="email"
					value={email}
					onChange={handleOnChange}
					label="Email"
					placeholder="Email"
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
					headerText="Veranstaltungsdetails"
					handleCancelEvent={handleCancelEvent}
					kindOfAction={{ kind: EKindOfEventAction.CUSTOMER_EVENT }}
					getEventObjectFromForm={getEventObjectFromForm}
				/>
			</ModalDialog>
			{address && <GoogleMaps storedAddress={address!} getAddress={() => {}} />}
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
			/>
		</Form>
	);

	return (
		<section>
			<Container text style={{ marginTop: "100px", marginBottom: "100px" }}>
				<Header as="h1" style={{ fontSize: "3em" }} textAlign="center">
					Kontakt
				</Header>
			</Container>

			<Container textAlign="center">{CustomerForm()}</Container>
		</section>
	);
};

export default Customer;
