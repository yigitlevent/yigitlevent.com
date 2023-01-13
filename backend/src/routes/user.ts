import { Request, Response } from "express";

export function UserAuth(request: Request, response: Response) {
	//const username = request.body.username;
	//const password = request.body.password;
	response.send("Express + TypeScript Server");
	response.end();
}

export function UserSignup(request: Request, response: Response) {
	response.send("Express + TypeScript Server");
	response.end();
}

export function UserSignin(request: Request, response: Response) {
	response.send("Express + TypeScript Server");
	response.end();
}

export function UserSignout(request: Request, response: Response) {
	response.send("Express + TypeScript Server");
	response.end();
}

export function UserEnable(request: Request, response: Response) {
	response.send("Express + TypeScript Server");
	response.end();
}

export function UserDisable(request: Request, response: Response) {
	response.send("Express + TypeScript Server");
	response.end();
}

export function UserDelete(request: Request, response: Response) {
	response.send("Express + TypeScript Server");
	response.end();
}
