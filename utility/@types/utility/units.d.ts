type Degree = Nominal<number, "Degree">;
type Radian = Nominal<number, "Radian">;
type Angle
	= | Degree
		| Radian;
