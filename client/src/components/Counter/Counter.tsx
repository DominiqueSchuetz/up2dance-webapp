import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
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

  return (
    <section>
      <Grid celled="internally" columns={4} textAlign="center" relaxed divided stretched stackable container />
      <div>
        <div className="countdown-wrapper">
          {days && (
            <div className="countdown-item">
              <SVGCircle radius={daysRadius} />
              {days}
              <span>days</span>
            </div>
          )}
          {hours && (
            <div className="countdown-item">
              <SVGCircle radius={hoursRadius} />
              {hours}
              <span>hours</span>
            </div>
          )}
          {minutes && (
            <div className="countdown-item">
              <SVGCircle radius={minutesRadius} />
              {minutes}
              <span>minutes</span>
            </div>
          )}
          {seconds && (
            <div className="countdown-item">
              <SVGCircle radius={secondsRadius} />
              {seconds}
              <span>seconds</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const SVGCircle = ({ radius }) => (
  <svg className='countdown-svg'>
    <path fill="none" stroke="#fff" strokeWidth="4" d={describeArc(50, 50, 48, 0, radius)} />
  </svg>
);

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    'M', start.x, start.y, 
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');

  return d;
}

function mapNumber(number: any, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export default Counter;

{
  /* <Grid.Row stretched>
          <Grid.Column width={4}>
            <h3>14 Tage</h3>
          </Grid.Column>
          <Grid.Column width={4}>
            <h3>12 Stunden</h3>
          </Grid.Column>
          <Grid.Column width={4}>
            <h3>43 Minuten</h3>
          </Grid.Column>
          <Grid.Column width={4}>
            <h3>15 Sekunden</h3>
          </Grid.Column>
        </Grid.Row> */
}
