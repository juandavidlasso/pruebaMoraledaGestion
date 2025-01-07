'use client';
import React, { useContext } from 'react';
import { Button, Grid2, MenuItem, TextField } from '@mui/material';
import Loading from '@/components/Loading';
import { typeTransfersMock } from '@mocks/transfersMock';
import { clientsMock, transmitentsMock } from '@mocks/usersMock';
import { handleKeyDownLetterAndNumber, handleKeyDownNumber } from '@/lib/utils/validations';
import { useTransferForm } from '@/hooks/transfers/useTransferForm';
import { AlertContext } from '@/context/Alerts/AlertContext';

interface Props {}

const TransferForm: React.FC<Props> = ({}) => {
    const { formType, submitting, errors, submitForm, handleSubmit, register, getValues } = useTransferForm();
    const { setOpenModal } = useContext(AlertContext);

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <Grid2 container spacing={2} className='!w-full !flex !justify-center'>
                <Grid2 size={12}>
                    <TextField
                        size='small'
                        fullWidth
                        label='Matrícula'
                        variant='outlined'
                        {...register('plate')}
                        error={!!errors.plate}
                        helperText={errors.plate?.message}
                        onKeyDown={handleKeyDownLetterAndNumber}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        select
                        label='Tipo de transferencia'
                        {...register('type')}
                        defaultValue={formType === 'update' ? getValues().type : ''}
                        error={!!errors.type}
                        helperText={errors.type?.message}
                    >
                        {typeTransfersMock.map((type) => (
                            <MenuItem key={type.id} value={type.value}>
                                {type.value}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        select
                        label='Cliente'
                        {...register('clientName')}
                        defaultValue={formType === 'update' ? getValues().clientName : ''}
                        error={!!errors.clientName}
                        helperText={errors.clientName?.message}
                    >
                        {clientsMock.map((client) => (
                            <MenuItem key={client.id} value={client.name}>
                                {client.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        select
                        label='Transmitente'
                        {...register('transmitterName')}
                        defaultValue={formType === 'update' ? getValues().transmitterName : ''}
                        error={!!errors.transmitterName}
                        helperText={errors.transmitterName?.message}
                    >
                        {transmitentsMock.map((transmitent) => (
                            <MenuItem key={transmitent.id} value={transmitent.name}>
                                {transmitent.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        size='small'
                        fullWidth
                        type='text'
                        label='Servicio'
                        {...register('service')}
                        error={!!errors.service}
                        helperText={errors.service?.message}
                        onKeyDown={handleKeyDownNumber}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        fullWidth
                        disabled={submitting}
                        sx={{ minHeight: '-webkit-fill-available' }}
                    >
                        {submitting ? <Loading /> : formType === 'create' ? 'Registrar' : 'Actualizar'}
                    </Button>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Button color='primary' variant='contained' fullWidth onClick={() => setOpenModal(false)}>
                        Cancelar
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
};

export default TransferForm;
