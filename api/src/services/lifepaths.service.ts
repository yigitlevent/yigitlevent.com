import { PgPool } from "../index";


export async function GetLifepaths() {
	const convert = (l: LifepathDBO[], lr: LifepathRequirementBlockDBO[], lri: LifepathRequirementBlockItemDBO[]): Lifepath[] => {
		const r: Lifepath[] = l.map(v => {
			const lp: Lifepath = {
				rulesets: v.Rulesets as unknown[] as RulesetId[],
				id: v.Id as unknown as LifepathId,
				name: v.Name,
				stock: [v.StockId as unknown as StockId, v.Stock],
				setting: [v.SettingId as unknown as SettingId, v.Setting],
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

			if (v.LeadIds.length > 0) lp.leads = v.LeadIds.map(a => a as unknown as SettingId);
			if (v.SkillIds.length > 0) lp.skills = v.SkillIds.map(a => a as unknown as SkillId);
			if (v.TraitIds.length > 0) lp.traits = v.TraitIds.map(a => a as unknown as TraitId);
			if (v.CompanionName && v.CompanionGivesSkills && v.CompanionSettingIds) {
				lp.companion = {
					name: v.CompanionName,
					givesSkills: v.CompanionGivesSkills,
					settingIds: v.CompanionSettingIds as unknown as SettingId[]
				};

				if (v.CompanionGSPMultiplier && v.CompanionGSPMultiplier > 0) lp.companion.inheritGSPMultiplier = v.CompanionGSPMultiplier;
				if (v.CompanionLSPMultiplier && v.CompanionLSPMultiplier > 0) lp.companion.inheritLSPMultiplier = v.CompanionLSPMultiplier;
				if (v.CompanionRPMultiplier && v.CompanionRPMultiplier > 0) lp.companion.inheritRPMultiplier = v.CompanionRPMultiplier;
			}

			if (v.RequirementText) lp.requirementsText = v.RequirementText;

			const reqBlocks = lr.filter(a => a.LifepathId === v.Id);
			if (reqBlocks.length > 0) {
				lp.requirements = reqBlocks.map(vrb => {
					const rb: LifepathRequirementBlock = {
						logicType: [vrb.LogicTypeId as unknown as LogicTypeId, vrb.LogicType] as [id: LogicTypeId, name: string],
						mustFulfill: vrb.MustFulfill,
						fulfillmentAmount: vrb.FulfillmentAmount,
						items: []
					};

					const items: LifepathRequirementItem[] = lri.filter(a => a.RequirementId === vrb.Id).map(vrbi => {
						const rbi = {
							logicType: [vrbi.RequirementTypeId as unknown as LogicTypeId, vrbi.RequirementType] as [id: LogicTypeId, name: string]
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
						else if (vrbi.RequirementType === "ATTRIBUTE") {
							const atr: LifepathRequirementItem = {
								...rbi,
								attribute: [vrbi.AttributeId as unknown as AbilityId, vrbi.Attribute as string] as [id: AbilityId, name: string],
								forCompanion: vrbi.ForCompanion
							};
							if (vrbi.Min) atr.min = vrbi.Min;
							if (vrbi.Max) atr.max = vrbi.Max;
							return atr;
						}
						else if (vrbi.RequirementType === "SKILL") {
							return { ...rbi, skill: [vrbi.SkillId as unknown as SkillId, vrbi.Skill as string], forCompanion: vrbi.ForCompanion };
						}
						else if (vrbi.RequirementType === "TRAIT") {
							return { ...rbi, trait: [vrbi.TraitId as unknown as TraitId, vrbi.Trait as string], forCompanion: vrbi.ForCompanion };
						}
						else if (vrbi.RequirementType === "LIFEPATH") {
							return { ...rbi, lifepath: [vrbi.LifepathId as unknown as LifepathId, vrbi.Lifepath as string], forCompanion: vrbi.ForCompanion };
						}
						else if (vrbi.RequirementType === "SETTING") {
							return { ...rbi, setting: [vrbi.SettingId as unknown as SettingId, vrbi.Setting as string], forCompanion: vrbi.ForCompanion };
						}
						else throw new Error(`unidentified requirement block item type: ${vrbi.RequirementType}`);
					});

					rb.items = items;

					return rb;
				});
			}

			return lp;
		});

		return r;
	};

	const query1 = 'select * from dat."LifepathsList";';
	const query2 = 'select * from dat."LifepathRequirementBlocks";';
	const query3 = 'select * from dat."LifepathRequirementBlockItems";';
	return Promise.all([
		PgPool.query<LifepathDBO>(query1),
		PgPool.query<LifepathRequirementBlockDBO>(query2),
		PgPool.query<LifepathRequirementBlockItemDBO>(query3)
	]).then(result => convert(result[0].rows, result[1].rows, result[2].rows));
}
