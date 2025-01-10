import express from "express";
import chatfunc from "../controlers/chatscontrols.js";

const chatsrouter = express.Router();

chatsrouter.post("/insert", chatfunc.insertchats);
chatsrouter.get("/get", chatfunc.getchats);

export default chatsrouter;
