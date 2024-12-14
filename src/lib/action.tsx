"use server";

import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import prisma from "./db";
import { getStripeSession, stripe } from "./stripe";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

type userDetailProps = {
  userId: string;
  email: string;
  color: string;
  name: string;
};

export const updateUser = async ({
  userId,
  email,
  color,
  name,
}: userDetailProps) => {
  await prisma.user.update({
    where: {
      id: userId,
      email: email,
    },
    data: {
      colorScheme: color,
      name: name,
    },
  });
  revalidatePath("/", "layout");
};

export const createSubscription = async () => {
  const { userId } = await auth();
  noStore();
  const dbUser = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
    select: {
      stringCustomerId: true,
    },
  });
  if (!dbUser?.stringCustomerId) {
    throw new Error("Unable to get customer id");
  }
  const subscriptionUrl = await getStripeSession({
    customerId: dbUser.stringCustomerId,
    domainUrl: "http://localhost:3000",
    priceId: process.env.STRIPE_PRICE_ID as string,
  });
  // toast.success("subscription succcesful");
  return redirect(subscriptionUrl);
};

export const createCustomerPortal = async () => {
  const { userId } = await auth();
  noStore();
  const user = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
  });

  const stringCustomerId = user?.stringCustomerId as string;
  const session = await stripe.billingPortal.sessions.create({
    customer: stringCustomerId,
    return_url: "http://localhost:3000/dashboard",
  });
  return redirect(session.url);
};

export const getNotes = async () => {
  const { userId } = await auth();
  noStore();

  const data = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
    select: {
      note: true,
      Subscription: {
        select: {
          status: true,
        },
      },
    },
  });

  return data;
};

export const submitNote = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { userId } = await auth();
  await prisma.note.create({
    data: {
      description: description as string,
      title: title as string,
      userId: userId as string,
    },
  });
  return redirect("/dashboard");
};

export const submitEditNote = async ({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: string;
}) => {
  const { userId } = await auth();
  await prisma.note.update({
    where: {
      id,
      userId,
    },
    data: {
      title,
      description,
    },
  });
  revalidatePath("/dashboard");
  redirect("/dashboard");
};

export const deleteAction = async (id: string) => {
  const { userId } = await auth();
  try {
    await prisma.note.delete({
      where: {
        id,
        userId,
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
