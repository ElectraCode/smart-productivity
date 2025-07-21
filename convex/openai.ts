import { mutation } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

// Get API key from environment variables
const getOpenAI = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set in environment variables");
  }
  return new OpenAI({ apiKey });
};

export const doSomething = mutation({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    try {
      const openai = getOpenAI();
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: args.query }],
        model: "gpt-3.5-turbo",
      });

      return completion.choices[0]?.message?.content;
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw error;
    }
  },
});
