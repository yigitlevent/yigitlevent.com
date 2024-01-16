import { Average } from "@utility/Average";
import { useEffect } from "react";

import { MainBox } from "./components/MainBox";
import { useUserStore } from "./hooks/apiStores/useUserStore";


export function App(): JSX.Element {
	const { triedAuth, auth } = useUserStore();

	Average([1, 2, 3]);

	useEffect(() => {
		if (!triedAuth) { auth(); }
	}, [auth, triedAuth]);

	return <MainBox />;
}
