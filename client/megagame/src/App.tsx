import { useEffect } from "react";

import { Panels } from "./components/Panels";
import { useUserStore } from "./hooks/useUserStore";


export function App(): React.JSX.Element {
	const { triedAuth, auth, setTriedAuth } = useUserStore();

	useEffect(() => {
		if (!triedAuth) {
			setTriedAuth(true);
			auth();
		}
	}, [auth, setTriedAuth, triedAuth]);

	return <Panels />;
}
