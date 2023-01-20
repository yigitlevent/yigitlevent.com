import axios from "axios";


type UserRoutes = `/user/${"auth" | "signin" | "signup" | "signout"}`;
type UserForms = SigninForm | SignupForm;

export function GenericPost<T>(path: UserRoutes, formData: UserForms | null) {
	return axios.post<T>(
		`${import.meta.env.VITE_API_URL}${path}`,
		formData,
		{
			withCredentials: true,
			headers: { "Access-Control-Allow-Origin": import.meta.env.VITE_API_URL }
		}
	);
}
