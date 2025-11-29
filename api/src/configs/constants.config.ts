import dotenv from "dotenv";


dotenv.config();

export const IsDev = process.env.API_ENV === "development";
