import { IReduxListMediaAction, IReduxAddMediaAction, IReduxRemoveMediaAction } from "../../store/types/media.types";
import { Grid, Image, Container, Header, Dimmer, Loader, Segment, Button, Icon, Modal } from "semantic-ui-react";
import React, { useEffect, Fragment, useRef, useState, useCallback, useMemo } from "react";
import { ModalDialog } from "../ModalDialog";
import { IMedia } from "../../models";
import { isArray } from "lodash";

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

let FILE_ID: string | undefined = undefined;
let NAME: string | undefined = undefined;

const Gallery: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { media, isAuthenticated, onListMedia, onAddMedia, onRemoveMedia, isMediaLoading } = props;
	const [ modalStatus, setModalStaus ] = useState<{ modalOpen: boolean }>({ modalOpen: false });
	const inputRef: any = useRef();

	useEffect(
		() => {
			onListMedia();
		},
		[ onListMedia ]
	);

	const handleUploadAction = async (event: any) => {
		const naiveFileName: string = Object(event.target.files)[0].name;
		const fileNameWithoutType = naiveFileName.substring(0, naiveFileName.lastIndexOf("."));
		const file: File = event.target.files[0];

		let mediaFormData: FormData = new FormData();
		mediaFormData.append("filePath", file);
		mediaFormData.append("fileName", fileNameWithoutType!);
		mediaFormData.append("isUserPicture", JSON.stringify(false));

		onAddMedia(mediaFormData);
	};

	const addNewImageButton = isAuthenticated && (
		<Container textAlign="center" style={{ marginTop: 90, marginBottom: 0, marginRight: 40 }}>
			<Button
				circular
				content="Neues Foto"
				icon="add"
				labelPosition="right"
				color="blue"
				onClick={() => inputRef.current.click()}
			/>
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
		<Fragment>
			<Modal.Header>{"Delete"}</Modal.Header>
			<Modal.Content image>
				<Modal.Description>
					<Header as="h2">
						<Header.Content>
							Du möchtest wirklich <Icon color="pink" name="hand point right" />
							<i style={{ color: "pink" }}>{NAME}</i> <Icon color="pink" name="hand point left" />
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
		</Fragment>
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
								src={`http://localhost:8080/api/media/${mapMedia._id}`}
								label={isAuthenticated ? deleteImage(mapMedia, setModalStaus) : undefined}
							/>
						</Grid.Column>
					));
				} else {
					return (
						<Fragment>
							<Segment raised style={{ marginTop: 50, marginBottom: 0, marginRight: 40 }}>
								<Header as="h2">
									Es gibt derzeit keine Bilder...{" "}
									<span role="img" aria-label="sleeping-emoji">
										😴
									</span>
								</Header>
							</Segment>
						</Fragment>
					);
				}
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
			<ModalDialog
				modalStatus={modalStatus.modalOpen}
				children={renderDeleteMessage}
				onClose={() => setModalStaus({ modalOpen: false })}
			/>
			<Container text style={{ marginTop: "100px", marginBottom: "100px" }}>
				<Header as="h1" style={{ fontSize: "3em" }} textAlign="center">
					GALLERIE
				</Header>
				{addNewImageButton}
			</Container>
			<Container textAlign="center">
				<Grid doubling columns="three" textAlign="center">
					{renderAllPictures(media)}
				</Grid>
			</Container>
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
		corner: "right",
		icon: { name: "delete", color: "black" },
		onClick: () => {
			setModalStaus({ modalOpen: true });
			FILE_ID = mapMedia._id!;
			NAME = mapMedia.fileName!;
		}
	};
};
