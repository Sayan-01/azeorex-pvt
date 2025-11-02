import { db } from "@/lib/db";
import ImageKit from "imagekit";
import { inngest } from "./client";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export const GenerateWebpage = inngest.createFunction({ id: "ai/generate-webpage" }, { event: "ai/generate-webpage" }, async ({ event, step }) => {
  const { userId, messages } = event.data;
  console.log("messages", messages);

  // // Step 1: Check credits
  // const user = await step.run("check-credits", async () => {
  //   const user = await db.user.findUnique({
  //     where: { id: userId },
  //     select: { credits: true },
  //   });

  //   if (!user || user.credits < 100) {
  //     throw new Error("Insufficient credits");
  //   }

  //   return user;
  // });

  // await step.run("deduct-credits", async () => {
  //   await db.user.update({
  //     where: { id: userId },
  //     data: { credits: { decrement: 100 } },
  //   });
  // });

  // Step 3: Call AI (NO TIMEOUT!)
  const aiResponse = await step.run("call-ai", async () => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tngtech/deepseek-r1t2-chimera:free",
        messages: messages,
      }),
    });

    if (!response.ok) {
      throw new Error("AI generation failed");
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  });

  console.log("aiResponse", aiResponse);

  // Step 4: Parse JSON
  const parsedJSON = await step.run("parse-json", async () => {
    try {
      return JSON.parse(aiResponse.trim());
    } catch (e) {
      throw new Error("Invalid JSON from AI");
    }
  });

  console.log("parsedJSON", parsedJSON);

  // // Step 5: Save to database
  // await step.run("save-to-database", async () => {
  //   await db.funnelPage.update({
  //     where: { id: funnelPageId },
  //     data: {
  //       content: JSON.stringify(parsedJSON, null, 2),
  //       updatedAt: new Date(),
  //     },
  //   });
  // });

  // // Step 6: Save chat message
  // await step.run("save-chat", async () => {
  //   const updatedMessages = [...messages, { role: "assistant", content: "✨ Webpage generated successfully!" }];

  //   await db.chat.upsert({
  //     where: { funnelPageId },
  //     create: {
  //       funnelPageId,
  //       userId,
  //       projectId,
  //       chatMessage: updatedMessages,
  //     },
  //     update: {
  //       chatMessage: updatedMessages,
  //     },
  //   });
  // });

  return { success: true, content: parsedJSON };
});
