export interface Transfer {
    id: number;
    plate: string;
    type: string;
    client: string;
    transmitter: string;
    service: number;
    created_at: string;
}

export interface TransferData {
    id: number;
    plate: string;
    type: string;
    clientName: string;
    clientDocument: string;
    transmitterName: string;
    transmitterDocument: string;
    service: number;
    createdAt: string;
}

export interface FormDataTransfer {
    plate: string;
    type: string;
    clientName: string;
    transmitterName: string;
    service: number;
}
