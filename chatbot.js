const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");

const app = express();
const PORT = 5001;

// Middleware to parse JSON
app.use(express.json());
// ✅ Enable CORS
app.use(cors());

// Initialize Gemini
const genAI = new GoogleGenerativeAI("AIzaSyBKmzn-glyeZbXACg9G2fnoNiEkAEaeKE4");

// Route to handle prompt
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ result: text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
