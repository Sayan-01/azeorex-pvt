"use server";
import { db } from "@/lib/db";
import { stripe } from "@/utils/stripe";
import { redirect } from "next/navigation";
import { title } from "process";

const buyProduct = async (fromdata: FormData) => {
  const id = (await fromdata.get("id")) as string;
  if (!id) {
    throw new Error("Product ID is required");
  }

  const data = await db.template.findUnique({ where: { id }, select: { title: true, description: true, access: true, price: true, image: true } });
  if (!data) {
    throw new Error("Product not found");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(data?.price ? data?.price * 100 : 0),
          product_data: {
            name: data?.title,
            description: data?.description,
            images: data?.image,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_URL as string}/payment/success`,
    cancel_url: `${process.env.NEXT_URL as string}/payment/cancel`,
  });
  return redirect(session.url || "");
};

export default buyProduct;
