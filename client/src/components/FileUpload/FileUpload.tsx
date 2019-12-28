import React, { useState, useRef, Fragment, useEffect } from "react";
import { Image, ImageProps, Segment, Form, Header, Button, Icon } from "semantic-ui-react";

interface IStateProps {
	id: string;
	name: string;
	size: ImageProps["size"];
	circular?: ImageProps["circular"];
	centered?: ImageProps["centered"];
	refId?: string;
	getImageObjectFromComponent?: any;
}

interface IDispatchProps {}

const FileUpload: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { id, circular, name, size, refId, getImageObjectFromComponent } = props;

	const [ filePath, setFilePath ] = useState<any | undefined>(undefined);
	const [ fileName, setFileName ] = useState<string | undefined>("");
	const [ file, setFile ] = useState<{ file: any }>({ file: "" });
	const [ imgId, setImgId ] = useState<string | undefined>("");

	const inputRef: any = useRef();

	useEffect(
		() => {
			setImgId(refId);
		},
		[ refId ]
	);

	const imageUploaded = <Image src={file.file} size={size} circular={circular} centered />;
	const imageUploaded2 = (
		<Image src={"http://localhost:8080/api/media/" + imgId} size={size} centered circular={circular} />
	);

	const uplaodImage = (
		<Fragment>
			<Header icon>
				<Icon name="upload" />
				<h4>Du hast bis jetzt noch kein Bild hochgeladen.</h4>
			</Header>
			<br />
			<Button primary onClick={() => inputRef.current.click()}>
				Foto hinzufügen
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
		setImgId(undefined);
		resetFile();
	};

	return (
		<Fragment>
			<Fragment>
				<Segment textAlign="center">{file.file ? imageUploaded : imgId ? imageUploaded2 : uplaodImage}</Segment>
				<Form.Button fluid onClick={handleRemove} style={{ marginBottom: "15px" }}>
					Bild löschen
				</Form.Button>
			</Fragment>
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
