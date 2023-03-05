import { Stocks, Setting } from "../../../../client/bwgrtools/src/data/stocks/_stocks";
import { arrayToSQL } from "../util/arrayToSql";
import { findIndex } from "../util/findRef";


export function processStocks(): Processed {
	const DatStocks: string[] = [];
	const DatAgePools: string[] = [];
	const DatRulesetStocks: string[] = [];
	const DatSettings: string[] = [];
	const DatRulesetSettings: string[] = [];

	const allSettings: Setting[] = [];

	const stockRefs: Reference[] = [];
	const settingRefs: Reference[] = [];

	Object.keys(Stocks).forEach((stockKey, stockIndex) => {
		const stock = Stocks[stockKey];

		stockRefs.push([stockIndex, stock.name]);
		DatStocks.push(`(${stockIndex}, '${stock.name}', '${stock.namePlural}', ${stock.stride})`);

		stock.agePool.forEach((age, ageIndex) => {
			DatAgePools.push(`(${ageIndex}, ${stockIndex}, ${age.min}, ${age.m}, ${age.p})`);
		});

		stock.allowed.forEach(rulesetId => {
			DatRulesetStocks.push(`(${stockIndex}, '${rulesetId}')`);
		});

		allSettings.push(...Object.values(stock.settings));
	});

	allSettings.forEach((setting, settingIndex) => {
		const stock = Stocks[setting.stock];
		const stockIndex = findIndex("Stocks", stock.name, { Stocks: stockRefs });

		settingRefs.push([settingIndex, setting.name]);
		DatSettings.push(`(${settingIndex}, '${setting.name}', '${setting.short}', ${stockIndex}, ${setting.type === "Subsetting"})`);

		setting.allowed.forEach(rulesetId => {
			DatRulesetSettings.push(`(${settingIndex}, '${rulesetId}')`);
		});
	});

	const stocks = arrayToSQL("dat", "Stocks", '"Id", "Name", "NamePlural", "Stride"', DatStocks);
	const agepools = arrayToSQL("dat", "AgePools", '"Id", "StockId", "MinAge", "MentalPool", "PhysicalPool"', DatAgePools);
	const rulesetStocks = arrayToSQL("dat", "RulesetStocks", '"StockId", "RulesetId"', DatRulesetStocks);
	const settings = arrayToSQL("dat", "Settings", '"Id", "Name", "NameShort", "StockId", "IsSubsetting"', DatSettings);
	const rulesetSettings = arrayToSQL("dat", "RulesetSettings", '"SettingId", "RulesetId"', DatRulesetSettings);

	return {
		references: { Stocks: stockRefs, Settings: settingRefs },
		data: [stocks, agepools, rulesetStocks, settings, rulesetSettings]
	};
}
