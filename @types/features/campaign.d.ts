interface Campaign {
	id: string;
	name: string;
	gamemaster: string;
	enabled: boolean;
	createdAt: Date;
	updatedAt: null | Date;
}

type CreateCampaignRequest = Omit<Campaign, "id" | "enabled" | "createdAt" | "updatedAt">

interface CampaignResponse {
	campaign: Campaign;
}

interface CampaignsResponse {
	campaigns: Campaign[];
}
