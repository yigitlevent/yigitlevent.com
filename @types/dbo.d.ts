interface SkillsDBO {
	Rulesets: string[];
	Id: number;
	Name: string;
	StockId: number | null;
	Stock: string | null;
	CategoryId: number;
	Category: string;
	TypeId: number;
	Type: string;
	RootIds: number;
	Roots: string[];
	DontList: boolean;
	IsMagical: boolean;
	IsTraining: boolean;
	ToolTypeId: number;
	Tool: string;
	ToolDescription: string | null;
	Description: string;
	Subskills: number[];
}