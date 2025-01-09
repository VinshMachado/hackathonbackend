import express from "express";
import dotenv from "dotenv";
import airouts from "./view/ai.js";

dotenv.config();

const app = express();
app.use(express.json());

//routes//

app.use("/ai", airouts);

app.listen(5000, () => {
  console.log("server is running ");
});
