import { NextResponse } from "next/server";
import { generateWebsiteTemplateModel } from "../../../../Ai/AiModel";

export const POST = async (req: any) => {
  const {prompt} = await req.json();
  try {
    const result = await generateWebsiteTemplateModel.sendMessage(prompt);
    const aiRes = result.response.text();
    return NextResponse.json(aiRes);
  } catch (error) {
    return NextResponse.json({error: error});
  }
};
