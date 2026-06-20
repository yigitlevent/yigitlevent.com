export async function up(db) {
  await db.schema.withSchema("bwgr").createTable("Resources").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("Name", "varchar(255)", col => col.notNull())
    .addColumn("StockId", "integer", col => col.notNull())
    .addColumn("ResourceTypeId", "integer", col => col.notNull())
    .addColumn("Description", "text")
    .addColumn("VariableCost", "boolean", col => col.notNull())
    .addForeignKeyConstraint("fk_resources_stock", ["StockId"], "bwgr.Stocks", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_resources_type", ["ResourceTypeId"], "bwgr.ResourceTypes", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("ResourceCosts").ifNotExists()
    .addColumn("Id", "integer", col => col.primaryKey().notNull())
    .addColumn("ResourceId", "integer", col => col.notNull())
    .addColumn("Cost", "integer", col => col.notNull())
    .addColumn("Description", "varchar(255)")
    .addForeignKeyConstraint("fk_resource_costs_resource", ["ResourceId"], "bwgr.Resources", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("ResourceModifiers").ifNotExists()
    .addColumn("Id", "integer", col => col.primaryKey().notNull())
    .addColumn("ResourceId", "integer", col => col.notNull())
    .addColumn("Cost", "integer", col => col.notNull())
    .addColumn("IsPerCost", "boolean", col => col.notNull())
    .addColumn("Description", "varchar(255)")
    .addForeignKeyConstraint("fk_resource_modifiers_resource", ["ResourceId"], "bwgr.Resources", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("ResourceMagicDetails").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("ResourceId", "integer", col => col.notNull())
    .addColumn("OriginId", "integer", col => col.notNull())
    .addColumn("OriginModifierId", "integer")
    .addColumn("DurationId", "integer", col => col.notNull())
    .addColumn("DurationUnitId", "integer")
    .addColumn("AreaOfEffectId", "integer", col => col.notNull())
    .addColumn("AreaOfEffectUnitId", "integer")
    .addColumn("AreaOfEffectModifierId", "integer")
    .addColumn("Element1Id", "integer", col => col.notNull())
    .addColumn("Element2Id", "integer")
    .addColumn("Element3Id", "integer")
    .addColumn("Impetus1Id", "integer", col => col.notNull())
    .addColumn("Impetus2Id", "integer")
    .addColumn("Actions", "integer", col => col.notNull())
    .addColumn("ActionsMultiply", "boolean", col => col.notNull())
    .addForeignKeyConstraint("fk_rmd_resource", ["ResourceId"], "bwgr.Resources", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmd_origin_modifier", ["OriginModifierId"], "bwgr.UnitModifiers", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmd_aoe_modifier", ["AreaOfEffectModifierId"], "bwgr.UnitModifiers", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmd_duration_unit", ["DurationUnitId"], "bwgr.TimeUnits", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmd_aoe_unit", ["AreaOfEffectUnitId"], "bwgr.DistanceUnits", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmd_origin", ["OriginId"], "bwgr.SpellOriginFacets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmd_duration", ["DurationId"], "bwgr.SpellDurationFacets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmd_aoe", ["AreaOfEffectId"], "bwgr.SpellAreaOfEffectFacets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmd_element1", ["Element1Id"], "bwgr.SpellElementFacets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmd_element2", ["Element2Id"], "bwgr.SpellElementFacets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmd_element3", ["Element3Id"], "bwgr.SpellElementFacets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmd_impetus1", ["Impetus1Id"], "bwgr.SpellImpetusFacets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmd_impetus2", ["Impetus2Id"], "bwgr.SpellImpetusFacets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("ResourceMagicObstacles").ifNotExists()
    .addColumn("Id", "serial", col => col.primaryKey())
    .addColumn("ResourceId", "integer", col => col.notNull())
    .addColumn("Obstacle", "integer")
    .addColumn("ObstacleAbility1Id", "integer")
    .addColumn("ObstacleAbility2Id", "integer")
    .addColumn("ObstacleCaret", "boolean", col => col.notNull())
    .addColumn("Description", "varchar(255)")
    .addForeignKeyConstraint("fk_rmo_resource", ["ResourceId"], "bwgr.Resources", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmo_ability1", ["ObstacleAbility1Id"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_rmo_ability2", ["ObstacleAbility2Id"], "bwgr.Abilities", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();

  await db.schema.withSchema("bwgr").createTable("RulesetResources").ifNotExists()
    .addColumn("ResourceId", "integer", col => col.notNull())
    .addColumn("RulesetId", "varchar(15)", col => col.notNull())
    .addPrimaryKeyConstraint("pk_ruleset_resources", ["ResourceId", "RulesetId"])
    .addForeignKeyConstraint("fk_ruleset_resources_resource", ["ResourceId"], "bwgr.Resources", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .addForeignKeyConstraint("fk_ruleset_resources_ruleset", ["RulesetId"], "bwgr.Rulesets", ["Id"],
      fk => fk.onDelete("restrict").onUpdate("restrict"))
    .execute();
}

export async function down(db) {
  await db.schema.withSchema("bwgr").dropTable("RulesetResources").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("ResourceMagicObstacles").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("ResourceMagicDetails").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("ResourceModifiers").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("ResourceCosts").ifExists().execute();
  await db.schema.withSchema("bwgr").dropTable("Resources").ifExists().execute();
}
