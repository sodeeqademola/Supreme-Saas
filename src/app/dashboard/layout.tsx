import DashboardNav from "@/Components/DashboardNav";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import React, { ReactNode } from "react";

const Dashboardlayout = async ({ children }: { children: ReactNode }) => {
  //get user details
  const { userId } = await auth();

  const userDetails = await currentUser();

  //connection to dBase
  const user = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
    select: {
      stringCustomerId: true,
      email: true,
      id: true,
    },
  });

  if (!user) {
    const name = `${userDetails?.firstName ?? ""} ${
      userDetails?.lastName ?? ""
    } `;
    await prisma.user.create({
      data: {
        id: userId as string,
        email: userDetails?.emailAddresses[0].emailAddress as string,
        name: name,
      },
    });
  }

  if (!user?.stringCustomerId) {
    const data = await stripe.customers.create({
      email: userDetails?.emailAddresses[0].emailAddress as string,
    });
    await prisma.user.update({
      where: {
        id: userId as string,
      },
      data: {
        stringCustomerId: data.id,
      },
    });
  }

  return (
    <div className="flex items-start gap-4 mt-10 w-full">
      <div className="w-[200px] hidden md:block">
        <DashboardNav />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Dashboardlayout;
