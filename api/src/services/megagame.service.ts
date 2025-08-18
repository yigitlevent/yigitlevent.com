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
		and g."DeletedAt" is null
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

export async function SetMegagameDataEvents(megagameId: MegagameId, events: SetMegagameRequestEvent[]): Promise<void> {
	const query = `
		insert into mggm."GameEvent"("GameId", "NameEN", "NameTR", "DescriptionEN", "DescriptionTR", "CycleInterval")
		values ${events.map(event => `('${megagameId}', '${event.name.en}', '${event.name.tr}', '${event.description.en}', '${event.description.tr}', ${event.cycleInterval})`).join(", ")}
	`;

	await PgPool.query(query);
}

export async function SetMegagameData(setMegagameRequest: SetMegagameRequest): Promise<void> {
	const { name, type, timing, cycle, events } = setMegagameRequest;

	const query = `
		insert into mggm."Game"("Start", "End", "Name", "Type", "CycleStart", "CycleMinutes")
		values ('${timing.start.replace("+00", "+03")}', '${timing.end.replace("+00", "+03")}', '${name}', '${type}', ${cycle.start}, ${cycle.minutes})
	`;

	await PgPool.query(query);

	if (events && events.length > 0) {
		const megagameId = await PgPool.query<{ Id: MegagameId; }>("select g.\"Id\" from mggm.\"Game\" g where g.\"DeletedAt\" is null order by g.\"CreatedAt\" desc limit 1");
		await SetMegagameDataEvents(megagameId.rows[0].Id, events);
	}
}

export async function SetMegagameRumor(megagameId: MegagameId, textEN: string, textTR: string): Promise<void> {
	const query = `
		insert into mggm."GameRumors"("GameId", "TextEN", "TextTR")
		values ('${megagameId}', '${textEN}', '${textTR}')
	`;

	await PgPool.query(query);
}

export async function DeleteAllMegagames(): Promise<void> {
	const query = `
		update mggm."Game" 
		set "DeletedAt" = now() 
		where "DeletedAt" is null
	`;

	await PgPool.query(query);
}
