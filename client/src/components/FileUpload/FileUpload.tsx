import React, { useState, useRef, useEffect } from 'react';
import { Image, ImageProps, Segment, Form, Header, Button, Icon } from 'semantic-ui-react';

interface IStateProps {
  id: string;
  name: string;
  size: ImageProps['size'];
  circular?: ImageProps['circular'];
  centered?: ImageProps['centered'];
  refId?: string;
  getImageObjectFromComponent?: any;
}

const FileUpload: React.FC<IStateProps> = (props) => {
  const { id, circular, name, size, refId, getImageObjectFromComponent } = props;
  const [file, setFile] = useState<{ file: string }>({ file: '' });
  const [imgId, setImgId] = useState<string | undefined>('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImgId(refId);
  }, [refId]);

  const imageUploaded = <Image src={file.file} size={size} circular={circular} centered />;
  const imageUploaded2 = <Image src={`http://localhost:8080/api/media/${imgId}`} size={size} centered circular={circular} />;

  const uplaodImage = (
    <>
      <Header icon>
        <Icon name="upload" />
        <h4>Du hast bis jetzt noch kein Bild hochgeladen.</h4>
      </Header>
      <br />
      <Button primary onClick={() => inputRef.current!.click()}>
        Foto hinzufügen
      </Button>
    </>
  );

  const handleUploadAction = (event: React.ChangeEvent<HTMLInputElement & FileList>) => {
    const nativeFileName: string = event.target.files![0].name;
    const fileNameWithoutType = nativeFileName.substring(0, nativeFileName.lastIndexOf('.'));
    const mediaFile: File = event.target.files![0];

    setFile({ file: URL.createObjectURL(event.target.files![0]) });
    getImageObjectFromComponent({ mediaFile, fileNameWithoutType });
  };

  const handleRemove = () => {
    setFile({ file: '' });
    setImgId(undefined);
    const image = document.querySelector(`#${id}`);
    Object(image).value = '';
  };

  return (
    <>
      <>
        <Segment textAlign="center">{file.file ? imageUploaded : imgId ? imageUploaded2 : uplaodImage}</Segment>
        <Form.Button fluid onClick={handleRemove} style={{ marginBottom: '15px' }}>
          Bild verwerfen
        </Form.Button>
      </>
      <input
        id={id}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        ref={inputRef}
        hidden
        name={name}
        onChange={handleUploadAction}
      />
    </>
  );
};

export default FileUpload;
