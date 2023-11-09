import axios, { AxiosResponse } from "axios";


export function GenericGet<T>(path: Routes): Promise<AxiosResponse<T, unknown>> {
	return axios.get<T>(
		`${import.meta.env.VITE_API_URL}${path}`,
		{
			withCredentials: true,
			headers: { "Access-Control-Allow-Origin": import.meta.env.VITE_API_URL }
		}
	);
}

export function GenericPost<T>(path: Routes, formData: Forms | null): Promise<AxiosResponse<T, unknown>> {
	return axios.post<T>(
		`${import.meta.env.VITE_API_URL}${path}`,
		formData,
		{
			withCredentials: true,
			headers: { "Access-Control-Allow-Origin": import.meta.env.VITE_API_URL }
		}
	);
}
