export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface AIConversation {
  id: string;
  title: string;
  messages: AIMessage[];
  createdAt: Date;
  updatedAt: Date;
  favorite: boolean;
}

const MOCK_RESPONSES = [
  "Here's an optimized version of your request with improved clarity and reach:\n\n**Optimized Request:**\nI'm looking for assistance with React hooks, specifically `useEffect` and custom hooks for managing complex state transitions in an e-commerce application. I've tried using multiple `useEffect` calls but the component re-renders too often.\n\n**Suggestions:**\n1. Consider using `useReducer` for complex state logic\n2. Implement `useCallback` and `useMemo` to prevent unnecessary re-renders\n3. Look into state management libraries like Zustand or Jotai for global state",
  "Here's a concise summary of the key points:\n\n**Key Points:**\n- User needs help with React hooks\n- Complex state transitions causing issues\n- E-commerce application context\n- Multiple useEffect calls causing excessive re-renders\n- Looking for best practices and patterns\n\n**Recommended Next Steps:**\n1. Profile the component to identify bottlenecks\n2. Consider extracting logic into custom hooks\n3. Implement proper dependency arrays",
  "Here's a professional response you can use:\n\nHello! Thank you for reaching out to the community. I'd be happy to help you with your React hooks challenge.\n\nTo better assist you, could you please share:\n1. The specific state transitions you're trying to manage\n2. Any code snippets showing your current approach\n3. The expected behavior vs what's currently happening\n\nOnce I have more context, I can provide targeted advice and examples.",
  "Let me break down this problem into manageable tasks:\n\n**Task Breakdown:**\n1. **Analysis** - Review current implementation and identify pain points\n2. **Planning** - Design the state architecture\n3. **Implementation** - Write the solution\n4. **Testing** - Verify edge cases\n5. **Documentation** - Document the solution for future reference\n\nEach task is designed to be independently completable and testable.",
  "Based on your description, here are recommended tags and categories:\n\n**Category:** Development\n**Tags:** React, TypeScript, Frontend, Performance, State Management, Hooks, Optimization\n\nThese tags will help the right people find your request quickly!",
  "Here's your request rewritten with a more professional tone:\n\nI am seeking assistance with implementing React hooks for efficient state management in my e-commerce project. Specifically, I require guidance on optimizing `useEffect` usage and structuring custom hooks for complex state transitions. Any advice on best practices and performance optimization would be greatly appreciated.",
  "I'd be happy to help! Here are some actionable insights:\n\n**Analysis Complete:**\nThe issue appears to be related to the dependency array in your `useEffect` hook. When dependencies change on every render, it creates an infinite loop.\n\n**Solution:**\n```tsx\nuseEffect(() => {\n  // Your effect logic here\n}, [stableDependency]);\n```\n\n**Additional Resources:**\n- Check the React docs on useEffect\n- Consider using useRef for mutable values that shouldn't trigger re-renders",
];

const MOCK_RESPONSE_DELAYS = [800, 1200, 600, 1500, 1000, 900, 1100];

let responseIndex = 0;

export function simulateAIResponse(message: string, conversationId?: string): Promise<string> {
  return new Promise((resolve) => {
    const delay = MOCK_RESPONSE_DELAYS[responseIndex % MOCK_RESPONSE_DELAYS.length];
    const response = MOCK_RESPONSES[responseIndex % MOCK_RESPONSES.length];
    responseIndex++;
    setTimeout(() => resolve(response), delay);
  });
}

export function simulateStreamingResponse(
  message: string,
  onToken: (token: string) => void,
  onComplete: (full: string) => void,
  onError?: (error: string) => void
): () => void {
  let cancelled = false;
  let index = 0;
  const response = MOCK_RESPONSES[responseIndex % MOCK_RESPONSES.length];
  responseIndex++;

  const interval = setInterval(() => {
    if (cancelled) {
      clearInterval(interval);
      return;
    }
    if (index >= response.length) {
      clearInterval(interval);
      if (!cancelled) onComplete(response);
      return;
    }
    const chunk = response.slice(index, index + 3);
    onToken(chunk);
    index += 3;
  }, 20);

  return () => {
    cancelled = true;
    clearInterval(interval);
  };
}
