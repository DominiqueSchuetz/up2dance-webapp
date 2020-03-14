/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Image, Menu, Responsive, Segment, Visibility } from 'semantic-ui-react';
import { IUser } from '../../models';
import { IReduxSignOutUserAction } from '../../store/types/auth.types';

type IStateProps = {
  readonly user?: IUser;
  readonly isAuthenticated?: boolean | undefined;
  readonly pathName?: string;
};

type IDispatchProps = {
  onSignOut?(): IReduxSignOutUserAction;
};

const NavbarDesktop: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { isAuthenticated, user, children, pathName } = props;

  const [fixedState, setFixedState] = useState<{ fixed: boolean }>({
    fixed: false
  });

  const hideFixedMenu = () => setFixedState({ fixed: false });
  const showFixedMenu = () => setFixedState({ fixed: true });
  const { fixed } = fixedState;

  return (
    <Responsive
      // tslint:disable-next-line: jsx-no-lambda
      getWidth={() => window.innerWidth || (Responsive.onlyTablet.minWidth as number)}
      minWidth={Responsive.onlyTablet.minWidth}
    >
      {pathName === '/' && (
        <Visibility once={false} onBottomPassed={showFixedMenu} onBottomPassedReverse={hideFixedMenu}>
          <Segment inverted textAlign="center" style={{ minHeight: 700, padding: '1em 0em' }} vertical>
            <Menu fixed={fixed ? 'top' : undefined} inverted pointing={!fixed} secondary={!fixed} size="large">
              <Container>
                <Menu.Item as={NavLink} to="/">
                  Home
                </Menu.Item>
                <Menu.Item as="a">Work</Menu.Item>
                <Menu.Item as="a">Company</Menu.Item>
                <Menu.Item as="a">Careers</Menu.Item>
                <Menu.Item position="right">
                  <Menu.Item>
                    {isAuthenticated && user!.refId && (
                      <Image size="mini" circular src={`http://localhost:8080/api/media/${user!.refId}`} />
                    )}
                  </Menu.Item>
                  <Button as={NavLink} to="/login" inverted={!fixed} primary>
                    Log in
                  </Button>
                  <Button as={NavLink} to="/register" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
      )}
      {children}
    </Responsive>
  );
};

export default NavbarDesktop;
