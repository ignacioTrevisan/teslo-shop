"use client";
import { LogOut } from '@/actions/auth/logout';
import { useUiStore } from '@/store/ui/uiStore';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

export const Sidebar = () => {
    const { toogleIsSideBarState, closeSideBar, IsSideBarOpen } = useUiStore()
    const { data: session } = useSession();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {

        if (session?.user) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }

    }, [session])



    return (
        <div>
            {IsSideBarOpen
                &&
                <div onClick={() => toogleIsSideBarState()}>
                    {/* Fondo oscuro */}
                    <div
                        className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'
                    />

                    {/* Blur */}
                    <div
                        className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
                    />
                </div>
            }
            {/* Navbar */}
            <nav
                className={
                    clsx(
                        'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
                        {
                            "translate-x-full": !IsSideBarOpen
                        }
                    )
                }>
                <IoCloseOutline
                    size={50}
                    className='absolute top-5 right-5 cursor-pointer'
                    onClick={() => closeSideBar()}
                />


                {/* Input de busqueda */}

                <div className="relative mt-14">
                    <IoSearchOutline size={20} className='absolute top-2 left-2' />

                    <input
                        type='text'
                        placeholder='Buscar'
                        className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
                    />
                </div>

                {/* Menu */}
                {isAuthenticated && <>


                    <Link
                        href='/profile'
                        className='flex items-center mt-1 p-2 hover:bg-gray-100 rounded transition-all'
                        onClick={(e) => {
                            closeSideBar();
                        }}
                    >
                        <IoPersonOutline size={30} />
                        <span className='ml-3 text-xl0' >Perfil</span>
                    </Link>
                    <Link
                        href='/orders'
                        className='flex items-center mt-1 p-2 hover:bg-gray-100 rounded transition-all'
                        onClick={(e) => {
                            closeSideBar();
                        }}
                    >
                        <IoTicketOutline size={30} />
                        <span className='ml-3 text-xl0' >Ordenes</span>
                    </Link>
                </>}
                {
                    !isAuthenticated &&
                    <Link
                        href='/auth/login'
                        className='flex items-center mt-1 p-2 hover:bg-gray-100 rounded transition-all'
                        onClick={(e) => {
                            closeSideBar();
                        }}
                    >
                        <IoLogInOutline size={30} />
                        <span className='ml-3 text-xl0' >Ingresar</span>
                    </Link>
                }
                {
                    isAuthenticated &&
                    <button
                        // href='/'
                        onClick={
                            async () => {

                                closeSideBar()

                                await LogOut()

                                window.location.replace('/')
                            }
                        }
                        className='flex items-center w-full mt-1 p-2 hover:bg-gray-100 rounded transition-all'

                    >
                        <IoLogOutOutline size={30} />
                        <span className='ml-3 text-xl0' >Salir</span>
                    </button>
                }
                {session?.user.role === 'admin' &&
                    <>

                        <div className='w-full h-px bg-gray-200 my-10' />
                        <Link
                            href='/admin/products?page=1'
                            className='flex items-center mt-1 p-2 hover:bg-gray-100 rounded transition-all'
                            onClick={(e) => {
                                closeSideBar();
                            }}
                        >
                            <IoShirtOutline size={30} />
                            <span className='ml-3 text-xl0' >Productos</span>
                        </Link>
                        <Link
                            href='/admin/orders'
                            className='flex items-center mt-1 p-2 hover:bg-gray-100 rounded transition-all'
                            onClick={(e) => {
                                closeSideBar();
                            }}
                        >
                            <IoTicketOutline size={30} />
                            <span className='ml-3 text-xl0' >Ordenes</span>
                        </Link>
                        <Link
                            href='/admin/users'
                            className='flex items-center mt-1 p-2 hover:bg-gray-100 rounded transition-all'
                            onClick={(e) => {
                                closeSideBar();
                            }}
                        >
                            <IoPeopleOutline size={30} />
                            <span className='ml-3 text-xl0' >Usuarios</span>
                        </Link>
                    </>
                }
            </nav>

        </div>
    )
}
