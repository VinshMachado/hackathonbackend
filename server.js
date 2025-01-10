import express from "express";
import dotenv from "dotenv";
import airouts from "./view/ai.js";
import dontationrouter from "./view/donation.js";

import mongoose from "mongoose";
dotenv.config();
const databaseurl = process.env.database;

mongoose.connect(`${databaseurl}`).then(() => {
  console.log("connected to db");
});

dotenv.config();

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello");
});
//routes//

app.use("/ai", airouts);
app.use("/donation", dontationrouter);

app.listen(5000, () => {
  console.log("server is running ");
});
