type UserAccess = Nominal<string, "UserAccess">;

interface UserDBO {
	Id: UserId;
	Username: string;
	Email: string;
	Password: string;
	UserAccess: UserAccess[];
}

interface User {
	id: UserId;
	username: string;
	email: string;
	password: string;
	userAccess: UserAccess[];
}

type UserSession = Omit<User, "password">;
