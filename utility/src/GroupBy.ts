export const GroupBy = <T>(list: T[], getKey: (item: T) => string): Record<string, T[]> =>
	list.reduce((previous, currentItem) => {
		const group = getKey(currentItem);
		if (!previous[group]) previous[group] = [];
		previous[group].push(currentItem);
		return previous;
	}, {} as Record<string, T[]>);
