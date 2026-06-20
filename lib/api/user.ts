import bcrypt from "bcrypt";

import { FindUserByEmail, FindUserByUsername, FindUserBySessionId, UpdateUserLastSignInAt, CreateUser } from "@/lib/db/users";

import type { User, UserDBO } from "@/types/user/user";


async function FindUserDBO(findUser: AtMostOneOf<{ email: string; username: string; sessionId: string; }>): Promise<UserDBO | undefined> {
  if ("email" in findUser && findUser.email) {
    return await FindUserByEmail(findUser.email);
  }
  else if ("username" in findUser && findUser.username) {
    return await FindUserByUsername(findUser.username);
  }
  else if ("sessionId" in findUser && findUser.sessionId) {
    return await FindUserBySessionId(findUser.sessionId);
  }
  else {
    return undefined;
  }
}

function ConvertToUser(user: UserDBO): User {
  return {
    id: user.Id,
    username: user.Username,
    email: user.Email,
    userAccess: user.UserAccess
  };
}

export async function FindUser(findUser: AtMostOneOf<{ email: string; username: string; sessionId: string; }>): Promise<User | undefined> {
  const userDBO = await FindUserDBO(findUser);
  if (!userDBO) return undefined;
  return ConvertToUser(userDBO);
}

export async function RegisterUser(username: string, email: string, password: string): Promise<User | undefined> {
  const createdUser = await CreateUser(username, email, bcrypt.hashSync(password, 10));
  return ConvertToUser(createdUser);
}

export async function LoginUser(email: string, password: string): Promise<User | undefined> {
  const user = await FindUserDBO({ email });
  if (!user) return undefined;

  const matches = bcrypt.compareSync(password, user.Password);
  if (!matches) return undefined;

  await UpdateUserLastSignInAt(user.Id);
  return ConvertToUser(user);
}
