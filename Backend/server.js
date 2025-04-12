import express from 'express'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import userRouter from './routes/routes.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
const app = express()
connectDB();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use('/api/user',userRouter)

app.use(notFound);
app.use(errorHandler);
app.listen(3000,()=>{
    console.log("server started");
    
})