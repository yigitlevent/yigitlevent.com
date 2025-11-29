import { body } from "express-validator";

import { FindUserByUsername } from "../services/user.service";


export const SignInValidators = [
	body("email")
		.exists().withMessage("email is required").bail()
		.not().isEmpty().withMessage("email cannot be empty").bail()
		.isEmail().withMessage("invalid email address").bail()
		.normalizeEmail()
		.trim().escape(),
	body("password")
		.exists().withMessage("password is required").bail()
		.not().isEmpty().withMessage("password cannot be empty").bail()
		.isString().withMessage("password must be string").bail()
		.isLength({ min: 8, max: 255 }).withMessage("password must be 8 to 255 characters long").bail()
		.trim().escape()
];

export const SignUpValidators = [
	body("username")
		.exists().withMessage("username is required").bail()
		.not().isEmpty().withMessage("username cannot be empty").bail()
		.isAscii().withMessage("invalid characters in username").bail()
		.isString().withMessage("password must be string").bail()
		.trim().escape()
		.custom(async (username: string) => {
			const user = await FindUserByUsername(username);
			if (user) return Promise.reject(new Error("email already in use"));
		}),
	body("email")
		.exists().withMessage("email is required").bail()
		.not().isEmpty().withMessage("email cannot be empty").bail()
		.isEmail().withMessage("invalid email address").bail()
		.normalizeEmail()
		.trim().escape()
		.custom(async (username: string) => {
			const user = await FindUserByUsername(username);
			if (user) return Promise.reject(new Error("username already in use"));
		}),
	body("password")
		.exists().withMessage("password is required").bail()
		.not().isEmpty().withMessage("password cannot be empty").bail()
		.isString().withMessage("password must be string").bail()
		.isLength({ min: 8, max: 255 }).withMessage("password must be 8 to 255 characters long").bail()
		.trim().escape()
];
