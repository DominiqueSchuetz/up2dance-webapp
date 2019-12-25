import React, { useState, useRef, Fragment } from "react";
import { Image, ImageProps, Segment, Form, Header, Button, Icon } from "semantic-ui-react";

interface IStateProps {
	id: string;
	name: string;
	size: ImageProps["size"];
	circular?: ImageProps["circular"];
	centered?: ImageProps["centered"];
	getImageObjectFromComponent?: any;
}

interface IDispatchProps {}

const FileUpload: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { id, name, size } = props;
	const { getImageObjectFromComponent } = props;

	const [ filePath, setFilePath ] = useState<any | undefined>(undefined);
	const [ fileName, setFileName ] = useState<string | undefined>("");
	const [ file, setFile ] = useState<{ file: any }>({ file: "" });

	const inputRef: any = useRef();

	const imageUploaded = <Image src={file.file} size={size} centered circular />;

	const uplaodImage = (
		<Fragment>
			<Header icon>
				<Icon name="upload" />
				<h4>Du hast bis jetzt noch kein Bild hochgeladen.</h4>
			</Header>
			<Button primary onClick={() => inputRef.current.click()}>
				Profilfoto hinzufügen
			</Button>
		</Fragment>
	);

	const handleUploadAction = async (event: any) => {
		const naiveFileName: string = Object(event.target.files)[0].name;
		const fileNameWithoutType = naiveFileName.substring(0, naiveFileName.lastIndexOf("."));
		const file: File = event.target.files[0];

		setFilePath(file);
		setFileName(fileNameWithoutType);
		setFile({ file: URL.createObjectURL(event.target.files[0]) });

		getImageObjectFromComponent({ file, fileNameWithoutType });
	};

	const resetFile = () => {
		const file = document.querySelector(`#${id}`);
		Object(file).value = "";
	};

	const handleRemove = () => {
		setFile({ file: "" });
		setFilePath(undefined);
		resetFile();
	};

	return (
		<Fragment>
			<Segment placeholder>{file.file ? imageUploaded : uplaodImage}</Segment>

			<Form.Button fluid onClick={handleRemove}>
				Bild löschen
			</Form.Button>

			<input
				id={id}
				type="file"
				accept="image/png, image/jpeg, image/jpg"
				ref={inputRef}
				hidden
				name={name}
				onChange={handleUploadAction}
			/>
		</Fragment>
	);
};

export default FileUpload;
