export interface AuthMock {
    id: string;
    name: string;
    email: string;
    password: string;
    role: TypeRole;
}

export enum TypeRole {
    ADMIN = 'admin',
    VIEWER = 'viewer'
}
