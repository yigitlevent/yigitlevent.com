import express from "express";

import { GetRulesetsData, GetRulesetsList } from "../controllers/ruleset.controller";


const Router = express.Router();

Router.get("/ruleset/list", GetRulesetsList);
Router.post("/ruleset/data", GetRulesetsData);

export default Router;
