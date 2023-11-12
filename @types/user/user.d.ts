interface User {
	id: Guid;
	username: string;
	email: string;
	password: string;
}

type UserSession = Omit<User, "password">;
