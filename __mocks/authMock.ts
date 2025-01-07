import { AuthMock, TypeRole } from '@/lib/interfaces/auth';

export const authMocks: AuthMock[] = [
    { id: '1', name: 'Juan David', email: 'juan@gmail.com', password: 'Juan123@', role: TypeRole.ADMIN },
    { id: '2', name: 'Pablo Alberto', email: 'pablo@gmail.com', password: 'Pablo123@', role: TypeRole.VIEWER }
];
