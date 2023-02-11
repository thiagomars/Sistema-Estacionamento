import { MdOutlineExitToApp } from 'react-icons/md';
import Pagamento from '../pages/Pagamento';

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

function ButtonFinalizar(props){

    let [abaSaida, setAbaSaida] = useState(false);

    function closeModalSaida(){
        setAbaSaida(false);
    }

    function openModalSaida(){
        setAbaSaida(true);
    }

    return (
        <>
            <button onClick={() => setAbaSaida(true)} className='pointer w-fit py-1 px-2 flex justify-center items-center rounded-md text-white text-lg bg-red-500 hover:bg-red-600'>
                <MdOutlineExitToApp className='sm:mr-1'/> <span className='text-sm hidden sm:block'>Saída</span>
            </button>

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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Pagamento id={props.id} placa={props.placa}/>
                                </Dialog.Panel>

                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

        </>
    )
}

export default ButtonFinalizar;