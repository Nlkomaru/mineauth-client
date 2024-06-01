import './globals.css'
import {Inter} from 'next/font/google'
import {SessionProvider} from "next-auth/react";
import Navbar from "@/components/Navbar";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <SessionProvider>

            {children}
        </SessionProvider>
        </body>
        </html>
    )
}