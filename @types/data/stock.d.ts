type StockId = Nominal<number, "StockId">;

interface Stock {
	rulesets: RulesetId[];
	id: StockId;
	name: string;
	namePlural: string;
	stride: number;
	settingIds: SettingId[];
	agePool: {
		minAge: number;
		mentalPool: number;
		physicalPool: number;
	}[];
}
