export function arrayToSQL(schema: string, tableName: string, tableColumns: string, values: string[]) {
	return `INSERT INTO dat."${tableName}"\n\t(${tableColumns})\nVALUES\n\t${values.join(",\n\t")}`;
}
