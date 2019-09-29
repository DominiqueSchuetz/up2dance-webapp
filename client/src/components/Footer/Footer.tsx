import React, { Fragment } from "react";
import { Grid, Image, List, Header, Segment, Container, Divider, Icon } from "semantic-ui-react";

const Footer: React.FC = () => {
	return (
		<Fragment>
			<Segment inverted style={{ margin: "20em 0em 0em", padding: "5em 0em" }} vertical>
				<Container textAlign="center">
					<Image src="/images/footer.png" centered size="mini" />
					<List horizontal inverted divided link size="small">
						<List.Item as="a" href="#">
							Site Map
						</List.Item>
						<List.Item as="a" href="#">
							Contact Us
						</List.Item>
						<List.Item as="a" href="#">
							Terms and Conditions
						</List.Item>
						<List.Item as="a" href="#">
							Privacy Policy
						</List.Item>
					</List>
					<Header size="small" style={{ color: "white" }}>
						<div>
							Created with <Icon color="red" name="heart" />
						</div>
					</Header>
					<Icon loading size="large" color="blue" name="react" />
					<Icon color="yellow" size="large" name="js" />
				</Container>
			</Segment>
		</Fragment>
	);
};

export default Footer;
