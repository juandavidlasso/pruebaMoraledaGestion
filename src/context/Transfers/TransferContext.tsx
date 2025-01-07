import React, { ChangeEvent, createContext, useState } from 'react';
import { Transfer, TransferData } from '@/lib/interfaces/transfers';
import { transfersMock } from '@mocks/transfersMock';
import { usersMock } from '@mocks/usersMock';

interface TransferState {
    searchTerm: string;
    filteredData: TransferData[];
    handleSearchChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    formType: DataType;
    setFormType: React.Dispatch<React.SetStateAction<DataType>>;
    transferData: Transfer[];
    setTransferData: React.Dispatch<React.SetStateAction<Transfer[]>>;
    transferEdit: TransferData | undefined;
    setTransferEdit: React.Dispatch<React.SetStateAction<TransferData | undefined>>;
}

export const TransferContext = createContext<TransferState>({
    searchTerm: '',
    filteredData: [],
    handleSearchChange: () => undefined,
    title: '',
    setTitle: () => '',
    height: 0,
    setHeight: () => 0,
    formType: 'create',
    setFormType: () => '',
    transferData: [],
    setTransferData: () => [],
    transferEdit: undefined,
    setTransferEdit: () => undefined
});

export type DataType = 'create' | 'update' | 'delete';

export const TransferProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [title, setTitle] = useState<string>('');
    const [height, setHeight] = useState<number>(0);
    const [formType, setFormType] = useState<DataType>('create');
    const [transferData, setTransferData] = useState<Transfer[]>(transfersMock);
    const [transferEdit, setTransferEdit] = useState<TransferData>();

    const mergedData: TransferData[] = transferData.map((service) => {
        const client = usersMock.find((c) => c.document === service.client);
        const transmitter = usersMock.find((c) => c.document === service.transmitter);

        return {
            id: service.id,
            plate: service?.plate ?? '',
            type: service.type,
            clientName: client?.name ?? '',
            clientDocument: client?.document ?? '',
            transmitterName: transmitter?.name ?? '',
            transmitterDocument: transmitter?.document ?? '',
            service: service?.service ?? 0,
            createdAt: service.created_at
        };
    });
    const filteredData = mergedData.filter((data) => {
        return (
            data.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(event?.target.value);
    };

    return (
        <TransferContext.Provider
            value={{
                searchTerm,
                filteredData,
                title,
                height,
                formType,
                transferData,
                transferEdit,
                handleSearchChange,
                setTitle,
                setHeight,
                setFormType,
                setTransferData,
                setTransferEdit
            }}
        >
            {children}
        </TransferContext.Provider>
    );
};
