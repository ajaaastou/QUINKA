import express from "express";
import dbConnect from "./database/dbConnect.js";
import { config } from "dotenv";

const app = express()

config({ path: "./config/.env" });

dbConnect()



export default app