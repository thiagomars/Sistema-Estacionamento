import axios from "axios";
import { useRef, useEffect, useState } from "react";
import Carregando from "../components/Carregando";
import Listagem from "../components/Listagem";

import { RiArrowDropRightLine } from 'react-icons/ri';

import { useReactToPrint } from 'react-to-print';

function ListagemCliente(props){

    const titulo = ["nome completo", "cpf", "endereco"];

    const [carregando, setCarregando] = useState(true);

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [uf, setUf] = useState("");

    const [listaEstados, setListaEstados] = useState([]);
    const [lista, setLista] = useState("");

    useEffect(() => {
        listagemClientes();
        popularSelectEstado();
    }, [])

    const listagemClientes = () => {
        axios.get('https://localhost:7270/api/Cliente/Listagem?nome=' + nome + '&cpf=' + cpf + '&estado=' + uf)
            .then(response => {
                setLista(response.data);
            })
            .finally(() => {
                setCarregando(false);
            });
    }

    const popularSelectEstado = () => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
            .then(response => {
                setListaEstados(response.data);
            })
            .catch(error => {
                toast.error(error);
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

            <div className="bg-white px-4 rounded-md">
                <div className='pb-3'>
                    <p className='font-bold pt-4 pb-2'>FILTROS</p>
                    <div className='grid grid-cols-8 gap-6 pb-2'>
                        <div class="col-span-8 md:col-span-3">
                            <label for="nome" class="block text-sm font-medium text-gray-700">Nome do Cliente</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                autoComplete="off"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            </input>
                        </div>

                        <div class="col-span-8 md:col-span-2">
                            <label for="cpf" class="block text-sm font-medium text-gray-700">CPF</label>
                            <input
                                type="text"
                                name="cpf"
                                id="cpf"
                                value={cpf}
                                onChange={e => setCpf(e.target.value)}
                                autocomplete="off"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-8 md:col-span-2">
                            <label for="estado" class="block text-sm font-medium text-gray-700">Estado</label>
                            <select
                                name="estado"
                                id="estado"
                                value={uf}
                                onChange={e => setUf(e.target.value)}
                                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option value="">Selecione...</option>
                                {
                                    listaEstados.map((value, index) => {
                                        return <option key={"UF_" + value.id} value={value.sigla}>{value.nome}</option>
                                    })
                                }
                            </select>
                        </div>
                        
                        <div class="col-span-8 md:col-span-1 flex justify-end items-end">
                            <button onClick={() => listagemClientes()} class="block h-min justify-center w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>

                <Listagem tabela="Cliente" titulos={titulo} dados={lista} redirect="/CadastrarCliente"/>
                    
            </div>
        </>
    )
}

export default ListagemCliente;