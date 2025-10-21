import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { GenericDelete, GenericGet, GenericPost, GenericPut } from "../utils/GenericRequests";


export type FetchState =
	| "waiting"
	| "requesting"
	| "succeded"
	| "failed";

interface MegagameStore {
	readonly fetchMegagameState: FetchState;
	readonly fetchQueuesState: FetchState;

	readonly megagame: Megagame | undefined;
	readonly queues: MegagameOrderQueueItems | undefined;

	readonly lang: "en" | "tr";
	readonly userType: MegagameUserType;
	readonly userTypeId: FactionId;

	setLang: (lang: "en" | "tr") => void;
	setUserType: (userType: MegagameUserType) => void;

	setFetchMegagameState: (fetchState: FetchState) => void;
	setFetchQueuesState: (fetchState: FetchState) => void;
	fetchData: (changeState: boolean) => void;
	fetchQueues: (changeState: boolean) => void;

	resetMegagame: (megagame: ResetMegagameRequest) => void;
	deleteDeadlineItem: (deadlineItemId: DeadlineItemId) => void;
	createDeadlineItem: (deadlineItem: CreateMegagameDeadlineItemRequest) => void;

	createNewsItem: (newsItem: CreateMegagameNewsItemRequest) => void;

	deleteOrderQueueItem: (orderQueueItemId: OrderQueueItemId) => void;
	createOrderQueueItem: (orderQueueItem: CreateOrderQueueItemRequest) => void;

	getFactionNameById: (factionId: FactionId) => MegagameDuneFaction | undefined;
}

export const useMegagameStore = create<MegagameStore>()(
	persist(
		devtools(
			(set, get) => ({
				fetchMegagameState: "waiting",
				fetchQueuesState: "waiting",

				megagame: undefined,
				queues: undefined,

				userType: "Guest",
				userTypeId: "",

				lang: "tr",

				setLang: (lang: "en" | "tr") => {
					set(produce<MegagameStore>((state) => { state.lang = lang; }));
				},

				setUserType: (userType: MegagameUserType) => {
					set(produce<MegagameStore>((state) => {
						state.userType = userType;

						const megagame = get().megagame;
						if (megagame) {
							if (userType === "Guest") state.userTypeId = "" as FactionId;
							else state.userTypeId = megagame.factions.find(faction => faction.name === userType)?.id || "" as FactionId;
						}
					}));
				},

				setFetchMegagameState: (fetchState: FetchState) => {
					set(produce<MegagameStore>((state) => { state.fetchMegagameState = fetchState; }));
				},

				setFetchQueuesState: (fetchState: FetchState) => {
					set(produce<MegagameStore>((state) => { state.fetchQueuesState = fetchState; }));
				},

				fetchData: (changeState: boolean) => {
					const fetchState = get().fetchMegagameState;
					const setFetchMegagameState = get().setFetchMegagameState;

					if (fetchState !== "requesting") {
						if (changeState) setFetchMegagameState("requesting");

						GenericGet<MggmMegagameResponse>("/mggm/megagame")
							.then(response => {
								set(produce<MegagameStore>((state) => {
									state.megagame = response.data.megagame;
								}));

								setFetchMegagameState("succeded");
							})
							.catch(() => setFetchMegagameState("failed"));
					}
				},

				fetchQueues: (changeState: boolean) => {
					const megagameId = get().megagame?.id;
					const fetchState = get().fetchQueuesState;
					const setFetchQueuesState = get().setFetchQueuesState;

					if (fetchState !== "requesting" && megagameId) {
						if (changeState) setFetchQueuesState("requesting");

						GenericGet<MggmOrderQueueItemsResponse>(`/mggm/megagame/order-queues/${megagameId}`)
							.then(response => {
								set(produce<MegagameStore>((state) => {
									state.queues = response.data.queues;
								}));

								setFetchQueuesState("succeded");
							})
							.catch(() => setFetchQueuesState("failed"));
					}
				},

				resetMegagame: (megagame: ResetMegagameRequest) => {
					GenericPut(`/mggm/megagame/reset/${megagame.megagameId}`, null)
						.finally(() => {
							get().fetchData(true);
							get().fetchQueues(true);
						});
				},

				createDeadlineItem: (deadlineItem: CreateMegagameDeadlineItemRequest) => {
					GenericPost("/mggm/megagame/deadline-item", deadlineItem)
						.finally(() => get().fetchData(false));
				},

				deleteDeadlineItem: (deadlineItemId: DeadlineItemId) => {
					GenericDelete(`/mggm/megagame/deadline-item/${deadlineItemId}`)
						.finally(() => get().fetchData(false));
				},

				createNewsItem: (newsItem: CreateMegagameNewsItemRequest) => {
					GenericPost("/mggm/megagame/news-item", newsItem)
						.finally(() => get().fetchData(false));
				},

				deleteOrderQueueItem: (orderQueueItemId: OrderQueueItemId) => {
					GenericDelete(`/mggm/megagame/order-queue-item/${orderQueueItemId}`)
						.finally(() => get().fetchQueues(false));
				},

				createOrderQueueItem: (orderQueueItem: CreateOrderQueueItemRequest) => {
					GenericPost("/mggm/megagame/order-queue-item", orderQueueItem)
						.finally(() => get().fetchQueues(false));
				},

				getFactionNameById: (factionId: FactionId): MegagameDuneFaction | undefined => {
					const megagame = get().megagame;
					if (!megagame) return undefined;
					return megagame.factions.find(faction => faction.id === factionId)?.name;
				}
			})
		),
		{ name: "MegagameStore" }
	)
);
