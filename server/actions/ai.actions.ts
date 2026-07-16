const AI_TAGS_MAP: Record<string, string[]> = {
  development: ["React", "TypeScript", "Frontend", "Backend", "API", "Database"],
  design: ["UI", "UX", "Figma", "Design", "Wireframe", "Prototype"],
  writing: ["Content", "Writing", "Editing", "Copywriting", "SEO"],
  business: ["Strategy", "Marketing", "Growth", "Analytics", "Operations"],
  academic: ["Research", "Paper", "Study", "Analysis", "Literature"],
};

async function callAIApi(prompt: string): Promise<string | null> {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return null;

    const res = await fetch(`${process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1"}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 256,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch {
    return null;
  }
}

export async function generateAITags(title: string, description: string): Promise<string[]> {
  try {
    const result = await callAIApi(
      `Generate 3-5 relevant tags for a help request. Title: "${title}". Description: "${description}". Return only comma-separated tags.`
    );
    if (result) {
      return result.split(",").map((t) => t.trim()).filter(Boolean);
    }
  } catch {}

  const categoryMatch = Object.values(AI_TAGS_MAP).find((tags) =>
    tags.some((t) => title.toLowerCase().includes(t.toLowerCase()) || description.toLowerCase().includes(t.toLowerCase()))
  );
  return categoryMatch || ["General", "Help", "Support"];
}

export async function detectAIUrgency(text: string): Promise<string> {
  try {
    const result = await callAIApi(
      `Classify the urgency of this help request as LOW, MEDIUM, HIGH, or URGENT. Text: "${text.substring(0, 500)}". Respond with only one word.`
    );
    if (result && ["LOW", "MEDIUM", "HIGH", "URGENT"].includes(result.trim().toUpperCase())) {
      return result.trim().toUpperCase();
    }
  } catch {}

  const urgentKeywords = ["urgent", "asap", "critical", "emergency", "deadline", "blocked"];
  const highKeywords = ["important", "priority", "broken", "error", "crash", "failing"];
  const lowerText = text.toLowerCase();

  if (urgentKeywords.some((k) => lowerText.includes(k))) return "URGENT";
  if (highKeywords.some((k) => lowerText.includes(k))) return "HIGH";
  if (text.length > 300) return "MEDIUM";
  return "LOW";
}

export async function generateAISummary(text: string): Promise<string> {
  try {
    const result = await callAIApi(
      `Summarize this help request in 1-2 sentences. Text: "${text.substring(0, 1000)}"`
    );
    if (result) return result;
  } catch {}

  const words = text.split(" ").slice(0, 30);
  return `Summary: ${words.join(" ")}...`;
}

export async function suggestAIRequestRewrite(text: string): Promise<string> {
  try {
    const result = await callAIApi(
      `Rewrite this help request to be clearer and more actionable. Keep the same information but improve clarity and structure. Text: "${text.substring(0, 1500)}"`
    );
    if (result) return result;
  } catch {}

  return `Rewrite: ${text} (Mocked and clarified version)`;
}

export async function categorizeAIRequest(text: string): Promise<string> {
  try {
    const result = await callAIApi(
      `Categorize this help request into one of: Development, Design, Writing, Business, Academic, Creative. Text: "${text.substring(0, 500)}". Respond with only one word.`
    );
    if (result) {
      const trimmed = result.trim();
      const valid = ["Development", "Design", "Writing", "Business", "Academic", "Creative"];
      const match = valid.find((c) => trimmed.toLowerCase().includes(c.toLowerCase()));
      if (match) return match;
    }
  } catch {}

  const categoryMap = [
    { keywords: ["code", "react", "api", "frontend", "backend", "database", "bug", "error"], label: "Development" },
    { keywords: ["design", "ui", "ux", "figma", "color", "layout", "prototype"], label: "Design" },
    { keywords: ["write", "content", "edit", "article", "blog", "copy"], label: "Writing" },
    { keywords: ["business", "marketing", "startup", "revenue", "growth"], label: "Business" },
    { keywords: ["research", "paper", "study", "theory", "analysis"], label: "Academic" },
    { keywords: ["creative", "art", "idea", "brainstorm", "design"], label: "Creative" },
  ];

  const lowerText = text.toLowerCase();
  for (const { keywords, label } of categoryMap) {
    if (keywords.some((k) => lowerText.includes(k))) return label;
  }
  return "Development";
}
