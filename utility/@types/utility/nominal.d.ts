/*interface NominalString<T extends string> extends String {
	readonly __typeName: T;
}
interface NominalNumber<T extends number> extends Number {
	readonly __typeName: T;
}*/

declare const NominalBrand: unique symbol;

type Nominal<Type, Identifier> = Type & { readonly [NominalBrand]: Identifier; };
