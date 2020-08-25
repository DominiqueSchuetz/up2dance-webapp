import React, { useState, useRef, useEffect } from 'react';
import { Image, ImageProps, Segment, Form, Header, Button, Icon } from 'semantic-ui-react';

interface IStateProps {
  id: string;
  name: string;
  size: ImageProps['size'];
  circular?: ImageProps['circular'];
  centered?: ImageProps['centered'];
  refId?: string;
  getImageObjectFromComponent?: ({ mediaFile: File, fileNameWithoutType: string }) => void;
  resetImageUpload?: boolean;
}

const FileUpload: React.FC<IStateProps> = (props) => {
  const { id, circular, name, size, refId, getImageObjectFromComponent, resetImageUpload } = props;
  const [file, setFile] = useState<{ file: string } | undefined>({ file: '' });
  const [imgId, setImgId] = useState<string | undefined>('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImgId(refId);
    if (resetImageUpload) {
      handleRemove();
    }
  }, [refId]);

  const imageUploaded = <Image src={file!.file} size={size} circular={circular} centered />;
  const imageUploaded2 = <Image src={`http://localhost:8080/api/media/${imgId}`} size={size} centered circular={circular} />;

  const uplaodImage = (
    <>
      <Header icon>
        <Icon name="upload" />
        <h4>Lade ein quadratisches Bild von dir hoch.</h4>
      </Header>
      <br />
      <Button
        primary
        fluid
        onClick={() => {
          inputRef.current!.click();
        }}
      >
        Foto hinzufügen
      </Button>
    </>
  );

  const handleUploadAction = (event: React.ChangeEvent<HTMLInputElement & FileList>) => {
    const nativeFileName: string = event.target.files![0].name;
    const fileNameWithoutType = nativeFileName.substring(0, nativeFileName.lastIndexOf('.'));
    const mediaFile: File = event.target.files![0];

    setFile({ file: URL.createObjectURL(event.target.files![0]) });
    getImageObjectFromComponent!({ mediaFile, fileNameWithoutType });
  };

  const handleRemove = () => {
    setFile({ file: '' });
    setImgId(undefined);
    const image = document.querySelector(`#${id}`);
    Object(image).value = '';
    removeCssState();
  };

  return (
    <>
      <>
        <Segment textAlign="center">{file!.file ? imageUploaded : imgId ? imageUploaded2 : uplaodImage}</Segment>
        {file?.file && (
          <Form.Button color="black" fluid onClick={handleRemove} style={{ marginBottom: '15px' }}>
            Bild verwerfen
          </Form.Button>
        )}
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

const removeCssState = () => {
  const signinNode = document.querySelector('.signin');
  const form = document.querySelectorAll('form')[1];
  signinNode?.classList.remove('image-visible');
  form.classList.remove('image-visible');
};
