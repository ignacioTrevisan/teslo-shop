"use client"

import { AlterRole } from "@/actions/user/alterRole";
import { User } from "@prisma/client";

import { revalidatePath } from "next/cache";
import { useState } from "react";

interface Props {
    user: User;
}
export const Table = ({ user }: Props) => {
    const [role, setRole] = useState(user.role)
    const onToogleRole = async (id: string, newRole: 'admin' | 'user') => {


        const resp = await AlterRole(id, newRole)
        if (resp.ok) {
            setRole(newRole)
        }
    }
    if (!user) { return; }
    return (
        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
            </td>
            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                {user.email}

            </td>
            <td className="text-sm text-gray-900 font-light px-6  p-2">
                <select
                    value={role}
                    onChange={e => onToogleRole(user.id, e.target.value as 'admin' | 'user')}
                >
                    <option value="admin">Admin</option>
                    <option value="user">user</option>

                </select>


            </td>

        </tr>
    )
}
