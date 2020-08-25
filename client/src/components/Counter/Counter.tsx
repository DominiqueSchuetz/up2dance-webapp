/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import moment from 'moment';
import './styles.css';

type IStateProps = {
  readonly timeTillDate: string;
  readonly timeFormat: string;
};

const Counter: React.FC<IStateProps> = (props) => {
  const { timeTillDate, timeFormat } = props;

  const [days, setDays] = useState<string>();
  const [hours, setHours] = useState<string>();
  const [minutes, setMinutes] = useState<string>();
  const [seconds, setSeconds] = useState<string>();

  const daysRadius = mapNumber(days, 30, 0, 0, 360);
  const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
  const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

  useEffect(() => {
    const intervall = setInterval(() => {
      const then = moment(timeTillDate, timeFormat);
      const now = moment();
      const countdown = moment(then.valueOf() - now.valueOf());

      setDays(countdown.format('D'));
      setHours(countdown.format('HH'));
      setMinutes(countdown.format('mm'));
      setSeconds(countdown.format('ss'));
    }, 1000);
    return () => {
      if (intervall) {
        clearInterval(intervall);
      }
    };
  });

  if (!seconds) {
    return null;
  }

  if (+days! - 1 === 0) {
    setDays(undefined);
  }

  if (+hours! - 1 === 0 && !days) {
    setHours(undefined);
  }

  return (
    <div className="countdown-wrapper">
      {days && (
        <Fade top>
          <div className="countdown-item">
            <SVGCircle radius={daysRadius} />
            {+days - 1}
            <span>Tage</span>
          </div>
        </Fade>
      )}
      {hours && (
        <Fade bottom>
          <div className="countdown-item">
            <SVGCircle radius={hoursRadius} />
            {+hours - 1}
            <span>Stunden</span>
          </div>
        </Fade>
      )}
      {minutes && (
        <Fade left>
          <div className="countdown-item">
            <SVGCircle radius={minutesRadius} />
            {minutes}
            <span>Minuten</span>
          </div>
        </Fade>
      )}
      {seconds && (
        <Fade right>
          <div className="countdown-item">
            <SVGCircle radius={secondsRadius} />
            {seconds}
            <span>Sekunden</span>
          </div>
        </Fade>
      )}
    </div>
  );
};

const SVGCircle = ({ radius }) => (
  <svg className="countdown-svg">
    <path fill="none" stroke="gold" strokeWidth="2.4" d={describeArc(50, 50, 28, 0, radius)} />
  </svg>
);

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');

  return d;
}

function mapNumber(number: any, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export default Counter;
