/*

resetStockSpecifics: () => {
	set(produce<CharacterBurnerState>((state) => {
		if (state.stockSpecific.brutalLife.traits.length > 0) {
			const brutalLifeTraits = state.stockSpecific.brutalLife.traits;
			brutalLifeTraits.pop();
			state.stockSpecific.brutalLife.traits = brutalLifeTraits;
		}
		state.stockSpecific.territory.huntingGround = undefined;
	}));
},


selectAppropriateWeapon: (skillPath: SkillPath) => {
set(produce<CharacterBurnerState>((state) => {
if (state.specialSkills.appropriateWeapons.selected.length > 1 && state.specialSkills.appropriateWeapons.selected.includes(skillPath)) {
state.specialSkills.appropriateWeapons.selected = state.specialSkills.appropriateWeapons.selected.filter(v => v !== skillPath);
}
else {
const selectedSkills = state.specialSkills.appropriateWeapons.selected;
selectedSkills.push(skillPath);
state.specialSkills.appropriateWeapons.selected = selectedSkills;
}

state.specialSkills.appropriateWeapons.mandatory =
(state.specialSkills.appropriateWeapons.selected.includes(state.specialSkills.appropriateWeapons.mandatory))
? state.specialSkills.appropriateWeapons.mandatory
: state.specialSkills.appropriateWeapons.selected[0];
}));
const state = get();
state.refreshTotals(state.totals.skills.generalList, state.totals.traits.generalList);
state.refreshSkillSpendings();
state.refreshAttributeSpendings();
},




selectMandatoryAppropriateWeapon: (skillPath: SkillPath) => {
set(produce<CharacterBurnerState>((state) => {
state.specialSkills.appropriateWeapons.mandatory =
(state.specialSkills.appropriateWeapons.selected.includes(skillPath))
? skillPath
: state.specialSkills.appropriateWeapons.selected[0];
}));
const state = get();
state.refreshTotals(state.totals.skills.generalList, state.totals.traits.generalList);
state.refreshSkillSpendings();
state.refreshAttributeSpendings();
},





selectJavelinOrBow: (skillPath: SkillPath) => {
set(produce<CharacterBurnerState>((state) => {
state.specialSkills.javelinOrBow = skillPath;
}));
const state = get();
state.refreshTotals(state.totals.skills.generalList, state.totals.traits.generalList);
state.refreshSkillSpendings();
state.refreshAttributeSpendings();
},,





selectAnySmith: (skillPath: SkillPath) => {
set(produce<CharacterBurnerState>((state) => {
if (state.specialSkills.anySmith.includes(skillPath)) {
state.specialSkills.anySmith = state.specialSkills.anySmith.filter(v => v !== skillPath);
}
else {
const selectedSkills = state.specialSkills.anySmith;
selectedSkills.push(skillPath);
state.specialSkills.anySmith = selectedSkills;
}
}));
const state = get();
state.refreshTotals(state.totals.skills.generalList, state.totals.traits.generalList);
state.refreshSkillSpendings();
state.refreshAttributeSpendings();
},





addBrutalLifeTrait: (traitPath: TraitId | undefined) => {
set(produce<CharacterBurnerState>((state) => {
const brutalLifeTraits = state.stockSpecific.brutalLife.traits;
brutalLifeTraits.push(traitPath);
state.stockSpecific.brutalLife.traits = brutalLifeTraits;
}));
},






setHuntingGround: (huntingGround: HuntingGroundsList) => {
set(produce<CharacterBurnerState>((state) => {
state.stockSpecific.territory.huntingGround = huntingGround;
}));
},



modifySpecialLifepathValue: (value: { advisorToTheCourtYears: number; } | { princeOfTheBloodYears: number; } | { bondsmanOwnerLifepathPath: LifepathId; }) => {
set(produce<CharacterBurnerState>((state) => {
	if ("advisorToTheCourtYears" in value) state.specialLifepaths.advisorToTheCourt.years = value.advisorToTheCourtYears;
	if ("bondsmanOwnerLifepathPath" in value) state.specialLifepaths.bondsman.ownerLifepathPath = value.bondsmanOwnerLifepathPath;
	if ("princeOfTheBloodYears" in value) state.specialLifepaths.princeOfTheBlood.years = value.princeOfTheBloodYears;
}));
}



*/