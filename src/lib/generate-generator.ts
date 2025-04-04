import { Generator } from "../types/generator";

export const generateGenerator = async (
  existingGeneratorsNames: string[],
  firstGenerator: Generator,
  secondGenerator: Generator
) => {
  const response = await fetch(import.meta.env.VITE_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      existingGeneratorsNames,
      firstGenerator,
      secondGenerator,
    }),
  });

  const data = await response.json();
  return data.generator;
};
