import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { GenericDelete, GenericGet, GenericPost } from "../utils/GenericRequests";


export type FetchState =
	| "waiting"
	| "requesting"
	| "done"
	| "failed";

interface MegagameStore {
	readonly fetchMegagameState: FetchState;
	readonly fetchRumorsState: FetchState;

	readonly megagame: Megagame | undefined;
	readonly rumors: Rumor[];

	setFetchMegagameState: (fetchState: FetchState) => void;
	setFetchRumorsState: (fetchState: FetchState) => void;
	fetchData: () => void;
	fetchRumors: () => void;

	createMegagame: (megagame: SetMegagameRequest) => void;
	addRumor: (textEn: string, textTr: string) => void;
	deleteMegagames: () => void;
}

export const useMegagameStore = create<MegagameStore>()(
	devtools(
		(set, get) => ({
			fetchMegagameState: "waiting",
			fetchRumorsState: "waiting",

			megagame: undefined,
			rumors: [],

			setFetchMegagameState: (fetchState: FetchState) => {
				set(produce<MegagameStore>((state) => { state.fetchMegagameState = fetchState; }));
			},

			setFetchRumorsState: (fetchState: FetchState) => {
				set(produce<MegagameStore>((state) => { state.fetchRumorsState = fetchState; }));
			},

			fetchData: () => {
				const fetchState = get().fetchMegagameState;
				const setFetchMegagameState = get().setFetchMegagameState;

				if (fetchState === "waiting") {
					setFetchMegagameState("requesting");

					GenericGet<MggmMegagameResponse>("/mggm/megagame")
						.then(response => {
							set(produce<MegagameStore>((state) => {
								state.megagame = response.data.megagame;
							}));

							get().fetchRumors();

							setFetchMegagameState("done");
						})
						.catch(() => setFetchMegagameState("failed"));
				}
			},

			fetchRumors: () => {
				const megagameId = get().megagame?.id;
				const fetchRumorsState = get().fetchRumorsState;
				const setFetchRumorsState = get().setFetchRumorsState;

				if (fetchRumorsState !== "requesting" && megagameId) {
					setFetchRumorsState("requesting");

					const request: GetMegagameRumorsRequest = {
						megagameId: megagameId
					};

					GenericPost<MggmRumorsResponse>("/mggm/megagame/rumors", request)
						.then(response => {
							if (response.status === 200) {
								set(produce<MegagameStore>((state) => {
									state.rumors = response.data.rumors;
								}));

								setFetchRumorsState("done");
							}
							else setFetchRumorsState("failed");
						})
						.catch(() => setFetchRumorsState("failed"));
				}
			},

			createMegagame: (megagame: SetMegagameRequest) => {
				GenericPost<void>("/mggm/megagame", megagame)
					.then(response => {
						if (response.status === 200) get().fetchData();
						else console.debug("Failed to create megagame.");
					})
					.catch(console.debug);
			},

			addRumor: (textEN: string, textTR: string) => {
				const megagameId = get().megagame?.id;

				if (megagameId) {
					GenericPost<void>("/mggm/megagame/rumor", { megagameId, textEN, textTR })
						.then(response => {
							if (response.status === 200) get().fetchRumors();
							else throw new Error();
						})
						.catch(console.error);
				}
			},

			deleteMegagames: () => {
				GenericDelete<void>("/mggm/megagame")
					.then(() => {
						set(produce<MegagameStore>((state) => {
							state.rumors = [];
							state.megagame = undefined;
						}));
					})
					.catch(console.error);
			}
		}),
		{ name: "MegagameStore" }
	)
);
