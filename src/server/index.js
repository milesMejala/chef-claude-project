import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

dotenv.config();

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, 
but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60_000, // 1 minute
  max: 10,          // max 10 requests per minute per IP
  message: { error: "Too many requests. Please wait a minute and try again." },
});
app.use("/api/recipe", limiter);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/recipe", async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Please provide an array of ingredients." });
    }

    const ingredientsString = ingredients.join(", ");

    const response = await client.responses.create({
      model: "gpt-5.2",
      input: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
    });

    res.json({ recipe: response.output_text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});