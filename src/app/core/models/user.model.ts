export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

export interface IUserDecoded {
  user: IUser;
  exp: number;
  iat: number;
}
