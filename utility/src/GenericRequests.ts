import axios, { AxiosResponse } from "axios";


export function GenericGet<T>(apiUrl: string, path: Routes): Promise<AxiosResponse<T, unknown>> {
	return axios.get<T>(
		`${apiUrl}${path}`,
		{
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": apiUrl
			}
		}
	);
}

export function GenericPost<T>(apiUrl: string, path: Routes, formData: Forms | null): Promise<AxiosResponse<T, unknown>> {
	return axios.post<T>(
		`${apiUrl}${path}`,
		formData,
		{
			withCredentials: false,
			headers: {
				"Access-Control-Allow-Origin": apiUrl
			}
		}
	);
}
