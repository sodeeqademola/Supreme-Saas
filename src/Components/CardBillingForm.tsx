"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { createCustomerPortal } from "@/lib/action";

const CardBillingForm = () => {
  const { pending } = useFormStatus();
  const handleSubmit = async () => {
    await createCustomerPortal();
  };
  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit}>
        {pending ? (
          <Button disabled className="w-fit">
            <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button className="w-fit" type="submit">
            View payment details
          </Button>
        )}
      </form>
    </div>
  );
};

export default CardBillingForm;
