import { Webhooks } from "@polar-sh/nextjs";
import { db } from "@/lib/db";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    try {
      console.log("📩 Polar webhook received");

      const type = payload?.type;
      const subscriptionId = payload?.data?.id; // subscription ID
      // @ts-ignore: Ignore type error for customer
      const customerEmail = payload?.data?.customer?.email;

      if (!customerEmail || !subscriptionId) {
        console.log("Missing email or subscriptionId");
        return;
      }

      if (type === "subscription.created" || type === "subscription.revoked" || type === "subscription.updated") {
        const status = payload?.data?.status;

        if (status !== "active") {
          console.log("Subscription not active yet. Skipping credits.");
          return;
        }
        let credits = 1000;
        if (payload.data.product.name == "Free Plan") credits = 1000;
        if (payload.data.product.name == "Pro Plan") credits = 10000;
        if (payload.data.product.name == "Enterprise Plan") credits = 100000;

        await db.user.update({
          where: { email: customerEmail },
          data: {
            credits: { increment: credits },
          },
        });

        await db.subscription.create({
          data: {
            plan: payload?.data?.product.name,
            price: (payload?.data?.amount / 100).toString(),
            active: true,
            userId: payload?.data?.customer?.id,
            customerId: payload?.data?.customer?.id,
            subscriptionId,
            currentPeriodEndDate: payload?.data?.currentPeriodEnd || new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          },
        });

        console.log(`credits updated to ${customerEmail}`);
      } else {
        console.log(`Event type ${type} ignored`);
      }
    } catch (err) {
      console.error("Error processing Polar webhook:", err);
    }
  },
});
