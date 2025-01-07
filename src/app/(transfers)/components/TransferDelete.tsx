import React, { useContext } from 'react';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@/components/Loading';
import { useTransferForm } from '@/hooks/transfers/useTransferForm';
import { AlertContext } from '@/context/Alerts/AlertContext';

interface Props {}

const TransferDelete: React.FC<Props> = ({}) => {
    const { submitting, submitFormDelete } = useTransferForm();
    const { setOpenModal } = useContext(AlertContext);
    return (
        <Grid2 container>
            <Grid2 size={12} m={1} mb={3}>
                <Typography>Desea eliminar la transferencia?</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }} display={'flex'} justifyContent={'center'} p={2}>
                <Button variant='contained' color='error' onClick={submitFormDelete} fullWidth>
                    {submitting ? <Loading /> : 'Eliminar'}
                </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }} display={'flex'} justifyContent={'center'} p={2}>
                <Button variant='contained' color='primary' onClick={() => setOpenModal(false)} fullWidth>
                    Cancelar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default TransferDelete;
