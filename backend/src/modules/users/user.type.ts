import { Document } from 'mongoose';

export type TUserRole = 'admin' | 'user';

export interface IUser {
  email: string;
  password: string;
  role: TUserRole;
}

export type IUserResponse = Omit<IUser, 'password'>;

export type IUserDocument = IUser &
  Document & {
    comparePassword: (payloadPassword: string) => Promise<boolean>;
  };
