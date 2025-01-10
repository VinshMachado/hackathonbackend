import mongoose from "mongoose";

const model = new mongoose.Schema({
  Ownernlink: String,
  participentLink: String,
});

const Videolink = mongoose.model("Videolink", model);

export default Videolink;
