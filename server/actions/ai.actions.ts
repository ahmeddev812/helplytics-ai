"use server";

import { analyzeRequest, getAIResponse } from "@/lib/aiHelpers";

export async function generateAITags(title: string, description: string) {
  const result = await analyzeRequest(title, description);
  return result?.tags || [];
}

export async function detectAIUrgency(text: string) {
  const prompt = `Analyze the urgency of this request: "${text}". 
  Respond with only one word: LOW, MEDIUM, HIGH, or URGENT.`;
  const result = await getAIResponse(prompt);
  return result?.trim() || "MEDIUM";
}

export async function generateAISummary(text: string) {
  const prompt = `Summarize this support request in 2 sentences: "${text}"`;
  return await getAIResponse(prompt);
}

export async function suggestAIRequestRewrite(text: string) {
  const prompt = `Rewrite this support request to be more clear, professional, and detailed: "${text}"`;
  return await getAIResponse(prompt);
}

export async function categorizeAIRequest(text: string) {
  const prompt = `Categorize this request: "${text}". 
  Choose one: Technical, Academic, Creative, Career, Personal, Other.`;
  return await getAIResponse(prompt);
}
