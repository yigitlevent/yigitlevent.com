import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


const ViteApiURL = import.meta.env.VITE_API_URL as string;

function GetURL(path: string): string {
	return `${ViteApiURL}${path}`;
}

function GetConfig<T>(): AxiosRequestConfig<T> {
	return {
		withCredentials: false,
		headers: {
			"Access-Control-Allow-Origin": ViteApiURL
		}
	};
}

export function GenericGet<T>(path: Routes): Promise<AxiosResponse<T>> {
	return axios.get<T>(GetURL(path), GetConfig());
}

export function GenericPost<T>(path: Routes, formData: Forms | null): Promise<AxiosResponse<T, unknown>> {
	return axios.post<T>(GetURL(path), formData, GetConfig());
}

export function GenericDelete<T>(path: Routes): Promise<AxiosResponse<T, unknown>> {
	return axios.delete<T>(GetURL(path), GetConfig());
}

export function GenericPut<T>(path: Routes, formData: Forms | null): Promise<AxiosResponse<T, unknown>> {
	return axios.put<T>(GetURL(path), formData, GetConfig());
}
