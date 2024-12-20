'use server';
import { signIn } from '@/auth.config';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        // Descomentar si deseas añadir una pausa antes de la autenticación
        // await Sleep(2);
        console.log('estamos acá ya')
        console.log(formData)
        await signIn('credentials', {
            ...Object.fromEntries(formData), // Aquí pasamos los datos del formulario
            redirect: false, // Evitar redirección automática
        });



        return 'authenticated'; // O el estado que desees para indicar éxito

    } catch (error) {
        console.log('Error durante la autenticación:', error);
        return 'authentication error';
    }
}
