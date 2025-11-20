import express from "express";

const router = express.Router();

// Simple protect middleware (optional, you can replace with your auth)
const protect = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === "Bearer my-secret-token") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Fake AI response generator
const generateFakeResponse = (prompt) => {
  const responses = [
    "Interesting! Can you elaborate more?",
    "I see. Let's think about it differently.",
    "That's a great question!",
    "Hmm, I would say yes, but let's break it down.",
    "Here's a thought based on your prompt...",
  ];
  const randomIndex = Math.floor(Math.random() * responses.length);
  return `${responses[randomIndex]} (You asked: "${prompt}")`;
};

// POST /api/v1/openai/run
router.post("/run", protect, (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  const fakeResponse = generateFakeResponse(prompt);

  res.json({
    choices: [
      {
        message: {
          role: "assistant",
          content: fakeResponse,
        },
      },
    ],
  });
});

export default router;
