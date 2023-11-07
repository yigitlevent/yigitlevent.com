import dotenv from "dotenv";


dotenv.config();

export const SECRET = process.env.API_SECRET as string;
export const PORT = process.env.API_PORT as string;

export const IsDev = process.env.API_ENV === "development";
