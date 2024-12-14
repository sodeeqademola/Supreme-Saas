import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import { CheckCircle2 } from "lucide-react";
import BillingForm from "@/Components/BillingForm";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import CardBillingForm from "@/Components/CardBillingForm";

const page = async () => {
  const featureItems = [
    {
      name: "lorem Ipsum is Good",
    },
    {
      name: "lorem Ipsum is Good",
    },
    {
      name: "lorem Ipsum is Good",
    },
    {
      name: "lorem Ipsum is Good",
    },
    {
      name: "lorem Ipsum is Good",
    },
  ];

  //featureItemstype
  type featureItemsProp = {
    name: string;
  };

  // const getData = async () => {
  //   const { userId } = await auth();
  //   const data = await prisma.subscription.findUnique({
  //     where: {
  //       userId: userId as string,
  //     },
  //     select: {
  //       status: true,
  //       user: {
  //         select: {
  //           stringCustomerId: true,
  //         },
  //       },
  //     },
  //   });
  //   return data;
  // };

  // const data = await getData();

  const { userId } = await auth();
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId as string,
    },
  });

  if (data?.status === "active") {
    return (
      <div className="grid items-start gap-8">
        <div className="flex items-center justify-between px-2">
          <div className="grid gap-1">
            <h1 className="text-3xl md:text-4xl">Subscription</h1>
            <h2 className=" text-lg text-muted-foreground">
              Settings regarding your subscription
            </h2>
          </div>
        </div>
        <Card className="w-full lg:w-2/3">
          <CardHeader className="space-y-3">
            <CardTitle>Edit Subscription</CardTitle>
            <CardDescription>
              Click on the button below, this will give you the opportunity to
              change your payment details and view your statement at the same
              time
            </CardDescription>

            <CardBillingForm />
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mb-2">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
              Monthly
            </h3>
          </div>
          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            $30<span className="ml-1 text-2xl text-muted-foreground">/mo</span>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            Write as many notes as you want fpr $30 a month
          </p>
        </CardContent>
        <div className="flex-1 flex flex-col justify-between px-4 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-19 sm:pt-6">
          <ul className="space-y-4">
            {featureItems.map((item: featureItemsProp, index: number) => {
              return (
                <li key={index} className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base">{item.name}</p>
                </li>
              );
            })}
          </ul>
          <BillingForm />
        </div>
      </Card>
    </div>
  );
};

export default page;
