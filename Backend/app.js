import express from "express";
import dbConnect from "./database/dbConnect.js";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import supplierRouter from "./routes/supplierRoutes.js";

const app = express()

config({ path: "./config/.env" });

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter)
app.use('/api/supplier', supplierRouter)

dbConnect()


export default app