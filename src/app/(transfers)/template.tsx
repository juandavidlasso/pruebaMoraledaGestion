'use client';
import React, { useContext } from 'react';
import { Grid2, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { TransferContext } from '@/context/Transfers/TransferContext';
import { useTransfer } from '@/hooks/transfers/useTransfer';

interface Props {}

const Transfers: React.FC<Props> = ({}) => {
    const { filteredData } = useContext(TransferContext);
    const { getColumns, handleSelectionChange } = useTransfer();

    return (
        <Grid2 size={12} mt={2}>
            <Paper sx={{ width: '100%' }}>
                <DataGrid
                    rows={filteredData}
                    columns={getColumns()}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 }
                        }
                    }}
                    onRowSelectionModelChange={handleSelectionChange}
                    pageSizeOptions={[5, 10]}
                    localeText={{
                        MuiTablePagination: {
                            labelRowsPerPage: 'Filas por página'
                        }
                    }}
                />
            </Paper>
        </Grid2>
    );
};

export default Transfers;
