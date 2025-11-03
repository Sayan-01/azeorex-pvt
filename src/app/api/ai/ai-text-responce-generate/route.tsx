import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const {messages} = await req.json();
  console.log("sayan",messages);
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "Azeorex", // optional
      },
      body: JSON.stringify({
        // model: "google/gemini-2.0-flash-exp:free",
        model: "tngtech/deepseek-r1t2-chimera:free",
        messages,
      }),
    });
    const data = await response.json();
    console.log("sayan-server",data);
    return NextResponse.json(data);
  } catch (error) {
    console.log("sayan-error",error);
    return NextResponse.json({ error: "AI model failed" }, { status: 500 });
    
  }
  

}