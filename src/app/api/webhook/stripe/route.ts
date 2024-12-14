"use server";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: unknown) {
    console.log(error);
    return new Response("webhook error");
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const customerId = subscription.customer as string;
    noStore();
    const user = await prisma.user.findUnique({
      where: {
        stringCustomerId: customerId,
      },
    });

    if (!user) throw new Error("User not found...");

    noStore();
    const userSub = await prisma.subscription.findUnique({
      where: {
        userId: user.id as string,
      },
    });
    if (!userSub) {
      await prisma.subscription.create({
        data: {
          stripeSubscriptionId: subscription.id,
          userId: user.id as string,
          currentPeriodStart: subscription.current_period_start,
          currentPeriodEnd: subscription.current_period_end,
          status: subscription.status,
          planId: subscription.items.data[0].plan.id,
          interval: String(subscription.items.data[0].plan.interval),
        },
      });
    }
  }
  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const user = await prisma.user.findUnique({
      where: {
        stringCustomerId: subscription.customer as string,
      },
    });

    if (!user) throw new Error("user not found");

    const userSub = await prisma.subscription.findUnique({
      where: {
        userId: user.id as string,
      },
    });

    if (userSub) {
      await prisma.subscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          planId: subscription.items.data[0].price.id,
          currentPeriodStart: subscription.current_period_start,
          currentPeriodEnd: subscription.current_period_end,
          status: subscription.status,
        },
      });
    }
  }

  return new Response(null, { status: 200 });
}
