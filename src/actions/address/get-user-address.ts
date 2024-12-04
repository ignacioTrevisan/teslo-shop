'use server';

import prisma from "@/lib/prisma";

export const GetUserAddress = async (userId: string) => {
    try {
        const address = await prisma.userAddress.findUnique({ where: { userId } })
        if (!address) return;
        const { countryId, ...rest } = address;
        return {
            ...rest,
            address: rest.address,
            lastName: rest.lastName,
            address2: rest.address2 ?? '',
            country: countryId
        };
    } catch (error) {
        console.log(error)
    }
}
