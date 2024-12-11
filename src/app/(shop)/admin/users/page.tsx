// https://tailwindcomponents.com/component/hoverable-table
import { AlterRole } from '@/actions/user/alterRole';
import { GetPaginatedUsers } from '@/actions/user/getPaginatedUser';
import { Title } from '@/components';
import { revalidatePath } from 'next/cache';

import { redirect } from 'next/navigation';
import { Table } from './ui/table';

export default async function UsersPage() {
    const { Users, ok } = await GetPaginatedUsers();
    if (!ok || !Users) {
        redirect('/auth/login');
    }

    return (
        <>
            <Title title="Todas las ordenes" />

            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>

                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #ID
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Nombre completo
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Email
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Rol
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Users.map((o) =>


                            <Table user={o} />
                        )
                        }

                    </tbody>
                </table>
            </div >
        </>
    );
}