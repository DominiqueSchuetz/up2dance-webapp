import { EBandMemberInstrument, EBandMemberInstrumentSymbol } from "../../enums";
import { ApplicationUserAction } from "../../store/types/user.types";
import { Menu, Button, Image, Dropdown } from "semantic-ui-react";
import { IUser, IReduxState, IEvent, IRegisterUserData } from "../../models";
import React, { Fragment, useEffect, useState } from "react";
import { isNil } from "lodash";
import { NavLink } from "react-router-dom";

interface IStateProps {
	userPayload: IUser;
}

interface IDispatchProps {
	onIsUserAuthenticated(): Promise<ApplicationUserAction>;
}

const Header: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { onIsUserAuthenticated } = props;
	const { firstName, instrument } = props.userPayload;
	const [ instrumentSymbol, setInstrumentSymbol ] = useState<string>("🌞");

	useEffect(() => {
		onIsUserAuthenticated();
		if (instrument) {
			switch (instrument) {
				case EBandMemberInstrument.VOCAL:
					setInstrumentSymbol(EBandMemberInstrumentSymbol.VOCAL);
					break;
				case EBandMemberInstrument.VOCAL_AND_GUITAR:
					setInstrumentSymbol(EBandMemberInstrumentSymbol.VOCAL_AND_GUITAR);
					break;
				case EBandMemberInstrument.GUITAR_LEAD:
					setInstrumentSymbol(EBandMemberInstrumentSymbol.GUITAR_LEAD);
					break;
				case EBandMemberInstrument.GUITAR_SOLO:
					setInstrumentSymbol(EBandMemberInstrumentSymbol.GUITAR_SOLO);
					break;
				case EBandMemberInstrument.BASS_GUITAR:
					setInstrumentSymbol(EBandMemberInstrumentSymbol.BASS_GUITAR);
					break;
				case EBandMemberInstrument.DRUMS:
					setInstrumentSymbol(EBandMemberInstrumentSymbol.DRUMS);
					break;
			}
		}
	}, []);

	const handleLogout = () => {
		// TODO Remove jwt token
		// TODO Remove user item
		// TODO Navigate to root
	};

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
									src="/images/avatar/large/matthew.png"
								/>
								<span>
									{firstName ? `Hey, ${firstName.toLocaleUpperCase()} ` + ` ${instrumentSymbol}` : ""}
								</span>
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
									<Dropdown.Item as={NavLink} to="/" onClick={handleLogout}>
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
