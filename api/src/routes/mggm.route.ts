import express from "express";

import { GetMegagame, SetMegagame } from "../controllers/megagame.controller";
import { CheckAdmin } from "../middlewares/checkAdmin.middleware";


const Router = express.Router();

Router.get("/megagame", GetMegagame);
Router.post("/megagame", CheckAdmin, SetMegagame);

export default Router;
