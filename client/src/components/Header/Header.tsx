import React, { Fragment } from "react";
import { Menu, Button, Image, Dropdown } from "semantic-ui-react";
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
								<Image
									style={{ marginRight: 20 }}
									size="mini"
									circular
									src="/images/avatar/large/patrick.png"
								/>
								<span> Hey Patrick 🥁</span>
							</Menu.Item>

							<Menu.Item>
								<Button as={NavLink} to="/login" primary>
									Login
								</Button>
							</Menu.Item>

							<Dropdown item text="Mehr">
								<Dropdown.Menu>
									<Dropdown.Item as={NavLink} to="/register">
										Registrieren
									</Dropdown.Item>
									<Dropdown.Item as={NavLink} to="/">
										Abmelden
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Menu.Menu>
					</Menu>
				</nav>
			</header>
		</Fragment>
	);
};

export default Header;
