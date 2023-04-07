import axios from "axios";


type UserRoutes = `/user${"/auth" | "/signin" | "/signup" | "/signout"}`;
type UserForms = UserSigninRequest | UserSignupRequest;

type RulesetRoutes = `/ruleset/${"list" | "data"}`;

type Routes = UserRoutes | RulesetRoutes;
type Forms = UserForms;

export function GenericGet<T>(path: Routes) {
	return axios.get<T>(
		`${import.meta.env.VITE_API_URL}${path}`,
		{
			withCredentials: true,
			headers: { "Access-Control-Allow-Origin": import.meta.env.VITE_API_URL }
		}
	);
}

export function GenericPost<T>(path: Routes, formData: Forms | null) {
	return axios.post<T>(
		`${import.meta.env.VITE_API_URL}${path}`,
		formData,
		{
			withCredentials: true,
			headers: { "Access-Control-Allow-Origin": import.meta.env.VITE_API_URL }
		}
	);
}
