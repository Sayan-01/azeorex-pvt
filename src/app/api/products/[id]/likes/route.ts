// import { NextResponse } from "next/server";
// import { auth } from "../../../../../../auth";
// import { db } from "@/lib/db";
// import { LikeInfo } from "@/types/types";

// export const GET = async (req: Request, { params: { id } }: { params: { id: string } }) => {
//   try {
//     const session = await auth();
//     if (session?.user) return NextResponse.json({ error: "Unauthorize" }, { status: 500 });

//     const template = await db.template.findUnique({
//       where: { id: id },
//       select: {
//         Likes: {
//           where: {
//             userId: session?.user?.id,
//           },
//           select: {
//             userId: true,
//           },
//         },
//         likes: true,
//         _count: {
//           select: {
//             Likes: true,
//           },
//         },
//       },
//     });

//     if (!template) {
//       return NextResponse.json({ error: "Somthing is wrong" }, { status: 500 });
//     }

//     await db.template.update({
//       where: { id: id },
//       data: {
//         likes: template.likes + 1, // likes: template._count.Likes,
//       },
//     });
//     const data: LikeInfo = {
//       likes: template.likes,
//       isLikedByUser: !!template.Likes.length,
//     };
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: "Somthing is wrong" }, { status: 500 });
//   }
// };

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { temId, userId, like } = await req.json();
  console.log(temId, userId, like);

  const getTemplate = await db.template.findUnique({
    where: { id: temId },
    select: {
      likes: true,
      likesArray: true,
    },
  });

  if (!getTemplate) return NextResponse.json({ error: "Somthing is wrong" }, { status: 500 });

  if (like) {
    let idx = getTemplate.likesArray.indexOf(userId);
    if (idx !== -1) getTemplate.likesArray.splice(idx, 1);

    await db.template.update({
      where: { id: temId },
      data: { ...getTemplate, likes: getTemplate.likes - 1 },
    });

    return NextResponse.json({ success: true, message: false }, { status: 200 });
  } else {
    getTemplate.likesArray.push(userId);
    await db.template.update({
      where: { id: temId },
      data: { ...getTemplate, likes: getTemplate.likes + 1 },
    });
    return NextResponse.json({ success: true, message: true }, { status: 200 });
  }
};
