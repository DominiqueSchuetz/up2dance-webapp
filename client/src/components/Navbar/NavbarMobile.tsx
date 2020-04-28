/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Icon, Menu, Responsive, Segment, Sidebar, Image } from 'semantic-ui-react';
import { VideoHeader } from '../VideoHeader';
import { IUser } from '../../models';
import { IReduxSignOutUserAction } from '../../store/types/auth.types';

type IStateProps = {
  readonly user?: IUser;
  readonly isAuthenticated?: boolean | undefined;
  readonly pathName?: string;
};

type IDispatchProps = {
  onSignOut?(): IReduxSignOutUserAction;
  onIsUserAuthenticated?(): unknown;
};

const NavbarMobile: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { isAuthenticated, user, children, pathName, onSignOut } = props;
  const [fixedState, setFixedState] = useState<{ sidebarOpened: boolean }>({
    sidebarOpened: false
  });

  const handleSidebarHide = () => setFixedState({ sidebarOpened: false });
  const handleToggle = () => setFixedState({ sidebarOpened: true });
  const { sidebarOpened } = fixedState;

  const isLoggedIn =
    isAuthenticated && user?.firstName ? (
      <Button inverted primary onClick={onSignOut}>
        Log out
      </Button>
    ) : (
      <>
        <Button as={NavLink} to="/login" inverted primary>
          Log in
        </Button>
        <Button as={NavLink} to="/register" inverted style={{ marginLeft: '0.5em' }}>
          Sign Up
        </Button>
      </>
    );

  return (
    <Responsive
      as={Sidebar.Pushable}
      // tslint:disable-next-line: jsx-no-lambda
      getWidth={() => window.innerWidth || (Responsive.onlyTablet.minWidth as number)}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Sidebar as={Menu} animation="push" inverted onHide={handleSidebarHide} vertical visible={sidebarOpened}>
        <Menu.Item as={NavLink} to="/" active>
          Home
        </Menu.Item>
        <Menu.Item as="a">Work</Menu.Item>
        <Menu.Item as="a">Company</Menu.Item>
        <Menu.Item as="a">Careers</Menu.Item>
        <Menu.Item as="a">Log in</Menu.Item>
        <Menu.Item as="a">Sign Up</Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        {pathName === '/' && (
          <Segment inverted textAlign="center" style={{ minHeight: '100vh', padding: '1em 0em' }} vertical>
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Menu.Item>
                    {isAuthenticated && user!.refId && (
                      <Image size="mini" circular src={`http://localhost:8080/api/media/${user!.refId}`} />
                    )}
                  </Menu.Item>
                  {isLoggedIn}
                </Menu.Item>
              </Menu>
            </Container>
            <VideoHeader />
          </Segment>
        )}
        {children}
      </Sidebar.Pusher>
    </Responsive>
  );
};

export default NavbarMobile;
