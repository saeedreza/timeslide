import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'NYTikTok',
    description: 'Created by Saeedreza',
    icons: {
        icon: '/images/NewYorkTimes-Logo-Icon.svg',
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="wfw22dq">
            <body className={inter.className} data-oid="4ug9bit">
                {children}
            </body>
        </html>
    );
}
