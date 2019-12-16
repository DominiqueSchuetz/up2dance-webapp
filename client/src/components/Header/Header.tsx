import { EBandMemberInstrument, EBandMemberInstrumentSymbol } from "../../enums";
import { ApplicationUserAction } from "../../store/types/user.types";
import { IReduxLogOutUserAction } from "../../store/types/user.types";
import { Menu, Button, Image, Dropdown } from "semantic-ui-react";
import React, { Fragment, useEffect, useState } from "react";
import { IUser, IReduxState } from "../../models";
import { NavLink } from "react-router-dom";

interface IStateProps {
	userPayload: IReduxState<IUser>;
}

interface IDispatchProps {
	onIsUserAuthenticated(): Promise<ApplicationUserAction>;
	onLogOutUser(): IReduxLogOutUserAction;
}

const Header: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { onIsUserAuthenticated, onLogOutUser, userPayload } = props;
	const { firstName, instrument, refId } = userPayload.item;
	const successCode = props.userPayload.success;
	const [ instrumentSymbol, setInstrumentSymbol ] = useState<string>("🌞");

	useEffect(
		() => {
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
		},
		[ refId ]
	);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.clear();
		onLogOutUser();
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
								{successCode && (
									<Image
										style={{ marginRight: 20 }}
										size="mini"
										circular
										src={refId ? "http://localhost:8080/api/media/" + refId : ""}
									/>
								)}
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
