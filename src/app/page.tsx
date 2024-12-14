import { Button } from "@/Components/ui/button";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();
  return (
    <div className="flex flex-col/ justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center space-y-4">
        <h1 className="tracking-tight leading-3 py-2 px-3 rounded-full bg-secondary text-center w-fit text-primary font-medium">
          Sort your notes easily
        </h1>
        <h1 className="font-bold text-3xl">Create Notes with ease</h1>
        <p className="text-center max-w-xl mx-auto text-base lg:text-xl text-secondary-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
          eligendi repudiandae, provident dicta quia sed. Repudiandae dicta vel
        </p>
        <div>
          {userId && (
            <Button size={"lg"}>
              <Link href={"/dashboard"}>welcome {user?.firstName} </Link>
            </Button>
          )}
          {!userId && (
            <Button size={"lg"}>
              {" "}
              <Link href={"/sign-up"}>Sign Up For Free</Link>{" "}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
