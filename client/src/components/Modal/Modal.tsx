import { Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar, SidebarProps } from "semantic-ui-react";
import { ApplicationState, ISignInUserData } from "../../models";
import { ILoadAuthenticationSuccess } from "../../store/types";
import React, { useState, useEffect, Fragment } from "react";

interface IStateProps {
	sidebarAnimation: SidebarProps;
	sidebarDirection: SidebarProps;
	sidebarVisible: SidebarProps;
}

interface IDispatchProps {}

const Modal: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { sidebarAnimation, sidebarDirection, sidebarVisible } = props;
	return (
		<Fragment>
			<Sidebar
				as={Segment}
				animation={sidebarAnimation.animation}
				direction={sidebarDirection.direction}
				visible={sidebarVisible.visible}
			>
				<Grid textAlign="center">
					<Grid.Row columns={1}>
						<Grid.Column>
							<Header as="h3">New Content Awaits</Header>
						</Grid.Column>
					</Grid.Row>
					<Grid columns={3} divided>
						<Grid.Column>
							<Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
						</Grid.Column>
						<Grid.Column>
							<Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
						</Grid.Column>
						<Grid.Column>
							<Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
						</Grid.Column>
					</Grid>
				</Grid>
			</Sidebar>
		</Fragment>
	);
};

export default Modal;
