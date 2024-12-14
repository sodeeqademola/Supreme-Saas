import { DeletButton } from "@/Components/Button";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { getNotes } from "@/lib/action";
import { Edit, File } from "lucide-react";
import Link from "next/link";

import React from "react";

const page = async () => {
  const note = await getNotes();

  type NoteProps = {
    title: string;
    id: string;
    description: string;
    createdAt: Date;
  };

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1 mr-auto">
          <h1 className="text-3xl md:text-4xl ">Your Notes</h1>
          <p className="tex-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
        </div>

        {note?.Subscription?.status === "active" ? (
          <Button asChild>
            <Link href={"/dashboard/new"}>Create a new Note</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href={"/dashboard/billing"}>Create a new Note</Link>
          </Button>
        )}
      </div>
      {note?.note.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>
          <h1 className="mt-6 text-xl font-semibold">
            You do not have any note created
          </h1>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently do not have any note, please create some so that you
            can see them right here.
          </p>
          {note.Subscription?.status === "active" ? (
            <Button asChild>
              <Link href={"/dashboard/new"}>Create a new Note</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={"/dashboard/billing"}>Create a new Note</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {note?.note.map((item: NoteProps, i: number) => {
            return (
              <Card key={i} className="flex items-center justify-between p-4">
                <div>
                  <h2 className="font-semibold text-xl text-primary">
                    {item.title}
                  </h2>
                  <p>
                    {new Intl.DateTimeFormat("en-us", {
                      dateStyle: "full",
                    }).format(new Date(item.createdAt))}
                  </p>
                </div>
                <div className="flex gap-x-4">
                  <Link href={`/dashboard/new/${item.id}`}>
                    <Button variant={"outline"} size={"icon"}>
                      {" "}
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DeletButton id={item.id} />
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default page;
