interface UserDBO {
	Id: Guid;
	Username: string;
	Email: string;
	Password: string;
}

interface User {
	id: Guid;
	username: string;
	email: string;
	password: string;
}

type UserSession = Omit<User, "password">;
