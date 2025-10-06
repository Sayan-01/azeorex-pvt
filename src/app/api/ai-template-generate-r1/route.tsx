import { NextResponse } from "next/server";
import OpenAi from "openai";

if (!process.env.NEXT_PUBLIC_R1_API_KEY) {
  throw new Error("Please define the R1 API key in the environment variable");
}

const openai = new OpenAi({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.NEXT_PUBLIC_R1_API_KEY,
});

export const POST = async (req: any) => {
  const { prompt } = await req.json();
  try {
    const result = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
    });
    const aiRes = result.choices[0].message.content;
    return NextResponse.json(aiRes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: error.status || 500 });
  }
};
