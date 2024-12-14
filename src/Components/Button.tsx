"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2, Trash } from "lucide-react";
import { deleteAction } from "@/lib/action";
import toast from "react-hot-toast";

export const Buttoner = () => {
  const { pending } = useFormStatus();
  return (
    <div>
      {" "}
      {pending ? (
        <Button disabled className="w-fit">
          Please wait <Loader2 className="animate-spins size-3 mx-2" />
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          Save now
        </Button>
      )}
    </div>
  );
};

export const DeletButton = async ({ id }: { id: string }) => {
  const deleteNote = async () => {
    try {
      await deleteAction(id);
      toast.success("Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form>
      <Button
        variant={"destructive"}
        size={"icon"}
        type="button"
        onClick={() => deleteNote()}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </form>
  );
};
