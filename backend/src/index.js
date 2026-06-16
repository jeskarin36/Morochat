import express from "express";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express";
import User from "./models/user.model.js";
import{ app ,server }from "./lib/socket.js"
import { connectDB } from "./lib/db.js";
import fs from "fs";
import path from "path";
import job from "./lib/cron.js";
import clerkWebhook from "./webhooks/clerk.webhook.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"


const PORT= process.env.PORT;
const FRONTEND_URL= process.env.FRONTEND_URL;

const publicDir= path.join(process.cwd(),"public")

app.use(cors({origin:FRONTEND_URL,credentials:true}))
app.use("/api/webhooks/clerk",express.raw({type:"application/json"}),clerkWebhook)
app.use(express.json())

app.use(clerkMiddleware())

app.get("/healf",(req,res)=>{
    res.status(200).json({ok:true})
})


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir));

   app.get("*", (req, res) => {
        res.sendFile(path.join(publicDir, "index.html"))
    })
}

server.listen(PORT,()=>
{
    connectDB();
    console.log("server is up and runninh on port 3000");
    if(process.env.NODE_ENV==="production"){
        job.start();
    }
})