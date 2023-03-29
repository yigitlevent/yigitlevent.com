import { PgPool } from "../index";


export async function GetRulesets() {
	const convert = (v: RulesetDBO): Ruleset => {
		const r: Ruleset = {
			id: v.Id as unknown as RulesetId,
			name: v.Name,
			isOfficial: v.IsOfficial,
			isPublic: v.IsPublic,
			isExpansion: v.IsExpansion
		};

		if (v.ExpansionIds.length > 0) r.expansionIds = v.ExpansionIds as unknown[] as RulesetId[];
		if (v.User !== null) r.user = v.User;

		return r;
	};

	const query = 'select * from dat."RulesetsList";';
	return PgPool.query<RulesetDBO>(query)
		.then(result => result.rows.map(convert));
}

export async function GetAbilities() {
	const convert = (v: AbilityDBO): Ability => {
		const r: Ability = {
			id: v.Id as unknown as AbilityId,
			name: v.Name,
			abilityType: [v.AbilityTypeId as unknown as AbilityTypeId, v.AbilityType],
			hasShades: v.HasShades
		};

		if (v.Cycle !== null && v.Routine !== null && v.Difficult !== null && v.Challenging !== null) {
			r.practice = {
				cycle: v.Cycle,
				routineTests: v.Routine,
				difficultTests: v.Difficult,
				challengingTests: v.Challenging
			};
		}

		return r;
	};

	const query = 'select * from dat."AbilitiesList";';
	return PgPool.query<AbilityDBO>(query)
		.then(result => result.rows.map(convert));
}

export async function GetStocks() {
	const convert = (v: StockDBO): Stock => {
		return {
			rulesets: v.Rulesets as unknown[] as RulesetId[],
			id: v.Id as unknown as StockId,
			name: v.Name,
			namePlural: v.NamePlural,
			stride: v.Stride,
			settingIds: v.SettingIds as unknown[] as SettingId[]
		};
	};

	const query = 'select * from dat."StocksList";';
	return PgPool.query<StockDBO>(query)
		.then(result => result.rows.map(convert));
}

export async function GetSettings() {
	const convert = (v: SettingDBO): Setting => {
		return {
			rulesets: v.Rulesets as unknown[] as RulesetId[],
			id: v.Id as unknown as SettingId,
			name: v.Name,
			nameShort: v.NameShort,
			stock: [v.StockId as unknown as StockId, v.StockName],
			isSubsetting: v.IsSubsetting
		};
	};

	const query = 'select * from dat."SettingsList";';
	return PgPool.query<SettingDBO>(query)
		.then(result => result.rows.map(convert));
}

export async function GetSkills() {
	const convert = (v: SkillDBO): Skill => {
		const r: Skill = {
			rulesets: v.Rulesets as unknown[] as RulesetId[],
			id: v.Id as unknown as SkillId,
			name: v.Name,
			category: [v.CategoryId as unknown as SkillCategoryId, v.Category],
			type: [v.TypeId as unknown as SkillTypeId, v.Type],
			flags: {
				dontList: v.DontList,
				isMagical: v.IsMagical,
				isTraining: v.IsTraining
			},
			tool: {
				typeId: v.ToolTypeId as unknown as SkillToolTypeId,
				tool: v.Tool
			}
		};

		if (v.StockId !== null && v.Stock !== null) r.stock = [v.StockId as unknown as StockId, v.Stock];
		if (v.RootIds.length > 0) r.roots = v.RootIds.map((rootId, index) => [rootId as unknown as SkillRootId, v.Roots[index]]);
		if (v.ToolDescription !== null) r.tool.description = v.ToolDescription;
		if (v.Description !== null) r.description = v.Description;
		if (v.SubskillIds.length > 0) r.subskillIds = v.SubskillIds as unknown[] as SkillId[];
		if (v.RestrictionOnlyStockId !== null && v.RestrictionOnlyStock !== null) {
			r.restriction = { onlyStock: [v.RestrictionOnlyStockId, v.RestrictionOnlyStock] };
			if (v.RestrictionWhenBurning !== null) r.restriction.onlyAtBurn = v.RestrictionWhenBurning;
			if (v.RestrictionAbilityId !== null && v.RestrictionAbility !== null) r.restriction.onlyWithAbility = [v.RestrictionAbilityId, v.RestrictionAbility];
		}

		return r;
	};

	const query = 'select * from dat."SkillsList";';
	return PgPool.query<SkillDBO>(query)
		.then(result => result.rows.map(convert));
}

export async function GetTraits() {
	const convert = (v: TraitDBO): Trait => {
		const r: Trait = {
			rulesets: v.Rulesets as unknown[] as RulesetId[],
			id: v.Id as unknown as TraitId,
			name: v.Name,
			category: [v.CategoryId as unknown as TraitCategoryId, v.Category],
			type: [v.TypeId as unknown as TraitTypeId, v.Type],
			cost: v.Cost
		};

		if (v.StockId !== null && v.Stock !== null) r.stock = [v.StockId as unknown as StockId, v.Stock];
		if (v.Description !== null) r.description = v.Description;

		return r;
	};

	const query = 'select * from dat."TraitsList";';
	return PgPool.query<TraitDBO>(query)
		.then(result => result.rows.map(convert));
}

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

export async function GetResources() {
	const convert = (re: ResourceDBO[], rmd: ResourceMagicDetailsDBO[], rmo: ResourceMagicObstaclesDBO[]): Resource[] => {
		const r: Resource[] = re.map(v => {
			const res: Resource = {
				rulesets: v.Rulesets as unknown[] as RulesetId[],
				id: v.Id as unknown as ResourceId,
				name: v.Name,
				stock: [v.StockId as unknown as StockId, v.Stock],
				resourceType: [v.StockId as unknown as ResourceTypeId, v.ResourceType],
				costs: [],
				modifiers: []
			};

			if (v.VariableCost) res.variableCost = true;
			if (v.Description) res.description = v.Description;
			v.Costs.forEach((c, i) => res.costs.push([c, v.CostDescriptions[i]]));
			v.Modifiers.forEach((c, i) => res.modifiers.push([c, v.ModifierIsPerCosts[i], v.CostDescriptions[i]]));

			const mDetails = rmd.filter(a => a.ResourceId === v.Id);
			if (mDetails.length > 0) res.magical = [];
			mDetails.forEach(md => {
				const mdet: ResourceMagicDetails = {
					origin: [md.OriginId as unknown as OriginFacetId, md.Origin],
					duration: [md.DurationId as unknown as DurationFacetId, md.Duration],
					areaOfEffect: [md.AreaOfEffectId as unknown as AreaOfEffectFacetId, md.AreaOfEffect],
					elements: [],
					impetus: [],
					actions: md.Actions,
					doActionsMultiply: md.ActionsMultiply,
					obstacles: {}
				};

				if (md.AreaOfEffectModifierId || md.AreaofEffectModifier || md.AreaOfEffectUnitId || md.AreaOfEffectUnit) mdet.areaOfEffectDetails = {};
				if (mdet.areaOfEffectDetails && md.AreaOfEffectUnitId && md.AreaOfEffectUnit) {
					mdet.areaOfEffectDetails.unit = [md.AreaOfEffectUnitId as unknown as DistanceUnitId, md.AreaOfEffectUnit];
				}
				if (mdet.areaOfEffectDetails && md.AreaOfEffectModifierId && md.AreaofEffectModifier) {
					mdet.areaOfEffectDetails.modifier = [md.AreaOfEffectModifierId as unknown as UnitModifierId, md.AreaofEffectModifier];
				}

				if (md.Element1Id && md.Element1) mdet.elements.push([md.Element1Id as unknown as ElementFacetId, md.Element1]);
				if (md.Element2Id && md.Element2) mdet.elements.push([md.Element2Id as unknown as ElementFacetId, md.Element2]);
				if (md.Element3Id && md.Element3) mdet.elements.push([md.Element3Id as unknown as ElementFacetId, md.Element3]);
				if (md.Impetus1Id && md.Impetus1) mdet.impetus.push([md.Impetus1Id as unknown as ImpetusFacetId, md.Impetus1]);
				if (md.Impetus2Id && md.Impetus2) mdet.impetus.push([md.Impetus2Id as unknown as ImpetusFacetId, md.Impetus2]);

				const mObs = rmo.filter(a => a.ResourceId === v.Id);
				mObs.forEach(mo => {
					if (mo.Obstacle) mdet.obstacles.obstacle = mo.Obstacle;
					if (mo.ObstacleCaret) mdet.obstacles.caret = mo.ObstacleCaret;
					if (mo.Description) mdet.obstacles.description = mo.Description;
					if (mo.ObstacleAbility1Id || mo.ObstacleAbility1 || mo.ObstacleAbility2Id || mo.ObstacleAbility2) mdet.obstacles.abilities = [];
					if (mdet.obstacles.abilities && mo.ObstacleAbility1Id && mo.ObstacleAbility1) {
						mdet.obstacles.abilities.push([mo.ObstacleAbility1Id as unknown as AbilityId, mo.ObstacleAbility1]);
					}
					if (mdet.obstacles.abilities && mo.ObstacleAbility2Id && mo.ObstacleAbility2) {
						mdet.obstacles.abilities.push([mo.ObstacleAbility2Id as unknown as AbilityId, mo.ObstacleAbility2]);
					}
				});

				res.magical?.push(mdet);
			});

			return res;
		});

		return r;
	};

	const query1 = 'select * from dat."ResourcesList";';
	const query2 = 'select * from dat."ResourceMagicDetailsList";';
	const query3 = 'select * from dat."ResourceMagicObstaclesList";';
	return Promise.all([
		PgPool.query<ResourceDBO>(query1),
		PgPool.query<ResourceMagicDetailsDBO>(query2),
		PgPool.query<ResourceMagicObstaclesDBO>(query3)
	]).then(result => convert(result[0].rows, result[1].rows, result[2].rows));
}
