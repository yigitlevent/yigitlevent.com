import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Fuse from "fuse.js";


type List<T> = (T & { rulesets: RulesetId[]; })[];

export function useSearch<T>(mainList: List<T>, filterKeys: string[]) {
	const [urlParams, setUrlParams] = useSearchParams();

	const [searchResults, setSearchResults] = useState<List<T>>(mainList);

	const [searchString, setSearchString] = useState("");
	const [searchFields, setSearchFields] = useState<string[]>(["Name"]);

	const [filters, setFilters] = useState<{ [key: string]: string; }>(filterKeys.reduce((a, v) => ({ ...a, [v]: "Any" }), {}));

	useEffect(() => {
		const s = urlParams.get("s");
		if (s) setSearchString(s);

		const sf = urlParams.get("sf");
		if (sf) setSearchFields(sf.split(","));

		Object.keys(filters).forEach((filterKey) => {
			const filterValue = urlParams.get(filterKey);
			if (filterValue) {
				const newFilters = JSON.parse(JSON.stringify(filters));
				newFilters[filterKey] = filterValue;
				setFilters(newFilters);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setFilter = useCallback((filterKey: string, filterValue: string) => {
		if (filterKey === "s") {
			if (filterValue === "") urlParams.delete(filterKey);
			else urlParams.set("s", filterValue);
			setSearchString(filterValue);
		}
		else if (filterKey === "sf") {
			if (filterValue === "") urlParams.delete(filterKey);
			else urlParams.set("sf", filterValue);
			setSearchFields(filterValue.split(","));
		}
		else {
			if (filterValue !== "Any") urlParams.set(filterKey, filterValue);
			else urlParams.delete(filterKey);

			const newFilters = JSON.parse(JSON.stringify(filters));
			newFilters[filterKey] = filterValue;
			setFilters(newFilters);
		}

		setUrlParams(urlParams);
	}, [filters, setUrlParams, urlParams]);

	const search = useCallback(() => {
		let res = mainList;

		Object.keys(filters).forEach((filterKey) => {
			const filterValue = filters[filterKey];
			if (filterValue !== "Any") {
				res = res.filter(v => {
					const itemValue = (v as any)[filterKey];
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
	}, [mainList, filters, searchFields, searchString]);


	useEffect(() => {
		const delay = setTimeout(() => search(), 500);
		return () => clearTimeout(delay);
	}, [search, mainList, filters, searchFields, searchString]);

	return { searchString, searchFields, filters, setFilter, searchResults };
}
