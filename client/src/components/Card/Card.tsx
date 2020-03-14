import React from 'react';
import './Card.css';

interface ISocialMedia {
  readonly facebookLink?: string;
  readonly youtubeLink?: string;
  readonly instagramLink?: string;
}

interface IUser {
  readonly imageRefId?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly instrument?: any;
  readonly portfolio?: string;
  readonly socialMedia?: ISocialMedia;
}

type StateProps = {
  user?: IUser | undefined;
};

const Card: React.FC<StateProps> = (props) => {
  const { user } = props;

  return (
    <div className="card">
      <div className="card-front">
        <div className="card-head">
          <div className="profile-img">
            <i className="acc ion-ios-person" />
          </div>
        </div>
        <div className="card-body">
          <div className="name">{user?.firstName}</div>
          <div className="desc">UI/UX Designer</div>
          <div>
            <ul>
              <li>
                <button type="button" className="icons">
                  <i className="ion-logo-twitter" />
                </button>
              </li>
              <li>
                <button type="button" className="icons">
                  <i className="ion-logo-facebook" />
                </button>
              </li>
              <li>
                <button type="button" className="icons">
                  <i className="ion-logo-instagram" />
                </button>
              </li>
              <li>
                <button type="button" className="icons">
                  <i className="ion-logo-linkedin" />
                </button>
              </li>
            </ul>
          </div>
          <button type="button" className="btn-portfolio">
            Portfolio
          </button>
        </div>
      </div>

      <div className="card-back">
        <div className="card-head">
          <h1>Portfolio</h1>
        </div>
        <div className="card-body">
          <div className="desc">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, eius voluptatem. Ipsum modi ad quo, suscipit nemo non sequi
              fugiat voluptatibus repudiandae totam itaque nam quas aliquid tempore blanditiis dolorum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
