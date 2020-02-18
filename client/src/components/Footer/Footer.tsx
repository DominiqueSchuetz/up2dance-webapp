import React, { Fragment } from "react";
import { Image, List, Header, Segment, Container, Icon, Grid } from "semantic-ui-react";

const Footer: React.FC = () => {
	return (
		<Segment inverted vertical style={{ padding: "5em 0em", marginTop: "10em" }}>
			<Container>
				<Grid divided inverted stackable>
					<Grid.Row>
						<Grid.Column width={3}>
							<Header inverted as="h4" content="About" />
							<List link inverted>
								<List.Item as="a">Sitemap</List.Item>
								<List.Item as="a">Contact Us</List.Item>
								<List.Item as="a">Religious Ceremonies</List.Item>
								<List.Item as="a">Gazebo Plans</List.Item>
							</List>
						</Grid.Column>
						<Grid.Column width={3}>
							<Header inverted as="h4" content="Services" />
							<List link inverted>
								<List.Item as="a">Banana Pre-Order</List.Item>
								<List.Item as="a">DNA FAQ</List.Item>
								<List.Item as="a">How To Access</List.Item>
								<List.Item as="a">Favorite X-Men</List.Item>
							</List>
						</Grid.Column>
						<Grid.Column width={7}>
							<Header as="h4" inverted>
								Footer Header
							</Header>
							<p>Extra space for a call to action inside the footer that could help re-engage users.</p>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
			<Container textAlign="center" style={{ marginTop: "4em" }}>
				<Header size="small" style={{ color: "white" }}>
					<div>
						Created with <Icon color="red" name="heart" />
					</div>
				</Header>
				<Icon loading size="large" color="blue" name="react" />
				<Icon color="yellow" size="large" name="js" />
			</Container>
		</Segment>
	);
};

export default Footer;
