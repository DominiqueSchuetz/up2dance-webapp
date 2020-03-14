/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useRef, useState } from 'react';
import { isArray } from 'lodash';
import { Grid, Image, Container, Header, Dimmer, Loader, Segment, Button, Icon, Modal } from 'semantic-ui-react';
import { IReduxListMediaAction, IReduxAddMediaAction, IReduxRemoveMediaAction } from '../../store/types/media.types';
import { ModalDialog } from '../ModalDialog';
import { IMedia } from '../../models';

type IStateProps = {
  readonly isAuthenticated: boolean;
  readonly media: IMedia[];
  readonly isMediaLoading: boolean;
};

type IDispatchProps = {
  onListMedia(): Promise<IReduxListMediaAction>;
  onAddMedia(mediaFormData: FormData): Promise<IReduxAddMediaAction>;
  onRemoveMedia(id: string): Promise<IReduxRemoveMediaAction>;
};

let FILE_ID: string | undefined;
let NAME: string | undefined;

const Gallery: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { media, isAuthenticated, onListMedia, onAddMedia, onRemoveMedia, isMediaLoading } = props;
  const [modalStatus, setModalStaus] = useState<{ modalOpen: boolean }>({
    modalOpen: false
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onListMedia();
  }, [onListMedia]);

  const handleUploadAction = async (event: any) => {
    const naiveFileName: string = Object(event.target.files)[0].name;
    const fileNameWithoutType = naiveFileName.substring(0, naiveFileName.lastIndexOf('.'));
    const file: File = event.target.files[0];

    const mediaFormData: FormData = new FormData();
    mediaFormData.append('filePath', file);
    mediaFormData.append('fileName', fileNameWithoutType!);
    mediaFormData.append('isUserPicture', JSON.stringify(false));

    onAddMedia(mediaFormData);
  };

  const addNewImageButton = isAuthenticated && (
    <Container textAlign="center">
      <Button circular content="Neues Foto" icon="add" labelPosition="right" color="blue" onClick={() => inputRef!.current!.click()} />
      <input
        id="add-new-image-to-gallery"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        ref={inputRef}
        hidden
        name="file-upload"
        onChange={handleUploadAction}
      />
    </Container>
  );

  const renderDeleteMessage = (
    <>
      <Modal.Header>Delete</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header as="h2">
            <Header.Content>
              Du möchtest wirklich <Icon color="pink" name="hand point right" />
              <i style={{ color: 'pink' }}>{NAME}</i> <Icon color="pink" name="hand point left" />
              löschen?
            </Header.Content>
          </Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setModalStaus({ modalOpen: false })}>
          Abbrechen
        </Button>
        <Button
          positive
          labelPosition="right"
          icon="checkmark"
          content="Löschen"
          onClick={() => {
            onRemoveMedia(FILE_ID!);
            setModalStaus({ modalOpen: false });
          }}
        />
      </Modal.Actions>
    </>
  );

  const renderAllPictures = (allMedia: IMedia[]) => {
    if (!isMediaLoading) {
      if (isArray(allMedia)) {
        const filterByUserPicture = allMedia.filter((e) => !e.isUserPicture);
        if (filterByUserPicture.length > 0) {
          // const randomizedArray = filterByUserPicture.sort(() => Math.random() - 0.5);
          filterByUserPicture.length = 6;

          return filterByUserPicture.map((mapMedia: IMedia) => (
            <Grid.Column key={mapMedia._id}>
              <Image
                size="large"
                centered
                src={`http://localhost:8080/api/media/${mapMedia._id}`}
                label={isAuthenticated ? deleteImage(mapMedia, setModalStaus) : undefined}
              />
            </Grid.Column>
          ));
        }
        return (
          <>
            <Segment raised style={{ marginTop: 50, marginBottom: 0, marginRight: 40 }}>
              <Header as="h2">
                Es gibt derzeit keine Bilder...{' '}
                <span role="img" aria-label="sleeping-emoji">
                  😴
                </span>
              </Header>
            </Segment>
          </>
        );
      }
    } else {
      return (
        <Dimmer active inverted page>
          <Loader inline />
        </Dimmer>
      );
    }
  };

  return (
    <section>
      <ModalDialog modalStatus={modalStatus.modalOpen} onClose={() => setModalStaus({ modalOpen: false })}>
        {renderDeleteMessage}
      </ModalDialog>

      <Header className="headline" textAlign="center">
        GALLERIE
      </Header>
      {addNewImageButton}

      <Grid stackable columns={4} stretched doubling centered>
        <Grid.Row>{renderAllPictures(media)}</Grid.Row>
      </Grid>
    </section>
  );
};

export default Gallery;

const deleteImage = (
  mapMedia: IMedia,
  setModalStaus: React.Dispatch<
    React.SetStateAction<{
      modalOpen: boolean;
    }>
  >
) => {
  return {
    corner: 'right',
    icon: { name: 'delete', color: 'black' },
    onClick: () => {
      setModalStaus({ modalOpen: true });
      FILE_ID = mapMedia._id!;
      NAME = mapMedia.fileName!;
    }
  };
};
