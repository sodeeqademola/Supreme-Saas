import NewNoteForm from "@/Components/NewNoteForm";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

import React from "react";

const page = async () => {
  const { userId } = await auth();

  noStore();
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId as string,
      status: "active",
    },
  });

  if (!data) {
    return redirect("/dashboard/billing");
  }

  return (
    <div>
      <NewNoteForm />
    </div>
  );
};

export default page;
