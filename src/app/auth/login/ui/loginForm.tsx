"use client";
import { authenticate } from '@/actions/auth/login';
import Link from 'next/link'
import { useFormState } from 'react-dom';
// import { useFormState } from 'react-dom';


export const LoginForm = () => {
    const [state, dispatch] = useFormState(authenticate, undefined)
    // console.log(state)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(Object.fromEntries(formData)); // Verifica los datos
        dispatch(formData);
    };



    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name='email'
            />



            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name='password'
            />


            <button
                type='submit'
                className="btn-primary">
                Ingresar
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}
