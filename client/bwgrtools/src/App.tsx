import { useEffect } from "react";

import { DataDebug } from "./utils/dataDebug";

import { MainBox } from "./components/MainBox";
import { useUserStore } from "./hooks/apiStores/useUserStore";


let TriedAuth = false;

export function App(): JSX.Element {
	if (import.meta.env.MODE === "development") DataDebug();

	const { auth } = useUserStore();

	useEffect(() => {
		if (!TriedAuth) {
			TriedAuth = true;
			auth();
		}
	}, [auth]);

	return <MainBox />;
}
