import { IReduxGetAllMediaAction } from "../../store/types/media.types";
import { Grid, Image, Container, Header, Dimmer, Loader, Segment, GridColumn } from "semantic-ui-react";
import React, { useEffect, Fragment } from "react";
import { IMedia } from "../../models";
import { isArray } from "lodash";

interface IStateProps {
	allMedia: IMedia[];
	hasLoaded: boolean;
}

interface IDispatchProps {
	onGetAllMedia(): Promise<IReduxGetAllMediaAction>;
}

const Gallery: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { allMedia, onGetAllMedia, hasLoaded } = props;
	useEffect(
		() => {
			onGetAllMedia();
		},
		[ onGetAllMedia ]
	);

	const renderAllPictures = (allMedia: IMedia[]) => {
		if (!hasLoaded) {
			if (isArray(allMedia)) {
				const randomizedArray = allMedia.filter((e) => !e.isUserPicture).sort(() => Math.random() - 0.5);
				randomizedArray.length = 6;
				return randomizedArray.map((mapMedia: IMedia) => (
					<Grid.Column key={mapMedia._id}>
						<Image size="large" src={"http://localhost:8080/api/media/" + mapMedia._id} />
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
					Gallery
				</Header>
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
