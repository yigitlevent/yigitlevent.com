import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useEffect, useState } from "react";

import { Panels } from "./components/Panels";
import { useUserStore } from "./hooks/useUserStore";


export function App(): React.JSX.Element {
	const { auth } = useUserStore();

	const [triedAuth, setTriedAuth] = useState(false);

	useEffect(() => {
		if (!triedAuth) {
			setTriedAuth(true);
			auth();
		}
	}, [auth, triedAuth]);

	return <Panels />;
}
