import mongoose from "mongoose";

const donation = new mongoose.Schema({
  name: String,
  desc: String,
  upiId: String,
  amount: String,
  qrcode: String,
});

const donationlist = mongoose.model("donationlist", donation);

export default donationlist;
