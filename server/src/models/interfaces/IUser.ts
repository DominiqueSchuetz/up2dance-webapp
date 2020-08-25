import { Document } from 'mongoose';
import { IMedia } from './IMedia';

interface ISocialMediaUrl {
  facebookUrl?: string;
  instagramUrl?: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  instrument: string;
  comment: string;
  socialMediaUrl: ISocialMediaUrl;
  refId?: string & IMedia;
}
