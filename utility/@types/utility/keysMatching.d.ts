// https://stackoverflow.com/questions/71280331/index-signature-with-typescript-with-array-of-objects
type KeysMatching<T, V> = {
	[K in keyof T]-?: T[K] extends V ? K : never
}[keyof T];
