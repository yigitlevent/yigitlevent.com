type CharacterBurnerModals = "lp" | "re";
type Shades = "B" | "G" | "W";

interface CharacterAttribute {
	id: AbilityId;
	name: string;
	hasShade: boolean;
	shadeShifted: boolean;
	exponent: number;
}

interface CharacterSkill {
	id: SkillId;
	name: string;
	type: "Mandatory" | "Lifepath" | "General";
	isSpecial: boolean;
	isOpen: "no" | "yes" | "double";
	advancement: { general: number; lifepath: number; };
}

interface CharacterTrait {
	id: TraitId;
	name: string;
	type: "Mandatory" | "Lifepath" | "Common" | "General";
	isOpen: boolean;
}

interface CharacterResource {
	id: ResourceId;
	name: string;
	type: [id: ResourceTypeId, name: string];
	modifiers: string[];
	cost: number;
	description: string;
}

interface CharacterStockSpecific {
	brutalLife?: {
		traits: (TraitId | undefined)[];
	};
	territory?: {
		huntingGround: undefined | HuntingGroundsList;
	};
}

interface CharacterStockLimits {
	beliefs: number;
	instincts: number;
	stats: {
		[key: string]: { min: number, max: number; };
		Will: { min: number, max: number; };
		Perception: { min: number, max: number; };
		Power: { min: number, max: number; };
		Agility: { min: number, max: number; };
		Forte: { min: number, max: number; };
		Speed: { min: number, max: number; };
	};
	attributes: number;
}

type CharacterQuestion = {
	id: QuestionId;
	name: string;
	question: string;
	answer: boolean;
};

type HuntingGroundsList = "Waste" | "Marginal" | "Typical" | "Plentiful" | "Untouched";

interface Points {
	total: number;
	spent: number;
	remaining: number;
}

interface AbilityPoints {
	shade: Shades;
	exponent: number;
}
