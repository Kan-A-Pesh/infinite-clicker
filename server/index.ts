import express from "express";
import cors from "cors";
import { generateNewGenerator } from "./utils/openai";
import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables
dotenv.config();

// Check if OpenAI API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set in environment variables");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

// Define Generator schema
const generatorSchema = z.object({
  emojiIcon: z.string(),
  name: z.string(),
  description: z.string(),
  unitPerSecond: z.number(),
  cost: z.number(),
});

// Define request schema
const requestSchema = z.object({
  existingGeneratorsNames: z.array(z.string()),
  firstGenerator: generatorSchema,
  secondGenerator: generatorSchema,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/generate", async (req, res) => {
  try {
    // Validate request body using Zod
    const validatedData = requestSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        error: "Invalid request data",
        details: validatedData.error.format(),
      });
    }

    const { existingGeneratorsNames, firstGenerator, secondGenerator } =
      validatedData.data;

    // Generate a new generator using OpenAI
    const newGenerator = await generateNewGenerator(
      existingGeneratorsNames,
      firstGenerator,
      secondGenerator
    );

    // Return the new generator
    res.status(200).json({
      success: true,
      generator: newGenerator,
    });
  } catch (error) {
    console.error("Error in /generate endpoint:", error);
    res.status(500).json({
      error: "Failed to generate a new generator",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoint available at http://localhost:${PORT}/generate`);
});
