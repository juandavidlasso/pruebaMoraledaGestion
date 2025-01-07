'use client';
import React, { useEffect, useState } from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import InputFilters from '@/app/(transfers)/components/InputFilters';
import Transfers from '@/app/(transfers)/template';
import TransferPopover from '@/app/(transfers)/components/TransferPopover';
import { useSession } from 'next-auth/react';
import { TypeRole } from '@/lib/interfaces/auth';
import ModalLoading from '@/components/Modal';

interface Props {}

const Profile: React.FC<Props> = ({}) => {
    const session = useSession();
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setFetching(false);
        }, 3000);
    }, []);
    return (
        <>
            <TransferPopover />
            <ModalLoading isOpen={fetching} />
            <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <Typography sx={{ textAlign: 'center', fontSize: 20, fontWeight: 600, mb: 2, mt: 2 }}>
                            Listado de transferencias disponibles
                        </Typography>
                    </Grid2>
                    {session.data?.user.role === TypeRole.ADMIN && <InputFilters />}
                    <Transfers />
                </Grid2>
            </Box>
        </>
    );
};

export default Profile;
