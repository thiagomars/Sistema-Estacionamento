import { VscDebugStepOut, VscDebugStepInto } from 'react-icons/vsc'
import { IoIosLock } from 'react-icons/io'
import EntradaVeiculos from '../pages/EntradaVeiculos';
import SaidaVeiculos from '../pages/SaidaVeiculos';

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

function MenuRapido() {

    let [abaEntrada, setAbaEntrada] = useState(false);
    let [abaSaida, setAbaSaida] = useState(false);

    function closeModal() {
        setAbaEntrada(false);
    }

    function openModal() {
        setAbaEntrada(true);
    }

    function closeModalSaida(){
        setAbaSaida(false);
    }

    function openModalSaida(){
        setAbaSaida(true);
    }

    return (
        <header className="flex flex-wrap gap-5 h-min w-full">
            <button onClick={openModal} className="bg-green-500 grow shrink-1 basis-52 p-5 flex flex-col items-center rounded-lg shadow-md hover:bg-green-600">
                <VscDebugStepOut className='text-white text-9xl' />
                <p className='text-white font-bold text-lg'>ENTRADA DE VEÍCULO</p>
            </button>
            <button onClick={openModalSaida} className="bg-red-500 grow shrink-1 basis-52 p-5 flex flex-col items-center rounded-lg shadow-md hover:bg-red-600">
                <VscDebugStepInto className='text-white text-9xl' />
                <p className='text-white font-bold text-lg'>SAÍDA DE VEÍCULO</p>
            </button>
            <div className="bg-purple-500 grow shrink-1 basis-52 p-4 flex flex-col items-center rounded-lg shadow-md">
                <div className='flex flex-col items-center justify-center text-gray-700 text-xl font-semibold w-full h-full'>
                    <button className='bg-purple-300 p-3 rounded-lg w-full h-full flex flex-row justify-center items-center' href='#'>
                        <IoIosLock className='mr-1'/>
                        <p>Novo Item</p>
                    </button>

                    <div className='my-2 w-full'></div>

                    <button className='bg-purple-300 p-3 rounded-lg w-full h-full flex flex-row justify-center items-center' href='#'>
                        <IoIosLock className='mr-1'/>
                        <p>Novo Item</p>
                    </button>
                </div>
            </div>

            <Transition appear show={abaEntrada} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
 
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95" >
                                
                                {/* Modal vai aqui */}
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <EntradaVeiculos />
                                </Dialog.Panel>

                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={abaSaida} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModalSaida}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95" >
                                
                                {/* Modal vai aqui */}
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <SaidaVeiculos />
                                </Dialog.Panel>

                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </header>
    )
}

export default MenuRapido;