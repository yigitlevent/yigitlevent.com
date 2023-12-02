import { Stocks, SettingOld } from "../raw_data_bwgr/stocks/_stocks";
import { arrayToSQL } from "../util/arrayToSql";
import { findIndex } from "../util/findRef";


export function processStocks(): Processed {
	const stockRefs: Reference[] = [];
	const settingRefs: Reference[] = [];

	const datStocks: string[] = [];
	const datAgePools: string[] = [];
	const datRulesetStocks: string[] = [];
	const datSettings: string[] = [];
	const datRulesetSettings: string[] = [];

	const allSettings: SettingOld[] = [];

	Object.keys(Stocks).forEach((stockKey, stockIndex) => {
		const stock = Stocks[stockKey];

		stockRefs.push([stockIndex, stock.name]);
		datStocks.push(`(${stockIndex}, '${stock.name}', '${stock.namePlural}', ${stock.stride})`);

		stock.agePool.forEach((age) => {
			datAgePools.push(`(${datAgePools.length}, ${stockIndex}, ${age.min}, ${age.m}, ${age.p})`);
		});

		stock.allowed.forEach(rulesetId => {
			datRulesetStocks.push(`(${stockIndex}, '${rulesetId}')`);
		});

		allSettings.push(...Object.values(stock.settings));
	});

	allSettings.forEach((setting, settingIndex) => {
		const stock = Stocks[setting.stock];
		const stockIndex = findIndex("Stocks", stock.name, { Stocks: stockRefs })[0];

		settingRefs.push([settingIndex, `${stock.name}➞${setting.name}`]);
		datSettings.push(`(${settingIndex}, '${setting.name}', '${setting.short}', ${stockIndex}, ${setting.type === "Subsetting"})`);

		setting.allowed.forEach(rulesetId => {
			datRulesetSettings.push(`(${settingIndex}, '${rulesetId}')`);
		});
	});


	return {
		name: "p2_stocks",
		references: { Stocks: stockRefs, Settings: settingRefs },
		data: [
			arrayToSQL("bwgr", "Stocks", '"Id", "Name", "NamePlural", "Stride"', datStocks),
			arrayToSQL("bwgr", "AgePools", '"Id", "StockId", "MinAge", "MentalPool", "PhysicalPool"', datAgePools),
			arrayToSQL("bwgr", "RulesetStocks", '"StockId", "RulesetId"', datRulesetStocks),
			arrayToSQL("bwgr", "Settings", '"Id", "Name", "NameShort", "StockId", "IsSubsetting"', datSettings),
			arrayToSQL("bwgr", "RulesetSettings", '"SettingId", "RulesetId"', datRulesetSettings)
		]
	};
}
