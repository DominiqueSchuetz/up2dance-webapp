/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Image, Menu, Responsive, Segment, Visibility } from 'semantic-ui-react';
import gsap, { Expo, TweenMax } from 'gsap';
import { LandingPage } from '../LandingPage';
import { IUser } from '../../models';
import { IReduxSignOutUserAction } from '../../store/types/auth.types';
import './styles.css';

type IStateProps = {
  readonly user?: IUser;
  readonly isAuthenticated?: boolean | undefined;
  readonly pathName?: string;
};

type IDispatchProps = {
  onSignOut?(): IReduxSignOutUserAction;
};

const NavbarDesktop: React.FC<IStateProps & IDispatchProps> = (props) => {
  // // NAVBAR
  // TweenMax.staggerFrom(".navbar div", 1.5, {
  //   delay: 1.5,
  //   opacity: 0,
  //   y: "20",
  //   ease: Expo.easeInOut
  // }, 0.08);

  const nav = useRef(null);

  useEffect(() => {
    TweenMax.staggerFrom(
      nav.current,
      1.5,
      {
        delay: 1.5,
        opacity: 0,
        y: '20',
        ease: Expo.easeOut.easeInOut
      },
      0.8
    );
  }, []);

  const { isAuthenticated, user, children, pathName, onSignOut } = props;
  const [fixedState, setFixedState] = useState<{ fixed: boolean }>({
    fixed: false
  });

  const hideFixedMenu = () => setFixedState({ fixed: false });
  const showFixedMenu = () => setFixedState({ fixed: true });
  const { fixed } = fixedState;

  const isLoggedIn =
    isAuthenticated && user?.firstName ? (
      <Button inverted={!fixed} primary onClick={onSignOut}>
        Log out
      </Button>
    ) : (
      <>
        <Button as={NavLink} to="/login" inverted={!fixed} primary>
          Log in
        </Button>
        <Button as={NavLink} to="/register" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
          Sign Up
        </Button>
      </>
    );

  return (
    <Responsive
      // tslint:disable-next-line: jsx-no-lambda
      getWidth={() => window.innerWidth || (Responsive.onlyTablet.minWidth as number)}
      minWidth={Responsive.onlyTablet.minWidth}
    >
      {pathName === '/' && (
        <Visibility once={false} onBottomPassed={showFixedMenu} onBottomPassedReverse={hideFixedMenu}>
          <div>
            <Segment inverted textAlign="center" style={{ minHeight: '100vh', padding: '1em 0em' }} vertical>
              <Menu fixed={fixed ? 'top' : undefined} inverted pointing={!fixed} secondary={!fixed} size="large">
                <Container>
                  <Menu.Item as={NavLink} to="/">
                    Home
                  </Menu.Item>
                  <Menu.Item as="a">Work</Menu.Item>
                  <Menu.Item as="a">Company</Menu.Item>
                  <Menu.Item as="a">Careers</Menu.Item>
                  <Menu.Item as="a">
                    <Image centered size="tiny" src="images/logo.jpg" style={{ marginLeft: '33em' }} />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Menu.Item>
                      {isAuthenticated && user!.refId && (
                        <Image size="mini" circular src={`http://localhost:8080/api/media/${user!.refId}`} />
                      )}
                    </Menu.Item>
                    {isLoggedIn}
                  </Menu.Item>
                </Container>
              </Menu>
              {/* <LandingPage /> */}
            </Segment>
          </div>
        </Visibility>
      )}
      {children}
    </Responsive>
  );
};

export default NavbarDesktop;
