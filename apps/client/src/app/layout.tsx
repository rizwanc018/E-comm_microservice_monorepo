import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "E-Commerce - Best Fashion",
    description: "E-Commerce is the best place to find the best clothes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <div className="mx-auto p-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
                        <Navbar />
                        {children}
                        <Footer />
                    </div>
                    <ToastContainer position="bottom-right" />
                </body>
            </html>
        </ClerkProvider>
    );
}
