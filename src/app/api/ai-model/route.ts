// import { NextResponse } from "next/server";
// import { geminiModel } from "../../../../Ai/AiModel";

// export const POST = async (req: any) => {
//   const { messages } = await req.json();
  
//   try {
//     const result = await geminiModel.sendMessage(messages);
//     const aiRes = result.response.text();
//     return NextResponse.json(aiRes);
//   } catch (error) {
//     return NextResponse.json({ error: error });
//   }
// };


import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // optional
        "X-Title": "My Next.js App", // optional
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages,
      }),
    });

    const data = await response.json();
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
