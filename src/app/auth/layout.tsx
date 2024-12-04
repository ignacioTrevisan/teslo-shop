import { auth } from '@/auth.config';
import type { Metadata } from 'next'
import { redirect } from 'next/navigation';


export const metadata: Metadata = {
    title: 'ShopLayout Title',
    description: 'ShopLayout Description'
};

export default async function ShopLayout({ children }: {
    children: React.ReactNode
}) {

    const session = await auth();
    if (session?.user) {
        redirect('/')
    }

    return (
        <main className='flex justify-center'>
            <div className='w-full sm:w-[350px] px-10 '>
                {children}
            </div>
        </main>
    );
};