import { NextResponse } from "next/server";
import { geminiModel } from "../../../../Ai/AiModel";

export const POST = async (req: any) => {
  const {prompt} = await req.json();
  try {
    const result = await geminiModel.sendMessage(prompt);
    const aiRes = result.response.text();
    return NextResponse.json(aiRes);
  } catch (error) {
    return NextResponse.json({error: error});
  }
};
