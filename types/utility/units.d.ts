import type { Nominal } from "../utility/nominal";


export type Degree = Nominal<number, "Degree">;
export type Radian = Nominal<number, "Radian">;
export type Angle =
  | Degree
  | Radian;

export type DistanceUnitId = Nominal<number, "DistanceUnitId">;

export type UnitModifierId = Nominal<number, "UnitModifierId">;
