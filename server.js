import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeResume(resumeText) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
Return ONLY valid JSON. No explanation.

{
  "career": "",
  "skills_present": [],
  "skills_missing": [],
  "roadmap": [],
  "interview_questions": []
}

Resume:
${resumeText}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.log("Parsing error:", text);
    return {
      career: "Parsing error",
      skills_present: [],
      skills_missing: [],
      roadmap: [],
      interview_questions: []
    };
  }
}

app.post("/analyze", async (req, res) => {
  const { resume } = req.body;

  if (!resume) {
    return res.status(400).json({ error: "Resume required" });
  }

  const result = await analyzeResume(resume);
  res.json(result);
});

app.listen(5000, () => {
  console.log("🔥 Server running on http://localhost:5000");
});