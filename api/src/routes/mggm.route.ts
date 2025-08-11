import express from "express";

import { GetMegagame, GetRumors, SetMegagame, SetRumor } from "../controllers/megagame.controller";
import { CheckAdmin } from "../middlewares/checkAdmin.middleware";


const Router = express.Router();

Router.get("/megagame", GetMegagame);
Router.post("/megagame/rumors", GetRumors);
Router.post("/megagame", CheckAdmin, SetMegagame);
Router.post("/megagame/rumor", CheckAdmin, SetRumor);

export default Router;
