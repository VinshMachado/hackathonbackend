import express from "express";
import detectsymptom from "../controlers/aicontrols.js";
const airouts = express.Router();

airouts.post("/detect", detectsymptom.detectsymptom);
airouts.post("/summarize", detectsymptom.summarize);

export default airouts;
