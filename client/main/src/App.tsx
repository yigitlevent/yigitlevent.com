import { MainBox } from "./components/MainBox";


export function App(): JSX.Element {
	if (import.meta.env.MODE === "development") console.debug("This is a debug build.");

	return <MainBox />;
}
