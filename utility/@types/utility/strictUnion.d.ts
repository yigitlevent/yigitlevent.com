type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> =
	T extends unknown ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> : never;

type StrictUnion<T> = StrictUnionHelper<T, T>;
