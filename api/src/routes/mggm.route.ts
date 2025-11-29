import express from "express";

import {
	GetMegagame,
	ResetMegagame,
	CreateMegagameDeadlineItem,
	CreateMegagameNewsItem,
	GetMegagameOrderQueue,
	DeleteMegagameOrderQueueItem,
	CreateMegagameOrderQueueItem,
	DeleteMegagameDeadlineItem
} from "../controllers/megagame.controller";


const Router = express.Router();

Router.get("/megagame", GetMegagame);
Router.post("/megagame/reset", ResetMegagame);

Router.post("/megagame/deadline-item", CreateMegagameDeadlineItem);
Router.delete("/megagame/deadline-item/:deadlineItemId", DeleteMegagameDeadlineItem);
Router.post("/megagame/news-item", CreateMegagameNewsItem);

Router.get("/megagame/order-queues/:megagameId", GetMegagameOrderQueue);
Router.delete("/megagame/order-queue-item/:orderQueueItemId", DeleteMegagameOrderQueueItem);
Router.post("/megagame/order-queue-item", CreateMegagameOrderQueueItem);

// eslint-disable-next-line import/no-default-export
export default Router;
