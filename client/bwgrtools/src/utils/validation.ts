export function ValidateUsername(username: string): boolean {
	return username.length > 3 && username.length < 65;
}

export function ValidateEmail(email: string): boolean {
	// eslint-disable-next-line no-useless-escape
	const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	return emailRegexp.test(email);
}

export function ValidatePassword(password: string): boolean {
	const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,64}$/g;
	return passwordRegexp.test(password);
}
