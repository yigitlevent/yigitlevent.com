import express from "express";

import { GetMegagame, SetMegagame } from "../controllers/megagame.controller";
import { CheckAdmin } from "../middlewares/checkAdmin.middleware";


const Router = express.Router();

Router.get("/game", GetMegagame);
Router.post("/game", CheckAdmin, SetMegagame);

export default Router;
