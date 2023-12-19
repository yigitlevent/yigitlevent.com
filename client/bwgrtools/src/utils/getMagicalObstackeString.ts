export function GetObstacleString(resource: Resource, obstacleDetails: ResourceMagicObstacleDetails[]): string {
	const strs = obstacleDetails.map(v => {
		const desc = v.description ? `${v.description}: ` : "";
		if (v.obstacle) {
			return `${desc}${v.obstacle}${v.caret ? "^" : ""}`;
		}
		else if (v.abilities && v.abilities.length > 0) {
			return `${desc}${v.abilities.map(v => v[1]).join("/")}${v.caret ? "^" : ""}`;
		}
		else throw new Error(`How could this be?! ${resource.id} ${resource.name}`);
	});

	return strs.join("; ");
}
