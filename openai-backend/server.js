require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON request body

// Initialize OpenAI with API key from .env
const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY, 
    baseURL: "https://openrouter.ai/api/v1",
});

// API Route for Chat Completion
app.post("/chat", async (req, res) => {
  try {
    
    const { prompt } = req.body; // Get user prompt from request body
    await new Promise(resolve => setTimeout(resolve, 1000));
   
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", 
      messages: [{ role: "user", content: prompt }],
    });

    // Send back OpenAI response
    res.json({ response: response.choices[0].message.content });

  } catch (error) {
    console.error("OpenAI API Error:", error);

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
