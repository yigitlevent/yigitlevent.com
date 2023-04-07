type ShadesList = "B" | "G" | "W";
type ShadesListLimited = Exclude<ShadesList, "W">;

type HuntingGroundsList = "Waste" | "Marginal" | "Typical" | "Plentiful" | "Untouched";