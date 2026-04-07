import axios from "axios";

import type { AxiosRequestConfig, AxiosResponse } from "axios";


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

export async function GenericGet<T>(path: Routes): Promise<{ data: T; }> {
	console.log({ ViteApiURL });

	const response = await fetch(GetURL(path), {
		method: "GET",
		headers: {
			"Access-Control-Allow-Origin": ViteApiURL
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return response.json() as Promise<{ data: T; }>;
}

export async function GenericPost<T>(path: Routes, formData: Forms | null): Promise<{ data: T; }> {
	// return axios.post<T>(GetURL(path), formData, GetConfig());

	const response = await fetch(GetURL(path), {
		method: "POST",
		headers: {
			"Access-Control-Allow-Origin": ViteApiURL,
			"Content-Type": "application/json"
		},
		body: formData ? JSON.stringify(formData) : null
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return response.json() as Promise<{ data: T; }>;
}

export function GenericDelete<T>(path: Routes): Promise<AxiosResponse<T, unknown>> {
	return axios.delete<T>(GetURL(path), GetConfig());
}

export function GenericPut<T>(path: Routes, formData: Forms | null): Promise<AxiosResponse<T, unknown>> {
	return axios.put<T>(GetURL(path), formData, GetConfig());
}
