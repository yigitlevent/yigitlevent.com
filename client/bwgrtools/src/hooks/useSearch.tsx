import Fuse from "fuse.js";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


type List<T> = (T & { rulesets: RulesetId[]; })[];

interface SearchReturn<T> {
	searchString: string,
	searchFields: string[],
	filters: { [key: string]: string; },
	setFilter: (filtersToApply: { key: string; value: string; }[]) => void,
	searchResults: List<T>;
}

export function useSearch<T>(mainList: List<T>, filterKeys: string[], initialFilterValues?: { [key: string]: string; }): SearchReturn<T> {
	const [originalList] = useState(mainList);
	const [urlParams, setUrlParams] = useSearchParams();

	const applyInitialFilterValues = useCallback((fKeys: string[]) => {
		const s = urlParams.get("s");
		if (s) setSearchString(s);

		const sf = urlParams.get("sf");
		if (sf) setSearchFields(sf.split(","));

		const newFilters: { [key: string]: string; } = fKeys.reduce((a, v) => ({ ...a, [v]: "Any" }), {});

		Object.keys(newFilters).forEach((filterKey) => {
			const filterValue = urlParams.get(filterKey);
			if (filterValue) newFilters[filterKey] = filterValue;
			else if (initialFilterValues) newFilters[filterKey] = initialFilterValues[filterKey];
		});

		return newFilters;
	}, [initialFilterValues, urlParams]);

	const [filters, setFilters] = useState<{ [key: string]: string; }>(applyInitialFilterValues(filterKeys));

	const setInitialList = useCallback((mlist: List<T>) => {
		if (filters) {
			let res = mlist;
			Object.keys(filters).forEach((filterKey) => {
				const filterValue = filters[filterKey];
				if (filterValue !== "Any") {
					res = res.filter(v => {
						const itemValue = (v as never)[filterKey];
						if (itemValue) return itemValue[1] === filters[filterKey];
						return false;
					});
				}
			});
			return res;
		}
		return mlist;
	}, [filters]);

	const [searchResults, setSearchResults] = useState<List<T>>(setInitialList(mainList));

	const [searchString, setSearchString] = useState("");
	const [searchFields, setSearchFields] = useState<string[]>(["Name"]);


	const setFilter = useCallback((filtersToApply: { key: string; value: string; }[]) => {
		const newFilters: { [key: string]: string; } = JSON.parse(JSON.stringify(filters));

		filtersToApply.forEach(filter => {
			if (filter.key === "s") {
				if (filter.value === "") urlParams.delete(filter.key);
				else urlParams.set("s", filter.value);
				setSearchString(filter.value);
			}
			else if (filter.key === "sf") {
				if (filter.value !== "") urlParams.set("sf", filter.value);
				else if (searchFields.length > 1) {
					urlParams.delete(filter.key);
					setSearchFields(filter.value.split(","));
				}
			}
			else {
				if (filter.value !== "Any") urlParams.set(filter.key, filter.value);
				else urlParams.delete(filter.key);
				newFilters[filter.key] = filter.value;
			}
		});

		setUrlParams(urlParams);
		setFilters(newFilters);
	}, [filters, searchFields.length, setUrlParams, urlParams]);

	const search = useCallback(() => {
		let res = originalList;

		Object.keys(filters).forEach((filterKey) => {
			const filterValue = filters[filterKey];
			if (filterValue !== "Any") {
				res = res.filter(v => {
					const itemValue = (v as never)[filterKey];
					if (itemValue) return itemValue[1] === filters[filterKey];
					return false;
				});
			}
		});

		if (searchString.length > 0 && searchFields.length > 0) {
			const options = {
				includeScore: true,
				threshold: 0.3,
				keys: searchFields.map(v => v.toLocaleLowerCase())
			};

			const results = (new Fuse(res, options)).search(searchString);
			res = results.map(x => x.item);
		}

		setSearchResults(res);
	}, [originalList, filters, searchString, searchFields]);


	useEffect(() => {
		const delay = setTimeout(() => search(), 500);
		return () => clearTimeout(delay);
	}, [search, mainList, filters, searchFields, searchString]);

	return { searchString, searchFields, filters, setFilter, searchResults };
}
