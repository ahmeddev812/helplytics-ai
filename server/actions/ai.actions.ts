export async function generateAITags(title: string, description: string) {
  return ["MockTag1", "MockTag2", "MockTag3"];
}

export async function detectAIUrgency(text: string) {
  return "MEDIUM";
}

export async function generateAISummary(text: string) {
  return "This is a mock AI summary generated for your request.";
}

export async function suggestAIRequestRewrite(text: string) {
  return `Rewrite: ${text} (Mocked and clarified version)`;
}

export async function categorizeAIRequest(text: string) {
  return "Technical";
}
