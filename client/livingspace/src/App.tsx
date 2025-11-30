import { useEffect } from "react";

import { useUserStore } from "./hooks/useUserStore";


export function App(): React.JSX.Element {
	const { triedAuth, auth, setTriedAuth } = useUserStore();

	useEffect(() => {
		if (!triedAuth) {
			setTriedAuth(true);
			auth();
		}
	}, [auth, setTriedAuth, triedAuth]);

	return <div />;
}
