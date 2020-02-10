import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes, { InferType } from "prop-types";
import { IUser } from "../../models";
import { Menu, Button, Image, Dropdown } from "semantic-ui-react";
import { IReduxSignOutUserAction, IReduxIsUserAuthenticated } from "../../store/types/auth.types";

type IStateProps = {
	readonly user: IUser;
	readonly isAuthenticated: boolean | undefined;
};

type IDispatchProps = {
	onSignOut(): IReduxSignOutUserAction;
	onIsUserAuthenticated(): any;
};

const Header: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { isAuthenticated, user, onSignOut, onIsUserAuthenticated } = props;
	const [ instrumentSymbol, setInstrumentSymbol ] = useState<string>("🌞");

	useEffect(() => {
		onIsUserAuthenticated();
	}, []);

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
								{isAuthenticated &&
								user.refId && (
									<Image
										style={{ marginRight: 20 }}
										size="mini"
										circular
										src={"http://localhost:8080/api/media/" + user.refId}
									/>
								)}
								{isAuthenticated &&
								user.firstName && (
									<span>
										{user.firstName ? `Hey, ${user.firstName} ` + ` ${instrumentSymbol}` : ""}
									</span>
								)}
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
									<Dropdown.Item as={NavLink} to="/" onClick={() => onSignOut()}>
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

Header.propTypes = {
	isAuthenticated: PropTypes.bool
};

Header.defaultProps = {
	isAuthenticated: false
};

export default Header;
