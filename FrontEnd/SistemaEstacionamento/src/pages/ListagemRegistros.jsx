import Listagem from "../components/Listagem";
import axios from 'axios';
import { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { toast } from "react-toastify";
import InputMask from 'react-input-mask';
import { CgLoadbarDoc } from 'react-icons/cg';
import { RiArrowDropRightLine } from 'react-icons/ri';

function Financeiro(props) {

    const titulo = ["id", "entrada", "saída", "Veículo", "status", "Documento Identificação"];
    const [lista, setLista] = useState([]);

    let [abaSaida, setAbaSaida] = useState(true);
    function closeModalSaida() {
        setAbaSaida(false);
    }

    function openModalSaida() {
        setAbaSaida(true);
    }

    useEffect(() => {
        carregarRegistros();
    }, [])

    const carregarRegistros = () => {
        axios.get('https://localhost:7270/api/Registro/Listagem')
            .then((response) => {
                setLista(response.data);
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
    }

    return (
        <>
            <div className='flex flex-row items-baseline px-1 pt-2 pb-4'>
                <h1 className='font-semibold text-2xl'>{props.titulo}</h1>
                <div className='flex flex-row px-2 items-center'>
                    <p className='italic text-sm'>{props.subtitulo}</p>
                    {props.subsubtitulo != null
                    ? <><RiArrowDropRightLine className='text-lg'/> <p className='italic'>{props.subsubtitulo}</p></>
                    : null
                    }
                    
                </div>
            </div>
    
            <section className='col-span-12 w-full grid grid-cols-12 gap-6 bg-white p-4 rounded-md'>
                <div className="col-span-12">
                    <div className='py-3 px-3 bg-slate-100 rounded-md'>
                        <p className='font-bold pb-3'>FILTROS</p>
                        <div className='grid grid-cols-8 gap-6 pb-2'>
                            <div class="col-span-8 lg:col-span-2 md:col-span-4">
                                <label for="cep" class="block text-sm font-medium text-gray-700">CEP</label>
                                <InputMask
                                    type="text"
                                    id="cep"
                                    name="cep"
                                    mask="99\.999\-999"
                                    autoComplete="off"
                                    class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </InputMask>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-span-12 -mt-4'>
                    <Listagem tabela="Registros" titulos={titulo} dados={lista} />
                </div>
            </section>
        </>
    )
}

export default Financeiro;