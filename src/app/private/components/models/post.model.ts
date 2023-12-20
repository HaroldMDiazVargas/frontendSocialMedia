import { IUser } from 'src/app/core/models';

export interface Post {
  id: number;
  body: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
  author: IUser;
}
