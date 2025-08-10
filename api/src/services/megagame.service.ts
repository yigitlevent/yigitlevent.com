import { PgPool } from "../index";


export async function GetMegagameData(): Promise<MegagameDBO | undefined> {
	const query = `
		select 
			g."Id", 
			g."Start", 
			g."End", 
			g."Name", 
			g."CycleMinutes", 
			g."CycleName", 
			g."CycleNamePlural"
		from mggm."Game" g
		order by g."CreatedAt" desc
		limit 1
	`;

	const data = await PgPool.query<MegagameDBO>(query);

	if (data.rows.length > 0) return data.rows[0];
}

export async function GetMegagameEventData(gameId: Guid): Promise<MegagameEventDBO[] | undefined> {
	const query = `
		select 
			ge."Id", 
			ge."Name", 
			ge."Description", 
			ge."CycleInterval"
		from mggm."GameEvent" ge
		where ge."GameId" = '${gameId}'
	`;

	const data = await PgPool.query<MegagameEventDBO>(query);

	if (data.rows.length > 0) return data.rows;
}


export async function SetMegagameData(setMegagameRequest: SetMegagameRequest): Promise<void> {
	const { name, start, end, cycleMinutes, cycleName, cycleNamePlural } = setMegagameRequest;

	const query = `
		insert into mggm."Game"("Name", "Start", "End", "CycleMinutes", "CycleName", "CycleNamePlural")
		values ('${name}', '${start.toISOString()}', '${end.toISOString()}', ${cycleMinutes}, '${cycleName}', '${cycleNamePlural}')
	`;

	await PgPool.query(query);
}
