export function ValidateUsername(username: string) {
	return username.length > 3 && username.length < 65;
}

export function ValidateEmail(email: string) {
	const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	return emailRegexp.test(email);
}

export function ValidatePassword(password: string) {
	const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,64}$/g;
	return passwordRegexp.test(password);
}
