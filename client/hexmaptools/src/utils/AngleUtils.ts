export function DegreeToRadian(degree: Degree): Radian {
	return degree * Math.PI / 180 as Radian;
}

export function RadianToDegree(radian: Radian): Degree {
	return radian * 180 / Math.PI as Degree;
}
