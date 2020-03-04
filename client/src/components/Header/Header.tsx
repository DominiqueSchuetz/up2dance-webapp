import React, { useEffect, useState, Children } from "react";
import { IReduxSignOutUserAction } from "../../store/types/auth.types";
import { NavbarDesktop, NavbarMobile } from "../Navbar";
import { IUser } from "../../models";
import { useLocation } from "react-router-dom";

type IStateProps = {
	readonly user: IUser;
	readonly isAuthenticated: boolean | undefined;
};

type IDispatchProps = {
	onSignOut(): IReduxSignOutUserAction;
	onIsUserAuthenticated(): any;
};

const Header: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { onIsUserAuthenticated, children } = props;
	const myCurrentLocation = useLocation();

	useEffect(() => {
		onIsUserAuthenticated();
	}, []);

	return (
		<div>
			<NavbarDesktop pathName={myCurrentLocation.pathname}>{children}</NavbarDesktop>
			<NavbarMobile pathName={myCurrentLocation.pathname}>{children}</NavbarMobile>
		</div>
	);
};

export default Header;
