"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Buttoner } from "./Button";
import { updateUser } from "@/lib/action";
import toast from "react-hot-toast";

//colors array
export const colors = [
  { key: "theme-green", label: "Green" },
  { key: "theme-blue", label: "Blue" },
  { key: "theme-violet", label: "Violet" },
  { key: "theme-yellow", label: "Yellow" },
  { key: "theme-orange", label: "Orange" },
  { key: "theme-red", label: "Red" },
  { key: "theme-rose", label: "Rose" },
];

//userdetails type

type userDetails = {
  name: string;
  email: string;
  colorScheme: string;
  userId: string;
};

//formschema
const formschema = z.object({
  name: z.string(),
  color: z.string(),
});

//form schema type
type fromSchemaType = z.infer<typeof formschema>;

const SettingsForm = ({ name, email, colorScheme, userId }: userDetails) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<fromSchemaType>({
    resolver: zodResolver(formschema),
  });

  // handle submit
  const submit = async (data: fromSchemaType) => {
    const { color, name } = data;

    try {
      await updateUser({ color, email, name, userId });
      toast.success("user updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="font-semibold text-3xl">Settings</h1>
        <h1 className="font-medium text-muted-foreground">
          Your Profile Settings
        </h1>
      </div>
      <div className="mt-7 mx-3 rounded-md border-gray-200 border-2 p-6">
        <h1 className="font-semibold text-xl">General Data</h1>
        <h4 className="font-medium text-muted-foreground text-sm">
          Please provide general information about yourself and please do not
          forget to save
        </h4>

        <div className="mt-5">
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col gap-3 items-center"
          >
            <Input
              label="Name"
              type="text"
              className="text-primary bg-accent-foreground rounded-2xl"
              {...register("name")}
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
              defaultValue={name ?? undefined}
            />
            <Input
              label="Email"
              type="email"
              className="text-primary bg-accent-foreground rounded-2xl"
              disabled
              defaultValue={email ?? undefined}
            />
            <Select
              className="font-semibold"
              items={colors}
              label="Color Scheme"
              placeholder="Select a color scheme"
              defaultSelectedKeys={[colorScheme]}
              errorMessage={errors.color?.message}
              isInvalid={!!errors.color}
              {...register("color")}
            >
              {(color) => (
                <SelectItem key={color.key}>{color.label}</SelectItem>
              )}
            </Select>
            <div className="flex items-center justify-start w-full">
              <Buttoner />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
