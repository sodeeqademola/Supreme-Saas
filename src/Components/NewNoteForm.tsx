"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input, Textarea } from "@nextui-org/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { submitNote } from "@/lib/action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const NewNoteForm = () => {
  const formShema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  });

  type formSchemaType = z.infer<typeof formShema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formShema),
  });

  const submit = async (data: formSchemaType) => {
    const { description, title } = data;

    try {
      await submitNote({ title, description });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Card>
          <CardHeader>
            <CardTitle>New Note</CardTitle>
            <CardDescription>
              Right here you can now create your new notes
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-5">
            <div className="gap-y-2 flex flex-col">
              <Input
                label="Title for your note"
                required
                type="text"
                {...register("title")}
                errorMessage={errors.title?.message}
                isInvalid={!!errors.title}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Textarea
                {...register("description")}
                type="text"
                label="Describe your note as you want"
                required
                errorMessage={errors.description?.message}
                isInvalid={!!errors.description}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild variant={"destructive"}>
              <Link href={"/dashboard"}>Cancel</Link>
            </Button>
            <Button type="submit">Save Now</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default NewNoteForm;
