import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './Providers';
import { auth } from 'auth';
import NavBar from '@/components/NavBar';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <html lang='en'>
            <title>Moraleda Gestión</title>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <SessionProvider session={session}>
                    <Providers>
                        {session?.user.id && <NavBar user={session.user} />}
                        {children}
                    </Providers>
                </SessionProvider>
            </body>
        </html>
    );
}
