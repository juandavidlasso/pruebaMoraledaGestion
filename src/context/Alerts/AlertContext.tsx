import { createContext, useState } from 'react';

interface AlertState {
    showMessage: boolean;
    setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
    infoMessage: string;
    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
    messageType: AlertType;
    setMessageType: React.Dispatch<React.SetStateAction<AlertType>>;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export const AlertContext = createContext<AlertState>({
    showMessage: false,
    setShowMessage: () => false,
    infoMessage: '',
    setInfoMessage: () => '',
    messageType: 'success',
    setMessageType: () => '',
    openModal: false,
    setOpenModal: () => false
});

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [infoMessage, setInfoMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<AlertType>('success');
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <AlertContext.Provider
            value={{
                showMessage,
                infoMessage,
                messageType,
                openModal,
                setShowMessage,
                setInfoMessage,
                setMessageType,
                setOpenModal
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};
