import axios from "axios";
import { useEffect, useState } from "react";
import Carregando from "../components/Carregando";
import Listagem from "../components/Listagem";

import { RiArrowDropRightLine } from 'react-icons/ri';

import InputMask from 'react-input-mask';

function ListagemEnderecos(props){

    const titulo = ["id", "cep", "logradouro", "bairro", "cidade", "estado"];

    const [carregando, setCarregando] = useState(true);

    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState('');

    const [listaEstados, setListaEstados] = useState([]);
    const [lista, setLista] = useState("");

    useEffect(() => {
        listagemenderecos();
        popularSelectEstado();
    }, [])

    const listagemenderecos = () => {
        axios.get('https://localhost:7270/api/Endereco/Listagem?cep=' + cep + "&uf=" + estado + "&cidade=" + cidade + "&bairro=" + bairro)
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
                {carregando ? <Carregando /> : null}
                <div className='pb-3'>
                    <p className='font-bold pt-4 pb-2'>FILTROS</p>
                    <div className='grid grid-cols-9 gap-6 pb-2'>
                        <div class="col-span-9 lg:col-span-2 md:col-span-4">
                            <label for="cep" class="block text-sm font-medium text-gray-700">CEP</label>
                            <InputMask
                                type="text"
                                id="cep"
                                name="cep"
                                mask="99\.999\-999"
                                autoComplete="off"
                                value={cep}
                                onChange={e => setCep(e.target.value.replace(/\D/g, ''))}
                                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            </InputMask>
                        </div>

                        <div class="col-span-9  lg:col-span-2 md:col-span-4">
                            <label for="estado" class="block text-sm font-medium text-gray-700">Estado</label>
                            <select
                                name="estado"
                                id="estado"
                                value={estado}
                                onChange={e => setEstado(e.target.value)}
                                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option value="">Selecione...</option>
                                {
                                    listaEstados.map((value, index) => {
                                        return <option key={"UF_" + value.id} value={value.sigla}>{value.nome}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div class="col-span-9  lg:col-span-2 md:col-span-4">
                            <label for="cidade" class="block text-sm font-medium text-gray-700">Cidade</label>
                            <input
                                type="text"
                                name="cidade"
                                id="cidade"
                                value={cidade}
                                onChange={e => setCidade(e.target.value)}
                                autocomplete="off"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-9  lg:col-span-2 md:col-span-4">
                            <label for="bairro" class="block text-sm font-medium text-gray-700">Bairro</label>
                            <input
                                type="text"
                                name="bairro"
                                value={bairro}
                                onChange={e => setBairro(e.target.value)}
                                id="bairro"
                                autocomplete="off"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        

                        <div class="col-span-9 sm:col-span-1 flex justify-end items-end">
                            <button onClick={() => listagemenderecos()} class="block h-min w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>

                <Listagem titulos={titulo} dados={lista} redirect="/CadastrarEnderecos"/>
            </div>
        </>
    )
}

export default ListagemEnderecos;