import { OpenAI } from "openai";
import { Generator } from "./generator";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Truncates text to the specified length with ellipsis if needed
 * @param text Text to truncate
 * @param maxLength Maximum length allowed
 * @returns Truncated text with ellipsis if needed
 */
function truncateWithEllipsis(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

/**
 * Generates a new generator based on two existing generators
 * @param existingGeneratorsNames Names of all existing generators to avoid duplicates
 * @param firstGenerator First generator to use as inspiration
 * @param secondGenerator Second generator to use as inspiration
 * @returns A new unique generator
 */
export async function generateNewGenerator(
  existingGeneratorsNames: string[],
  firstGenerator: Generator,
  secondGenerator: Generator
): Promise<Generator> {
  const systemPrompt = `
    You are a creative generator inventor that creates new unit-generating machines by combining existing ones.
    Given two generators, create a new unique generator that combines elements of both.
    The new generator should have:
    1. A clever name that combines elements from both generators or suggests a fusion of them (MAXIMUM 25 CHARACTERS)
    2. A brief description explaining what it does (MAXIMUM 100 CHARACTERS)
    3. A suitable emoji icon (use a single emoji character)
    4. Appropriate units per second and cost values based on the input generators

    DO NOT reuse any names from the list of existing generators.
    STRICTLY KEEP THE NAME UNDER 25 CHARACTERS AND DESCRIPTION UNDER 100 CHARACTERS.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: `
          Create a new generator by combining these two generators:

          First Generator:
          - Name: ${firstGenerator.name}
          - Description: ${firstGenerator.description}
          - Emoji Icon: ${firstGenerator.emojiIcon}
          - Units Per Second: ${firstGenerator.unitPerSecond}
          - Cost: ${firstGenerator.cost}

          Second Generator:
          - Name: ${secondGenerator.name}
          - Description: ${secondGenerator.description}
          - Emoji Icon: ${secondGenerator.emojiIcon}
          - Units Per Second: ${secondGenerator.unitPerSecond}
          - Cost: ${secondGenerator.cost}

          Existing generator names (DO NOT reuse these): ${existingGeneratorsNames.join(
            ", "
          )}

          For the new generator:
          - Name must be 25 characters maximum
          - Description must be 100 characters maximum
          - Units per second should be between ${
            Math.min(
              firstGenerator.unitPerSecond,
              secondGenerator.unitPerSecond
            ) * 1.2
          } and ${
          Math.max(
            firstGenerator.unitPerSecond,
            secondGenerator.unitPerSecond
          ) * 2
        }
          - Cost should be between ${
            Math.min(firstGenerator.cost, secondGenerator.cost) * 1.5
          } and ${Math.max(firstGenerator.cost, secondGenerator.cost) * 3}

          IMPORTANT: Keep the name under 25 characters and description under 100 characters.
        `,
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "createGenerator",
          description: "Create a new generator by combining two existing ones",
          strict: true,
          parameters: {
            type: "object",
            properties: {
              emojiIcon: {
                type: "string",
                description:
                  "A single emoji character representing the generator",
              },
              name: {
                type: "string",
                description: "Name of the generator",
              },
              description: {
                type: "string",
                description: "Brief description of what the generator does",
              },
              unitPerSecond: {
                type: "number",
                description: "Units produced per second",
              },
              cost: {
                type: "number",
                description: "Cost to purchase the generator",
              },
            },
            required: [
              "emojiIcon",
              "name",
              "description",
              "unitPerSecond",
              "cost",
            ],
            additionalProperties: false,
          },
        },
      },
    ],
    tool_choice: { type: "function", function: { name: "createGenerator" } },
    temperature: 0.7,
    max_tokens: 500,
  });

  // Extract the tool call result
  const toolCalls = response.choices[0]?.message?.tool_calls;

  if (!toolCalls || toolCalls.length === 0) {
    throw new Error("Failed to generate generator using tool calls");
  }

  const toolCall = toolCalls[0];

  if (
    toolCall.type !== "function" ||
    toolCall.function.name !== "createGenerator"
  ) {
    throw new Error("Unexpected tool call response");
  }

  try {
    const newGenerator = JSON.parse(toolCall.function.arguments) as Generator;

    // Ensure we don't have duplicate names
    if (existingGeneratorsNames.includes(newGenerator.name)) {
      newGenerator.name = `${newGenerator.name} Prime`;
    }

    // Truncate long name and description if needed
    newGenerator.name = truncateWithEllipsis(newGenerator.name, 25);
    newGenerator.description = truncateWithEllipsis(
      newGenerator.description,
      100
    );

    return newGenerator;
  } catch (error) {
    console.error("Error parsing tool call result:", error);
    throw new Error("Failed to parse generator data");
  }
}
