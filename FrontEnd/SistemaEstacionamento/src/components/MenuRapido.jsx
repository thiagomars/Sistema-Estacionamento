import { VscDebugStepOut, VscDebugStepInto } from 'react-icons/vsc'
import { IoIosLock, IoIosSettings } from 'react-icons/io'
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
        <header className="flex flex-wrap h-min w-full bg-white rounded-lg overflow-hidden">
            <button onClick={openModal} className="grow shrink-1 basis-44 sm:p-4 p-2 flex flex-row items-center justify-center rounded-lg sm:rounded-none border-2 sm:border-b-2 sm:border-0 sm:hover:bg-white hover:bg-indigo-100 border-white hover:border-indigo-500 hover:text-indigo-600 bg-center bg-cover object-cover">
                <VscDebugStepOut className='text-lg mr-1 rounded-full'/>
                <p className='font-medium'>Entrada de Veículo</p>
            </button>
            <button onClick={openModalSaida} className="grow shrink-1 basis-44 sm:p-4 p-2 flex flex-row items-center justify-center rounded-lg sm:rounded-none border-2 sm:border-b-2 sm:border-0 sm:hover:bg-white hover:bg-indigo-100 border-white hover:border-indigo-500 hover:text-indigo-600 bg-center bg-cover object-cover">
                <VscDebugStepInto className='text-lg mr-1 rounded-full'/>
                <p className='font-medium'>Saída de Veículo</p>
            </button>
            <button onClick={openModalSaida} className="grow shrink-1 basis-44 sm:p-4 p-2 flex flex-row items-center justify-center rounded-lg sm:rounded-none border-2 sm:border-b-2 sm:border-0 sm:hover:bg-white hover:bg-indigo-100 border-white hover:border-indigo-500 hover:text-indigo-600 bg-center bg-cover object-cover">
                <IoIosSettings className='text-lg mr-1 rounded-full'/>
                <p className='font-medium'>Configurações</p>
            </button>
            <button onClick={openModalSaida} className="grow shrink-1 basis-44 sm:p-4 p-2 flex flex-row items-center justify-center rounded-lg sm:rounded-none border-2 sm:border-b-2 sm:border-0 sm:hover:bg-white hover:bg-indigo-100 border-white hover:border-indigo-500 hover:text-indigo-600 bg-center bg-cover object-cover">
                <IoIosLock className='text-lg mr-1 rounded-full'/>
                <p className='font-medium'>Outra Função</p>
            </button>

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