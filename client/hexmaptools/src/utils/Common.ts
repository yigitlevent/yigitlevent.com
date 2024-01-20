import { ArrayToObject } from "@utility/ArrayToObject";

import { DegreeToRadian } from "./AngleUtils";


function GetCommon(): number[] {
	const arr = [];
	for (let i = 0; i < 360; i++) { arr.push(i * 30); }
	return arr;
}

export const CommonAngles = ArrayToObject(GetCommon().map(v => { return { id: `${v}`, degree: v as Degree, radian: DegreeToRadian(v as Degree) }; }));
