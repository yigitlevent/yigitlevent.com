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
import { CheckAdmin } from "../middlewares/checkAdmin.middleware";


const Router = express.Router();

Router.get("/megagame", GetMegagame);
Router.put("/megagame/reset/:megagameId", CheckAdmin, ResetMegagame);

Router.post("/megagame/deadline-item", CheckAdmin, CreateMegagameDeadlineItem);
Router.delete("/megagame/deadline-item/:deadlineItemId", CheckAdmin, DeleteMegagameDeadlineItem);
Router.post("/megagame/news-item", CreateMegagameNewsItem);

Router.get("/megagame/order-queues/:megagameId", GetMegagameOrderQueue);
Router.delete("/megagame/order-queue-item/:orderQueueItemId", DeleteMegagameOrderQueueItem);
Router.post("/megagame/order-queue-item", CreateMegagameOrderQueueItem);

export default Router;
