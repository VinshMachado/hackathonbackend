import mongoose from "mongoose";

const model = new mongoose.Schema({
  name: String,
  report: String,
  link: String,
});

const chats = mongoose.model("chat", model);

export default chats;
