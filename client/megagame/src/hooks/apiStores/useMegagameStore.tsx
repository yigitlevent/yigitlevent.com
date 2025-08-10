import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { GenericGet } from "../../utils/GenericRequests";


type FetchState =
	| "fetch-data"
	| "fetching-data"
	| "done"
	| "failed";

interface MegagameStore {
	readonly fetchState: FetchState;

	readonly megagame: Megagame;

	setFetchState: (fetchState: FetchState) => void;
	fetchData: () => void;

	serveResult: <T>(row: T[], error: [id: unknown, msg: string]) => T;
}

export const useMegagameStore = create<MegagameStore>()(
	devtools(
		(set, get) => ({
			fetchState: "fetch-data",

			megagame: [],

			setFetchState: (fetchState: FetchState) => {
				set(produce<MegagameStore>((state) => { state.fetchState = fetchState; }));
			},

			fetchData: () => {
				const fetchState = get().fetchState;
				const setFetchState = get().setFetchState;

				if (fetchState === "fetch-data") {
					setFetchState("fetching-data");

					console.debug("Fetching megagame data...");

					GenericGet<MggmMegagameResponse>("/mggm/megagame")
						.then(response => {
							if (response.status === 200) {
								set(produce<MegagameStore>((state) => {
									state.megagame = response.data.megagame;
								}));

								setFetchState("done");
							}
							else {
								setFetchState("failed");
								throw new Error();
							}
						})
						.catch(reason => {
							console.error(reason);
							setFetchState("failed");
						});
				}
			}
		}),
		{ name: "MegagameStore" }
	)
);
