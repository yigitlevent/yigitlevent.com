import express from "express";

import { GetRulesetsData, GetRulesetsList } from "../controllers/ruleset.controller";


const Router = express.Router();

Router.get("/ruleset/list", GetRulesetsList);
Router.post("/ruleset/data", GetRulesetsData);

// eslint-disable-next-line import/no-default-export
export default Router;
