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

      const user = await db.user.findUnique({
        where: { email: customerEmail },
      });

      if (!user) {
        console.log("User not found for email:", customerEmail);
        return;
      }

      if (type === "subscription.created") {
        const status = payload?.data?.status;

        if (status !== "active") {
          console.log("Subscription not active yet. Skipping credits.");
          return;
        }
        
        const planName = payload?.data?.product?.name?.toLowerCase() || "";

        let credits = 0;
        if (planName.includes("free")) credits = 0;
        else if (planName.includes("pro")) credits = 10000;
        else if (planName.includes("premium")) credits = 100000;

        await db.user.update({
          where: { email: customerEmail },
          data: {
            credits: { increment: credits },
            activePlan: payload?.data?.product.name,
          },
        });

        await db.subscription.create({
          data: {
            plan: payload?.data?.product.name,
            price: (payload?.data?.amount / 100).toString(),
            active: true,
            userId: user?.id,
            customerId: payload?.data?.customer?.id,
            subscriptionId,
            currentPeriodEndDate: payload?.data?.currentPeriodEnd || new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          },
        });

        console.log(`credits updated to ${customerEmail}-${credits}-${planName}`);
      } else {
        console.log(`Event type ${type} ignored`);
      }
    } catch (err) {
      console.error("Error processing Polar webhook:", err);
    }
  },
});
