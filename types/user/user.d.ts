import type { Nominal } from "../utility/nominal";


export type UserId = Nominal<string, "UserId">;

export type UserAccess = Nominal<string, "UserAccess">;

export interface UserDBO {
  Id: UserId;
  Username: string;
  Email: string;
  Password: string;
  UserAccess: UserAccess[];
}

export interface UserInternal {
  id: UserId;
  username: string;
  email: string;
  password: string;
  userAccess: UserAccess[];
}

export type User = Omit<UserInternal, "password">;
