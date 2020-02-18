import React, { useEffect, useState, Children } from "react";
import { IReduxSignOutUserAction } from "../../store/types/auth.types";
import { NavbarDesktop, NavbarMobile } from "../Navbar";
import { IUser } from "../../models";

type IStateProps = {
	readonly user: IUser;
	readonly isAuthenticated: boolean | undefined;
};

type IDispatchProps = {
	onSignOut(): IReduxSignOutUserAction;
	onIsUserAuthenticated(): any;
};

const Header: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { onIsUserAuthenticated } = props;

	useEffect(() => {
		onIsUserAuthenticated();
	}, []);

	return (
		<div>
			<NavbarDesktop>{props}</NavbarDesktop>
			<NavbarMobile>{props}</NavbarMobile>
		</div>
	);
};

export default Header;
