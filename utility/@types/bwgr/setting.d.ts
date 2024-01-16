type BwgrSettingId = Nominal<number, "BwgrSettingId">;

interface BwgrSettingDBO {
	Rulesets: BwgrRulesetId[];
	Id: BwgrSettingId;
	Name: string;
	NameShort: string;
	StockId: BwgrStockId;
	StockName: string;
	IsSubsetting: boolean;
}

interface BwgrSetting {
	rulesets: BwgrRulesetId[];
	id: BwgrSettingId;
	name: string;
	nameShort: string;
	stock: [id: BwgrStockId, name: string];
	isSubsetting: boolean;
}

