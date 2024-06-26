import { PgPool } from "../index";
import { Logger } from "../utils/logger";


export async function GetLifepaths(rulesets: BwgrRulesetId[]): Promise<BwgrLifepath[]> {
	const convert = (l: BwgrLifepathDBO[], lr: BwgrLifepathRequirementBlockDBO[], lri: BwgrLifepathRequirementBlockItemDBO[]): BwgrLifepath[] => {
		const log = new Logger("GetLifepaths Conversion");

		const r: BwgrLifepath[] = l.map(v => {
			const lp: BwgrLifepath = {
				rulesets: v.Rulesets,
				id: v.Id,
				name: v.Name,
				stock: [v.StockId, v.Stock],
				setting: [v.SettingId, v.Setting],
				years: (v.Years.length === 1) ? v.Years[0] : v.Years,
				pools: {
					eitherStatPool: v.EitherPool,
					mentalStatPool: v.MentalPool,
					physicalStatPool: v.PhysicalPool,
					generalSkillPool: v.GeneralSkillPool,
					lifepathSkillPool: v.LifepathSkillPool,
					traitPool: v.TraitPool,
					resourcePoints: v.ResourcePoints
				},
				flags: {
					isBorn: v.Born,
					isGSPMultipliedByYear: v.IsGSPMultiplier,
					isLSPMultipliedByYear: v.IsLSPMultiplier,
					isRPMultipliedByYear: v.IsRPMultiplier,
					getHalfGSPFromPrevLP: v.HalfGSPFromPrev,
					getHalfLSPFromPrevLP: v.HalfLSPFromPrev,
					getHalfRPFromPrevLP: v.HalfRPFromPrev
				}
			};

			if (v.LeadIds.length > 0) lp.leads = v.LeadIds;
			if (v.SkillIds.length > 0) lp.skills = v.SkillIds;
			if (v.TraitIds.length > 0) lp.traits = v.TraitIds;

			if (v.CompanionName && v.CompanionGivesSkills && v.CompanionSettingIds) {
				lp.companion = {
					name: v.CompanionName,
					givesSkills: v.CompanionGivesSkills,
					settingIds: v.CompanionSettingIds
				};

				if (v.CompanionGSPMultiplier && v.CompanionGSPMultiplier > 0) lp.companion.inheritGSPMultiplier = v.CompanionGSPMultiplier;
				if (v.CompanionLSPMultiplier && v.CompanionLSPMultiplier > 0) lp.companion.inheritLSPMultiplier = v.CompanionLSPMultiplier;
				if (v.CompanionRPMultiplier && v.CompanionRPMultiplier > 0) lp.companion.inheritRPMultiplier = v.CompanionRPMultiplier;
			}

			if (v.RequirementText) lp.requirementsText = v.RequirementText;

			const reqBlocks = lr.filter(a => a.LifepathId === v.Id);
			if (reqBlocks.length > 0) {
				lp.requirements = reqBlocks.map(vrb => {
					const rb: BwgrLifepathRequirementBlock = {
						logicType: [vrb.LogicTypeId, vrb.LogicType] as [id: LogicTypeId, name: string],
						mustFulfill: vrb.MustFulfill,
						fulfillmentAmount: vrb.FulfillmentAmount,
						items: []
					};

					const items: BwgrLifepathRequirementItem[] = lri.filter(a => a.RequirementId === vrb.Id).map(vrbi => {
						const rbi = {
							logicType: [vrbi.RequirementTypeId, vrbi.RequirementType] as [id: LogicTypeId, name: string]
						};

						if (vrbi.RequirementType === "UNIQUE") return { ...rbi, isUnique: true };
						else if (vrbi.RequirementType === "SETTINGENTRY") return { ...rbi, isSettingEntry: true };
						else if (vrbi.RequirementType === "LPINDEX") {
							if (vrbi.Min) return { ...rbi, minLpIndex: vrbi.Min };
							else return { ...rbi, maxLpIndex: vrbi.Max as number };
						}
						else if (vrbi.RequirementType === "YEARS") {
							if (vrbi.Min) return { ...rbi, minYears: vrbi.Min };
							else return { ...rbi, maxYears: vrbi.Max as number };
						}
						else if (vrbi.RequirementType === "FEMALE") return { ...rbi, gender: "Female" };
						else if (vrbi.RequirementType === "MALE") return { ...rbi, gender: "Male" };
						else if (vrbi.RequirementType === "OLDESTBY") return { ...rbi, oldestBy: vrbi.Max as number };
						else if (vrbi.RequirementType === "ATTRIBUTE" && vrbi.AttributeId && vrbi.Attribute) {
							const atr: BwgrLifepathRequirementItem = {
								...rbi,
								attribute: [vrbi.AttributeId, vrbi.Attribute] as [id: BwgrAbilityId, name: string],
								forCompanion: vrbi.ForCompanion
							};
							if (vrbi.Min) atr.min = vrbi.Min;
							if (vrbi.Max) atr.max = vrbi.Max;
							return atr;
						}
						else if (vrbi.RequirementType === "SKILL" && vrbi.SkillId && vrbi.Skill) {
							return { ...rbi, skill: [vrbi.SkillId, vrbi.Skill], forCompanion: vrbi.ForCompanion };
						}
						else if (vrbi.RequirementType === "TRAIT" && vrbi.TraitId && vrbi.Trait) {
							return { ...rbi, trait: [vrbi.TraitId, vrbi.Trait], forCompanion: vrbi.ForCompanion };
						}
						else if (vrbi.RequirementType === "LIFEPATH" && vrbi.LifepathId && vrbi.Lifepath) {
							return { ...rbi, lifepath: [vrbi.LifepathId, vrbi.Lifepath as string], forCompanion: vrbi.ForCompanion };
						}
						else if (vrbi.RequirementType === "SETTING" && vrbi.SettingId && vrbi.Setting) {
							return { ...rbi, setting: [vrbi.SettingId, vrbi.Setting as string], forCompanion: vrbi.ForCompanion };
						}
						else throw new Error(`unidentified requirement block item type: ${vrbi.RequirementType}`);
					});

					rb.items = items;

					return rb;
				});
			}

			return lp;
		});

		log.end();
		return r;
	};

	const log = new Logger("GetLifepaths Querying");
	const query1 = `select * from bwgr."LifepathsList" where "Rulesets"::text[] && ARRAY['${rulesets.join("','")}'];`;
	const query2 = "select * from bwgr.\"LifepathRequirementBlocks\";";
	const query3 = "select * from bwgr.\"LifepathRequirementBlockItems\";";
	return Promise.all([
		PgPool.query<BwgrLifepathDBO>(query1),
		PgPool.query<BwgrLifepathRequirementBlockDBO>(query2),
		PgPool.query<BwgrLifepathRequirementBlockItemDBO>(query3)
	]).then(result => {
		log.end();
		const res = convert(result[0].rows, result[1].rows, result[2].rows);
		return res;
	});
}
