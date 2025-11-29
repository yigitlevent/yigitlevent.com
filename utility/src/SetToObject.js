export function SetToObject(arr) {
    return [...arr].reduce((a, v) => ({ ...a, [v.id]: v }), {});
}
