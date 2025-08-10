interface MegagameDBO {
	Id: Guid;
	Start: string;
	End: string;
	Name: string;
	Type: string;
	CycleStart: number;
	CycleMinutes: number;
}

interface MegagameEventDBO {
	Id: Guid;
	NameEN: string;
	NameTR: string;
	DescriptionEN: string;
	DescriptionTR: string;
	CycleInterval: number;
}


interface MegagameRumorDBO {
	Id: Guid;
	TextEN: string;
	TextTR: string;
}

type MegagameId = Nominal<number, "MegagameId">;
type MegagameEventId = Nominal<number, "MegagameEventId">;

interface MegagameEvent {
	id: MegagameEventId;
	name: {
		en: string;
		tr: string;
	};
	description: {
		en: string;
		tr: string;
	};
	cycleInterval: number;
}

interface Megagame {
	id: MegagameId;
	name: string;
	type: "dune" | "wod";
	timing: {
		start: Date;
		end: Date;
	};
	cycle: {
		start: number;
		minutes: number;
	};
	events: MegagameEvent[];
}

interface Rumor {
	id: Guid;
	text: {
		en: string;
		tr: string;
	};
}
