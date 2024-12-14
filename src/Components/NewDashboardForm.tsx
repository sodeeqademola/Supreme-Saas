"use client";

import React from "react";
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Textarea } from "@nextui-org/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { submitEditNote } from "@/lib/action";
import toast from "react-hot-toast";

type dataProps = {
  id: string;
  title: string;
  description: string;
};

const NewDashboardForm = ({ id, title, description }: dataProps) => {
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
      await submitEditNote({ title, description, id });
      toast.success("Edited successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Note</CardTitle>
            <CardDescription>
              Right here you can now edit your notes
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-5">
            <div className="gap-y-2 flex flex-col">
              <Input
                required
                type="text"
                {...register("title")}
                errorMessage={errors.title?.message}
                isInvalid={!!errors.title}
                defaultValue={title}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Textarea
                {...register("description")}
                type="text"
                required
                errorMessage={errors.description?.message}
                isInvalid={!!errors.description}
                defaultValue={description}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="destructive">
              <Link href={"/dashboard"}>Cancel</Link>
            </Button>
            <Button type="submit" variant="default">
              Save Now
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default NewDashboardForm;
