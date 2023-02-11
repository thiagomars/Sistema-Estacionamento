import { BsPersonFill, BsFillCloudSunFill } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdSettings } from 'react-icons/md';
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function LayoutDashboard() {


    return (
        <div className='flex max-w-screen'>
            <ToastContainer />
            <nav className='bg-white px-1 flex flex-col items-start h-auto w-min'>
                <NavBar className="w-min" />
            </nav>
            <section className='px-5 w-full'>
                <header className='flex justify-between items-center py-5 flex-row pr-2'>
                    <div className='flex flex-col'>
                        <h1 className='text-3xl text-center sm:text-4xl font-bold'>Bom Dia!</h1>
                        <div className='flex mt-1 items-center'>
                            <div className='mb-1 mr-3 text-2xl'>
                                <BsFillCloudSunFill className='hidden sm:block' />
                            </div>
                            <h2 className='text-sm'>São Paulo, SP 28ºC <br />Parcialmente nublado</h2>
                        </div>
                    </div>
                    <div className='flex flex-col items-end sm:flex-row-reverse sm:mt-2'>
                        <div className='flex justify-end m-1 items-center text-end font-semibold text-sm border w-fit rounded-full px-3 py-1 ml-2 cursor-pointer'>
                            <p className='hidden sm:block whitespace-pre-wrap mr-2'>Olá, Thiago Marques</p>
                            <BsPersonFill className='bg-slate-200 rounded-full p-1 text-3xl' />
                        </div>
                        <div className='flex justify-end m-1 items-center text-end font-semibold text-sm border w-max rounded-full px-3 py-1 ml-2 group cursor-pointer'>
                            <p className='hidden sm:group-hover:block mr-2'>Sair</p>
                            <HiOutlineLogout className='bg-slate-200 rounded-full p-1 text-3xl' />
                        </div>
                        <div className='flex justify-end m-1 items-center text-end font-semibold text-sm border w-max rounded-full px-3 py-1 ml-2 group cursor-pointer'>
                            <p className='hidden sm:group-hover:block mr-2'>Configurações</p>
                            <MdSettings className='bg-slate-200 rounded-full p-1 text-3xl' />
                        </div>
                    </div>
                </header>

                <article className='py-3 pr-3'>
                    <Outlet />
                </article>

            </section>
        </div>
    )
}

export default LayoutDashboard;