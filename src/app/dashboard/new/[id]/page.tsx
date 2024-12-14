import NewDashboardForm from "@/Components/NewDashboardForm";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import React from "react";
import { unstable_noStore as noStore } from "next/cache";

type paramsProps = {
  params: {
    id: string;
  };
};
const page = async ({ params }: paramsProps) => {
  const id = params.id;
  const { userId } = await auth();

  noStore();
  const data = await prisma.note.findUnique({
    where: {
      id: id,
      userId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });

  return (
    <div>
      <NewDashboardForm
        id={data?.id as string}
        title={data?.title as string}
        description={data?.description as string}
      />
    </div>
  );
};

export default page;
