import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IReduxSignOutUserAction } from '../../store/types/auth.types';
import { NavbarDesktop, NavbarMobile } from '../Navbar';
import { IUser } from '../../models';

type IStateProps = {
  readonly user: IUser;
  readonly isAuthenticated: boolean | undefined;
};

type IDispatchProps = {
  onSignOut(): IReduxSignOutUserAction;
  onIsUserAuthenticated(): unknown;
};

const Header: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { user, isAuthenticated, onIsUserAuthenticated, onSignOut, children } = props;
  const myCurrentLocation = useLocation();

  useEffect(() => {
    onIsUserAuthenticated();
  }, [onIsUserAuthenticated]);

  return (
    <div>
      <NavbarDesktop isAuthenticated={isAuthenticated} user={user} onSignOut={onSignOut} pathName={myCurrentLocation.pathname}>
        {children}
      </NavbarDesktop>
      <NavbarMobile isAuthenticated={isAuthenticated} user={user} onSignOut={onSignOut} pathName={myCurrentLocation.pathname}>
        {children}
      </NavbarMobile>
    </div>
  );
};

export default Header;
