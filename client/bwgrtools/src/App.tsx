import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DataDebug } from "./utils/dataDebug";

import { MainBox } from "./components/MainBox";
import { useUserStore } from "./hooks/apiStores/useUserStore";


let TriedAuth = false;

export function App(): JSX.Element {
	if (import.meta.env.MODE === "development") DataDebug();

	const navigate = useNavigate();
	const { auth } = useUserStore();

	useEffect(() => {
		if (!TriedAuth) {
			TriedAuth = true;
			auth(navigate);
		}
	}, [auth, navigate]);

	return <MainBox />;
}
