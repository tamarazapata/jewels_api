import express from "express";
import cors from "cors";
import jewelRouter from "./routes/jewel.router.js";  
import activityLogger from "./middlewares/activityLoger.js"; 

const app = express();

app.use(cors());
app.use(express.json());

app.use(activityLogger);

app.use("/joyas", jewelRouter);

export default app;
