import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { messages, funnelPageId, userId, projectId } = await req.json();
  console.log(funnelPageId, messages);
  try {
    const chat = await db.chat.upsert({
      where: { funnelPageId }, // unique field
      create: {
        funnelPageId,
        userId,
        projectId,
        chatMessage: messages,
      },
      update: {
        chatMessage: messages,
      },
    });

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.log("sayan", error);
    return new Response(JSON.stringify({ success: false }));
  }
}
