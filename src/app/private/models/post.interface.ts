import { IUser } from 'src/app/core/models';

export interface IPost {
  id: number;
  body: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
  author: IUser;
}
