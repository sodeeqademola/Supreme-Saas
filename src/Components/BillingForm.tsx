"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { createSubscription } from "@/lib/action";

const BillingForm = () => {
  const { pending } = useFormStatus();

  const submit = async () => {
    try {
      await createSubscription();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          {pending ? (
            <Button disabled className="w-full">
              Please wait <Loader2 className="animate-spins size-3 mx-2" />
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              create Subscription
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BillingForm;
