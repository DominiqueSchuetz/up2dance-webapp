import React from 'react';
// tslint:disable-next-line: no-submodule-imports
import Fade from 'react-reveal/Fade';
import { Counter } from '../Counter';
import myVideo from './video.mov';
import './styles.css';

const VideoHeader: React.FC = () => {
  return (
    <section className="showcase">
      <div className="video-container">
        <video autoPlay loop playsInline muted>
          <source src={myVideo} type="video/mp4" />
        </video>
      </div>
      <div className="content">
        <Fade bottom>
          <h1>Nächstes Konzert</h1>
          <h3>in</h3>
          <Counter timeTillDate="04 29 2020, 9:29 pm" timeFormat="MM DD YYYY, h:mm a" />
        </Fade>
      </div>
    </section>
  );
};

export default VideoHeader;
