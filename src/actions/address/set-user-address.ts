'use server'

import { UserAddress } from "@/interface/UserAddress";
import prisma from "@/lib/prisma";


export const setUserAddress = async (address: UserAddress, userId: string) => {

    try {
        const newAddress = await createOrReplaceAddress(address, userId);
        return {
            ok: true,
            address: newAddress
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: 'No se pudo guardar la direccion'
        }
    }

}

const createOrReplaceAddress = async (address: UserAddress, userId: string) => {
    try {
        const storeAddress = await prisma.userAddress.findFirst({ where: { userId } });
        const objAddress = {
            firstName: address.firstName,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2,
            postalCode: address.postalCode,
            phone: address.phone,
            countryId: address.country,
            userId: userId,
            city: address.city
        }
        if (!storeAddress) {
            const newAddress = await prisma.userAddress.create({
                data: objAddress
            })
            return newAddress;
        }
        const updateAddress = await prisma.userAddress.update({ where: { userId }, data: objAddress })
        return updateAddress;
    } catch (error: any) {
        console.log(error);
        throw new Error('No se pudo grabar la dirección.', error)
    }
}