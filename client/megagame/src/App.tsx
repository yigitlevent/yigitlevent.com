import { useEffect } from "react";

import { MainBox } from "./components/MainBox";
import { useUserStore } from "./hooks/apiStores/useUserStore";


export function App(): JSX.Element {
	const { triedAuth, auth } = useUserStore();

	useEffect(() => {
		if (!triedAuth) { auth(); }
	}, [auth, triedAuth]);

	return <MainBox />;
}
