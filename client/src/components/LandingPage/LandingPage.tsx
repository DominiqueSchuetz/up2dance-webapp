/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { Counter } from '../Counter';
import './styles.css';
import { IUser } from '../../models';
import { IReduxSignOutUserAction } from '../../store/types/auth.types';

type IStateProps = {
  readonly user?: IUser;
  readonly isAuthenticated?: boolean | undefined;
};

type IDispatchProps = {
  onSignOut(): IReduxSignOutUserAction;
  onIsUserAuthenticated(): unknown;
};

const LandingPage: React.FC<IStateProps & IDispatchProps> = (props) => {
  const { isAuthenticated, user, onIsUserAuthenticated, onSignOut } = props;

  const noScroll = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    onIsUserAuthenticated();

    document.querySelectorAll('.nav-links').forEach((e) => {
      e.addEventListener('click', () => {
        window.removeEventListener('scroll', noScroll);
      });
    });

    document.addEventListener('mousemove', (e) => {
      document.querySelectorAll('.image-layer').forEach((imageLayer: Element) => {
        const speed = imageLayer.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * +speed!) / 100;
        const y = (window.innerHeight - e.pageY * +speed!) / 100;
        (imageLayer as HTMLElement).style.transform = `translateX(${x}px) translateY(${y}px)`;
        //
      });
    });

    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
      const scrollPosY = window.scrollY;
      if (scrollPosY > 30) {
        header!.classList.add('scrolled');
      } else {
        header!.classList.remove('scrolled');
      }
    });

    const aTags = document.querySelectorAll('.nav-links > .nav-link');
    const uncheckInputElement = document.querySelector('#menu-btn') as HTMLInputElement;
    for (const element of aTags) {
      element.addEventListener('click', () => {
        uncheckInputElement!.checked = false;
      });
    }

    const myCheckbox = document.querySelector('#menu-btn') as HTMLInputElement;
    myCheckbox.addEventListener('click', () => {
      if (myCheckbox.checked) {
        window.addEventListener('scroll', noScroll);
        console.log('Add scroll');
      } else {
        window.removeEventListener('scroll', noScroll);
        console.log('Remove scroll');
        myCheckbox.blur();
      }
    });
  }, [onIsUserAuthenticated]);

  const toggleVideoPlayer = () => {
    const trailerClass: HTMLElement | null = document.querySelector('.trailer');
    const mainHeaderClass: HTMLElement | null = document.querySelector('.main-header');
    const videoPlayer: HTMLIFrameElement | null = document.querySelector('.youtube-video');
    trailerClass?.classList.toggle('active');
    trailerClass?.classList.contains('active') ? (mainHeaderClass!.style.display = 'none') : (mainHeaderClass!.style.display = 'flex');
    trailerClass?.classList.contains('active')
      ? window.addEventListener('scroll', noScroll)
      : window.removeEventListener('scroll', noScroll);

    // if (!trailerClass?.classList.contains('active')) {
    videoPlayer!.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'pauseVideo',
        args: []
      }),
      '*'
    );

    // }
  };

  return (
    <>
      <header className="main-header">
        <div className="logo">
          <a href="#">UP2DANCE</a>
        </div>
        <input type="checkbox" className="menu-btn" id="menu-btn" />

        <label htmlFor="menu-btn" className="menu-icon">
          <span className="menu-icon__line" />
        </label>
        <nav>
          <ul className="nav-links">
            <li className="nav-link">
              <a href="#">Home</a>
            </li>
            <li className="nav-link">
              <a href="#">Konzerte</a>
            </li>
            <li className="nav-link">
              <a href="#">Musiker</a>
            </li>
            <li className="nav-link">
              <a href="#">Gallery</a>
            </li>
            <li className="nav-link">
              <a href="#">Buchung</a>
            </li>
            <li className="nav-link">
              {isAuthenticated ? (
                <NavLink to="/" onClick={onSignOut}>
                  Logout
                </NavLink>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </li>
            {isAuthenticated && user!.refId && (
              <li className="nav-link">
                <a className="user-image" href="#">
                  <Image size="mini" circular src={`http://localhost:8080/api/media/${user!.refId}`} />
                </a>
              </li>
            )}
            <li className="nav-link social-media-icons">
              <a href="http://www.up2dance.eu/index.php" target="_blank">
                <i className="fab fa-facebook-f" />
              </a>
              <a>
                <i className="fab fa-twitter" />
              </a>
              <a>
                <i className="fab fa-instagram" />
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="hero-container">
        {/* <img className="image-layer" src="./images/1.png" data-speed="-5" alt="background-graphic" />
        <img className="image-layer" src="./images/2.png" data-speed="5" alt="background-graphic" />
        <img className="image-layer" src="./images/3.png" data-speed="2" alt="background-graphic" />
        <img className="image-layer" src="./images/4.png" data-speed="6" alt="background-graphic" />
        <img className="image-layer" src="./images/5.png" data-speed="8" alt="background-graphic" />
        <img className="image-layer" src="./images/6.png" data-speed="-2" alt="background-graphic" />
        <img className="image-layer" src="./images/7.png" data-speed="4" alt="background-graphic" />
        <img className="image-layer" src="./images/8.png" data-speed="-9" alt="background-graphic" />
        <img className="image-layer" src="./images/9.png" data-speed="6" alt="background-graphic" />
        <img className="image-layer" src="./images/10.png" data-speed="-7" alt="background-graphic" />
        <img className="image-layer" src="./images/11.png" data-speed="-5" alt="background-graphic" />
        <img className="image-layer" src="./images/12.png" data-speed="5" alt="background-graphic" /> */}

        <div className="hero-claim">
          <div className="main-heading">
            <h1 data-speed="2">
              Die <i>Coverband</i> für ihre <span>Stadfeste</span>, <span>Hochzeiten</span> oder <span>Tanzabende</span>
            </h1>
          </div>

          <div className="sub-heading">
            <h1>Buchen sie noch heute einen unvergesslichen Abend</h1>
          </div>

          <div className="play-button">
            <a role="button" onClick={toggleVideoPlayer}>
              <i className="fas fa-play-circle" />
            </a>
          </div>
        </div>
        <div className="hero-counter">
          <div className="hero-counter__headline">
            <h1>Nächstes Konzert</h1>
          </div>
          <Counter timeTillDate="04 28 2020, 11:26 pm" timeFormat="MM DD YYYY, h:mm a" />
        </div>

        <div className="trailer">
          <i role="button" onClick={toggleVideoPlayer} className="close-video-player fas fa-times-circle" />
          <iframe
            title="youtube-video"
            className="youtube-video"
            frameBorder={0}
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src="https://www.youtube.com/embed/RvP3MP6O0pM?rel=0&wmode=Opaque&enablejsapi=1;showinfo=0"
          />
        </div>
      </section>

      {/* <section className="counter">
        <h1>NÄCHSTES KONZERT</h1>
        <Counter timeTillDate="04 28 2020, 11:26 pm" timeFormat="MM DD YYYY, h:mm a" />
      </section> */}
    </>
  );
};

export default LandingPage;
