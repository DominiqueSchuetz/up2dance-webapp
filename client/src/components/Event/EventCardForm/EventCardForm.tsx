import { ApplicationEventAction } from "../../../store/types/event.types";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";
import React, { Fragment, useState, useEffect } from "react";
import { EKindOfEventAction } from "../../../enums";
import { IAddress, IEvent } from "../../../models";
import { IEventType } from "../../../interfaces";
import { GoogleMaps } from "../../GoogleMaps";
import { isNil } from "lodash";
import moment from "moment";
import "moment/locale/de";
import {
	Form,
	CheckboxProps,
	Segment,
	Icon,
	Radio,
	Dropdown,
	Modal,
	Button,
	DropdownProps,
	InputOnChangeData
} from "semantic-ui-react";

type IStateProps = {
	readonly headerText?: string;
	readonly handleCancelEvent?: any;
	readonly event?: IEvent;
	readonly kindOfAction: IEventType;
	readonly getEventObjectFromForm?: any;
	readonly showToggleHidden?: boolean;
};
type IDispatchProps = {
	onAddEvent?(event: IEvent): Promise<ApplicationEventAction>;
	updateEvent?(id: string, event: IEvent): Promise<ApplicationEventAction>;
	// onCreateCustomerEvent?(event: IEvent): Promise<ApplicationEventsAction>;
};

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
	const {
		handleCancelEvent,
		onAddEvent,
		updateEvent,
		headerText,
		event,
		kindOfAction,
		getEventObjectFromForm,
		showToggleHidden
	} = props;
	const [ eventName, setEventName ] = useState<string>("");
	const [ eventType, setEventType ] = useState<string | undefined>(undefined);
	const [ eventDate, setEventDate ] = useState<string>("");
	const [ timeStart, setTimeStart ] = useState<string | undefined>("");
	const [ timeEnd, setTimeEnd ] = useState<string | undefined>("");
	const [ hidden, setHiddenFlag ] = useState<boolean>(false);
	const [ money, setMoney ] = useState<string>("");
	const [ admissionCharge, setAdmissionCharge ] = useState<string | undefined>("nicht bekannt");
	const [ actualDate, setActualDate ] = useState<string>("");
	const [ switchState, setSwitchState ] = useState<boolean>(false);
	// const [ kindOfEvent, setkindOfEvent ] = useState<IEventType>();
	const [ address, setAddress ] = useState<IAddress | undefined>(undefined);

	useEffect(
		() => {
			const date = moment(Date.now()).locale("de").format("LL");
			setActualDate(date);

			if (!showToggleHidden) {
				setHiddenFlag(true);
			}

			if (!isNil(event)) {
				setEventName(event.eventName);
				setEventType(event.eventType);
				setEventDate(event.eventDate);
				setTimeStart(event.timeStart);
				setTimeEnd(event.timeEnd);
				setAdmissionCharge(event.entry);
				setHiddenFlag(event.hidden!);
				setAddress(event.address);
			}
		},
		[ event ]
	);

	const handleOnChangeAdmissionCharge = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
		if (!!switchState && +event.target.value <= 200) {
			setMoney(event.target.value);
			//setAdmissionCharge(event.target.value);
		} else {
			setMoney("");
		}
	};

	const handleOnChangeHidden = (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps | undefined) => {
		data!.checked ? setHiddenFlag(true) : setHiddenFlag(false);
	};

	const onGetAddress = (address: IAddress) => {
		console.log("onAddress ", address);

		address.city.length > 3 ? setAddress(address) : setAddress(undefined);
	};

	const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const entry = money.length > 0 && !switchState ? money : admissionCharge;

		// if (!showToggleHidden) {
		// 	console.log("war hier !!!");

		// 	setHiddenFlag(true);
		// }

		const newEvent: IEvent = {
			eventName,
			eventType,
			eventDate: eventDate!,
			timeStart,
			timeEnd,
			entry,
			address,
			hidden
		};

		switch (kindOfAction.kind) {
			case EKindOfEventAction.NEW_EVENT:
				onAddEvent!(newEvent);
				break;
			case EKindOfEventAction.UPDATE_EVENT:
				updateEvent!(event!._id!, newEvent);
				break;
			case EKindOfEventAction.CUSTOMER_EVENT:
				getEventObjectFromForm(newEvent);
				break;
		}

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
		switch (data!.name) {
			case "eventDate":
				setEventDate(data!.value);
				break;
			case "timeStart":
				setTimeStart(data!.value);
				break;
			case "timeEnd":
				setTimeEnd(data!.value);
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
			<Modal.Header>{headerText}</Modal.Header>
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
									error={eventDate!.length > 0 ? false : true}
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
									value={eventDate!}
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
									timeFormat="24"
									animation="fade"
									duration={DURATION}
									clearable
									clearIcon={<Icon name="remove" color="red" />}
									name="timeStart"
									placeholder="Beginn"
									value={timeStart!}
									iconPosition="left"
									onChange={handleOnDateTime}
									onKeyDown={handleOnKeyDown}
									hideMobileKeyboard
								/>
								<TimeInput
									closable
									popupPosition="bottom right"
									timeFormat="24"
									animation="fade"
									duration={DURATION}
									clearable
									clearIcon={<Icon name="remove" color="red" />}
									name="timeEnd"
									placeholder="Ende"
									value={timeEnd!}
									iconPosition="left"
									onChange={handleOnDateTime}
									onKeyDown={handleOnKeyDown}
									hideMobileKeyboard
								/>
							</Segment>
						</Segment.Group>
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
										error={money.length !== 0 ? false : true}
										onChange={handleOnChangeAdmissionCharge}
										onKeyDown={handleOnKeyDownAdmissionCharge}
										disabled={!switchState}
										value={money.replace(/^0+/, "")}
										icon="eur"
									/>
								</Form.Field>
							</Segment>
						</Segment.Group>
						<Segment.Group>
							<Form.Field>
								<Segment>
									<GoogleMaps
										hasSearchBox={true}
										storedAddress={address!}
										getAddress={onGetAddress}
									/>
								</Segment>
							</Form.Field>
						</Segment.Group>
						{showToggleHidden && (
							<Segment.Group>
								<Segment>
									<Radio
										type="radio"
										onChange={handleOnChangeHidden}
										toggle
										checked={hidden}
										label="Nicht auf der Website anzeigen"
									/>
								</Segment>
							</Segment.Group>
						)}
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
