/* eslint-disable @typescript-eslint/naming-convention */

// Strict union
type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> =
	T extends any ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> : never;

type StrictUnion<T> = StrictUnionHelper<T, T>;

// Nominal
interface NominalString<T extends string> extends String {
	readonly __typeName: T;
}
interface NominalNumber<T extends number> extends Number {
	readonly __typeName: T;
}

type Guid = NominalString<string>;


// Only one of two properties
type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
	Pick<T, Exclude<keyof T, Keys>> & {
		[K in Keys]-?:
		Required<Pick<T, K>>
		& Partial<Record<Exclude<Keys, K>, undefined>>
	}[Keys];


// At most one of
type Simplify<T> = T extends infer S ? { [K in keyof S]: S[K] } : never;

type NoneOf<T> = Simplify<{ [K in keyof T]?: never }>;

type AtMostOneOf<T> =
	| NoneOf<T>
	| { [K in keyof T]: Simplify<Pick<T, K> & NoneOf<Omit<T, K>>> }[keyof T];