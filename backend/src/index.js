import express from "express";

const app = express();

const PORT= process.env.PORT

app.listen(PORT,()=>console.log("server is up and runninh on port 3000"))