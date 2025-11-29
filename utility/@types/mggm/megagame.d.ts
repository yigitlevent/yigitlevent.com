type MegagameId = Nominal<string, "MegagameId">;
type FactionId = Nominal<string, "FactionId">;
type OrderTypeId = Nominal<string, "OrderTypeId">;
type DeadlineItemId = Nominal<string, "DeadlineItemId">;
type NewsItemId = Nominal<string, "NewsItemId">;
type OrderQueueItemId = Nominal<string, "OrderQueueItemId">;

type MegagameDuneFaction =
	| "Bene Gesserit" | "Bene Tleliaxu" | "Spacing Guild"
	| "Sietch Tabr" | "Sietch Habbanya" | "Sietch Tuek"
	| "House Corrino" | "House Atreides" | "House Harkonnen"
	| "House Moritani" | "House Ecaz" | "House Richese"
	| "House Fenring" | "House Ordos" | "House Ginaz";

interface MegagameDBO {
	Id: MegagameId;
	StartAt: string;
	EndAt: string;
	Name: string;
	CycleStart: number;
	CycleMinutes: number;
}

interface MegagameFactionDBO {
	Id: FactionId;
	Name: MegagameDuneFaction;
	FactionCode: string;
}

interface MegagameOrderTypeDBO {
	Id: OrderTypeId;
	Name: string;
}

interface MegagameDeadlineItemDBO {
	Id: DeadlineItemId;
	Type: string;
	DeadlineAt: string;
}

interface MegagameNewsDBO {
	Id: NewsItemId;
	FactionId: FactionId;
	Text: string;
}

interface MegagameEventDBO {
	CycleInterval: number;
	Type: string;
}

interface MegagameOrderQueueItemDBO {
	Id: OrderQueueItemId;
	FactionId: FactionId;
	OrderTypeId: OrderTypeId;
	CreatedAt: string;
}

interface MegagameFaction {
	id: FactionId;
	name: MegagameDuneFaction;
	factionCode: string;
}

interface MegagameOrderType {
	id: OrderTypeId;
	name: string;
}

interface MegagameDeadlineItem {
	id: DeadlineItemId;
	type: string;
	deadlineAt: Date;
}

interface MegagameNewsItem {
	id: NewsItemId;
	factionId: FactionId;
	text: string;
}

interface MegagameOrderQueueItem {
	id: OrderQueueItemId;
	factionId: FactionId;
}

type MegagameOrderQueueItems = Record<string, MegagameOrderQueueItem[]>;

interface MegagameEvent {
	cycleInterval: number;
	type: string;
}

interface Megagame {
	id: MegagameId;
	name: string;
	timing: {
		start: Date;
		end: Date;
	};
	cycle: {
		start: number;
		minutes: number;
	};
	factions: MegagameFaction[];
	orderTypes: MegagameOrderType[];
	deadlineItems: MegagameDeadlineItem[];
	news: MegagameNewsItem[];
	events: MegagameEvent[];
}

type MegagameUserType =
	"Guest"
	| MegagameDuneFaction;
