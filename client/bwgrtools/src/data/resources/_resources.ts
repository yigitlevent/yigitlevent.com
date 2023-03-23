import { Dwarf } from "./dwarf";
import { Elf } from "./elf";
import { Human } from "./human";
import { Orc } from "./orc";
import { Roden } from "./roden";
import { Troll } from "./troll";
import { GreatWolf } from "./greatWolf";


type SpellOrigins = "Personal" | "Presence" | "Sight";
type SpellDurations = "Instantaneous" | "Sustained" | "Elapsed Time" | "Permanent";
type SpellDurationsElapsed = "Exchanges" | "Minutes" | "Hours";

type SpellAreaOfEffects = "Caster" | "Single Target" | "Presence" | "Double Area" | "Measured Area" | "Natural Effect";
type SpellAreaOfEffectsMeasured = "Paces" | "10s of Paces" | "100s of Paces" | "Miles";

type SpellElements = "Anima" | "Arcana" | "Heaven" | "White" | "Fire" | "Air" | "Earth" | "Water";
type SpellImpetus = "Create" | "Destroy" | "Tax" | "Transmute" | "Control" | "Influence" | "Enhance";

export interface ResourceMagic {
	origin: SpellOrigins;
	originModifier?: "Double" | "Half";

	duration: SpellDurations;
	durationElapsedUnit?: SpellDurationsElapsed;

	areaOfEffect: SpellAreaOfEffects;
	areaOfEffectMeasuredUnit?: SpellAreaOfEffectsMeasured;
	areaOfEffectModifier?: "Double" | "Half"

	element: [SpellElements] | [SpellElements, SpellElements];
	impetus: [SpellImpetus] | [SpellImpetus, SpellImpetus];

	obstacle?: number | [string, number][];
	obstacleStat?: StatsAndAttributesList | [StatsAndAttributesList, StatsAndAttributesList];
	obstacleCaret?: boolean;
	actions: number | `x${number}`;
}

export interface Resource {
	name: string;
	allowed: RulesetId[];
	type: "Gear" | "Property" | "Relationship" | "Affiliation" | "Reputation" | "Magical";
	description?: string;
	cost: number | [string, number][] | "various";
	modifiers?: [string, number | `${number}/per`][];
	magical?: ResourceMagic;
}

export interface ResourceStock {
	name: StocksListExtended;
	allowed: RulesetId[];
	resources: Resource[];
}

interface ResourceGroup {
	[key: string]: ResourceStock;
}

export const Resources: ResourceGroup = {
	"Dwarf": Dwarf,
	"Elf": Elf,
	"Human": Human,
	"Orc": Orc,
	"Roden": Roden,
	"Troll": Troll,
	"Great Wolf": GreatWolf
};
