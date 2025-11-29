export function RandomNumber(min, max) {
    return (min - 1) + Math.ceil(Math.random() * (max - min + 1));
}
