/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useContext, useEffect } from 'react';
import { Session } from 'next-auth';
import { AuthContext } from '@/context/Auth/AuthContext';

export function SessionProvider({ children, session }: { children: React.ReactNode; session: Session | null }) {
    const { setUser } = useContext(AuthContext);
    useEffect(() => {
        setUser(session?.user ?? null);
    }, [session]);

    return <>{children}</>;
}
