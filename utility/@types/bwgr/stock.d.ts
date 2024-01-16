type BwgrStockId = Nominal<number, "BwgrStockId">;

interface BwgrStockDBO {
	Rulesets: BwgrRulesetId[];
	Id: BwgrStockId;
	Name: string;
	NamePlural: string;
	Stride: number;
	SettingIds: BwgrSettingId[];
}

interface BwgrAgePoolDBO {
	Id: number;
	StockId: BwgrStockId;
	MinAge: number;
	MentalPool: number;
	PhysicalPool: number;
}

interface BwgrStock {
	rulesets: BwgrRulesetId[];
	id: BwgrStockId;
	name: string;
	namePlural: string;
	stride: number;
	settingIds: BwgrSettingId[];
	agePool: {
		minAge: number;
		mentalPool: number;
		physicalPool: number;
	}[];
}
