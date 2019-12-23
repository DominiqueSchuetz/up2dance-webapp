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
				return allMedia.map((mapMedia: IMedia) => (
					<Grid.Column key={mapMedia._id}>
						<Image src={"http://localhost:8080/api/media/" + mapMedia._id} />
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
			<Grid doubling columns="three">
				{renderAllPictures(allMedia)}
			</Grid>
		</section>
	);
};

export default Gallery;
