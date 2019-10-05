import React, { Fragment } from "react";
import { Menu, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
	return (
		<Fragment>
			<header>
				<nav>
					<Menu size="large" inverted>
						<Menu.Item as={NavLink} to="/" name="home" />
						<Menu.Item as={NavLink} to="#" name="events" />
						<Menu.Item as={NavLink} to="#" name="band members" />
						<Menu.Item as={NavLink} to="#" name="pictures" />
						<Menu.Item as={NavLink} to="#" name="contact" />
						<Menu.Menu position="right">
							<Menu.Item>
								<Button as={NavLink} to="/login" primary>
									Sign in
								</Button>
							</Menu.Item>
						</Menu.Menu>
					</Menu>
				</nav>
			</header>
		</Fragment>
	);
};

export default Header;
