import express from "express";
import appRoutes from "./routes/appRoutes";
import type from "./type"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', appRoutes);

app.use((err,req,res,next)=>{
    res.status(err.status).json({message: err.message, status: err.status})
});

export default app;
