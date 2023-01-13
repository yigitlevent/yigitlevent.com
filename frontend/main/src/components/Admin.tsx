import { RequireAuth } from "../utils/auth";


export function Admin() {
	return (
		<RequireAuth>
			<div></div>
		</RequireAuth>
	);
}
