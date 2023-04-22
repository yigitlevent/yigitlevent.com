/*interface NominalString<T extends string> extends String {
	readonly __typeName: T;
}
interface NominalNumber<T extends number> extends Number {
	readonly __typeName: T;
}*/

declare const NOMINAL_BRAND: unique symbol

type Nominal<T> = T & { [NOMINAL_BRAND]: never };