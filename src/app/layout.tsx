import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/Components/Provider";
import Navbar from "@/Components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Supreme Saas",
  description: "A saas website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const getColor = async () => {
    const { userId } = await auth();
    if (userId) {
      noStore();
      const colorTheme = await prisma.user.findUnique({
        where: {
          id: userId as string,
        },
        select: {
          colorScheme: true,
        },
      });
      return colorTheme;
    }
  };
  const colorTheme = await getColor();

  return (
    <ClerkProvider afterSignOutUrl={"/sign-in"}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased ${
            colorTheme?.colorScheme ?? "theme-orange"
          }`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="bottom-right" /> <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
