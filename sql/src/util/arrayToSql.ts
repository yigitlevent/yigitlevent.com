export function arrayToSQL(schema: string, tableName: string, tableColumns: string, values: string[]): string {
	return `INSERT INTO ${schema}."${tableName}"\n\t(${tableColumns})\nVALUES\n\t${values.join(",\n\t")}`;
}
