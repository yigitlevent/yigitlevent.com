import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { GenericGet, GenericPost } from "../utils/GenericRequests";


type FetchState =
	| "fetch-data"
	| "fetching-data"
	| "done"
	| "failed";

interface MegagameStore {
	readonly fetchState: FetchState;
	readonly fetchRumorsState: FetchState;

	readonly megagame: Megagame;
	readonly rumors: Rumor[];

	setFetchState: (fetchState: FetchState) => void;
	setFetchRumorsState: (fetchState: FetchState) => void;
	fetchData: () => void;
	fetchRumors: () => void;

	createMegagame: (megagame: SetMegagameRequest) => void;
	addRumor: (textEn: string, textTr: string) => void;
}

export const useMegagameStore = create<MegagameStore>()(
	devtools(
		(set, get) => ({
			fetchState: "fetch-data",
			fetchRumorsState: "done",

			megagame: undefined,
			rumors: [],

			setFetchState: (fetchState: FetchState) => {
				set(produce<MegagameStore>((state) => { state.fetchState = fetchState; }));
			},

			setFetchRumorsState: (fetchState: FetchState) => {
				set(produce<MegagameStore>((state) => { state.fetchRumorsState = fetchState; }));
			},

			fetchData: () => {
				const fetchState = get().fetchState;
				const setFetchState = get().setFetchState;

				if (fetchState === "fetch-data") {
					setFetchState("fetching-data");

					GenericGet<MggmMegagameResponse>("/mggm/megagame")
						.then(response => {
							if (response.status === 200) {
								set(produce<MegagameStore>((state) => {
									state.megagame = response.data.megagame;
								}));

								get().fetchRumors();

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
			},

			fetchRumors: () => {
				const megagameId = get().megagame.id;
				const fetchRumorsState = get().fetchRumorsState;
				const setFetchRumorsState = get().setFetchRumorsState;

				if (fetchRumorsState !== "fetching-data") {
					setFetchRumorsState("fetching-data");

					const request: GetMegagameRumorsRequest = {
						megagameId: megagameId
					};

					GenericPost<MggmRumorsResponse>("/mggm/megagame/rumors", request).then(response => {
						if (response.status === 200) {
							set(produce<MegagameStore>((state) => {
								state.rumors = response.data.rumors;
							}));

							setFetchRumorsState("done");
						}
						else {
							setFetchRumorsState("failed");
							throw new Error();
						}
					}).catch(reason => {
						console.error(reason);
						setFetchRumorsState("failed");
					});
				}
			},

			createMegagame: (megagame: SetMegagameRequest) => {
				GenericPost<void>("/mggm/megagame", megagame)
					.then(response => {
						if (response.status === 200) {
							get().fetchData();
						}
						else throw new Error();
					})
					.catch(console.error);
			},

			addRumor: (textEN: string, textTR: string) => {
				GenericPost<void>("/mggm/megagame/rumor", {
					megagameId: get().megagame.id,
					textEN,
					textTR
				}).then(response => {
					if (response.status === 200) get().fetchRumors();
					else throw new Error();
				}).catch(console.error);
			}
		}),
		{ name: "MegagameStore" }
	)
);
