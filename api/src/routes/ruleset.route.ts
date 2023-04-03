import express from "express";

import { GetRulesetsData, GetRulesetsList } from "../controllers/ruleset.controller";


const Router = express.Router();

Router.get("/list", GetRulesetsList);
Router.get("/data", GetRulesetsData);

export default Router;
