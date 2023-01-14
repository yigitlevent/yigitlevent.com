import dotenv from "dotenv";


dotenv.config();

export const SECRET = process.env.APISECRET as string;
export const PORT = process.env.APIPORT as string;
