import { useEffect } from "react";

import { MainBox } from "./components/MainBox";
import { useUserStore } from "./hooks/apiStores/useUserStore";


let TriedAuth = false;

export function App(): JSX.Element {
	const { auth } = useUserStore();

	useEffect(() => {
		if (!TriedAuth) {
			TriedAuth = true;
			auth();
		}
	}, [auth]);

	return <MainBox />;
}
