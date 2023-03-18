import { Stocks, Setting } from "../../../../client/bwgrtools/src/data/stocks/_stocks";
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
	
	const allSettings: Setting[] = [];

	Object.keys(Stocks).forEach((stockKey, stockIndex) => {
		const stock = Stocks[stockKey];

		stockRefs.push([stockIndex, stock.name]);
		datStocks.push(`(${stockIndex}, '${stock.name}', '${stock.namePlural}', ${stock.stride})`);

		stock.agePool.forEach((age, ageIndex) => {
			datAgePools.push(`(${ageIndex}, ${stockIndex}, ${age.min}, ${age.m}, ${age.p})`);
		});

		stock.allowed.forEach(rulesetId => {
			datRulesetStocks.push(`(${stockIndex}, '${rulesetId}')`);
		});

		allSettings.push(...Object.values(stock.settings));
	});

	allSettings.forEach((setting, settingIndex) => {
		const stock = Stocks[setting.stock];
		const stockIndex = findIndex("Stocks", stock.name, { Stocks: stockRefs });

		settingRefs.push([settingIndex, `${stock.name}➞${setting.name}`]);
		datSettings.push(`(${settingIndex}, '${setting.name}', '${setting.short}', ${stockIndex}, ${setting.type === "Subsetting"})`);

		setting.allowed.forEach(rulesetId => {
			datRulesetSettings.push(`(${settingIndex}, '${rulesetId}')`);
		});
	});


	return {
		references: { Stocks: stockRefs, Settings: settingRefs },
		data: [
			arrayToSQL("dat", "Stocks", '"Id", "Name", "NamePlural", "Stride"', datStocks),
			arrayToSQL("dat", "AgePools", '"Id", "StockId", "MinAge", "MentalPool", "PhysicalPool"', datAgePools),
			arrayToSQL("dat", "RulesetStocks", '"StockId", "RulesetId"', datRulesetStocks),
			arrayToSQL("dat", "Settings", '"Id", "Name", "NameShort", "StockId", "IsSubsetting"', datSettings),
			arrayToSQL("dat", "RulesetSettings", '"SettingId", "RulesetId"', datRulesetSettings)
		]
	};
}
