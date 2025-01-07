'use client';
import React, { useContext } from 'react';
import { Button, Grid2, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TransferContext } from '@/context/Transfers/TransferContext';
import { AlertContext } from '@/context/Alerts/AlertContext';

interface Props {}

const InputFilters: React.FC<Props> = ({}) => {
    const { searchTerm, handleSearchChange, setTitle, setHeight } = useContext(TransferContext);
    const { setOpenModal } = useContext(AlertContext);
    return (
        <Grid2
            size={12}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' }
            }}
        >
            <Paper
                component='form'
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: { xs: '100%', sm: '35%' },
                    order: { xs: 1, sm: 0 }
                }}
            >
                <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='Ingrese la placa o el tipo de transferencia'
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </Paper>

            <Button
                variant='contained'
                sx={{ order: { xs: 0, sm: 1 }, width: { xs: '100%', sm: '35%' }, mb: { xs: 2, sm: 0 } }}
                onClick={() => {
                    setTitle('Ingresa los datos');
                    setHeight(90);
                    setOpenModal(true);
                }}
            >
                Crear transferencia
            </Button>
        </Grid2>
    );
};

export default InputFilters;
