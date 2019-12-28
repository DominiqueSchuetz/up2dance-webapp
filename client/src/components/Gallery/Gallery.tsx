import { IReduxGetAllMediaAction, IReduxCreateMediaAction } from "../../store/types/media.types";
import { Grid, Image, Container, Header, Dimmer, Loader, Segment, Button } from "semantic-ui-react";
import React, { useEffect, Fragment, useState, useRef } from "react";
import { IMedia } from "../../models";
import { isArray } from "lodash";

interface IStateProps {
	allMedia: IMedia[];
	hasLoaded: boolean;
	isAuthenticated: boolean;
}

interface IDispatchProps {
	onGetAllMedia(): Promise<IReduxGetAllMediaAction>;
	onCreateMedia(mediaFormData: FormData): Promise<IReduxCreateMediaAction>;
}

const Gallery: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { allMedia, onGetAllMedia, onCreateMedia, hasLoaded, isAuthenticated } = props;
	const inputRef: any = useRef();

	useEffect(
		() => {
			onGetAllMedia();
		},
		[ onGetAllMedia ]
	);

	const handleUploadAction = async (event: any) => {
		const naiveFileName: string = Object(event.target.files)[0].name;
		const fileNameWithoutType = naiveFileName.substring(0, naiveFileName.lastIndexOf("."));
		const file: File = event.target.files[0];

		let mediaFormData: FormData = new FormData();
		mediaFormData.append("filePath", file);
		mediaFormData.append("fileName", fileNameWithoutType!);
		mediaFormData.append("isUserPicture", JSON.stringify(false));

		onCreateMedia(mediaFormData);
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

	const renderAllPictures = (allMedia: IMedia[]) => {
		if (!hasLoaded) {
			if (isArray(allMedia)) {
				const randomizedArray = allMedia.filter((e) => !e.isUserPicture).sort(() => Math.random() - 0.5);
				randomizedArray.length = 6;
				return randomizedArray.map((mapMedia: IMedia) => (
					<Grid.Column key={mapMedia._id}>
						<Image
							size="large"
							src={"http://localhost:8080/api/media/" + mapMedia._id}
							label={{ corner: "right", icon: { name: "delete", color: "black" } }}
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
			<Container text style={{ marginTop: "100px", marginBottom: "100px" }}>
				<Header as="h1" style={{ fontSize: "3em" }} textAlign="center">
					GALLERIE
				</Header>
				{addNewImageButton}
			</Container>
			<Container textAlign="center">
				<Grid doubling columns="three">
					{renderAllPictures(allMedia)}
				</Grid>
			</Container>
		</section>
	);
};

export default Gallery;
