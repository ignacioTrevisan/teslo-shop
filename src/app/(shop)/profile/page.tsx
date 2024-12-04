import { auth } from '@/auth.config';
import { Title } from '@/components';
import type { Metadata } from 'next'
import { redirect } from 'next/navigation';


export const metadata: Metadata = {
    title: 'template Title',
    description: 'template Description'
};

export default async function ProfilePage() {
    const session = await auth();
    // if (session?.user)redirect('/auth/login?returnTo=/profile')
    if (!session?.user) redirect('/')
    return (
        <>
            <Title title='Sesión de usuario' />
            {JSON.stringify(session?.user, null, 2)}

            <span className='text-3xl'>{session.user.role}</span>
        </>
    );
};