import { DateInput, TimeInput } from "semantic-ui-calendar-react";
import { GoogleMaps } from "../../GoogleMaps";
import { IAddress, IEvent } from "../../../models";
import React, { Fragment, useState, useEffect, useRef } from "react";
import moment from "moment";
import "moment/locale/de";
import {
	Form,
	CheckboxProps,
	Segment,
	Input,
	Icon,
	Radio,
	Dropdown,
	Modal,
	Button,
	DropdownProps,
	InputOnChangeData
} from "semantic-ui-react";
import { ApplicationEventsAction } from "../../../store/types";

interface IStateProps {
	handleCancelEvent?: any;
}
interface IDispatchProps {
	onCreateEvent(event: IEvent): Promise<ApplicationEventsAction>;
}

const eventTypeObject: any = [
	{
		key: "1234",
		text: "Öffentliche Veranstaltung",
		value: "Öffentliche Veranstaltung"
	},
	{
		key: "2345",
		text: "Geschlossene Veranstaltung",
		value: "Geschlossene Veranstaltung"
	}
];
const admissionChargeObject: any = [
	{
		key: "1234",
		text: "nicht bekannt",
		value: "nicht bekannt"
	},
	{
		key: "2345",
		text: "kostenfrei",
		value: "kostenfrei"
	},
	{
		key: "3456",
		text: "Eintritt",
		value: "Eintritt"
	}
];

const DURATION = 200;

const EventCardForm: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { handleCancelEvent, onCreateEvent } = props;
	const [ eventName, setEventName ] = useState<string>("");
	const [ eventType, setEventType ] = useState<string | undefined>(undefined);
	const [ eventDate, setEventDate ] = useState<string>("");
	const [ timeStart, setTimeStart ] = useState<string>("");
	const [ timeEnd, setTimeEnd ] = useState<string>("");
	const [ hidden, setHiddenFlag ] = useState(false);
	const [ money, setMoney ] = useState<string>("");

	const [ admissionCharge, setAdmissionCharge ] = useState<string | undefined>("nicht bekannt");

	const [ actualDate, setActualDate ] = useState<string>("");
	const [ switchState, setSwitchState ] = useState<boolean>(false);

	const [ address, setAddress ] = useState<IAddress | undefined>();

	useEffect(() => {
		const date = moment(Date.now()).locale("de").format("LL");
		setActualDate(date);
	}, []);

	const handleOnChangeAdmissionCharge = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
		if (!!switchState && +event.target.value <= 200) {
			setMoney(event.target.value);
			setAdmissionCharge(event.target.value);
		} else {
			setMoney("");
		}
	};

	const handleOnChangeHidden = (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps | undefined) => {
		data!.checked ? setHiddenFlag(true) : setHiddenFlag(false);
	};

	const onGetAddress = (address: IAddress) => {
		address.city.length > 3 ? setAddress(address) : setAddress(undefined);
	};

	const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newEvent: IEvent = {
			eventName,
			eventType,
			eventDate,
			address,
			timeStart,
			timeEnd,
			admissionCharge,
			hidden
		};

		onCreateEvent(newEvent);

		console.log(newEvent);

		setEventName("");
		setEventType("");
		setEventDate("");
		setTimeStart("");
		setTimeEnd("");
		setMoney("");
		handleCancelEvent();
	};

	const handleOnKeyDown = (event: React.KeyboardEvent) => {
		event.preventDefault();
		return false;
	};
	const handleOnKeyDownAdmissionCharge = (event: React.KeyboardEvent) => {
		const regExpr = new RegExp("^[0-9]+$");
		if (!regExpr.test(event.key)) {
			event.preventDefault();
			return false;
		}
	};

	const handleOnDateTime = (e: React.SyntheticEvent<HTMLElement, Event>, data: any) => {
		switch (data.name) {
			case "eventDate":
				setEventDate(data.value);
				break;
			case "timeStart":
				setTimeStart(data.value);
				break;
			case "timeEnd":
				setTimeEnd(data.value);
				break;
			default:
				break;
		}
	};

	const handleOnChange = (
		event: React.ChangeEvent<HTMLInputElement> | any,
		data: DropdownProps | InputOnChangeData | any
	) => {
		switch (event.target.name || data.name) {
			case "eventName":
				setEventName(event.target.value);
				break;
			case "eventType":
				setEventType(data.value);
				break;
			case "admission-charge":
				if (data.value === "Eintritt") {
					setSwitchState(true);
					setAdmissionCharge(data.value);
				} else {
					setSwitchState(false);
					setMoney("");
					setAdmissionCharge(data.value);
				}
				break;
			default:
				break;
		}
	};

	return (
		<Fragment>
			<Modal.Header>EDITIEREN</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<Form autoComplete="off" onSubmit={handleOnSubmit}>
						<Form.Group widths="equal">
							<Form.Input
								error={eventName.length > 0 ? false : true}
								required
								fluid
								placeholder="Veranstaltungsname"
								name="eventName"
								value={eventName}
								onChange={handleOnChange}
							/>
						</Form.Group>
						<Segment.Group>
							<Segment>
								<Dropdown
									name="eventType"
									value={eventType}
									onChange={handleOnChange}
									required
									tabIndex={0}
									clearable
									label="Veranstaltungsart"
									placeholder="Veranstaltungsart"
									fluid
									selection
									options={eventTypeObject}
								/>
							</Segment>
						</Segment.Group>
						<Segment.Group>
							<Segment>
								<DateInput
									error={eventDate.length > 0 ? false : true}
									preserveViewMode={true}
									popupPosition="bottom left"
									closable
									localization="de"
									dateFormat="LL"
									animation="fade"
									duration={DURATION}
									clearable
									clearIcon={<Icon name="remove" color="red" />}
									name="eventDate"
									placeholder="Datum"
									minDate={actualDate}
									value={eventDate}
									iconPosition="left"
									onChange={handleOnDateTime}
									onKeyDown={handleOnKeyDown}
									hideMobileKeyboard
								/>
							</Segment>
							<Segment>
								<TimeInput
									closable
									popupPosition="bottom center"
									required
									timeFormat="24"
									animation="fade"
									duration={DURATION}
									clearable
									clearIcon={<Icon name="remove" color="red" />}
									name="timeStart"
									placeholder="Beginn"
									value={timeStart}
									iconPosition="left"
									onChange={handleOnDateTime}
									onKeyDown={handleOnKeyDown}
									hideMobileKeyboard
								/>
								<TimeInput
									closable
									required
									popupPosition="bottom right"
									timeFormat="24"
									animation="fade"
									duration={DURATION}
									clearable
									clearIcon={<Icon name="remove" color="red" />}
									name="timeEnd"
									placeholder="Ende"
									value={timeEnd}
									iconPosition="left"
									onChange={handleOnDateTime}
									onKeyDown={handleOnKeyDown}
									hideMobileKeyboard
								/>
							</Segment>
						</Segment.Group>
						<Form.Group widths="equal" />
						<Segment.Group horizontal>
							<Segment padded>
								<Dropdown
									name="admission-charge"
									value={admissionCharge}
									onChange={handleOnChange}
									required
									tabIndex={0}
									fluid
									selection
									options={admissionChargeObject}
								/>
							</Segment>
							<Segment>
								<Form.Field>
									<Form.Input
										error={money.length != 0 ? false : true}
										onChange={handleOnChangeAdmissionCharge}
										onKeyDown={handleOnKeyDownAdmissionCharge}
										disabled={!switchState}
										value={money.replace(/^0+/, "")}
										label={{ tag: true, icon: "euro sign", color: "black" }}
										labelPosition="right"
									/>
								</Form.Field>
							</Segment>
						</Segment.Group>
						<Segment.Group>
							<Form.Field>
								<Segment>{<GoogleMaps getAddress={onGetAddress} />}</Segment>
							</Form.Field>
						</Segment.Group>
						<Segment.Group>
							<Segment>
								<Radio
									type="radio"
									onChange={handleOnChangeHidden}
									toggle
									label="Nicht auf der Website anzeigen"
								/>
							</Segment>
						</Segment.Group>
					</Form>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button color="black" onClick={handleCancelEvent}>
					Abbrechen
				</Button>
				<Button
					positive
					icon="checkmark"
					labelPosition="right"
					content="Speichern"
					onClick={handleOnSubmit}
					disabled={!eventName || !eventDate || !address || (switchState && !money.length)}
				/>
			</Modal.Actions>
		</Fragment>
	);
};

export default EventCardForm;
