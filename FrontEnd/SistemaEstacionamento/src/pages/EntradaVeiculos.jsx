import { useEffect, useState } from 'react';
import axios from 'axios';
import DataAtual from '../services/DataAtual'

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

import InputMask from 'react-input-mask';

function EntradaVeiculos() {

    const [padrao, setPadrao] = useState(false);
    const [placa, setPlaca] = useState("");
    const [cor, setCor] = useState("");
    const [documento, setDocumento] = useState("");
    const [numeroDocumento, setNumeroDocumento] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let dados = {
            "entrada": new Date().getUTCDate(),
            "placa": placa,
            "cor": cor,
            "tipoDocumento": parseInt(documento),
            "documento": parseInt(numeroDocumento),
            "finalizado": false,
        }

        axios({
            method: 'POST',
            url: 'https://localhost:7270/api/Registro',
            headers: {},
            data: dados
        }).then(response => {
            toast.info('Entrada de Veículo.');
        }).catch(error =>
            toast.error(error.response.data)
        )
    }

    return (
        <div>
            <div className='flex flex-col sm:flex-row justify-between items-center border-b pb-3'>
                <h1 className='text-2xl font-medium pb-3'>Registrar Entrada</h1>
                <p className='text-sm'><span className='font-semibold'>Data e hora de entrada:</span><br />{DataAtual()}</p>
            </div>

            <div>
                <form action="#" onSubmit={handleSubmit} method="POST">
                    <div className='py-4'>
                        <div class="grid grid-cols-4 gap-6">
                            <div class="col-span-6 md:col-span-2">
                                <label for="placa" class="block text-sm font-medium text-gray-700">PLACA</label>
                                <InputMask
                                    type="text"
                                    name="placa"
                                    id="placa"
                                    value={placa.toUpperCase()}
                                    mask={padrao ? "aaa9a99" : "aaa\-9999"}
                                    placeholder={padrao ? "AAA9A99" : "AAA-9999"}
                                    autocomplete="off"
                                    onChange={e => setPlaca(e.target.value.toUpperCase())}
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </div>

                            <div class="col-span-6 md:col-span-2 flex items-center -mt-3 md:pt-6">
                                <div class="flex h-5 items-center">
                                    <input onChange={e => setPadrao(e.target.checked)} id="padrao" name="padrao" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                </div>
                                <div class="ml-2 text-sm">
                                    <label for="padrao" class="font-medium text-gray-700">Placa padrão Mercosul</label>
                                </div>
                            </div>

                            <div class="col-span-6 md:col-span-2">
                                <label for="cor-veiculo" class="block text-sm font-medium text-gray-700">Cor do Veículo</label>
                                <select
                                    id="cor-veiculo"
                                    name="cor-veiculo"
                                    onChange={e => setCor(e.target.value)}
                                    class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    <option value='Nenhuma' select>Selecione...</option>
                                    <option value='Branco'>Branco</option>
                                    <option value='Preto'>Preto</option>
                                    <option value='Vermelho'>Vermelho</option>
                                    <option value='Cinza'>Cinza</option>
                                    <option value='Prata'>Prata</option>
                                    <option value='Azul'>Azul</option>
                                    <option value='Verde'>Verde</option>
                                    <option value='Amarelo'>Amarelo</option>
                                </select>
                            </div>

                            <div class="col-span-6 md:col-span-2">
                                <label for="tipo-documento" class="block text-sm font-medium text-gray-700">Tipo de Documento</label>
                                <select
                                    id="tipo-documento"
                                    name="tipo-documento"
                                    onChange={e => setDocumento(e.target.value)}
                                    class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    <option key="doc" value='-1' select>Selecione...</option>
                                    <option key="doc1" value='0'>RG</option>
                                    <option key="doc2" value='1'>CPF</option>
                                    <option key="doc3" value='2'>CNH</option>
                                </select>
                            </div>

                            <div class="col-span-6 md:col-span-2">
                                <label for="numero-documento" class="block text-sm font-medium text-gray-700">Número do Documento</label>
                                <input
                                    type="number"
                                    name="numero-documento"
                                    id="numero-documento"
                                    autocomplete="off"
                                    value={numeroDocumento}
                                    onChange={e => setNumeroDocumento(e.target.value)}
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </div>
                        </div>
                    </div>

                    <div class="bg-white py-3 text-center sm:text-right">
                        <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EntradaVeiculos;