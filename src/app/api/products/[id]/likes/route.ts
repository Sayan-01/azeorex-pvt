import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { temId, userId, like } = await req.json();

  const getTemplate = await db.template.findUnique({
    where: { id: temId },
    select: { likes: true, likesArray: true },
  });

  if (!getTemplate) return NextResponse.json({ error: "Something is wrong" }, { status: 500 });

  if (like) {
    // Like
    if (!getTemplate.likesArray.includes(userId)) {
      getTemplate.likesArray.push(userId);
      await db.template.update({
        where: { id: temId },
        data: {
          likes: getTemplate.likes + 1,
          likesArray: getTemplate.likesArray,
        },
      });
    }
    return NextResponse.json({ success: true, message: true }, { status: 200 });
  } else {
    // Unlike
    const idx = getTemplate.likesArray.indexOf(userId);
    if (idx !== -1) getTemplate.likesArray.splice(idx, 1);

    await db.template.update({
      where: { id: temId },
      data: {
        likes: getTemplate.likes - 1,
        likesArray: getTemplate.likesArray,
      },
    });

    return NextResponse.json({ success: true, message: false }, { status: 200 });
  }
};
