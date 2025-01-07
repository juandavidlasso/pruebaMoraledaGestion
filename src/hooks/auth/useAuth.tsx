import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AlertContext } from '@/context/Alerts/AlertContext';
import { FormDataLogin } from '@/lib/interfaces/users';
import { logginWithCredentials } from '@/app/(auth)/login/actions';

const schema = yup.object({
    email: yup.string().required('El email es requerido').email('El email no tiene el formato correcto'),
    password: yup.string().required('La contraseña es requerida').min(5, 'Password mut be')
});

export const useAuth = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const { setInfoMessage, setShowMessage, setMessageType } = useContext(AlertContext);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataLogin>({
        resolver: yupResolver(schema)
    });

    const submitForm = async (data: FormDataLogin) => {
        setSubmitting(true);
        try {
            const response = await logginWithCredentials(data);
            if (response?.error) {
                setMessageType('error');
                setInfoMessage(response.message);
                setShowMessage(true);
                setSubmitting(false);
            } else {
                router.push('/profile');
            }
        } catch (error) {
            setMessageType('error');
            setInfoMessage('Server error');
            setShowMessage(true);
        }
    };

    return {
        submitting,
        errors,
        register,
        handleSubmit,
        submitForm
    };
};
