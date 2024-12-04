
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function AddresLayout({ children }: {
    children: React.ReactNode
}) {
    const session = await auth();
    if (!session?.user) {
        redirect('/auth/login?redirectTO=/checkout/address')
    }
    return (
        <>{children}</>
    );
};