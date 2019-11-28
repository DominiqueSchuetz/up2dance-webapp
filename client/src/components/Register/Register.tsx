import { ISignInUserData, IUser, IRegisterUserData, IReduxState } from "../../models";
import {
	Grid,
	Header,
	Segment,
	Button,
	Image,
	Form,
	Message,
	DropdownProps,
	InputOnChangeData,
	Icon
} from "semantic-ui-react";
import { IReduxRegisterUserAction } from "../../store/types/user.types";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { EBandMemberInstrument } from "../../enums";
import { NavLink } from "react-router-dom";

interface IStateProps {
	registerPayload: IReduxState<IRegisterUserData>;
}

interface IDispatchProps {
	onRegisterUser(formData: FormData): Promise<IReduxRegisterUserAction>;
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

const Register: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { message, success } = props.registerPayload;
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [filePath, setFilePath] = useState<any | undefined>(undefined);
	const [fileName, setFileName] = useState<string | undefined>("");
	const [file, setFile] = useState<{ file: any }>({ file: "" });
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [secretKey, setSecretKey] = useState<string>("");
	const [comment, setComment] = useState<string>("");
	const inputRef: any = useRef();
	//as React.MutableRefObject<HTMLInputElement>;
	const { onRegisterUser } = props;

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
			case "fileName":
				setFileName(event.target.value);
				break;
			// case "filePath":
			// 	setFileupload(event.target.value);
			// 	break;
			case "email":
				setEmail(event.target.value);
				break;
			case "password":
				setPassword(event.target.value);
				break;
			case "secretKey":
				setSecretKey(event.target.value);
				break;
			case "comment":
				setComment(event.target.value);
				break;
			default:
				break;
		}
	};

	const handleRegister = async () => {
		let formData: FormData = new FormData();
		formData.append("firstName", firstName);
		formData.append("lastName", lastName);
		formData.append("filePath", filePath);
		formData.append("fileName", fileName!);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("secretKey", secretKey);
		formData.append("comment", comment);

		onRegisterUser(formData);
	};

	const isEmailValid = (): boolean => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const handleUploadAction = (event: any) => {
		const naiveFileName: string = Object(event.target.files)[0].name;
		const fileNameWithoutType = naiveFileName.substring(0, naiveFileName.lastIndexOf("."));
		const file: File = event.target.files[0];
		setFilePath(file);
		setFileName(fileNameWithoutType);
		setFile({ file: URL.createObjectURL(event.target.files[0]) });
	};

	const imageUploaded = <Image src={file.file} size="medium" centered circular />;
	const uplaodImage = (
		<Fragment>
			<Header icon>
				<Icon name="upload" />
				<h4>Du hast bis jetzt noch kein Profilfoto hochgeladen.</h4>
			</Header>
			<Button primary onClick={() => inputRef.current.click()}>
				Profilfoto hinzufügen
			</Button>
		</Fragment>
	);

	const resetFile = () => {
		const file = document.querySelector("#file-upload");
		Object(file).value = "";
	};

	const handleRemove = () => {
		setFile({ file: "" });
		setFilePath(undefined);
		resetFile();
	};

	return (
		<Grid textAlign="center" style={{}} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as="h2" color="teal" textAlign="center">
					<Image src="images/avatar/large/matthew.png" /> Register
					</Header>
				<Form autoComplete="off" size="large">
					<Segment stacked>
						<Form.Input
							type="text"
							name="firstName"
							value={firstName}
							fluid
							placeholder="Vorname"
							onChange={handleOnChange}
							error={firstName!.length > 1 ? false : true}
						/>
						<Form.Input
							type="text"
							name="lastName"
							value={lastName}
							fluid
							placeholder="Nachname"
							onChange={handleOnChange}
							error={lastName!.length > 1 ? false : true}
						/>
						<Segment placeholder>{file.file ? imageUploaded : uplaodImage}</Segment>
						<Form.Button fluid onClick={handleRemove}>
							Bild löschen
							</Form.Button>
						<input
							id="file-upload"
							accept="image/png, image/jpeg, image/jpg"
							ref={inputRef}
							type="file"
							hidden
							name="filePath"
							onChange={handleUploadAction}
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
							error={email!.length > 1 && isEmailValid() ? false : true}
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
							error={email!.length > 4 ? false : true}
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
							error={email!.length > 4 ? false : true}
						/>
						<Form.TextArea
							style={{ minHeight: 200 }}
							name="comment"
							value={comment}
							placeholder="Kommentar..."
							onChange={handleOnChange}
						/>
						<Button
							as={NavLink}
							to="/login"
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
				<Message>
					Du bist schon registriert? <a href="/login">Login</a>
				</Message>
			</Grid.Column>
		</Grid>
	);
};

export default Register;
