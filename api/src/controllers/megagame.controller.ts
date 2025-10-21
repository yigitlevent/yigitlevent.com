import { Request, Response } from "express";

import {
	GetMegagameData,
	ResetMegagameData,
	GetDeadlineItemsData,
	CreateDeadlineItemData,
	GetNewsItemsData,
	CreateNewsItemData,
	GetOrderQueueData,
	DeleteOrderQueueItemData,
	CreateOrderQueueItemData,
	GetFactionsData,
	GetOrderTypesData,
	DeleteDeadlineItemsData
} from "../services/megagame.service";


export async function GetMegagame(request: Request, response: Response): Promise<Response<MggmMegagameResponse, Record<string, unknown>>> {
	try {
		const data = await GetMegagameData();

		if (data === undefined) {
			response.status(404);
			return response.json({ error: "Megagame data not found" });
		}

		const factions = await GetFactionsData(data.Id);
		const orderTypes = await GetOrderTypesData(data.Id);
		const deadlineItems = await GetDeadlineItemsData(data.Id);
		const newsItems = await GetNewsItemsData(data.Id);

		const megagame: Megagame = {
			id: data.Id,
			name: data.Name,
			timing: {
				start: new Date(data.StartAt),
				end: new Date(data.EndAt)
			},
			cycle: {
				start: data.CycleStart,
				minutes: data.CycleMinutes
			},
			factions: factions?.map(faction => {
				return {
					id: faction.Id,
					name: faction.Name,
					factionCode: faction.FactionCode
				};
			}) || [],
			orderTypes: orderTypes?.map(orderType => {
				return {
					id: orderType.Id,
					name: orderType.Name
				};
			}) || [],
			deadlineItems: deadlineItems?.map(deadlineItem => {
				return {
					id: deadlineItem.Id,
					type: deadlineItem.Type,
					deadlineAt: new Date(deadlineItem.DeadlineAt)
				};
			}) || [],
			news: newsItems?.map(newsItem => {
				return {
					id: newsItem.Id,
					factionId: newsItem.FactionId,
					text: newsItem.Text
				};
			}) || []
		};

		const responseData: MggmMegagameResponse = { megagame };

		response.status(200);
		return response.json(responseData);
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function ResetMegagame(request: Request, response: Response): Promise<Response> {
	const megagameId = request.params.megagameId as MegagameId;

	try {
		await ResetMegagameData(megagameId);
		response.status(204);
		return response.send();
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function CreateMegagameDeadlineItem(request: Request<unknown, unknown, CreateMegagameDeadlineItemRequest>, response: Response): Promise<Response> {
	try {
		await CreateDeadlineItemData(request.body);
		response.status(201);
		return response.send();
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function DeleteMegagameDeadlineItem(request: Request, response: Response): Promise<Response> {
	const deadlineItemId = request.params.deadlineItemId as DeadlineItemId;

	try {
		await DeleteDeadlineItemsData(deadlineItemId);
		response.status(201);
		return response.send();
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function CreateMegagameNewsItem(request: Request<unknown, unknown, CreateMegagameNewsItemRequest>, response: Response): Promise<Response> {
	const createMegagameNewsItemRequest = request.body;

	try {
		await CreateNewsItemData(createMegagameNewsItemRequest);
		response.status(201);
		return response.send();
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function GetMegagameOrderQueue(request: Request, response: Response): Promise<Response> {
	const megagameId = request.params.megagameId as MegagameId;

	try {
		const orderQueueItems = await GetOrderQueueData(megagameId);
		const orderTypes = await GetOrderTypesData(megagameId);

		if (orderTypes === undefined) {
			response.status(404);
			return response.json({ error: "Megagame order types not found" });
		}

		const getTime = (dateStr: string): number => new Date(dateStr).getTime();
		const sortedList = orderQueueItems.sort((a, b) => getTime(a.CreatedAt) - getTime(b.CreatedAt));

		const grouped: MegagameOrderQueueItems = {};

		for (const orderType of orderTypes) {
			grouped[orderType.Id] = [];
		}

		for (const itemIndex in sortedList) {
			const item = sortedList[itemIndex];

			grouped[item.OrderTypeId].push({
				id: item.Id,
				factionId: item.FactionId
			});
		}

		const responseData: MggmOrderQueueItemsResponse = { queues: grouped };

		response.status(200);
		return response.json(responseData);
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function DeleteMegagameOrderQueueItem(request: Request, response: Response): Promise<Response> {
	const orderQueueItemId = request.params.orderQueueItemId as OrderQueueItemId;

	try {
		await DeleteOrderQueueItemData(orderQueueItemId);
		response.status(201);
		return response.send();
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}

export async function CreateMegagameOrderQueueItem(request: Request<unknown, unknown, CreateOrderQueueItemRequest>, response: Response): Promise<Response> {
	const createOrderQueueItemRequest = request.body;

	try {
		const success = await CreateOrderQueueItemData(createOrderQueueItemRequest);

		if (!success) {
			response.status(400);
			return response.json({ error: "Failed to create order queue item" });
		}

		response.status(201);
		return response.send();
	}
	catch (e) {
		console.error(e);
		return response.sendStatus(403);
	}
}
