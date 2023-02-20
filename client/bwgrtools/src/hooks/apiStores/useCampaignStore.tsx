import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";
import { GenericGet, GenericPost } from "../stores/_genericRequests";


interface CampaignState {
	campaigns: undefined | Campaign[];
	fetching: boolean;

	toggleFetching: () => void;
	setCampaigns: (campaigns: undefined | Campaign[]) => void;
	getCampaigns: () => void;
}

export const useCampaignStore = create<CampaignState>()(
	devtools(
		(set, get) => ({
			campaigns: undefined,
			fetching: false,


			toggleFetching: () => {
				set(produce<CampaignState>((state) => { state.fetching = !state.fetching; }));
			},

			setCampaigns: (campaigns: undefined | Campaign[]) => {
				set(produce<CampaignState>((state) => { state.campaigns = campaigns; }));
			},

			getCampaigns: () => {
				const setCampaigns = get().setCampaigns;
				const toggleFetching = get().toggleFetching;

				toggleFetching();

				GenericGet<CampaignsResponse>("/campaigns")
					.then(response => {
						if (response.status === 200) setCampaigns(response.data.campaigns);
						else throw new Error();
					})
					.catch(reason => {
						setCampaigns(undefined);
						console.error(reason);
					})
					.finally(() => toggleFetching());
			},

			createCampaign: (formData: CreateCampaignRequest) => {
				const getCampaigns = get().getCampaigns;

				GenericPost("/campaign", formData)
					.then(response => {
						if (response.status === 200) getCampaigns();
						else throw new Error();
					})
					.catch(reason => {
						console.error(reason);
					});
			}
		})
	)
);
