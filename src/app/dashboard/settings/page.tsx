import React from "react";
import SettingsForm from "@/Components/SettingsForm";
import prisma from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const { userId } = await auth();
  const user = await currentUser();
  const userDetails = await prisma.user.findUnique({
    where: {
      id: userId as string,
      email: user?.emailAddresses[0].emailAddress,
    },
    select: {
      id: true,
      email: true,
      colorScheme: true,
      name: true,
    },
  });

  return (
    <div>
      <SettingsForm
        email={userDetails?.email as string}
        name={userDetails?.name as string}
        colorScheme={userDetails?.colorScheme as string}
        userId={userId as string}
      />
    </div>
  );
};

export default page;
