import express from "express";
import session from "express-session";
import cors from "cors";
import Pg from "pg";
import pgsimple from "connect-pg-simple";

import { PORT } from "./constants";
import { CorsConfig, PgConfig, SessionConfig } from "./configs";

import { UserAuth, UserSignUp, UserSignIn, UserSignOut, CheckAuth } from "./routes/user";
import { GetRulesetsData, GetRulesetsList } from "./routes/rulesets";


export const App = express();
export const PgPool = new Pg.Pool(PgConfig);

const SessionStore = new (pgsimple(session))({ pool: PgPool, schemaName: "usr", tableName: "UserSessions" });

App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cors(CorsConfig));
App.use(session({ store: SessionStore, ...SessionConfig }));

App.post("/user/auth", CheckAuth, UserAuth);
App.post("/user/signup", UserSignUp);
App.post("/user/signin", UserSignIn);
App.post("/user/signout", UserSignOut);

App.get("/rulesets/list", GetRulesetsList);
App.get("/rulesets/data", GetRulesetsData);


/*
App.get("/campaigns", CheckAuth, GetCampaigns);
App.get("/campaign", CheckAuth, GetCampaign)
	.post("/campaign", CheckAuth, CreateCampaign)
	.put("/campaign", CheckAuth, EditCampaign)
	.delete("/campaign", CheckAuth, DeleteCampaign);
App.post("/campaign/invite", CheckAuth, CampaignInvite);

GET /campaigns get basic details of campaigns that you are created or a part of
GET /campaign -- get all details of a campaign
GET /campaign/players -- get basic details of all players for a given campaign
GET /campaign/player -- get all details of a player for a given campaign

POST /campaign/invite 
	-- invite a player to your campaign
	-- can't invite a player that is already invited 
	-- can't invite a player that is already in the campaign

POST /campaign/kick 
	-- remove a player from your campaign

POST /player/invite/accept 
	-- accept a campaign invitation
	-- delete campaign invitation
	-- add campaignplayers entry

POST /player/invite/reject 
	-- reject a campaign invitation
	-- delete campaign invitation

POST /player/leave 
	-- leave a campaign that you are already in
	-- delete campaignplayers entry

POST /campaign -- create a campaign
POST /campaign/journal -- create a campaign journal entry

PUT /campaign -- edit a campaign
PUT /campaign/journal -- edit a campaign journal entry

DELETE /campaign -- delete a campaign
DELETE /campaign/journal -- delete a campaign journal entry
*/

App.listen(PORT, () => console.log(`App started on port ${PORT}`));
