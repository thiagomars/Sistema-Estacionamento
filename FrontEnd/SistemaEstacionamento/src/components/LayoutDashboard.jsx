import { Outlet } from 'react-router-dom'

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

import 'flowbite';

import { RiParkingBoxLine } from 'react-icons/ri';
import { BsPersonFill, BsFillCloudSunFill } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineSettings } from 'react-icons/md';
import { BiMenuAltLeft } from 'react-icons/bi';

import { BiHome } from "react-icons/bi"
import { BsPeople } from "react-icons/bs";
import { GiTyre } from "react-icons/gi";
import { RiRoadMapLine, RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineMonetizationOn } from "react-icons/md";
import NavBar from './NavBar';

function LayoutDashboard() {


    return (
        <>
            <ToastContainer />

            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                <span class="sr-only">Open sidebar</span>
                <BiMenuAltLeft  className='text-3xl'/>
            </button>

            <div className='sm:hidden absolute right-5 top-4'>
                <RiParkingBoxLine className="text-5xl text-gray-500"/>
            </div>

            <aside id="sidebar-multi-level-sidebar" class="fixed top-0 left-0 z-40 w-52 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-white font-medium text-gray-600">
                    <div className="hidden sm:flex flex-row items-stretch w-full ml-1 my-4 text-indigo-700">
                        <RiParkingBoxLine className="text-5xl"/>
                        {/* <span className='font-bold text-2xl'>ARKING</span> */}
                    </div>
                    
                    <NavBar />
                </div>
            </aside>

            <article className='p-5 sm:ml-52'>
                <Outlet />
            </article>
        </>

        // <div className='flex max-w-screen'>
        //     <ToastContainer />
        //     <nav className='bg-white px-1 flex flex-col items-start min-h-screen w-min'>
        //         <NavBar className="w-min" />
        //     </nav>
        //     <section className='px-5 w-full'>
        //         <header className='flex justify-between items-center py-5 flex-row pr-2'>
        //             <div className='flex flex-col'>
        //                 <h1 className='text-3xl text-center sm:text-4xl font-bold'>Bom Dia!</h1>
        //                 <div className='flex mt-1 items-center'>
        //                     <div className='mb-1 mr-3 text-2xl'>
        //                         <BsFillCloudSunFill className='hidden sm:block' />
        //                     </div>
        //                     <h2 className='text-sm'>São Paulo, SP 28ºC <br />Parcialmente nublado</h2>
        //                 </div>
        //             </div>
        //             <div className='flex flex-col items-end sm:flex-row-reverse sm:mt-2'>
        //                 <div className='flex justify-end m-1 items-center text-end font-semibold text-sm border w-fit rounded-full px-3 py-1 ml-2 cursor-pointer'>
        //                     <p className='hidden sm:block whitespace-pre-wrap mr-2'>Olá, Thiago Marques</p>
        //                     <BsPersonFill className='bg-slate-200 rounded-full p-1 text-3xl' />
        //                 </div>
        //                 <div className='flex justify-end m-1 items-center text-end font-semibold text-sm border w-max rounded-full px-3 py-1 ml-2 group cursor-pointer'>
        //                     <p className='hidden sm:group-hover:block mr-2'>Sair</p>
        //                     <HiOutlineLogout className='bg-slate-200 rounded-full p-1 text-3xl' />
        //                 </div>
        //                 <div className='flex justify-end m-1 items-center text-end font-semibold text-sm border w-max rounded-full px-3 py-1 ml-2 group cursor-pointer'>
        //                     <p className='hidden sm:group-hover:block mr-2'>Configurações</p>
        //                     <MdSettings className='bg-slate-200 rounded-full p-1 text-3xl' />
        //                 </div>
        //             </div>
        //         </header>

        //         <article className='py-3 pr-3'>
        //             <Outlet />
        //         </article>

        //     </section>
        // </div>
    )
}

export default LayoutDashboard;