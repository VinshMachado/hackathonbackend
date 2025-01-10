import mongoose from "mongoose";
import express from "express";
import donationlist from "../schma/donation.js";
import QRCode from "qrcode";
import donationmodule from "../controlers/donations.js";

const dontationrouter = express.Router();

dontationrouter.post("/insert", donationmodule.insert);
dontationrouter.get("/get", donationmodule.getdonations);

export default dontationrouter;
