"use client";
import { CreditCard, Home, LucideProps, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type navItem = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export const navItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
];
const DashboardNav = () => {
  const pathName = usePathname();

  return (
    <div>
      {navItems.map((navItem: navItem, i: number) => {
        return (
          <div className="grid items-start gap-2 w-full" key={i}>
            <Link
              href={navItem.href}
              className={
                pathName === navItem.href
                  ? "bg-accent flex justify-start items-center my-1 hover:bg-accent rounded-md p-2 "
                  : "flex justify-start items-center my-1 hover:bg-accent rounded-md p-2 "
              }
            >
              <navItem.icon className="mr-2 h-4 w-4 text-primary" />
              {navItem.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardNav;
