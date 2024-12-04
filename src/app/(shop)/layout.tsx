import { Sidebar, TopMenu } from '@/components';
import { Footer } from '@/components/ui/Footer/Footer';
import type { Metadata } from 'next'



export default async function ShopLayout({ children }: {
    children: React.ReactNode
}) {



    return (
        <main className=' min-h-screen'>
            <TopMenu />


            <Sidebar />

            <div className="px-0 sm:px-5">

                {children}
            </div>

            <Footer />
        </main>
    );
};