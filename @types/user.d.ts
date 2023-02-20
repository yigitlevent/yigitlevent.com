interface User {
	id: string;
	username: string;
	email: string;
	password: string;
}

type UserSigninRequest = Omit<User, "id" | "username">
type UserSignupRequest = Omit<User, "id">
type UserSession = Omit<User, "password">

interface UserResponse {
	user: UserSession;
}
