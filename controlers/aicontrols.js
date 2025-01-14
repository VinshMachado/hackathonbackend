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
Pneumonia: Chest pain, cough with phlegm, fever, sweating, and chills.
COVID-19: Fever, dry cough, fatigue, loss of taste or smell, and difficulty breathing.
Flu (Influenza): Sudden fever, chills, sore throat, muscle aches, and fatigue.
Tuberculosis: Persistent cough (sometimes with blood), weight loss, night sweats, and fever.
Hypertension: Often asymptomatic, but may include headaches, shortness of breath, or nosebleeds in severe cases.
Diabetes: Increased thirst, frequent urination, extreme hunger, and unintentional weight loss.
Migraine: Severe headache, sensitivity to light and sound, nausea, and visual disturbances.
Sinusitis: Nasal congestion, facial pain or pressure, headache, and postnasal drip.
Anemia: Fatigue, weakness, pale skin, shortness of breath, and dizziness.
Arthritis: Joint pain, stiffness, swelling, and reduced range of motion.
Appendicitis: Sudden abdominal pain (starting near the navel and shifting to the lower right), nausea, vomiting, and fever.
Measles: Fever, dry cough, runny nose, inflamed eyes, and a red blotchy skin rash.
Bronchitis: Persistent cough, production of mucus, fatigue, and slight fever or chills.
Gallstones: Severe abdominal pain, nausea, vomiting, and yellowing of the skin or eyes (jaundice).
Gastroenteritis: Diarrhea, vomiting, abdominal cramps, and dehydration.
Stroke: Sudden weakness or numbness on one side of the body, confusion, difficulty speaking, and loss of balance.
Heart Attack: Chest pain or discomfort, shortness of breath, nausea, and cold sweats.
Kidney Stones: Severe back or side pain, blood in the urine, nausea, and frequent urination.
Obesity: Excess body weight, fatigue, joint pain, and increased risk of associated health conditions.
Depression: Persistent sadness, loss of interest in activities, fatigue, and changes in sleep or appetite.
Anxiety: Excessive worry, restlessness, rapid heart rate, and difficulty concentrating.
Epilepsy: Seizures, temporary confusion, staring spells, and uncontrollable movements.`;

const detectsymptom = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res
      .status(400)
      .json({ error: "Question is required in the request body." });
  }

  try {
    const trimmedQuestion = question.trim().toLowerCase();

    // Handle casual inputs
    const casualReplies = {
      hi: "Hello! could you please give your symptoms?",
      hello: "Hi there! could you please give your symptoms??",
      "how are you": "I'm just a bot, but I'm here to help you!",
      hey: "Hey! could you please give your symptoms??",
      "good morning": "Good morning!could you please give your symptoms??",
      "good evening": "Good evening! could you please give your symptoms??",
      "what's up": "Not much! could you please give your symptoms??",
      "whats up": "Not much! could you please give your symptoms??",
      "sup": "Not much! could you please give your symptoms??",
      "no": "than fuk off",
      "yes":"then give no",
      yo: "yo MF",
      yooooooo: "yooyoyoyoyoyoyoyo",
    };

    if (casualReplies[trimmedQuestion]) {
      // Send a casual reply
      return res.status(200).json({
        score: 3.34319594230692e-8,
        start: 0,
        end: 6,
        answer: casualReplies[trimmedQuestion],
      });
    } else {
      const result = await hf.questionAnswering({
        model: "deepset/roberta-base-squad2",
        inputs: {
          question,
          context,
        },
      });

      res.status(200).json(result);
    }
  } catch (error) {
    console.error("Error querying Hugging Face:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

const summarize = async (req, res) => {
  const { text } = req.body;
  console.log(text);
  if (!text) {
    return res
      .status(400)
      .json({ error: "context is required in the request body." });
  }
  try {
    const result = await hf.summarization({
      model: "Falconsai/text_summarization",
      inputs: text,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error querying Hugging Face:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

export default { detectsymptom, summarize };
