import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes, { InferType } from "prop-types";
import { IUser } from "../../models";
import {
	Button,
	Container,
	Divider,
	Dropdown,
	Grid,
	Header as SemanticHeader,
	Icon,
	Image,
	List,
	Menu,
	Responsive,
	Segment,
	Sidebar,
	Visibility
} from "semantic-ui-react";
import { IReduxSignOutUserAction, IReduxIsUserAuthenticated } from "../../store/types/auth.types";
import car from "../../images/background-1.jpg";

type IStateProps = {
	readonly user?: IUser;
	readonly isAuthenticated?: boolean | undefined;
};

type IDispatchProps = {
	onSignOut?(): IReduxSignOutUserAction;
};

const NavbarDesktop: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { isAuthenticated, user, onSignOut, children } = props;
	const [ instrumentSymbol, setInstrumentSymbol ] = useState<string>("🌞");

	const [ fixedState, setFixedState ] = useState<{ fixed: boolean }>({ fixed: false });

	const hideFixedMenu = () => setFixedState({ fixed: false });
	const showFixedMenu = () => setFixedState({ fixed: true });
	const { fixed } = fixedState;

	return (
		<Responsive
			getWidth={() => window.innerWidth || (Responsive.onlyTablet.minWidth as number)}
			minWidth={Responsive.onlyTablet.minWidth}
		>
			<Visibility once={false} onBottomPassed={showFixedMenu} onBottomPassedReverse={hideFixedMenu}>
				<Segment inverted textAlign="center" style={{ minHeight: 700, padding: "1em 0em" }} vertical>
					<Menu
						fixed={fixed ? "top" : undefined}
						inverted={!fixed}
						pointing={!fixed}
						secondary={!fixed}
						size="large"
					>
						<Container>
							<Menu.Item as="a" active>
								Home
							</Menu.Item>
							<Menu.Item as="a">Work</Menu.Item>
							<Menu.Item as="a">Company</Menu.Item>
							<Menu.Item as="a">Careers</Menu.Item>
							<Menu.Item position="right">
								<Button as="a" inverted={!fixed}>
									Log in
								</Button>
								<Button as="a" inverted={!fixed} primary={fixed} style={{ marginLeft: "0.5em" }}>
									Sign Up
								</Button>
							</Menu.Item>
						</Container>
					</Menu>
					{/* <HomepageHeading /> */}
				</Segment>
			</Visibility>
			{children}
		</Responsive>
	);
};

export default NavbarDesktop;

// <Fragment>
// 		<header>
// 			<nav>
// 				<Menu size="large" inverted>
// 					<Menu.Item as={NavLink} to="/" name="home" />
// 					<Menu.Item as={NavLink} to="#" name="events" />
// 					<Menu.Item as={NavLink} to="#" name="band members" />
// 					<Menu.Item as={NavLink} to="#" name="pictures" />
// 					<Menu.Item as={NavLink} to="#" name="contact" />
// 					<Menu.Menu position="right">
// 						<Menu.Item>
// 							{isAuthenticated &&
// 							user.refId && (
// 								<Image
// 									style={{ marginRight: 20 }}
// 									size="mini"
// 									circular
// 									src={"http://localhost:8080/api/media/" + user.refId}
// 								/>
// 							)}
// 							{isAuthenticated &&
// 							user.firstName && (
// 								<span>
// 									{user.firstName ? `Hey, ${user.firstName} ` + ` ${instrumentSymbol}` : ""}
// 								</span>
// 							)}
// 						</Menu.Item>
// 						<Menu.Item>
// 							<Button as={NavLink} to="/login" primary>
// 								Login
// 							</Button>
// 						</Menu.Item>
// 						<Dropdown item text="Mehr">
// 							<Dropdown.Menu>
// 								<Dropdown.Item as={NavLink} to="/register">
// 									Registrieren
// 								</Dropdown.Item>
// 								<Dropdown.Item as={NavLink} to="/" onClick={() => onSignOut()}>
// 									Abmelden
// 								</Dropdown.Item>
// 							</Dropdown.Menu>
// 						</Dropdown>
// 					</Menu.Menu>
// 				</Menu>
// 			</nav>
// 			<section
// 				className="section"
// 				style={{
// 					backgroundImage: `url(${car})`,
// 					backgroundSize: "cover",
// 					backgroundAttachment: "fixed"
// 				}}
// 			/>
// 			<div className="pattern-overlay" />
// 		</header>
// 	</Fragment>
