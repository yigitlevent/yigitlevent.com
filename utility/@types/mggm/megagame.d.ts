interface MegagameDBO {
	Id: Guid;
	Start: string;
	End: string;
	Name: string;
	CycleMinutes: number;
	CycleName: string;
	CycleNamePlural: string;
}

interface MegagameEventDBO {
	Id: Guid;
	Name: string;
	Description: string;
	CycleInterval: number;
}

type MegagameId = Nominal<number, "MegagameId">;
type MegagameEventId = Nominal<number, "MegagameEventId">;

interface MegagameEvent {
	id: MegagameEventId;
	name: string;
	description: string;
	cycleInterval: number;
}

interface Megagame {
	id: MegagameId;
	name: string;
	timing: {
		start: Date;
		end: Date;
	};
	cycle: {
		minutes: number;
		name: string;
		namePlural: string;
	};
	events: MegagameEvent[];
}

