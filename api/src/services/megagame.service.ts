import { PgPool } from "../index";


export async function GetMegagameData(): Promise<MegagameDBO | undefined> {
	const query = `
		select 
			g."Id", 
			g."Start", 
			g."End", 
			g."Name", 
			g."Type", 
			g."CycleStart", 
			g."CycleMinutes"
		from mggm."Game" g
		where g."End" > now()
		and g."Start" < now()
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
			ge."NameEN", 
			ge."NameTR", 
			ge."DescriptionEN", 
			ge."DescriptionTR", 
			ge."CycleInterval"
		from mggm."GameEvent" ge
		where ge."GameId" = '${gameId}'
	`;

	const data = await PgPool.query<MegagameEventDBO>(query);

	if (data.rows.length > 0) return data.rows;
}

export async function GetMegagameRumorData(gameId: MegagameId): Promise<MegagameRumorDBO[]> {
	const query = `
		select 
			ge."Id", 
			ge."TextEN", 
			ge."TextTR"
		from mggm."GameRumors" ge
		where ge."GameId" = '${gameId}'
		order by ge."CreatedAt" desc
		limit 10
	`;

	const data = await PgPool.query<MegagameRumorDBO>(query);

	return data.rows;
}

export async function SetMegagameData(setMegagameRequest: SetMegagameRequest): Promise<void> {
	const { name, start, end, cycleMinutes, cycleName, cycleNamePlural } = setMegagameRequest;

	const query = `
		insert into mggm."Game"("Name", "Start", "End", "CycleMinutes", "CycleName", "CycleNamePlural")
		values ('${name}', '${start.toISOString()}', '${end.toISOString()}', ${cycleMinutes}, '${cycleName}', '${cycleNamePlural}')
	`;

	await PgPool.query(query);
}

export async function SetMegagameRumor(megagameId: MegagameId, textEN: string, textTR: string): Promise<void> {
	const query = `
		insert into mggm."GameRumors"("GameId", "TextEN", "TextTR")
		values ('${megagameId}', '${textEN}', '${textTR}')
	`;

	await PgPool.query(query);
}
