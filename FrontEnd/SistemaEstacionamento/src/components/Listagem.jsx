import MenuDropdown from "./MenuDropdown";
import { BsPrinterFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import PagImpressao from "../pages/PagImpressao";

function Listagem(props) {

    
    let [abaSaida, setAbaSaida] = useState(false);

    function closeModalSaida(){
        setAbaSaida(false);
    }

    function openModalSaida(){
        setAbaSaida(true);
    }

    const formatarEndereco = (obj) => {
        const vetor = Object.values(obj);
        let endereco = "CEP: " + vetor[1] + " | " + vetor[5] + "/" + vetor[6] + " - " + vetor[2] + ", " + vetor[4] + ", Nº " + vetor[7] + " " + (vetor[3] ? "- Complemento: " + vetor[3] : "")
        return endereco;
    }

    return (
        <div>
            <div className="flex flex-row mt-4 items-end justify-between">
                <p className='font-bold px-2'>LISTAGEM</p>
                <button onClick={openModalSaida} class="flex flex-row justify-center items-center rounded-md border border-transparent bg-slate-500 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-slate-700">
                    <BsPrinterFill className="mr-1"/>
                    Imprimir
                </button>
            </div>
            
        
            <div className='my-3 max-h-96 overflow-y-auto shadow-md rounded-md bg-white'>
                <table className='w-full text-sm text-left shadow-sm rounded-md '>
                    <thead className='uppercase sticky top-0 bg-slate-100'>
                        <tr>
                            {
                                props.titulos.map(value => {
                                    return <th scope='col' className='font-bold px-6 py-3'>{value}</th>
                                })
                            }
                            <th scope='col' className='font-bold px-6 py-3'>{null}</th>
                        </tr>
                    </thead>

                    <tbody className='overflow-x-scroll'>
                        {
                            props.dados != "" ? props.dados.map((value, index) => {
                                return <tr className='border-b hover:bg-gray-50'>
                                    {
                                        Object.values(value).map((itens) => {
                                            return <th scope="row" className="font-normal px-6 py-2">{typeof itens === 'object' && itens != null ? formatarEndereco(itens) : itens}</th>
                                        })
                                    }
                                    <th scope="row" className="text-center py-2"> <MenuDropdown /> </th>
                                </tr>
                            }) : null
                        }
                    </tbody>
                </table>
            </div>

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
                                <Dialog.Panel className="w-full max-w-full transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <button onClick={closeModalSaida} className="bg-white border-2 border-gray-500 rounded-full p-1 fixed top-4 right-4 z-50 hover:text-white hover:bg-red-400 hover:border-red-500">
                                        <AiOutlineClose className="text-lg"/>
                                    </button>
                                    <PagImpressao titulos={props.titulos} dados={props.dados}/>
                                </Dialog.Panel>

                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default Listagem;