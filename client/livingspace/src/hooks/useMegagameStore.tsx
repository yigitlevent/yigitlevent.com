import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { GenericGet } from "../utils/GenericRequests";


export type FetchState =
	| "waiting"
	| "requesting"
	| "succeded"
	| "failed";

interface MegagameStore {
	readonly fetchMegagameState: FetchState;
	readonly fetchQueuesState: FetchState;

	readonly megagame: Megagame | undefined;

	readonly lang: "en" | "tr";
	readonly userType: MegagameUserType;
	readonly userTypeId: FactionId;

	setLang: (lang: "en" | "tr") => void;
	setUserType: (userType: MegagameUserType) => void;

	setFetchMegagameState: (fetchState: FetchState) => void;
	fetchData: (changeState: boolean) => void;
}

export const useMegagameStore = create<MegagameStore>()(
	persist(
		devtools(
			(set, get) => ({
				fetchMegagameState: "waiting",

				megagame: undefined,

				lang: "tr",
				userType: "Guest",
				userTypeId: "",

				setLang: (lang: "en" | "tr") => {
					set(produce<MegagameStore>(state => { state.lang = lang; }));
				},

				setUserType: (userType: MegagameUserType) => {
					set(produce<MegagameStore>(state => {
						state.userType = userType;

						const megagame = get().megagame;
						if (megagame) {
							if (userType === "Guest") state.userTypeId = "" as FactionId;
							else state.userTypeId = megagame.factions.find(faction => faction.name === userType)?.id ?? "" as FactionId;
						}
					}));
				},

				setFetchMegagameState: (fetchState: FetchState) => {
					set(produce<MegagameStore>(state => { state.fetchMegagameState = fetchState; }));
				},

				fetchData: (changeState: boolean) => {
					const fetchState = get().fetchMegagameState;
					const setFetchMegagameState = get().setFetchMegagameState;

					if (fetchState !== "requesting") {
						if (changeState) setFetchMegagameState("requesting");

						GenericGet<MggmMegagameResponse>("/mggm/megagame")
							.then(response => {
								set(produce<MegagameStore>(state => {
									state.megagame = response.data.megagame;
								}));

								setFetchMegagameState("succeded");
							})
							.catch(() => { setFetchMegagameState("failed"); });
					}
				}
			})
		),
		{ name: "MegagameStore" }
	)
);
