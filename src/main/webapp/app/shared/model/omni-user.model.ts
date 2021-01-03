export interface IOmniUser {
  id?: number;
  email?: string;
  password?: string;
  name?: string;
  surname?: string;
  about?: string;
}

export class OmniUser implements IOmniUser {
  constructor(
    public id?: number,
    public email?: string,
    public password?: string,
    public name?: string,
    public surname?: string,
    public about?: string
  ) {}
}
