"use client";
import React from "react";
import { ModeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import { AlignRight, CreditCard, Home, Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { userId } = useAuth();
  const pathName = usePathname();

  return (
    <div className=" flex items-center justify-between p-4 shadow-md mx-auto">
      <div>
        <Link href={"/"}>
          <h1 className=" font-extrabold text-2xl">
            Supreme<span className="text-primary">Saas</span>
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-3">
        <ModeToggle />
        {userId ? (
          <UserButton />
        ) : (
          <>
            {" "}
            <Button>
              <Link href={"/sign-in"}>Sign In </Link>
            </Button>
            <Button variant={"secondary"}>
              <Link href={"/sign-up"}>Sign Up </Link>
            </Button>{" "}
          </>
        )}
        {userId && pathName.includes("/dashboard") && (
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <AlignRight
                    className="text-primary cursor-pointer"
                    size={25}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuCheckboxItem className="cursor-pointer hover:bg-accent flex justify-between items-center">
                  <Link href={"/dashboard"}>Home</Link>
                  <Home className="text-primary" size={20} />
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="cursor-pointer hover:bg-accent flex justify-between items-center">
                  <Link href={"/dashboard/settings"}>Settings</Link>
                  <Settings className="text-primary" size={20} />
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="cursor-pointer hover:bg-accent flex justify-between items-center">
                  <Link href={"/dashboard/billing"}>Billing</Link>
                  <CreditCard className="text-primary" size={20} />
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
