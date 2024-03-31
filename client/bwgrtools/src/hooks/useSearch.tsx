import Fuse from "fuse.js";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


type List<T> = (T & { rulesets: BwgrRulesetId[]; })[];

interface SearchValues {
	text: string;
	fields: string[];
	filters: { [key: string]: string; };
}

interface SearchReturn<T> {
	searchValues: SearchValues,
	setFilter: (filtersToApply: { key: string; value: string; }[]) => void,
	filteredList: List<T>;
}

export function useSearch<T>(mainList: List<T>, filterKeys: string[], initialFilterValues?: { [key: string]: string; }): SearchReturn<T> {
	const [urlParams, setUrlParams] = useSearchParams();

	const [originalList] = useState(mainList);
	const [filteredList, setFilteredList] = useState(mainList);

	const applyInitialFilterValues = useCallback((fKeys: string[]) => {
		const s = urlParams.get("s");
		const sf = urlParams.get("sf");

		const filters: { [key: string]: string; } = fKeys.reduce((a, v) => ({ ...a, [v]: "Any" }), {});

		if (sf) {
			Object.keys(filters).forEach((filterKey) => {
				const filterValue = urlParams.get(filterKey);
				if (filterValue) filters[filterKey] = filterValue;
				else if (initialFilterValues) filters[filterKey] = initialFilterValues[filterKey];
			});
		}

		return {
			text: s ? s : "",
			fields: sf ? sf.split(",") : ["Name"],
			filters
		};
	}, [initialFilterValues, urlParams]);

	const [searchValues, setSearchValues] = useState<SearchValues>(applyInitialFilterValues(filterKeys));

	const applySearchValues = useCallback((filtersToApply: { key: string; value: string; }[]) => {
		const newSearchValues: SearchValues = JSON.parse(JSON.stringify(searchValues));

		filtersToApply.forEach(filter => {
			if (filter.key === "s") {
				if (filter.value === "") urlParams.delete(filter.key);
				else urlParams.set("s", filter.value);
				newSearchValues.text = filter.value;
			}
			else if (filter.key === "sf") {
				if (filter.value !== "") urlParams.set("sf", filter.value);
				else if (newSearchValues.fields.length > 1) {
					urlParams.delete(filter.key);
					newSearchValues.fields = filter.value.split(",");
				}
			}
			else {
				if (filter.value !== "Any") urlParams.set(filter.key, filter.value);
				else urlParams.delete(filter.key);
				newSearchValues.filters[filter.key] = filter.value;
			}
		});

		setUrlParams(urlParams);
		setSearchValues({ ...newSearchValues });
	}, [searchValues, setUrlParams, urlParams]);

	const search = useCallback(() => {
		new Promise((resolve) => {
			let result = originalList;

			Object.keys(searchValues.filters).forEach((filterKey) => {
				const filterValue = searchValues.filters[filterKey];
				if (filterValue !== "Any") {
					result = result.filter(v => {
						const itemValue = (v as never)[filterKey];
						if (itemValue) return itemValue[1] === searchValues.filters[filterKey];
						return false;
					});
				}
			});

			if (searchValues.text.length > 2 && searchValues.fields.length > 0) {
				const options = {
					includeScore: true,
					threshold: 0.3,
					keys: searchValues.fields.map(v => v.toLocaleLowerCase())
				};

				const results = (new Fuse(result, options)).search(searchValues.text);
				result = results.map(x => x.item);
			}

			setFilteredList(result);
			resolve(true);
		});
	}, [originalList, searchValues.fields, searchValues.filters, searchValues.text]);

	useEffect(() => {
		const hasFilters = !Object.values(searchValues.filters).every(v => v === "Any");
		const hasText = searchValues.text.length > 2;

		const delay = setTimeout(() => (hasFilters || hasText) ? search() : setFilteredList(originalList), 800);
		return () => clearTimeout(delay);
	}, [originalList, search, searchValues.filters, searchValues.text.length]);

	return { searchValues, setFilter: applySearchValues, filteredList };
}
