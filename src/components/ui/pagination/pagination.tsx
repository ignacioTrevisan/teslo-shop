"use client"
import { generatePaginationNumbers } from '@/utils/generatePaginationNumbers';
import Link from 'next/link';
import { usePathname, useSearchParams, } from 'next/navigation';
import React from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
    totalPages: number;
}
export const Pagination = ({ totalPages }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) ?? 1
    const allPages = generatePaginationNumbers(currentPage, totalPages);

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        console.log('hola?')
        if (pageNumber === '...') {

            return `${pathname}?${params.toString()}`
        }
        if (+pageNumber <= 0) {
            console.log('2')

            return `${pathname} `
        }
        if (+pageNumber > totalPages) {
            console.log('3')
            return `${pathname}?${params.toString()}`;

        }
        console.log('4', pageNumber)

        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`
    }


    return (
        <div className="flex justify-center">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item" onClick={() => createPageUrl(currentPage - 1)}>
                        <Link
                            className={`page-link relative ${currentPage > 1 ? 'block' : 'hidden'} py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none`}
                            href={createPageUrl(currentPage - 1)}>
                            <IoChevronBackOutline size={30} />

                        </Link>
                    </li>

                    {allPages.map((a, index) =>

                        <li className="page-item" onClick={() => createPageUrl(a)} key={index}>
                            <Link
                                className={`page-link  ${a === currentPage && 'underline bg-blue-500 hover:bg-blue-400'} relative block py-1.5 px-2 border-0 bg-transparent outline-none transition-all duration-300 rounded `}
                                href={createPageUrl(a)}
                            >
                                {a}
                            </Link>
                        </li>
                    )}



                    <li className="page-item" onClick={() => createPageUrl(currentPage + 1)}>
                        <Link
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage + 1)}>
                            <IoChevronForwardOutline size={30} />

                        </Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}