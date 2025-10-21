import { PgPool } from "../index";


export async function GetMegagameData(): Promise<MegagameDBO | undefined> {
	const query = `
		select 
			g."Id", 
			g."StartAt", 
			g."EndAt", 
			g."Name", 
			g."CycleStart", 
			g."CycleMinutes"
		from mggm."Game" g
		where g."EndAt" > now()
		and g."StartAt" < now()
		and g."DeletedAt" is null
		order by g."CreatedAt" desc
		limit 1
	`;

	const data = await PgPool.query<MegagameDBO>(query);

	if (data.rows.length > 0) return data.rows[0];
}

export async function GetFactionsData(megagameId: MegagameId): Promise<MegagameFactionDBO[] | undefined> {
	const query = `
		select 
			f."Id", 
			f."Name",
			f."FactionCode"
		from mggm."Faction" f
		where f."MegagameId" = '${megagameId}'
		and f."DeletedAt" is null
		order by f."CreatedAt" asc
	`;

	const data = await PgPool.query<MegagameFactionDBO>(query);

	if (data.rows.length > 0) return data.rows;
}

export async function GetOrderTypesData(megagameId: MegagameId): Promise<MegagameOrderTypeDBO[] | undefined> {
	const query = `
		select 
			o."Id", 
			o."Name"
		from mggm."OrderType" o
		where o."MegagameId" = '${megagameId}'
		and o."DeletedAt" is null
		order by o."CreatedAt" asc
	`;

	const data = await PgPool.query<MegagameOrderTypeDBO>(query);

	if (data.rows.length > 0) return data.rows;
}

export async function ResetMegagameData(megagameId: MegagameId): Promise<void> {
	async function deleteDeadlineItemsData(megagameId: MegagameId): Promise<void> {
		const query = `
			update mggm."DeadlineItem" 
			set "DeletedAt" = now() 
			where "MegagameId" = '${megagameId}'
			and "DeletedAt" is null
		`;

		await PgPool.query(query);
	}

	async function deleteNewsItemsData(megagameId: MegagameId): Promise<void> {
		const query = `
			update mggm."NewsItem" 
			set "DeletedAt" = now() 
			where "MegagameId" = '${megagameId}'
			and "DeletedAt" is null
		`;

		await PgPool.query(query);
	}

	async function deleteOrderQueueItemsData(megagameId: MegagameId): Promise<void> {
		const query = `
			update mggm."OrderQueueItem" 
			set "DeletedAt" = now() 
			where "MegagameId" = '${megagameId}'
			and "DeletedAt" is null
		`;

		await PgPool.query(query);
	}

	deleteDeadlineItemsData(megagameId);
	deleteNewsItemsData(megagameId);
	deleteOrderQueueItemsData(megagameId);

	const query = `
		update mggm."Game" 
		set
			"StartAt" = now(),
			"EndAt" = now() + interval '10 hour',
			"UpdatedAt" = now()
		where "Id" = '${megagameId}'
		and "DeletedAt" is null
	`;

	await PgPool.query(query);
}

export async function GetDeadlineItemsData(megagameId: MegagameId): Promise<MegagameDeadlineItemDBO[] | undefined> {
	const query = `
		select 
			g."Id", 
			g."Type", 
			g."DeadlineAt"
		from mggm."DeadlineItem" g
		where g."MegagameId" = '${megagameId}'
		and g."DeletedAt" is null
		order by g."CreatedAt" asc
	`;

	const data = await PgPool.query<MegagameDeadlineItemDBO>(query);

	if (data.rows.length > 0) return data.rows;
}

export async function DeleteDeadlineItemsData(deadlineItemId: DeadlineItemId): Promise<void> {
	const query = `
		update mggm."DeadlineItem" 
		set "DeletedAt" = now() 
		where "Id" = '${deadlineItemId}'
		and "DeletedAt" is null
	`;

	await PgPool.query(query);
}

export async function CreateDeadlineItemData(createDeadlineItemRequest: CreateMegagameDeadlineItemRequest): Promise<void> {
	const { megagameId, type, deadline } = createDeadlineItemRequest;

	const query = `
		insert into mggm."DeadlineItem"("MegagameId", "Type", "DeadlineAt")
		values ('${megagameId}', '${type}', '${deadline}')
	`;

	await PgPool.query(query);
}

export async function GetNewsItemsData(megagameId: MegagameId): Promise<MegagameNewsDBO[] | undefined> {
	const query = `
		select 
			n."Id",
			n."FactionId",
			n."Text"
		from mggm."NewsItem" n
		where n."MegagameId" = '${megagameId}'
		and n."DeletedAt" is null
		order by n."CreatedAt" desc
		limit 50
	`;

	const data = await PgPool.query<MegagameNewsDBO>(query);

	if (data.rows.length > 0) return data.rows;
}

export async function CreateNewsItemData(createNewsItemRequest: CreateMegagameNewsItemRequest): Promise<void> {
	const { megagameId, factionId, text } = createNewsItemRequest;

	const query = `
		insert into mggm."NewsItem"("MegagameId", "FactionId", "Text")
		values ('${megagameId}', '${factionId}', '${text}')
	`;

	await PgPool.query(query);
}

export async function GetOrderQueueData(megagameId: MegagameId): Promise<MegagameOrderQueueItemDBO[]> {
	const query = `
		select *
		from (
			select 
				o."Id",
				o."FactionId",
				o."OrderTypeId",
				o."CreatedAt",
				row_number() over (partition by o."OrderTypeId" order by o."CreatedAt" desc) as rn
			from mggm."OrderQueueItem" o
			join mggm."Faction" f
				on f."Id" = o."FactionId"
			where o."MegagameId" = '${megagameId}'
			  and o."DeletedAt" is null
			order by o."CreatedAt" asc
		) a
		where a."rn" < 51
	`;

	const data = await PgPool.query<MegagameOrderQueueItemDBO>(query);

	return data.rows;
}

export async function DeleteOrderQueueItemData(orderQueueItemId: OrderQueueItemId): Promise<void> {
	const query = `
		update mggm."OrderQueueItem" 
		set "DeletedAt" = now() 
		where "Id" = '${orderQueueItemId}'
		and "DeletedAt" is null
	`;

	await PgPool.query(query);
}

export async function CreateOrderQueueItemData(createOrderQueueItemRequest: CreateOrderQueueItemRequest): Promise<boolean> {
	const { megagameId, factionId, orderTypeId } = createOrderQueueItemRequest;

	const query = `
		insert into mggm."OrderQueueItem"("MegagameId", "FactionId", "OrderTypeId")
		values ('${megagameId}', '${factionId}', '${orderTypeId}')
	`;

	const result = await PgPool.query(query);

	if (result.rowCount && result.rowCount > 0) return true;
	return false;
}
