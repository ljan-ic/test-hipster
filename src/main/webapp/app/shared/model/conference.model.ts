import { Moment } from 'moment';

export interface IConference {
  id?: number;
  name?: string;
  thumbnailContentType?: string;
  thumbnail?: any;
  startDateTime?: Moment;
  expectedEndDateTime?: Moment;
  description?: string;
  price?: number;
}

export class Conference implements IConference {
  constructor(
    public id?: number,
    public name?: string,
    public thumbnailContentType?: string,
    public thumbnail?: any,
    public startDateTime?: Moment,
    public expectedEndDateTime?: Moment,
    public description?: string,
    public price?: number
  ) {}
}
