import { ApplicationUserAction } from "../../../store/types/user.types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { IUser } from "../../../models";
import { isNil } from "lodash";
import { Form, Segment, Icon, Image, Header, Modal, Button, DropdownProps, InputOnChangeData } from "semantic-ui-react";

interface IStateProps {
	headerText?: string;
	handleCancelUser?: any;
	user: IUser;
}
interface IDispatchProps {
	onCreateEvent?(user: IUser): Promise<ApplicationUserAction>;
	onUpdateUserById?(id: string, user: IUser): Promise<ApplicationUserAction>;
}

const UserCardForm: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { handleCancelUser, onUpdateUserById, headerText, user } = props;

	const [ firstName, setFirstName ] = useState<string>("");
	const [ lastName, setLastName ] = useState<string>("");
	const [ email, setEmail ] = useState<string>("");

	const [ filePath, setFilePath ] = useState<any | undefined>(undefined);
	const [ fileName, setFileName ] = useState<string | undefined>("");
	const [ file, setFile ] = useState<{ file: any }>({ file: "" });

	const inputRef: any = useRef();

	useEffect(
		() => {
			if (!isNil(user)) {
				setFirstName(user!.firstName);
				setLastName(user!.lastName);
			}
		},
		[ user ]
	);

	const handleOnSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		let formData: FormData = new FormData();
		formData.append("firstName", firstName);
		formData.append("lastName", lastName);
		formData.append("filePath", filePath);
		formData.append("fileName", fileName!);
		formData.append("email", email);

		const dummyUser: IUser = {
			firstName,
			lastName,
			email
		};

		onUpdateUserById!(user!._id!, dummyUser);

		setFirstName("");
		setLastName("");
		setEmail("");

		handleCancelUser();
	};

	const handleOnChange = (
		user: React.ChangeEvent<HTMLInputElement> | any,
		data: DropdownProps | InputOnChangeData | any
	) => {
		switch (user.target.name || data.name) {
			case "firstName":
				setFirstName(user.target.value);
				break;
			case "lastName":
				setLastName(data.value);
				break;
			case "email":
				setEmail(data.value);
				break;
			default:
				break;
		}
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
		<Fragment>
			<Modal.Header>{headerText}</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<Form autoComplete="off" size="large" onSubmit={handleOnSubmit}>
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
						</Segment>
					</Form>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button color="black" onClick={handleCancelUser}>
					Abbrechen
				</Button>
				<Button
					positive
					icon="checkmark"
					labelPosition="right"
					content="Speichern"
					onClick={handleOnSubmit}
					disabled={!firstName || !lastName}
				/>
			</Modal.Actions>
		</Fragment>
	);
};

export default UserCardForm;
