import express, { response } from "express";
import dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";

dotenv.config();
const airouts = express.Router();

const API_TOKEN = process.env.apikey;
const hf = new HfInference(API_TOKEN);

//context//
const context = `Dengue: High fever, severe headache, joint and muscle pain, and skin rashes.
Common Cold: Sneezing, runny or stuffy nose, sore throat, cough, mild fever, and fatigue.
Malaria: High fever, chills, sweating, headache, nausea, vomiting, and muscle pain.
Allergies: Sneezing, runny nose, itchy eyes, skin rashes, and swelling.
Typhoid: Prolonged fever, weakness, stomach pain, constipation, and headache.
Asthma: Shortness of breath, wheezing, coughing (especially at night), and chest tightness.
Chickenpox: Fever, fatigue, itchy red rashes, and fluid-filled blisters.
`;

const detectsymptom = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res
      .status(400)
      .json({ error: "Question is required in the request body." });
  }

  try {
    const result = await hf.questionAnswering({
      model: "deepset/roberta-base-squad2",
      inputs: {
        question,
        context,
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error querying Hugging Face:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

const translate = async (req, response) => {};

export default { detectsymptom };
