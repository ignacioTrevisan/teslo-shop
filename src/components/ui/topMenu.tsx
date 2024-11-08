"use client"
import { titleFont } from "@/config/fonts"
import { useUiStore } from "@/store/ui/uiStore"
import Link from "next/link"
import { IoCartOutline, IoSearch } from "react-icons/io5"

export const TopMenu = () => {
    const toogleIsSideBarState = useUiStore(state => state.toogleIsSideBarState)

    return (
        <nav className="flex px-5 justify-between items-center w-full">
            {/* logo */}
            <div>
                <Link rel="stylesheet" href="/"
                >
                    <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
                    <span >| Shop</span>

                </Link>
            </div>
            <div className="hidden sm:block">

                <Link className='m-2 p-2 rounded translate-all hover:bg-gray-100' href='/gender/men'>Hombres</Link>
                <Link className='m-2 p-2 rounded translate-all hover:bg-gray-100' href='/gender/women'>Mujeres</Link>
                <Link className='m-2 p-2 rounded translate-all hover:bg-gray-100' href='/gender/kid'>Niños</Link>

            </div>

            {/* Search,Cart,Menu */}
            <div className="flex items-center gap-2" >
                <Link href='/search'>
                    <IoSearch className="w-5 h-5" />
                </Link>

                <Link href='/cart'>
                    <div className="relative">
                        <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700">3</span>
                        <IoCartOutline className="w-5 h-5" />
                    </div>
                </Link>
                <button className=" p-2 rounded-md transition-all hover:bg-gray-100" onClick={() => toogleIsSideBarState()}>Menu</button>
            </div>
        </nav>
    )
}
