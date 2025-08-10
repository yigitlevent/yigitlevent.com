interface UserDBO {
	Id: Guid;
	Username: string;
	Email: string;
	Password: string;
	UserAccessIds: number[];
}

type UserAccessType =
	| "Admin"
	| "BurningWheel";

interface User {
	id: Guid;
	username: string;
	email: string;
	password: string;
	userAccess: UserAccessType[];
}

type UserSession = Omit<User, "password">;
