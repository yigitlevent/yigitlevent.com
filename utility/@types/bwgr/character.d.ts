type BwgrCharacterBurnerModals = "lp" | "randLp" | "re" | "geSk" | "geTr" | "qu" | "so";
type BwgrShades = "B" | "G" | "W";

interface BwgrCharacterAttribute {
	id: BwgrAbilityId;
	name: string;
	hasShade: boolean;
	shadeShifted: boolean;
	exponent: number;
}

interface BwgrCharacterSkill {
	id: BwgrSkillId;
	name: string;
	type: "Mandatory" | "Lifepath" | "General";
	isSpecial: boolean;
	isOpen: "no" | "yes" | "double";
	advancement: { general: number; lifepath: number; };
}

interface BwgrCharacterTrait {
	id: BwgrTraitId;
	name: string;
	type: "Mandatory" | "Lifepath" | "Common" | "General";
	isOpen: boolean;
}

interface BwgrCharacterResource {
	id: BwgrResourceId;
	name: string;
	type: [id: BwgrResourceTypeId, name: string];
	modifiers: string[];
	cost: number;
	description: string;
}

interface BwgrCharacterSpecialStock {
	brutalLifeTraits: ([id: BwgrTraitId, name: string] | "No Trait" | undefined)[];
	huntingGround: undefined | BwgrHuntingGroundsList;
}

interface BwgrCharacterSpecial {
	stock: BwgrCharacterSpecialStock;
	companionLifepath: Record<string, BwgrLifepathId>;
	variableAge: Record<BwgrLifepathId, number>;
	companionSkills: Record<string, BwgrSkillId[]>;
	chosenSubskills: Record<BwgrSkillId, BwgrSkillId[]>;
}

interface BwgrCharacterStockLimits {
	beliefs: number;
	instincts: number;
	stats: {
		[key: string]: { min: number; max: number; };
		Will: { min: number; max: number; };
		Perception: { min: number; max: number; };
		Power: { min: number; max: number; };
		Agility: { min: number; max: number; };
		Forte: { min: number; max: number; };
		Speed: { min: number; max: number; };
	};
	attributes: number;
}

interface BwgrStatData {
	poolType: "Mental" | "Physical";
	shadeShifted: boolean;
	mainPoolSpent: { shade: number; exponent: number; };
	eitherPoolSpent: { shade: number; exponent: number; };
}

interface BwgrCharacterQuestion {
	id: BwgrQuestionId;
	name: string;
	question: string;
	answer: boolean;
}

type BwgrCharacterTraitEffect =
	| { roundUp: BwgrAbilityId; }
	| { roundUp: "Mortal Wound"; }
	| { callOn: BwgrAbilityId; }
	| { callOn: BwgrSkillId; };

type BwgrHuntingGroundsList = "Waste" | "Marginal" | "Typical" | "Plentiful" | "Untouched";

interface BwgrPoints {
	total: number;
	spent: number;
	remaining: number;
}

interface BwgrAbilityPoints {
	shade: BwgrShades;
	exponent: number;
}

interface BwgrBurningCharacter {
	basics: {
		name: string;
		concept: string;
		gender: "Male" | "Female";
		stock: [id: BwgrStockId, name: string];
		beliefs: { name: string; belief: string; }[];
		instincts: { name: string; instinct: string; }[];
	};
	lifepaths: {
		lifepaths: BwgrLifepath[];
	};
	stats: {
		stats: Record<string, BwgrStatData>;
	};
	skills: {
		skills: BwgrCharacterSkill[];
	};
	traits: {
		traits: BwgrCharacterTrait[];
	};
	attributes: {
		attributes: BwgrCharacterAttribute[];
	};
	resources: {
		resources: Record<Guid, BwgrCharacterResource>;
	};
	misc: {
		special: BwgrCharacterSpecial;
		questions: BwgrCharacterQuestion[];
		limits: BwgrCharacterStockLimits;
		traitEffects: BwgrCharacterTraitEffect[];
	};
}
