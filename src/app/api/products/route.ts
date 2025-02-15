import { Template } from "../../../../models/template";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import connectDb from "@/lib/dbConnect";

export const GET = async () => {
  await connectDb();
  let templates = await Template.find().sort({_id: -1});
  return NextResponse.json({ templates });
};

// export const POST = async (req) => {
//   await connectDb();
//   const session = await auth();

//   if (!session?.user) {
//     return NextResponse.json({ error: "User not login" }, { status: 500 });
//   } else {
//     try {
//       const { title, description, longDescription, theme, category, access, price, platform, feature, image, file } = await req.json(); //express a jemon req.body hoy temon ate just req ar maddhome body  e pass hoy
//       if (category.length < 5 || feature.length < 3) return NextResponse.json({ error: "Error in creating the templates" }, { status: 500 });
//       await Template.create({ title, description, longDescription, theme, category, access, price, platform, feature, image, file, owner: session?.user._id });
//       return NextResponse.json({ message: "Template added successfully" }, { status: 200 });
//     } catch (error) {
//       return NextResponse.json({ error: "Error in creating the template" }, { status: 500 });
//     }
//   }
// };
