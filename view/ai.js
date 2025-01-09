import express from "express";
import detectsymptom from "../controlers/aicontrols.js";
const airouts = express.Router();

airouts.post("/detect", detectsymptom.detectsymptom);
airouts.post("/translate", detectsymptom.detectsymptom);

export default airouts;
