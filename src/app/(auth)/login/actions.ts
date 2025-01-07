'use server';
import { FormDataLogin } from '@/lib/interfaces/users';
import { signIn, signOut } from 'auth';

export const logginWithCredentials = async (data: FormDataLogin) => {
    try {
        await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        });
    } catch (error) {
        return {
            error: true,
            message: 'Email o contraseña incorrectos.'
        };
    }
};

export const logout = async () => {
    await signOut();
};
