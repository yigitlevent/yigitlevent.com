export function ArrayToObject(arr) {
    return arr.reduce((a, v) => ({ ...a, [v.id]: v }), {});
}
