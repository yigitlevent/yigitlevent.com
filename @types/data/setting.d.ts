type SettingId = Nominal<number, "SettingId">;

interface Setting {
	rulesets: RulesetId[];
	id: SettingId;
	name: string;
	nameShort: string;
	stock: [id: StockId, name: string];
	isSubsetting: boolean;
}

