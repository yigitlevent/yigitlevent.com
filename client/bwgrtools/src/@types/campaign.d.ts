interface Campaign {
	Id: string;
	Name: string;
	Gamemaster: string;
	Enabled: boolean;
	CreatedAt: Date;
	UpdatedAt: null | Date;
}

interface CampaignResponse {
	campaign: Campaign;
}

interface CampaignsResponse {
	campaigns: Campaign[];
}
