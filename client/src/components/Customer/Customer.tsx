import { Input, Button, TextArea, Form, Container, Header } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { ModalDialog } from "../ModalDialog";
import { EventCardForm } from "../Event";

interface IStateProps {}

interface IDispatchProps {}

const Customer: React.FC<IStateProps & IDispatchProps> = (props) => {
	const [ modalStatus, setModalStatus ] = useState<{ modalOpen: boolean }>({ modalOpen: false });
	useEffect(() => {}, []);

	const openModalDialog = (): void => {
		setModalStatus({ modalOpen: true });
	};

	const onCloseEvent = (): void => {
		setModalStatus({ modalOpen: false });
	};

	const handleCancelEvent = (): void => {
		onCloseEvent();
	};

	const eventTriggerButton = (
		<Form.Button
			style={{ marginBottom: "50px", marginTop: "50px" }}
			fluid
			color="black"
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
					required
					control={Input}
					label="Vorname"
					placeholder="Vorname"
				/>
				<Form.Field
					id="form-input-control-last-name"
					required
					control={Input}
					label="Nachname"
					placeholder="Nachname"
				/>
				<Form.Input
					id="form-input-control-company-name"
					control={Input}
					label="Unternehmen/Firma"
					placeholder="Unternehmen/Firma"
				/>
			</Form.Group>
			<Form.Group widths="equal">
				<Form.Field id="form-input-control-email" required control={Input} label="Email" placeholder="Email" />
				<Form.Field
					id="form-input-control-phone"
					type="number"
					control={Input}
					label="Telefon"
					placeholder="Telefon"
				/>
			</Form.Group>
			<ModalDialog trigger={eventTriggerButton} modalStatus={modalStatus.modalOpen} onClose={onCloseEvent}>
				<EventCardForm headerText="Veranstaltungsdetails" handleCancelEvent={handleCancelEvent} />
			</ModalDialog>
			<Form.Field
				style={{ minHeight: 200 }}
				id="form-textarea-control-comment"
				control={TextArea}
				label="Kommentar"
				placeholder="Kommentar"
			/>
			<Form.Field id="form-button-control-public" control={Button} content="Anfrage absenden" />
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
