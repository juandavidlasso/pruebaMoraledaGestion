'use client';
import Alert from '@/components/Alert';
import { AlertProvider } from '@/context/Alerts/AlertContext';
import { AuthProvider } from '@/context/Auth/AuthContext';
import { TransferProvider } from '@/context/Transfers/TransferContext';
import { ligthTheme } from '@/lib/themes/lightTheme';
import { ThemeProvider } from '@mui/material';
import { Session } from 'next-auth';
import { SessionProvider } from './SessionProvider';

export function Providers({ children, session }: { children: React.ReactNode; session: Session | null }) {
    return (
        <AuthProvider>
            <AlertProvider>
                <TransferProvider>
                    <ThemeProvider theme={ligthTheme}>
                        <SessionProvider session={session}>
                            <Alert />
                            {children}
                        </SessionProvider>
                    </ThemeProvider>
                </TransferProvider>
            </AlertProvider>
        </AuthProvider>
    );
}
