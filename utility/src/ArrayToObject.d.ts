export declare function ArrayToObject<T>(arr: (T & {
    id: string;
})[]): Record<string, T>;
