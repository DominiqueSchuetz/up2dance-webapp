import { Form, Segment, Icon, Image, Header, Modal, Button, DropdownProps, InputOnChangeData } from "semantic-ui-react";
import { ApplicationUserAction } from "../../../store/types/user.types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { FileUpload } from "../../FileUpload";
import { IUser } from "../../../models";
import { isEmailValid } from "../../../lib";
import { isNil } from "lodash";

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

	useEffect(
		() => {
			if (!isNil(user)) {
				setFirstName(user!.firstName);
				setLastName(user!.lastName);
			}
		},
		[ user ]
	);

	const getImageObjectFromComponent = (imageObject: { filePath: any; fileName: any }) => {
		setFilePath(imageObject.filePath);
		setFileName(imageObject.fileName);
	};

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
							<FileUpload
								id="user-card-form-file-upload"
								name="filePath"
								size="medium"
								centered
								circular
								getImageObjectFromComponent={getImageObjectFromComponent}
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
								error={email!.length > 1 && isEmailValid(email) ? false : true}
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
