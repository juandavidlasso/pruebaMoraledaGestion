'use client';
import Alert from '@/components/Alert';
import { AlertProvider } from '@/context/Alerts/AlertContext';
import { TransferProvider } from '@/context/Transfers/TransferContext';
import { UsersProvider } from '@/context/Users/UserContext';
import { ligthTheme } from '@/lib/themes/lightTheme';
import { ThemeProvider } from '@mui/material';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AlertProvider>
            <TransferProvider>
                <ThemeProvider theme={ligthTheme}>
                    <Alert />
                    <UsersProvider>{children}</UsersProvider>
                </ThemeProvider>
            </TransferProvider>
        </AlertProvider>
    );
}
