import React, { useEffect } from "react";
import { Grid, Image, Container, Header, Transition } from "semantic-ui-react";

interface IStateProps {}

interface IDispatchProps {}

const Gallery: React.FC<IStateProps & IDispatchProps> = (props) => {
	useEffect(() => {}, []);

	const GridExampleDoubling = () => (
		<Grid doubling columns={3}>
			<Grid.Column>
				<Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
			</Grid.Column>
			<Grid.Column>
				<Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
			</Grid.Column>
			<Grid.Column>
				<Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
			</Grid.Column>
			<Grid.Column>
				<Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
			</Grid.Column>
			<Grid.Column>
				<Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
			</Grid.Column>
			<Grid.Column>
				<Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
			</Grid.Column>
		</Grid>
	);

	return (
		<section>
			<Container text style={{ marginTop: "100px", marginBottom: "100px" }}>
				<Header as="h1" style={{ fontSize: "3em" }} textAlign="center">
					Gallery
				</Header>
			</Container>
			<Container>{GridExampleDoubling()}</Container>
		</section>
	);
};

export default Gallery;
