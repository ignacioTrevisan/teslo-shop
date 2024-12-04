"use server"

import prisma from "@/lib/prisma";

export const GetCountries = async (): Promise<{ id: string, name: string }[]> => {
    try {
        const countries = await prisma.country.findMany({
            orderBy: {
                name: 'asc'
            }
        })
        return countries;
    } catch (error) {
        console.log(error);
        return []
    }
}