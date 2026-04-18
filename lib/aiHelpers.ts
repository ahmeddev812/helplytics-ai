import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIResponse = async (prompt: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    return null;
  }
};

export const analyzeRequest = async (title: string, description: string) => {
  const prompt = `Analyze this community support request:
    Title: ${title}
    Description: ${description}
    
    Please provide:
    1. 3-5 relevant tags
    2. Suggested category (Technical, Academic, Creative, Career, Personal, Other)
    3. Urgency level (LOW, MEDIUM, HIGH, URGENT)
    4. A 2-3 sentence summary
    
    Format the response as JSON.`;

  const response = await getAIResponse(prompt);
  return response ? JSON.parse(response) : null;
};
