import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Modals } from "@/components/modals";
import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "@/providers/convex-client-provider";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.className}>
            <body>
                <ConvexClientProvider>
                    {children}
                    <Toaster theme="light" richColors />
                    <Modals />
                </ConvexClientProvider>
            </body>
        </html>
    );
}
