import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AlertContext } from '@/context/Alerts/AlertContext';
import { TransferContext } from '@/context/Transfers/TransferContext';
import { FormDataTransfer } from '@/lib/interfaces/transfers';
import { usersMock } from '@mocks/usersMock';

const schema = yup.object({
    plate: yup.string().required('La matrícula es requerida.'),
    type: yup.string().required('El tipo de transferencia es requerida.'),
    clientName: yup.string().required('El cliente es requerido.'),
    transmitterName: yup.string().required('El transmitente es requerido.'),
    service: yup
        .number()
        .required('El servicio es obligatorio')
        .typeError('EL servicio debe ser numérico.')
        .min(1, 'El servicio debe ser mayor a 0.')
});

export const useTransferForm = () => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const { setOpenModal, setMessageType, setInfoMessage, setShowMessage } = useContext(AlertContext);
    const { transferData, formType, transferEdit, setTransferData } = useContext(TransferContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm<FormDataTransfer>({
        resolver: yupResolver(schema),
        defaultValues: {
            plate: formType === 'create' ? '' : transferEdit!.plate,
            type: formType === 'create' ? '' : transferEdit!.type,
            clientName: formType === 'create' ? '' : transferEdit?.clientName,
            transmitterName: formType === 'create' ? '' : transferEdit?.transmitterName,
            service: formType === 'create' ? undefined : transferEdit?.service
        }
    });
    const submitForm = async (data: FormDataTransfer) => {
        setSubmitting(true);

        setTimeout(() => {
            try {
                const lastTransferId = transferData[transferData.length - 1].id;

                const newTransfer = {
                    id: formType === 'create' ? lastTransferId + 1 : transferEdit!.id,
                    plate: data.plate,
                    type: data.type,
                    client: usersMock.find((user) => user.name === data.clientName)?.document || '',
                    transmitter: usersMock.find((user) => user.name === data.transmitterName)?.document || '',
                    service: data.service,
                    created_at: formType === 'create' ? new Date().toISOString() : transferEdit!.createdAt
                };

                if (formType === 'create') {
                    setTransferData([...transferData, newTransfer]);
                } else {
                    const updatedTransfers = transferData.map((transfer) =>
                        transfer.id === transferEdit?.id
                            ? { ...transfer, ...newTransfer, clientName: data.clientName, transmitterName: data.transmitterName }
                            : transfer
                    );
                    setTransferData(updatedTransfers);
                }

                setMessageType('success');
                setInfoMessage(`La transferencia se ${formType === 'create' ? 'registro' : 'actualizo'} exitosamente.`);
                setShowMessage(true);
                setOpenModal(false);
            } catch (error: any) {
                setMessageType('error');
                setInfoMessage(error.message);
                setShowMessage(true);
                setSubmitting(false);
            }
        }, 3000);
    };

    const submitFormDelete = async () => {
        setSubmitting(true);

        try {
            const updatedTransfers = transferData.filter((transfer) => transfer.id !== transferEdit?.id);
            setTransferData(updatedTransfers);

            setMessageType('success');
            setInfoMessage('La transferencia se eliminó exitosamente.');
            setShowMessage(true);
            setOpenModal(false);
        } catch (error: any) {
            setMessageType('error');
            setInfoMessage(error.message);
            setShowMessage(true);
            setSubmitting(false);
        }
    };

    return {
        formType,
        submitting,
        errors,
        submitForm,
        handleSubmit,
        register,
        getValues,
        submitFormDelete
    };
};
