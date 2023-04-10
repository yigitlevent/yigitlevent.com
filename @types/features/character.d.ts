type CharacterBurnerModals = "lp" | "st";

interface CharacterAttribute {
	id: AbilityId;
	name: string;
	isShadeShifted: boolean;
	exponent: number;
}

interface CharacterSkill {
	id: SkillId;
	name: string;
	isMandatory: boolean;
	isSpecial: boolean;
	isDoubleOpen: boolean;
	isGeneral: boolean;
	isOpen: boolean;
	advancement: { general: number; lifepath: number; };
}

interface CharacterTrait {
	id: TraitId;
	name: string;
	isLifepath: boolean;
	isMandatory: boolean;
	isOpen: boolean;
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

type CharacterQuestions = {
	[key: string]: boolean;
};

type ShadesList = "B" | "G" | "W";

type HuntingGroundsList = "Waste" | "Marginal" | "Typical" | "Plentiful" | "Untouched";
