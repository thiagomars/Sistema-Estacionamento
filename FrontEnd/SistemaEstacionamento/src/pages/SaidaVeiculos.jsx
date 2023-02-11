import { useState, useEffect } from 'react';
import axios from 'axios';
import DataAtual from '../services/DataAtual'

// Mensagem de erro
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

import ButtonFinalizar from '../components/ButtonFinalizar';

//menu Dropdown da tabela
// import { Menu, Transition } from '@headlessui/react'
// import { Fragment, useEffect, useRef, useState } from 'react'
// import { FaEllipsisV } from 'react-icons/fa'
//import MenuDropdown from '../components/MenuDropdown';


function EntradaVeiculos() {

    const [cores, setCores] = useState(null);

    const [filtroPlaca, setFiltroPlaca] = useState("");
    const [filtroCor, setFiltroCor] = useState("");

    const [listaRegistros, setListaRegistros] = useState(null);
    const url = 'https://localhost:7270/api/Registro';

    useEffect(() => {
        axios.get(url).then(response => {
            setListaRegistros(response.data);
        })

        axios.get('https://localhost:7270/api/Filtros/Cores').then(response => {
            setCores(response.data);
        })
    }, [])

    const handleSubmit = (e) => {
        let filtroLink = "";

        if(filtroPlaca != null || filtroCor != null){
            filtroLink = "?";

            if(filtroPlaca != null){
                filtroLink += "placa=" + filtroPlaca + "&";
            } 
            
            if (filtroCor != null || filtroCor != ""){
                filtroLink += "cor=" + filtroCor;
            }
        }

        axios.get(url + "?cor=" + filtroCor + "&placa=" + filtroPlaca).then(response => {
            setListaRegistros(response.data);
        });
    }

    return (
        <div className='max-h-screen'>
            <div className='flex flex-col sm:flex-row justify-between items-centerpb-3 text-center sm:text-right'>
                <h1 className='text-2xl font-medium pb-3'>Registrar Saída</h1>
                <p className='text-sm'><span className='font-semibold'>Data e hora de saída</span><br />{DataAtual()}</p>
            </div>

            <div className='py-3 px-3 bg-slate-100 rounded-md'>
                <p className='font-bold pb-3'>FILTROS</p>
                <div className='grid grid-cols-7 gap-6 pb-2'>
                    <div class="col-span-7 sm:col-span-3">
                        <label for="cor-veiculo" class="block text-sm font-medium text-gray-700">Cor do Veículo</label>
                        <select
                            id="cor-veiculo"
                            name="cor-veiculo"
                            onChange={e => setFiltroCor(e.target.value)}
                            class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option value="" select>Todas...</option>
                            {cores != null ? cores.map((value, index) => <option key={"cor"+value} value={index} select>{value}</option>) : null}
                        </select>
                    </div>

                    <div class="col-span-7 sm:col-span-3">
                        <label for="placa" class="block text-sm font-medium text-gray-700">PLACA</label>
                        <input
                            type="text"
                            name="placa"
                            id="placa"
                            value={filtroPlaca}
                            autocomplete="off"
                            onChange={e => setFiltroPlaca(e.target.value)}
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>

                    <div class="col-span-7 sm:col-span-1 flex justify-end items-end">
                        <button onClick={() => handleSubmit()} class="block h-min justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Buscar
                        </button>
                    </div>
                </div>
            </div>

            <p className='font-bold pt-3 pl-2'>LISTAGEM</p>

            <div className='my-3 max-h-64 overflow-y-auto shadow-md rounded-md'>

                <table className='w-full text-sm text-left shadow-sm rounded-md '>
                    <thead className='uppercase sticky top-0 bg-slate-100'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>PLACA</th>
                            <span className='max-[639px]:hidden'>
                            <th scope='col' className='px-6 py-3'>COR</th>
                            <th scope='col' className='px-6 text-center py-3'>DOCUMENTO</th>
                            </span>
                            <th scope='col' className='px-6 py-3'>NÚMERO</th>
                            <th scope='col' className='px-3 py-3'></th>
                        </tr>
                    </thead>

                    <tbody className='overflow-x-scroll'>
                        {listaRegistros != null
                            ? listaRegistros.map(element => {
                                return <tr className='border-b hover:bg-gray-50' key={"item"+element.placa}>
                                            <th scope='row' className='font-normal px-6 py-2'>{element.placa}</th>
                                            <span className='max-[639px]:hidden'>
                                            <th className='font-normal px-6 py-2'>{element.cor}</th>
                                            <th className='font-normal text-center px-6 py-2'>{element.tipoDocumento}</th>
                                            </span>
                                            <th className='font-normal px-6 py-2'>{element.documento}</th>
                                            <th className='font-normal px-3 py-2'><ButtonFinalizar id={element.id} placa={element.placa}/></th>
                                        </tr>
                            })
                            : null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EntradaVeiculos;