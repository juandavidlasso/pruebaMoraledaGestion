import { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { GridCallbackDetails, GridColDef, GridRenderCellParams, GridRowSelectionModel } from '@mui/x-data-grid';
import { Box, Button, useMediaQuery } from '@mui/material';
import { TransferData } from '@/lib/interfaces/transfers';
import { TransferContext } from '@/context/Transfers/TransferContext';
import { AlertContext } from '@/context/Alerts/AlertContext';
import { usersMock } from '@mocks/usersMock';
import { TypeRole } from '@/lib/interfaces/auth';
import { AuthContext } from '@/context/Auth/AuthContext';

export const useTransfer = () => {
    const { user } = useContext(AuthContext);
    const isMobile = useMediaQuery('(max-width:1024px)');
    const { transferData, setTransferEdit, setTitle, setHeight, setFormType } = useContext(TransferContext);
    const { setOpenModal } = useContext(AlertContext);

    const getColumns = () => {
        const columns: GridColDef<TransferData>[] = [
            {
                field: 'clientName',
                headerName: 'Nombre cliente',
                flex: isMobile ? 0 : 1,
                width: isMobile ? 170 : 0
            },
            {
                field: 'clientDocument',
                headerName: 'Documento',
                flex: isMobile ? 0 : 1,
                width: isMobile ? 150 : 0
            },
            {
                field: 'plate',
                headerName: 'Placa vehiculo',
                flex: isMobile ? 0 : 1,
                width: isMobile ? 170 : 0
            },
            {
                field: 'transmitterName',
                headerName: 'Nombre transmitente',
                flex: isMobile ? 0 : 1,
                width: isMobile ? 220 : 0
            },
            {
                field: 'transmitterDocument',
                headerName: 'Documento transmitente',
                flex: isMobile ? 0 : 1,
                width: isMobile ? 240 : 0
            },
            {
                field: 'service',
                headerName: 'Servicio',
                flex: isMobile ? 0 : 1,
                width: isMobile ? 170 : 0
            },
            {
                field: 'type',
                headerName: 'Tipo servicio',
                flex: isMobile ? 0 : 1,
                width: isMobile ? 170 : 0
            },
            {
                field: 'createdAt',
                headerName: 'Fecha',
                flex: isMobile ? 0 : 1,
                width: isMobile ? 170 : 0
            },
            {
                field: '',
                headerName: 'Acciones',
                flex: isMobile ? 0 : 1,
                width: isMobile ? 150 : 0,
                renderCell: (param: GridRenderCellParams) => (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                setTransferEdit(param.row);
                                setHeight(isMobile ? 60 : 45);
                                setTitle('Eliminar transferencia');
                                setFormType('delete');
                                setOpenModal(true);
                            }}
                            variant='outlined'
                            color='error'
                            sx={{
                                fontSize: 8,
                                minWidth: 70,
                                maxWidth: 80,
                                border: '1px solid #922B21 !important',
                                ':hover': {
                                    background: '#922B21 !important',
                                    border: '1px solid #922B21 !important',
                                    color: '#FFFFFF !important'
                                }
                            }}
                        >
                            Eliminar
                        </Button>
                    </Box>
                )
            }
        ];
        if (user?.role === TypeRole.VIEWER) {
            columns.pop();
        }
        return columns;
    };

    const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails) => {
        if (user?.role === TypeRole.VIEWER) return null;
        const selectedRowId = rowSelectionModel[0];
        const selectedData = transferData.find((row) => row.id === selectedRowId);
        if (selectedData) {
            const client = usersMock.find((c) => c.document === selectedData!.client);
            const transmitter = usersMock.find((c) => c.document === selectedData!.transmitter);

            const transferEdit: TransferData = {
                id: selectedData!.id,
                plate: selectedData!.plate,
                type: selectedData!.type,
                clientName: client?.name ?? '',
                clientDocument: selectedData!.client,
                transmitterName: transmitter?.name ?? '',
                transmitterDocument: selectedData!.transmitter,
                service: selectedData!.service,
                createdAt: selectedData!.created_at
            };

            setTransferEdit(transferEdit);
            setHeight(90);
            setTitle('Actualizar datos');
            setFormType('update');
            setOpenModal(true);
        }
    };

    return {
        getColumns,
        handleSelectionChange
    };
};
