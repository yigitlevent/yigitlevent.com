export type UniqueArrayItem<K, T> = { id: K; } & T;

export class UniqueArray<K, T> {
	private values: UniqueArrayItem<K, T>[] = [];

	constructor(newArray?: UniqueArrayItem<K, T>[]) {
		if (newArray) this.values = newArray;
	}

	get items() {
		return this.values;
	}

	add(item: UniqueArrayItem<K, T>): UniqueArray<K, T> {
		const index = this.values.findIndex(v => v.id === item.id);
		if (index === -1) this.values.push(item);
		else this.values[index] = item;
		return this;
	}

	remove(id: K): UniqueArray<K, T> {
		const index = this.values.findIndex(v => v.id === id);
		if (index !== -1) this.values.splice(index, 1);
		return this;
	}

	at(index: number): UniqueArrayItem<K, T> {
		if (index > this.values.length - 1 || this.values.length + index < 0) throw Error("Index out of bounds");
		else if (index < 0) return this.values[this.values.length + index];
		else return this.values[index];
	}

	head(): UniqueArrayItem<K, T> {
		return this.values[0];
	}

	last(): UniqueArrayItem<K, T> {
		return this.values[this.values.length - 1];
	}

	clear() {
		this.values = [];
	}

	has(id: K): boolean {
		return this.values.some(v => v.id === id);
	}

	exists(id: K, key: keyof T, value: T[keyof T]): boolean {
		return this.values.some(v => v.id === id && v[key] === value);
	}

	/**
	 * Returns count of elements which satisfy the key-value pair condition.
	 * @param key - key of the element type of `T`.
	 * @param value - value condition for the key of the element type of `T`.
	 * @returns count of elements that has this key-value pair.
	**/
	existsAny(key: keyof T, value: T[keyof T]): number {
		return this.values.filter(v => v[key] === value).length;
	}

	find(id: K): UniqueArrayItem<K, T> | undefined {
		return this.values.find(v => v.id === id);
	}

	map<R>(callback: (value: UniqueArrayItem<K, T>, index: number, array: UniqueArrayItem<K, T>[]) => R) {
		return this.values.map(callback);
	}

	forEach<R>(callback: (value: UniqueArrayItem<K, T>, index: number, array: UniqueArrayItem<K, T>[]) => R) {
		return this.values.forEach(callback);
	}

	filter<R>(callback: (value: UniqueArrayItem<K, T>, index: number, array: UniqueArrayItem<K, T>[]) => R) {
		return this.values.filter(callback);
	}
}
