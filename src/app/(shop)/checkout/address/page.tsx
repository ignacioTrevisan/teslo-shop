import { Title } from '@/components';
import Link from 'next/link';
import { AddresForm } from './ui/AddresForm';
import { GetCountries } from '@/actions/countre/getCountries';
import { GetUserAddress } from '@/actions/address/get-user-address';
import { auth } from '@/auth.config';

export default async function AddressPage() {
    const countries = await GetCountries();
    const session = await auth();
    if (!session?.user) return;
    const userAddress = await GetUserAddress(session.user.id) ?? undefined;
    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">



            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

                <Title title="Dirección" subtitle="Dirección de entrega" />

                <AddresForm countries={countries} userStoreAddress={userAddress} />

            </div>




        </div>
    );
}