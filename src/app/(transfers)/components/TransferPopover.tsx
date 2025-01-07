'use client';
import React, { useContext } from 'react';
import DialogModal from '@/components/Dialog';
import { AlertContext } from '@/context/Alerts/AlertContext';
import { TransferContext } from '@/context/Transfers/TransferContext';
import TransferForm from './TransferForm';
import TransferDelete from './TransferDelete';

interface Props {}

const TransferPopover: React.FC<Props> = ({}) => {
    const { title, height, formType } = useContext(TransferContext);
    const { openModal, setOpenModal } = useContext(AlertContext);

    return (
        <DialogModal isOpen={openModal} handleClose={() => setOpenModal(false)} title={title} height={height}>
            {formType === 'delete' ? <TransferDelete /> : <TransferForm />}
        </DialogModal>
    );
};

export default TransferPopover;
